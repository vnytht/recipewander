import { createHash } from 'node:crypto';
import { seededExamples, EXAMPLE_DISHES, normalizeDish } from '../data/examples';
import { extractJsonObject, validateDishCartography, ValidationError } from '../lib/validation';
import type { ApiError, CartographyResponse, DishCartography } from '../lib/types';

const cache = new Map<string, DishCartography>();
const shareCache = new Map<string, DishCartography>();
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

export const examples = EXAMPLE_DISHES;

export function createId(input: string) {
  return createHash('sha256').update(normalizeDish(input)).digest('hex').slice(0, 12);
}

export function stamp(data: DishCartography): DishCartography {
  return {
    ...data,
    id: data.id || createId(data.canonicalDishName || data.dishName),
    generatedAt: data.generatedAt || new Date().toISOString()
  };
}

for (const [dish, data] of Object.entries(seededExamples)) {
  const id = createId(dish);
  const seeded = stamp({ ...data, id, cached: true });
  cache.set(normalizeDish(dish), seeded);
  shareCache.set(id, seeded);
}

export function isRateLimited(ip: string, windowMs: number, maxRequests: number) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > maxRequests;
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

async function callGemini(dish: string, apiKey: string, model: string) {
  if (!apiKey) {
    throw Object.assign(new Error('GEMINI_API_KEY is not configured'), { code: 'NO_API_KEY' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
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

export async function getCartography(
  dish: string,
  options: { apiKey: string; model: string }
): Promise<{ status: number; body: CartographyResponse | ApiError }> {
  if (dish.length < 2 || dish.length > 80) {
    return {
      status: 400,
      body: { error: 'Enter a dish or drink between 2 and 80 characters.', code: 'BAD_DISH', examples }
    };
  }

  const normalized = normalizeDish(dish);
  const cached = cache.get(normalized);
  if (cached) return { status: 200, body: { data: { ...cached, cached: true } } };

  try {
    const generated = stamp(validateDishCartography(await callGemini(dish, options.apiKey, options.model)));
    cache.set(normalized, generated);
    shareCache.set(generated.id!, generated);
    return { status: 200, body: { data: generated } };
  } catch (error: any) {
    const seeded = seededExamples[normalized];
    if (seeded) {
      const data = stamp({ ...seeded, id: createId(normalized), cached: true });
      return { status: 200, body: { data } };
    }

    if (error?.code === 'GEMINI_QUOTA') {
      return {
        status: 429,
        body: {
          error: 'Free Gemini quota is busy right now. Try again soon or open an example.',
          code: 'GEMINI_QUOTA',
          examples
        }
      };
    }

    if (error?.code === 'NO_API_KEY') {
      return {
        status: 500,
        body: {
          error: 'Gemini is not configured yet. Add GEMINI_API_KEY to your environment variables.',
          code: 'NO_API_KEY',
          examples
        }
      };
    }

    const message = error instanceof ValidationError
      ? `Gemini returned incomplete cartography: ${error.message}`
      : 'Flavor cartography failed. Try another dish or open an example.';
    return { status: 502, body: { error: message, code: 'GENERATION_FAILED', examples } };
  }
}

export function getSharedCartography(id: string): { status: number; body: CartographyResponse | ApiError } {
  const data = shareCache.get(id);
  if (!data) return { status: 404, body: { error: 'Shared flavor map not found.', code: 'NOT_FOUND', examples } };
  return { status: 200, body: { data } };
}
