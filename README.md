# Unusual Destinations API

Lightweight Node.js + HTTP server that serves a curated list of unusual travel destinations from an in-memory dataset.

- Production: https://crazy-destinations-api-3e3957d54285.herokuapp.com
- Local: http://localhost:8000 (default)

## Prerequisites
- Node.js 18+ (ESM + top-level await support)

## Install & Run Locally
1) Install deps (none beyond Node standard lib):
```
npm install
```
2) Start the server (defaults to port 8000):
```
npm start
```
3) Override port if needed:
```
PORT=4000 npm start
```

## API
Base URL: use either the production URL above or your local host/port.

### Endpoints

- `GET /api` — all destinations (with optional query parameters).
- `GET /api/continent/:name` — destinations filtered by continent. Hyphens are normalized to spaces so `/api/continent/north-america` matches "North America".
- `GET /api/country/:name` — destinations filtered by country. Hyphens are also normalized.

### Query Parameters

Filter results using query parameters with `/api`:

- `continent` — filter by continent (e.g., `?continent=north-america`)
- `country` — filter by country (e.g., `?country=usa`)
- `is_open_to_public` — filter by public access status (e.g., `?is_open_to_public=true` or `?is_open_to_public=false`)

Parameters can be combined: `?continent=europe&is_open_to_public=true`

### Example Requests (Production)

- All: https://crazy-destinations-api-3e3957d54285.herokuapp.com/api
- By continent (path): https://crazy-destinations-api-3e3957d54285.herokuapp.com/api/continent/north-america
- By country (path): https://crazy-destinations-api-3e3957d54285.herokuapp.com/api/country/usa
- By continent (query): https://crazy-destinations-api-3e3957d54285.herokuapp.com/api?continent=europe
- By country (query): https://crazy-destinations-api-3e3957d54285.herokuapp.com/api?country=japan
- Public destinations only: https://crazy-destinations-api-3e3957d54285.herokuapp.com/api?is_open_to_public=true
- Combined filters: https://crazy-destinations-api-3e3957d54285.herokuapp.com/api?continent=south-america&is_open_to_public=true

Responses are JSON arrays of destination objects shaped like:
```json
{
  "name": "Fly Geyser",
  "location": "Nevada",
  "country": "USA",
  "continent": "North America",
  "is_open_to_public": false,
  "uuid": "550e8400-e29b-41d4-a716-446655440005",
  "details": [
    { "fun_fact": "The geyser was accidentally created by well drilling in 1964." },
    { "description": "A colorful, continuously spouting geothermal formation with vibrant mineral deposits on a private Nevada ranch." }
  ]
}
```

## Structure
- server.js — HTTP server and routing.
- database/db.js — fetches in-memory dataset.
- data/data.js — static destination data.
- utils/sendJSONResponse.js — helper for JSON responses.
- utils/getDataByPathParams.js — shared filter helper for continent/country routes.
