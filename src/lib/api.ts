import type { ApiError, CartographyResponse, DishCartography } from './types';

async function parseApiResponse(response: Response): Promise<CartographyResponse | ApiError> {
  const text = await response.text();
  if (!text) {
    return {
      error: `Server returned an empty response (${response.status}).`,
      code: 'EMPTY_RESPONSE'
    };
  }

  try {
    return JSON.parse(text) as CartographyResponse | ApiError;
  } catch {
    const preview = text.replace(/\s+/g, ' ').trim().slice(0, 180);
    return {
      error: response.ok
        ? 'Server returned invalid JSON.'
        : `Server returned ${response.status}: ${preview || response.statusText}`,
      code: 'INVALID_JSON_RESPONSE'
    };
  }
}

export async function fetchCartography(dish: string): Promise<DishCartography> {
  const response = await fetch('/api/cartography', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dish })
  });
  const body = await parseApiResponse(response);
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
  const body = await parseApiResponse(response);
  if (!response.ok) {
    const error = body as ApiError;
    throw Object.assign(new Error(error.error || 'Shared flavor map not found'), {
      code: error.code,
      examples: error.examples
    });
  }
  return (body as CartographyResponse).data;
}
