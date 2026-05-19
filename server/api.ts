import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { seededExamples, EXAMPLE_DISHES, normalizeDish } from '../src/data/examples';
import { extractJsonObject, validateDishCartography, ValidationError } from '../src/lib/validation';
import type { ApiError, CartographyResponse, DishCartography } from '../src/lib/types';

const PORT = Number(process.env.PORT || 3001);

const loadEnvFile = () => {
  const envPath = join(process.cwd(), '.env');
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = value;
  }
};

loadEnvFile();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 12);

const cache = new Map<string, DishCartography>();
const shareCache = new Map<string, DishCartography>();
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

for (const [dish, data] of Object.entries(seededExamples)) {
  const id = createId(dish);
  const seeded = stamp({ ...data, id, cached: true });
  cache.set(normalizeDish(dish), seeded);
  shareCache.set(id, seeded);
}

function createId(input: string) {
  return createHash('sha256').update(normalizeDish(input)).digest('hex').slice(0, 12);
}

function stamp(data: DishCartography): DishCartography {
  return {
    ...data,
    id: data.id || createId(data.canonicalDishName || data.dishName),
    generatedAt: data.generatedAt || new Date().toISOString()
  };
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(body));
}

function clientIp(req: IncomingMessage) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(req: IncomingMessage) {
  const ip = clientIp(req);
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
      if (body.length > 20_000) {
        reject(new Error('Request body is too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function buildPrompt(dish: string) {
  return `You are a culinary historian and food systems cartographer. Trace how a dish or drink evolved first, then reveal the ingredient migrations that made the modern version possible.

Dish or drink: "${dish}"

Return ONLY valid JSON. No markdown. Use this exact schema shape:
{
  "dishName": "string",
  "canonicalDishName": "string",
  "dishType": "string",
  "plateLocation": { "name": "string", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
  "convergenceThesis": "2-3 sentence thesis about how this dish evolved and what global forces made it possible",
  "shareQuote": "one punchy shareable sentence under 150 characters",
  "dishLineage": [
    {
      "order": 1,
      "ancestorName": "earlier dish, technique, drink family, or cultural predecessor",
      "stageTitle": "short label for this evolution stage",
      "location": { "name": "place", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
      "period": "historical period",
      "transformation": "what changed at this stage",
      "routeType": "land|sea|trade|migration|colonial|agricultural",
      "confidence": "high|medium|low",
      "notes": "concise historically grounded note"
    }
  ],
  "ingredients": [
    {
      "id": "lowercase-kebab-id",
      "ingredient": "string",
      "role": "how it functions in the dish",
      "origin": { "name": "place or region", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
      "originPeriod": "historical period",
      "route": [
        {
          "order": 1,
          "title": "short route-stage label",
          "location": { "name": "place", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
          "period": "historical period",
          "routeType": "land|sea|trade|migration|colonial|agricultural",
          "notes": "concise historically grounded note"
        }
      ],
      "convergenceRole": "why this ingredient matters when it reaches the plate",
      "confidence": "high|medium|low",
      "sourceNotes": ["short source/evidence note, not a fabricated citation"]
    }
  ],
  "nameJourney": [
    {
      "order": 1,
      "name": "dish or related name",
      "languageOrCulture": "string",
      "location": { "name": "place", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
      "period": "historical period",
      "notes": "how the name changed or why it matters"
    }
  ],
  "globalForces": ["trade", "migration", "colonial exchange"],
  "sources": [{ "id": "source-id", "title": "source topic", "note": "what kind of evidence supports this" }],
  "uncertainties": ["short uncertainty note"]
}

Rules:
- Start with the dishLineage. Include 3 to 7 lineage stages when possible.
- The first lineage stage should answer: what earlier dish, technique, or food form did this come from?
- Include 3 to 6 important ingredient routes after the lineage, 2 to 5 for simple drinks.
- Coordinates must be [longitude, latitude].
- Do not invent exact citations, URLs, restaurant founders, or dates when uncertain.
- If a history is disputed, say so in uncertainties and use medium or low confidence.
- Keep text concise enough for a visual app.`;
}

async function callGemini(dish: string) {
  if (!GEMINI_API_KEY) {
    throw Object.assign(new Error('GEMINI_API_KEY is not configured'), { code: 'NO_API_KEY' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: buildPrompt(dish) }] }],
      generationConfig: {
        temperature: 0.35,
        responseMimeType: 'application/json'
      }
    })
  });

  const raw = await response.text();
  if (!response.ok) {
    const code = response.status === 429 || raw.includes('RESOURCE_EXHAUSTED') ? 'GEMINI_QUOTA' : 'GEMINI_ERROR';
    throw Object.assign(new Error(raw || response.statusText), { code, status: response.status });
  }

  const payload = JSON.parse(raw);
  const text = payload?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('\n');
  if (!text) throw Object.assign(new Error('Gemini returned an empty response'), { code: 'EMPTY_GEMINI_RESPONSE' });
  return validateDishCartography(extractJsonObject(text));
}

async function handleCartography(req: IncomingMessage, res: ServerResponse) {
  if (isRateLimited(req)) {
    const body: ApiError = {
      error: 'Too many requests. Try again in a minute or open an example.',
      code: 'RATE_LIMITED',
      examples: EXAMPLE_DISHES
    };
    sendJson(res, 429, body);
    return;
  }

  const rawBody = await readBody(req);
  const payload = JSON.parse(rawBody || '{}');
  const dish = typeof payload.dish === 'string' ? payload.dish.trim() : '';

  if (dish.length < 2 || dish.length > 80) {
    sendJson(res, 400, { error: 'Enter a dish or drink between 2 and 80 characters.', code: 'BAD_DISH', examples: EXAMPLE_DISHES });
    return;
  }

  const normalized = normalizeDish(dish);
  const cached = cache.get(normalized);
  if (cached) {
    sendJson(res, 200, { data: { ...cached, cached: true } } satisfies CartographyResponse);
    return;
  }

  try {
    const generated = stamp(validateDishCartography(await callGemini(dish)));
    cache.set(normalized, generated);
    shareCache.set(generated.id!, generated);
    sendJson(res, 200, { data: generated } satisfies CartographyResponse);
  } catch (error: any) {
    const seeded = seededExamples[normalized];
    if (seeded) {
      const data = stamp({ ...seeded, id: createId(normalized), cached: true });
      sendJson(res, 200, { data } satisfies CartographyResponse);
      return;
    }

    if (error?.code === 'GEMINI_QUOTA') {
      sendJson(res, 429, {
        error: 'Free Gemini quota is busy right now. Try again soon or open an example.',
        code: 'GEMINI_QUOTA',
        examples: EXAMPLE_DISHES
      } satisfies ApiError);
      return;
    }

    if (error?.code === 'NO_API_KEY') {
      sendJson(res, 500, {
        error: 'Gemini is not configured yet. Add GEMINI_API_KEY to .env, then restart the server.',
        code: 'NO_API_KEY',
        examples: EXAMPLE_DISHES
      } satisfies ApiError);
      return;
    }

    const message = error instanceof ValidationError
      ? `Gemini returned incomplete cartography: ${error.message}`
      : 'Flavor cartography failed. Try another dish or open an example.';
    sendJson(res, 502, { error: message, code: 'GENERATION_FAILED', examples: EXAMPLE_DISHES } satisfies ApiError);
  }
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      sendJson(res, 204, {});
      return;
    }

    if (req.method === 'GET' && req.url === '/api/health') {
      sendJson(res, 200, { ok: true, model: GEMINI_MODEL, hasGeminiKey: Boolean(GEMINI_API_KEY) });
      return;
    }

    if (req.method === 'GET' && req.url?.startsWith('/api/cartography/')) {
      const id = req.url.split('/').pop() || '';
      const data = shareCache.get(id);
      if (!data) {
        sendJson(res, 404, { error: 'Shared flavor map not found.', code: 'NOT_FOUND', examples: EXAMPLE_DISHES });
        return;
      }
      sendJson(res, 200, { data } satisfies CartographyResponse);
      return;
    }

    if (req.method === 'POST' && req.url === '/api/cartography') {
      await handleCartography(req, res);
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch {
    sendJson(res, 500, { error: 'Unexpected server error.', code: 'SERVER_ERROR', examples: EXAMPLE_DISHES });
  }
});

server.listen(PORT, () => {
  console.log(`Flavor Cartography API running on http://127.0.0.1:${PORT}`);
  console.log(`Gemini model: ${GEMINI_MODEL}`);
});
