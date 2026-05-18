# Flavor Cartography

WanderWord for food: type any dish or drink and the app asks Gemini to map how its historically important ingredients converged into one plate.

## Setup

```bash
npm install
cp .env.example .env
```

Add a free Google AI Studio key:

```bash
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=12
```

## Run

```bash
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Behavior

- `POST /api/cartography` accepts `{ "dish": "margarita" }`.
- The server checks cache first, then calls Gemini with the API key kept server-side.
- Seeded examples are available for `butter chicken`, `ramen`, `tiramisu`, `margarita`, and `chocolate`.
- If the free Gemini quota is exhausted, the API returns a friendly `GEMINI_QUOTA` error with examples.

## Verify

```bash
npm run test
npm run build
```

## Deploy On Vercel

1. Push this repo to GitHub.
2. Import the GitHub repo in Vercel.
3. Set environment variables in Vercel:

```bash
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=12
```

Vercel will build the Vite frontend and serve the serverless API functions from `api/`.
