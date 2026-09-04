# Finca

> From Farm to Trust — Verified.

<p align="center">
  <a href="#about"><strong>Explore the docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/varunsahukar/Finca/issues">Report Bug</a>
  ·
  <a href="https://github.com/varunsahukar/Finca/issues">Request Feature</a>
</p>

## About

**Finca** is a production-ready Next.js 14 frontend for a blockchain-based agricultural supply chain transparency platform. It creates a tamper-evident chain of custody for every agricultural batch — giving farmers, businesses, and consumers a clear, verifiable product story from origin to shelf.

### The Problem

Agricultural supply chains suffer from:

- **Limited farmer visibility** — Farmers lose track of their products after harvest
- **Consumer distrust** — Origin and authenticity claims are hard to verify
- **Fragmented records** — Supply chain data is opaque, fragmented, or easily manipulated

### The Solution

Each batch is treated as its own blockchain:

- 🌱 A **genesis block** is created at origin when the batch is born
- 🔗 Every supply chain event links to the previous block's hash
- ✅ The full journey can be **cryptographically validated** at any point in the chain

---

## Tech Stack

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  </a>
  <a href="https://greensock.com/gsap/">
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP">
  </a>
  <a href="https://supabase.com/">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  </a>
</p>

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 12, GSAP 3.14 |
| **Persistence** | Supabase JS Client 2 |
| **Icons** | Lucide React |
| **QR Codes** | qrcode |
| **Backend** | FastAPI Blockchain Engine (separate service) |

---

## Architecture

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────┐
│            Next.js 14 Frontend                   │
│                                                  │
│  /            → Landing + Supply Chain Flow      │
│  /dashboard   → Batch Overview                   │
│  /create-batch → Genesis Block Creation          │
│  /add-event   → Append Event to Chain            │
│  /batches/:id → Timeline + Blockchain Explorer   │
│  /verify      → Validation Workspace             │
│  /assistant   → AI Interpreter (Groq-powered)    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Persists returned blocks → Supabase     │    │
│  └─────────────────┬────────────────────────┘    │
└────────────────────┼─────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │   FastAPI Blockchain Eng.  │
        │                            │
        │  POST /batches   → Genesis │
        │  POST /blocks    → Link    │
        │  POST /validate  → Verify  │
        └────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │        Supabase DB         │
        │   batches   •   blocks     │
        └────────────────────────────┘
```

### Core Design Principle

> **Frontend never computes hashes. Frontend never simulates blockchain logic.**

The backend is the sole source of truth for all blockchain operations. Supabase is used purely as the persistence layer for storing and reading trusted chain records returned by the engine.

---

## Pages & Workspaces

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero section and animated supply-chain flow visualization |
| `/dashboard` | Grid overview of all tracked batches |
| `/create-batch` | Genesis block creation — birth of a new batch on the chain |
| `/add-event` | Append a supply-chain event (shipment, processing, storage, handoff) |
| `/batches/[batchId]` | Synchronized timeline view + blockchain block explorer |
| `/verify` | Backend validation workspace — checks chain integrity |
| `/assistant` | AI interpreter workspace — Groq-powered LLM assistance |
| `/batch/[id]` | Batch detail view |
| `/trace/[batchId]` | Trace workspace with QR + farmer identity cards |
| `/advanced` | Advanced operations page |

---

## Data Flow

### Create Batch

1. **Submit** batch metadata via UI → `POST /batches`
2. **FastAPI** creates the genesis block with initial hash
3. **Frontend** persists returned batch + genesis block in Supabase
4. **UI** reads batch and chain from Supabase for display

### Add Supply Chain Event

1. **Fetch** latest block for selected batch from Supabase
2. **Send** event payload + previous hash → `POST /blocks`
3. **FastAPI** creates next linked block with new hash
4. **Frontend** persists returned block in Supabase
5. **UI** re-renders the extended chain

### Validate Chain Integrity

1. **Fetch** stored block chain from Supabase
2. **Send** full block list → `POST /validate`
3. **Render** validation status → green glow (valid) or broken-chain (compromised)

### AI Assistant

1. **Frontend** sends structured request → `POST /api/ai` (internal route)
2. **Server-side** AI route (Groq) returns structured response envelope
3. **Interpreter** layer updates chat UI, optional audio playback, routed UI actions

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** or **pnpm** / **yarn**
- A **Supabase** project with `batches` and `blocks` tables
- A running **FastAPI blockchain engine** (deployed or local)
- A **Groq API key** (for the AI assistant)

### Environment Variables

Copy `.env.example` → `.env.local` and fill in:

```bash
# Supabase (client-side, safe to expose)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Backend blockchain engine
NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com/api/v1
API_URL=
API_HOSTPORT=

# Supabase (server-side, keep secret)
SUPABASE_SERVICE_ROLE_KEY=

# AI Assistant (Groq)
GROQ_API_KEY=
FINCA_AI_MODEL=llama-3.3-70b-versatile
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Checks

```bash
# ESLint
npm run lint

# TypeScript type checking
npm run typecheck

# Production build
npm run build

# Start production server
npm run start
```

All three checks (`lint`, `typecheck`, `build`) pass cleanly on the current codebase.

---

## API Adapter

Because the exact backend JSON contract lives outside this workspace, all request shaping is **centralized** in one file:

**[`lib/api.ts`](lib/api.ts)**

Current assumptions (tune these if your FastAPI service differs):

| Endpoint | Expected Payload |
|----------|-----------------|
| `POST /batches` | Batch metadata object |
| `POST /blocks` | `batch_id`, `event_type`, `data`, `previous_hash`, `index` |
| `POST /validate` | `blocks` array |

**If your FastAPI uses different field names or nesting, edit only `lib/api.ts` — do not touch the UI components.**

---

## Key Files

| Path | Role |
|------|------|
| [`app/page.tsx`](app/page.tsx) | Landing page + animated supply chain flow |
| [`app/dashboard/page.tsx`](app/dashboard/page.tsx) | Batch overview dashboard |
| [`app/batches/[batchId]/page.tsx`](app/batches/[batchId]/page.tsx) | Timeline + blockchain explorer |
| [`components/chain/chain-explorer.tsx`](components/chain/chain-explorer.tsx) | Block-level chain explorer UI |
| [`components/forms/add-event-form.tsx`](components/forms/add-event-form.tsx) | Event append form |
| [`components/forms/verify-workspace.tsx`](components/forms/verify-workspace.tsx) | Validation workspace |
| [`lib/data.ts`](lib/data.ts) | Data layer — Supabase reads/writes |
| [`lib/api.ts`](lib/api.ts) | Centralized backend API adapter |
| [`lib/trace.ts`](lib/trace.ts) | Trace / QR generation logic |
| [`lib/ai/router.ts`](lib/ai/router.ts) | AI assistant routing |
| [`lib/types.ts`](lib/types.ts) | Shared TypeScript types |

---

## Project Structure

```text
Finca/
├── app/                          # Next.js 14 App Router
│   ├── add-event/page.tsx        # Append supply-chain event
│   ├── advanced/page.tsx         # Advanced operations
│   ├── api/                      # Internal API routes
│   │   ├── ai/route.ts           # AI assistant (server-side)
│   │   └── v1/                   # Backend-adjacent routes
│   ├── assistant/page.tsx        # AI workspace
│   ├── batch/[id]/page.tsx       # Batch detail
│   ├── batches/[batchId]/page.tsx# Timeline + explorer
│   ├── create-batch/page.tsx     # Genesis block creation
│   ├── dashboard/page.tsx        # Batch overview
│   ├── trace/[batchId]/page.tsx  # Trace + QR view
│   ├── verify/page.tsx           # Validation workspace
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                   # Reusable UI
│   ├── chain/                    # Block card, explorer, timeline, badge
│   ├── dashboard/                # Batch grid
│   ├── farmer/                   # Farmer workspace
│   ├── forms/                    # Add event, create batch, verify
│   ├── layout/                   # Navbar
│   ├── providers/                # Language provider (i18n)
│   ├── sections/                 # Flow visualizer
│   ├── state/                    # Config ribbon, empty state
│   ├── trace/                    # QR cards, farmer identity
│   ├── AIChat.tsx                # AI chat UI
│   └── ChatMessage.tsx           # Chat message component
│
├── lib/                          # Logic layer
│   ├── ai/                       # AI history + routing
│   ├── actionHandler.ts          # UI action dispatch
│   ├── api.ts                    # ⭐ Backend API adapter
│   ├── data.ts                   # ⭐ Supabase persistence
│   ├── env.ts                    # Environment validation
│   ├── i18n.ts                   # Client-side i18n
│   ├── persistence.ts            # Client persistence
│   ├── supabase.ts               # Supabase client
│   ├── trace.ts                  # Trace logic
│   ├── types.ts                  # Shared types
│   └── utils.ts                  # Utilities
│
├── supabase/migrations/          # Database migrations (SQL)
├── .env.example                  # Environment template
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Security Note

`npm audit --omit dev` reports a **high-severity advisory** on the `next@14` line itself. This project stays on Next.js 14 because that version was a hard requirement for the hackathon brief.

**Recommended remediation post-hackathon:** Upgrade to a newer major Next.js release that contains the upstream fixes.

---

## Contributing

Contributions are welcome. This repository only accepts changes that:

- Touch **only the README** (for PRs like this one), OR
- Follow the core design principle — frontend never computes hashes or simulates blockchain logic

### Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure `npm run lint`, `npm run typecheck`, and `npm run build` all pass
5. Commit (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## License

Distributed under the terms of the hackathon project. See the original repository for any license file if present.

---

## Acknowledgments

- Built as a hackathon project — blockchain transparency for agriculture
- AI powered by **Groq** (`llama-3.3-70b-versatile`)
- Backed by **FastAPI** blockchain engine + **Supabase** persistence
- Animations via **Framer Motion** + **GSAP**
