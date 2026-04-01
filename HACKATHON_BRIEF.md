# Finca Hackathon Brief

## What Finca Is

**Finca** is a blockchain-based agricultural supply chain transparency platform.

It helps users verify where a product came from, who handled it, and whether its recorded journey has remained intact from origin to shelf.

Tagline:

> **From Farm to Trust — Verified.**

## The Problem

Agricultural supply chains often suffer from three major issues:

- Farmers have limited visibility into how their products move after harvest.
- Consumers cannot easily trust claims about product origin and authenticity.
- Supply chain records can be fragmented, opaque, or manipulated.

## The Solution

Finca creates a **tamper-evident chain of custody** for every agricultural batch.

Each batch is treated as its own blockchain:

- the first record is a genesis block created at origin
- every new event is linked to the previous one
- the full journey can be validated at any time

This gives both businesses and consumers a clear, verifiable product story.

## How It Works

### 1. Create a Batch

When a new batch is created, the system sends the batch details to the blockchain engine.

The engine returns a genesis block, and the frontend stores that trusted record in Supabase.

### 2. Add a Supply Chain Event

When a shipment, processing step, storage event, or handoff happens:

- the frontend fetches the latest block for that batch
- sends the next event to the backend blockchain engine
- receives the newly generated block
- stores the returned block in Supabase

### 3. Verify the Chain

When a user wants to confirm integrity:

- the frontend reads the chain from Supabase
- sends the full block list to the backend validator
- shows whether the chain is valid or compromised

## Architecture

```text
User
  |
  v
Next.js Frontend
  |- Create batch / add event / verify
  |- Visual chain explorer
  |- Persists returned records to Supabase
  |
  +--> Next.js internal API routes
          |
          v
      FastAPI Blockchain Engine on Render
        |- Creates genesis blocks
        |- Creates new linked blocks
        |- Validates chain integrity
  |
  v
Supabase
  |- batches table
  |- blocks table
```

## Core Design Principle

The frontend does **not** compute hashes or simulate blockchain logic.

The backend is the source of truth for blockchain operations.

Supabase is used as the persistence layer for storing and reading trusted chain records.

## Tech Stack

### Frontend

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Supabase JavaScript client

### Backend

- Python FastAPI
- Hosted on Render

### Database

- Supabase PostgreSQL

## Data Model

Each batch is an independent blockchain.

Each block contains:

- `index`
- `timestamp`
- `event_type`
- `data`
- `previous_hash`
- `hash`

## User Experience

The platform is designed so the user instantly understands:

**“This product has a verified, tamper-proof journey from farm to shelf.”**

The app includes:

- a landing page explaining the trust story
- a dashboard of batches
- batch creation
- event addition
- a detailed batch explorer
- a verification screen

Each batch has two synchronized views:

- **Timeline view** for human-readable storytelling
- **Blockchain view** for technical inspection

## Demo Flow

For a live demo, the simplest flow is:

1. Create a new agricultural batch
2. Add one or two supply chain events
3. Open the batch detail page
4. Show the timeline and blockchain views together
5. Run validation to prove the chain is intact

## Why It Matters

Finca makes supply chains more trustworthy by turning origin and movement into something visible and verifiable.

It helps:

- farmers gain stronger traceability
- businesses prove authenticity
- consumers trust what they buy

## One-Line Pitch

**Finca is a trust layer for agriculture that proves a product’s journey from farm to shelf through a verifiable chain of custody.**
