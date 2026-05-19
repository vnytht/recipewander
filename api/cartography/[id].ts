import type { VercelRequest, VercelResponse } from '@vercel/node';
import { examples, getSharedCartography } from '../../src/server/cartographyCore';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });
      return;
    }

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || '';
    const { status, body } = getSharedCartography(id);
    res.status(status).json(body);
  } catch (error) {
    console.error('shared cartography api failed', error);
    res.status(500).json({
      error: 'Server failed while loading the shared flavor map.',
      code: 'SERVER_ERROR',
      examples
    });
  }
}
