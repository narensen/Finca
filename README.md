# Finca

Finca is a production-ready Next.js 14 frontend for a blockchain-based agricultural supply chain transparency platform.

Tagline: `From Farm to Trust — Verified.`

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Supabase JS client

## Pages

- `/` landing page with hero and animated supply-chain flow
- `/dashboard` batch overview
- `/create-batch` genesis batch creation
- `/add-event` append a supply-chain event
- `/batches/[batchId]` synchronized timeline + blockchain explorer
- `/verify` backend validation workspace
- `/assistant` AI interpreter workspace

## Core Rules Enforced

- Frontend never computes hashes
- Frontend never simulates blockchain logic
- FastAPI owns `/batches`, `/blocks`, and `/validate`
- Supabase is used for persistence and retrieval only
- Each batch is rendered as a chain, not a flat event list

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com/api/v1
API_URL=
API_HOSTPORT=
SUPABASE_SERVICE_ROLE_KEY=
GROQ_API_KEY=
FINCA_AI_MODEL=llama-3.3-70b-versatile
```

## Local Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Data Flow

Create batch:

1. Frontend submits batch metadata to `POST /batches`
2. FastAPI creates the genesis block
3. Frontend persists the returned batch and genesis block in Supabase
4. UI reads the batch and chain from Supabase

Add event:

1. Frontend fetches the latest block for the selected batch from Supabase
2. Frontend sends event payload to `POST /blocks`
3. FastAPI creates the next block
4. Frontend persists the returned block in Supabase
5. UI re-renders the stored chain

Validate:

1. Frontend fetches the stored chain from Supabase
2. Frontend sends it to `POST /validate`
3. Validation status drives green glow or broken-chain visuals

AI assistant:

1. Frontend sends a structured request to `POST /api/ai`
2. The server-side AI route returns a structured response envelope
3. The interpreter layer updates chat UI, optional audio playback, and any routed UI action

## API Adapter Note

Because the exact earlier JSON contract was not available in this workspace, the request adapter is centralized in [lib/api.ts](/home/naren/Documents/Finca/lib/api.ts). The current implementation assumes:

- `POST /batches` accepts batch metadata
- `POST /blocks` accepts `batch_id`, `event_type`, `data`, `previous_hash`, and `index`
- `POST /validate` accepts `blocks`

If your FastAPI service uses slightly different field names or nesting, update only [lib/api.ts](/home/naren/Documents/Finca/lib/api.ts) rather than touching the UI.

## Key Files

- [app/page.tsx](/home/naren/Documents/Finca/app/page.tsx)
- [app/dashboard/page.tsx](/home/naren/Documents/Finca/app/dashboard/page.tsx)
- [app/batches/[batchId]/page.tsx](/home/naren/Documents/Finca/app/batches/[batchId]/page.tsx)
- [components/chain/chain-explorer.tsx](/home/naren/Documents/Finca/components/chain/chain-explorer.tsx)
- [components/forms/add-event-form.tsx](/home/naren/Documents/Finca/components/forms/add-event-form.tsx)
- [components/forms/verify-workspace.tsx](/home/naren/Documents/Finca/components/forms/verify-workspace.tsx)
- [lib/data.ts](/home/naren/Documents/Finca/lib/data.ts)
- [lib/api.ts](/home/naren/Documents/Finca/lib/api.ts)

## Verification Status

The app passes:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Security Note

`npm audit --omit dev` reports a high-severity advisory on the `next@14` line itself. This project stays on Next 14 because that version is a hard requirement for the hackathon brief. After the event, the cleanest remediation path is upgrading to a newer major Next.js release that contains the upstream fixes.
