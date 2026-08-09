# System Architecture — Cortex Platform

**Platform:** Cortex Enterprise Ecosystem  
**Company:** Cortex IT Solution  
**Status:** Canonical Reference  
**Version:** 1.0 (Stabilization Baseline)

---

## 1. Executive Summary & Ecosystem Topology

The Cortex Platform is an enterprise-grade digital operating platform comprising three specialized, decoupled software systems designed for high availability, zero-trust security, and sub-50ms user responsiveness.

```
                                  CLIENT / USER LAYER
       ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
       │   Cortex Public Website Hub          │     │        Cortex Admin OS               │
       │   (b10itsolution)                    │     │        (b10-admin-os / adminfrontend)│
       │   Next.js 15 App Router (SSR/ISR)    │     │        Next.js 15 App Router (SPA)   │
       │   Frozen Design System, Public CMS   │     │        Zustand, Drawers, RBAC Shell  │
       └──────────────────┬───────────────────┘     └──────────────────┬───────────────────┘
                          │                                            │
                          │ Public JSON REST                           │ Authenticated REST (CookieJWT)
                          ▼                                            ▼
       ┌───────────────────────────────────────────────────────────────────────────────────┐
       │                             SECURITY & GATEWAY LAYER                              │
       │   SecurityMiddleware ──> WhiteNoise ──> RequestID ──> StructuredLogging           │
       │   ──> Strict CorsMiddleware ──> Session/CSRF ──> CookieJWTAuthentication          │
       │   ──> Performance (Server-Timing) ──> IdempotencyMiddleware                      │
       └──────────────────────────────────────────┬────────────────────────────────────────┘
                                                  │
                                                  ▼
       ┌───────────────────────────────────────────────────────────────────────────────────┐
       │                             API ROUTING & DRF VIEWS                               │
       │   33 Mounted Namespaces (Public / Admin / Auth / CRM / CMS / Chatbot / Health)   │
       │   Throttling: Anon (10/min), User (100/min), Chat (20/min), Leads (5/15min)       │
       └──────────────────────────────────────────┬────────────────────────────────────────┘
                                                  │
                                                  ▼
       ┌───────────────────────────────────────────────────────────────────────────────────┐
       │                             ENTERPRISE CORE MONOLITH                              │
       │   (b10backend/backend) — Django 5.0 REST Framework                                │
       │   ├── Service Layer (apps/*/services/) & CQRS Commands                            │
       │   ├── Selector Layer (apps/*/selectors/)                                          │
       │   └── 79 Relational ORM Models across 22 Django Apps                              │
       └──────────────────────┬──────────────────────┬─────────────────────┬───────────────┘
                              │                      │                     │
                              ▼                      ▼                     ▼
       ┌──────────────────────────────┐ ┌──────────────────────────┐ ┌─────────────────────┐
       │    DATABASE & PERSISTENCE    │ │    CACHE & ASYNC QUEUE   │ │     OBJECT & AI     │
       │  Primary: SQLite (Active Dev)│ │  Redis 5.0 (LocMem Dev)  │ │  Cloudinary (Media) │
       │  Target: Supabase PostgreSQL │ │  Celery Worker & Beat    │ │  OpenRouter (LLM)   │
       └──────────────────────────────┘ └──────────────────────────┘ └─────────────────────┘
```

---

## 2. Codebase Ownership & Responsibility Distribution

The platform strictly delineates ownership across codebases to eliminate ambiguity and prevent architectural drift:

| Responsibility Domain | Primary Codebase Owner | Supporting Repositories | Governance Policy |
|---|---|---|---|
| **User Identity & Password Hashing** | `b10backend` | `b10-admin-os` | User model, Argon2/PBKDF2 password validators, and UUID PK are strictly owned by Django. |
| **JWT Generation & Token Blacklist** | `b10backend` | `b10-admin-os` | SimpleJWT, token signing, and blacklist database tables managed exclusively by Django. |
| **Cookie Setting & Headers** | `b10backend` | `b10-admin-os` | `Set-Cookie` directives, `HttpOnly`, `SameSite=Lax`, and `Secure` attributes set by Django responses. |
| **Edge Route Redirection** | `b10-admin-os` | None | Next.js middleware inspects session cookies for instant server-side routing without client flash. |
| **401 Refresh Queue & Retries** | `b10-admin-os` | None | Client Axios interceptor manages concurrency and sliding session renewal. |
| **Role & Permission Models** | `b10backend` | `b10-admin-os` | Django `Group` and `Permission` are authoritative. Admin mirrors codenames in permission constants. |
| **Public Lead & Form Submissions** | `b10itsolution` | `b10backend` | Next.js public forms submit to Django `/api/v1/public/leads/` with honeypots and rate limits. |
| **AI Conversational Streaming** | `b10backend` & `b10itsolution` | None | Django generates RAG responses via OpenRouter; Next.js frontend renders streaming UI. |
| **Content Delivery & ISR** | `b10itsolution` | `b10backend` | Next.js Server Components query `/api/v1/public/content/*` with 60s ISR revalidation. |

---

## 3. End-to-End Architectural Trace

Every interaction follows a deterministic 11-step execution pipeline:
1. **User Action / UI Route**: User interacts with a Next.js Server or Client Component.
2. **Frontend Service**: Typed API client (`src/api/cms.ts`, `services/cms/*`) sends HTTP request.
3. **Gateway Middleware**: Django intercepts request for security headers, CORS origin validation, request correlation ID (`X-Request-ID`), and JSON access telemetry.
4. **Authentication & Authorization**: `CookieJWTAuthentication` inspects headers/cookies and checks blacklist; DRF permissions resolve access rights.
5. **API Routing**: URL routed through `core/urls.py` into a targeted `ModelViewSet`, `GenericViewSet`, or `APIView`.
6. **Serializer Validation**: Request payload validated against strict DRF serializer schemas.
7. **Service / Command Execution**: Business logic executed in domain service (`apps/<domain>/services/`) or CQRS command (`apps/<domain>/commands/`).
8. **Selector / QuerySet**: Optimized ORM query with `select_related`/`prefetch_related` executed against the database.
9. **Persistence**: Transaction committed to database (SQLite in stabilization, PostgreSQL in production).
10. **Async Side Effects**: Background jobs (emails, webhooks, vector embedding updates) queued into Celery.
11. **Standard Response**: Payload returned wrapped in standardized envelope (`StandardResponse`).
