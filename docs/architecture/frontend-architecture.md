# Frontend Architecture — Cortex Public Website

**Platform:** Cortex Public Web Experience (`b10itsolution`)  
**Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS  
**Rendering Strategy:** React Server Components (RSC) + Incremental Static Regeneration (ISR 60s)  
**Status:** Canonical Reference

---

## 1. Core Architectural Principles

```
                              BROWSER CLIENT
                                     │
                                     ▼
                     Next.js 15 App Router Engine
         ┌────────────────────────────────────────────────────────┐
         │              REACT SERVER COMPONENTS (RSC)             │
         │  • Homepage (`src/app/page.tsx`)                       │
         │  • Dynamic Services (`src/app/services/[slug]/`)       │
         │  • Dynamic Portfolio (`src/app/portfolio/[slug]/`)     │
         │  • Dynamic Resources (`src/app/resources/[slug]/`)     │
         │  • Company / About (`src/app/about/`)                  │
         └───────────────────────────┬────────────────────────────┘
                                     │ Parallel Data Fetching
                                     ▼
         ┌────────────────────────────────────────────────────────┐
         │                   CMS SERVICE LAYER                    │
         │  `src/services/cms/*.service.ts`                       │
         │  • Unwraps Django envelopes                            │
         │  • Applies default fallback states                     │
         │  • Type-casts backend entities to UI interfaces        │
         └───────────────────────────┬────────────────────────────┘
                                     │ Native fetch + ISR
                                     ▼
         ┌────────────────────────────────────────────────────────┐
         │             BACKEND REST API (`/api/v1/public/`)       │
         └────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure & Feature Architecture

```
src/
├── api/                    # Server-side HTTP clients (cms.ts with ISR revalidation)
├── app/                    # Next.js App Router pages and dynamic routes
│   ├── about/              # About & Leadership page
│   ├── contact/            # Interactive contact & consultation page
│   ├── portfolio/          # Case studies hub & dynamic [slug] detail pages
│   ├── services/           # Services catalog & dynamic [slug] detail pages
│   ├── resources/          # Knowledge base & dynamic [slug] detail pages
│   ├── layout.tsx          # Root layout (Header, Nav, Footer, Providers)
│   └── page.tsx            # Homepage (Parallel async CMS data fetching)
├── cms/                    # Type definitions and mock data fallbacks
├── components/             # Reusable UI primitives, templates, and layouts
├── config/                 # Environment variables and site metadata
├── features/               # Feature-sliced modules (homepage, contact, etc.)
│   └── homepage/           # 10 modular section components
├── services/cms/           # Domain-specific CMS query abstraction services
└── tokens/                 # Design tokens (colors, typography, spacing)
```

---

## 3. Rendering & Performance Optimization

1. **Parallel Async Data Fetching**:
   - In `src/app/page.tsx`, all 10 CMS queries execute concurrently using `Promise.all([ ... ])` to minimize Time to First Byte (TTFB).
2. **Incremental Static Regeneration (ISR)**:
   - Server-side fetch calls specify `{ next: { revalidate: 60 } }`, allowing pages to be served instantly from edge cache while updating within 60 seconds of CMS content edits.
3. **Resilient Fallback Safety**:
   - Every service in `src/services/cms/` embeds high-quality fallback content. If the backend database is empty or unreachable, the website displays gracefully without crashing or throwing 500 errors.
4. **Interactive Boundaries**:
   - `use client` directives are isolated to interactive components (e.g., forms, mobile drawers, chatbot widget, motion overlays) to keep JavaScript bundle payloads minimal.
