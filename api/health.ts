import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
}
