import type { ApiError, CartographyResponse, DishCartography } from './types';

export async function fetchCartography(dish: string): Promise<DishCartography> {
  const response = await fetch('/api/cartography', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dish })
  });
  const body = (await response.json()) as CartographyResponse | ApiError;
  if (!response.ok) {
    const error = body as ApiError;
    throw Object.assign(new Error(error.error || 'Flavor cartography failed'), {
      code: error.code,
      examples: error.examples
    });
  }
  return (body as CartographyResponse).data;
}

export async function fetchSharedCartography(id: string): Promise<DishCartography> {
  const response = await fetch(`/api/cartography/${encodeURIComponent(id)}`);
  const body = (await response.json()) as CartographyResponse | ApiError;
  if (!response.ok) {
    const error = body as ApiError;
    throw new Error(error.error || 'Shared flavor map not found');
  }
  return (body as CartographyResponse).data;
}
