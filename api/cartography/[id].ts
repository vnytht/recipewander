import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSharedCartography } from '../../src/server/cartographyCore';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || '';
  const { status, body } = getSharedCartography(id);
  res.status(status).json(body);
}
