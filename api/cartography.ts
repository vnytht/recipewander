import type { VercelRequest, VercelResponse } from '@vercel/node';
import { examples, getCartography, isRateLimited } from './_lib/cartographyCore';

export const config = {
  maxDuration: 30
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });
      return;
    }

    const ip = (req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown').trim();
    const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
    const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 12);
    if (isRateLimited(ip, windowMs, maxRequests)) {
      res.status(429).json({ error: 'Too many requests. Try again in a minute or open an example.', code: 'RATE_LIMITED', examples });
      return;
    }

    const dish = typeof req.body?.dish === 'string' ? req.body.dish.trim() : '';
    const { status, body } = await getCartography(dish, {
      apiKey: process.env.GEMINI_API_KEY || '',
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    });
    res.status(status).json(body);
  } catch (error) {
    console.error('cartography api failed', error);
    res.status(500).json({
      error: 'Server failed while generating flavor cartography. Check Vercel function logs and environment variables.',
      code: 'SERVER_ERROR',
      examples
    });
  }
}
