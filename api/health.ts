import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    v: 'af3bec1',
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
}
