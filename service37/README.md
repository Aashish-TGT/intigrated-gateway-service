# MS41 — Voice-Activated Receipt Assistant

## Run
1. `cp .env.example .env` and fill keys
2. Start MongoDB locally (`mongodb://localhost:27017`)
3. `npm i`
4. `npm run dev`

## Auth
Use a JWT with payload `{ "userId": "u123", "email": "a@b.com" }`.
Header: `Authorization: Bearer <token>`

## Endpoints
- `GET /health`
- `GET /voice/help`
- `POST /voice/query` (multipart: `audio=<file>`) → transcribe, NLU, search, optional TTS
- `POST /voice/speak` body `{ "text": "..." }` → returns `{ url }`
- `GET /receipts/search?query=...`
- `POST /training` `{ phrase, intent: "SEARCH_RECEIPT|READ_SUMMARY|HELP", hints?: [] }`
- `GET /training`

## Example Text Queries
- `show my coffee receipt from May`
- `find amazon receipts under 500`
- `receipts on 12 Aug 2025`
- `read the summary`

## Mobile Integration
- Send microphone audio to `/voice/query` as multipart.
- Get JSON results; play `spoken.url` if present.
