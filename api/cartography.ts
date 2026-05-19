import type { VercelRequest, VercelResponse } from '@vercel/node';
import { seededExamples, normalizeDish, EXAMPLE_DISHES } from './_lib/seeds';

export const config = { maxDuration: 30 };

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 12);
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > maxRequests;
}

function buildPrompt(dish: string): string {
  return `You are a culinary historian. For the dish or drink "${dish}", return ONLY valid JSON (no markdown) with this shape:
{
  "dishName": "string",
  "canonicalDishName": "string",
  "dishType": "string",
  "plateLocation": { "name": "string", "countryCode": "ISO-2", "coordinates": [longitude, latitude] },
  "convergenceThesis": "2-3 sentence thesis",
  "shareQuote": "one punchy sentence under 150 chars",
  "dishLineage": [
    { "order": 1, "ancestorName": "string", "stageTitle": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "transformation": "string", "routeType": "land|sea|trade|migration|colonial|agricultural", "confidence": "high|medium|low", "notes": "string" }
  ],
  "ingredients": [
    { "id": "kebab-id", "ingredient": "string", "role": "string", "origin": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "originPeriod": "string", "route": [ { "order": 1, "title": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "routeType": "land|sea|trade|migration|colonial|agricultural", "notes": "string" } ], "convergenceRole": "string", "confidence": "high|medium|low", "sourceNotes": ["string"] }
  ],
  "nameJourney": [ { "order": 1, "name": "string", "languageOrCulture": "string", "location": { "name": "string", "countryCode": "ISO-2", "coordinates": [lng, lat] }, "period": "string", "notes": "string" } ],
  "globalForces": ["trade", "migration"],
  "sources": [{ "id": "string", "title": "string", "note": "string" }],
  "uncertainties": ["string"]
}
Include 3-7 dishLineage stages and 3-6 ingredients. Coordinates are [longitude, latitude].`;
}

async function callGemini(dish: string): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  if (!apiKey) throw { code: 'NO_API_KEY' };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: buildPrompt(dish) }] }],
      generationConfig: { temperature: 0.35, responseMimeType: 'application/json' }
    })
  });

  const raw = await res.text();
  if (!res.ok) {
    const code = res.status === 429 || raw.includes('RESOURCE_EXHAUSTED') ? 'GEMINI_QUOTA' : 'GEMINI_ERROR';
    throw { code, status: res.status, message: raw };
  }

  const payload = JSON.parse(raw);
  const text: string = (payload?.candidates?.[0]?.content?.parts ?? [])
    .map((p: { text?: string }) => p.text || '')
    .join('\n');
  if (!text) throw { code: 'EMPTY_RESPONSE' };

  try { return JSON.parse(text); } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw { code: 'INVALID_JSON' };
    return JSON.parse(match[0]);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = (String(req.headers['x-forwarded-for'] || '') .split(',')[0] || 'unknown').trim();
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests. Try again in a minute.', examples: EXAMPLE_DISHES });
    }

    const dish = typeof req.body?.dish === 'string' ? req.body.dish.trim() : '';
    if (dish.length < 2 || dish.length > 80) {
      return res.status(400).json({ error: 'Enter a dish between 2 and 80 characters.', examples: EXAMPLE_DISHES });
    }

    const normalized = normalizeDish(dish);
    const seeded = seededExamples[normalized];
    if (seeded) {
      return res.status(200).json({ data: { ...seeded, cached: true } });
    }

    const data = await callGemini(dish);
    return res.status(200).json({ data });
  } catch (err: any) {
    console.error('cartography error', err);
    if (err?.code === 'NO_API_KEY') {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.', examples: EXAMPLE_DISHES });
    }
    if (err?.code === 'GEMINI_QUOTA') {
      return res.status(429).json({ error: 'Gemini quota exceeded. Try again soon.', examples: EXAMPLE_DISHES });
    }
    return res.status(500).json({ error: 'Failed to generate cartography.', examples: EXAMPLE_DISHES });
  }
}
