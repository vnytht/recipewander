import type { VercelRequest, VercelResponse } from '@vercel/node';
import { EXAMPLE_DISHES, seededExamples } from '../../src/data/examples';

const seededShareIds: Record<string, keyof typeof seededExamples> = {
  b92d346bd760: 'butter chicken',
  d8472e7f4f47: 'ramen',
  '08b71ca48290': 'tiramisu',
  f1be6354b418: 'margarita',
  '7499aced4386': 'chocolate'
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });
      return;
    }

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || '';
    const seededDish = seededShareIds[id];
    if (seededDish) {
      res.status(200).json({
        data: {
          ...seededExamples[seededDish],
          id,
          cached: true,
          generatedAt: new Date().toISOString()
        }
      });
      return;
    }

    res.status(404).json({
      error: 'Shared flavor map not found. Generated maps are temporary unless opened from the same session.',
      code: 'NOT_FOUND',
      examples: EXAMPLE_DISHES
    });
  } catch (error) {
    console.error('shared cartography api failed', error);
    res.status(500).json({
      error: 'Server failed while loading the shared flavor map.',
      code: 'SERVER_ERROR',
      examples: EXAMPLE_DISHES
    });
  }
}
