# Cortex Platform — Baseline v1.0 (Ground Truth)

**Platform:** Cortex Enterprise Platform  
**Organization:** Cortex IT Solution  
**Release Baseline:** v1.0.0 (Stabilization Baseline)  
**Status:** Canonical Ground Truth

---

## 1. Verified Architecture & Infrastructure Baseline

| Dimension | Verified Current State | Notes & Future Target |
|---|---|---|
| **Platform Identity** | **Cortex IT Solution** | Replaces legacy "B10" branding across all user-facing systems. |
| **Backend Framework** | **Django 5.0 / DRF** | Modular monolith with 22 Django apps, CQRS commands, and service layers. |
| **Active Database** | **SQLite 3 (`db.sqlite3`)** | Active local and stabilization database with WAL mode enabled. |
| **Target Database** | **Supabase PostgreSQL 15+** | Planned production migration target; models use standard ANSI ORM types. |
| **Public Frontend** | **Next.js 15 (App Router)** | TypeScript, React Server Components (RSC), Tailwind CSS, ISR (60s). |
| **Admin Frontend** | **Next.js 15 Admin OS** | Standalone SPA with Zustand state management, Drawers, and CookieJWT auth. |
| **Cache & Broker** | **Redis 5.0 / LocMem** | Redis in production container; LocMemCache configured for zero-dependency dev. |
| **Task Queue** | **Celery 5.3 + Celery Beat** | Asynchronous lead enrichment, emails, and background jobs. |
| **Media Storage** | **Cloudinary CDN** | Cloudinary integration for digital assets and public media transformations. |
| **AI LLM Gateway** | **OpenRouter API** | Server-side RAG inference with token tracking and rate throttling. |

---

## 2. Verified Subsystems & Capabilities

### 2.1 Content Management System (CMS)
- **Entities**: Services, Service Features, Industries, Portfolio / Case Studies, Testimonials, Knowledge Resources, Navigation Menus, FAQs, Company Profile.
- **Content Delivery**: Server Components fetch from `/api/v1/public/content/*` with parallel `Promise.all` queries and 60-second ISR caching.
- **Resilience**: Embedded fallback data guarantees 100% availability even on cold starts or empty databases.

### 2.2 Inbound Leads & CRM Pipeline
- **Ingestion**: Public contact and consultation forms submit to `/api/v1/public/leads/` with honeypot security and rate limiting (5 req / 15 min).
- **Execution**: Handled by CQRS command `lead_commands.py`.
- **Kanban Board**: Drag-and-drop pipeline stages (`NEW`, `QUALIFIED`, `PROPOSAL_SENT`, `NEGOTIATION`, `WON`, `LOST`).

### 2.3 Conversational AI Consultant
- **Pipeline**: Intent Detection (`intent_detector.py`) -> Query Planning (`query_planner.py`) -> Knowledge Retrieval (`knowledge_provider.py`) -> Prompt Assembly (`prompt_builder.py`) -> OpenRouter inference.
- **Session Management**: Message histories persisted in `ConversationSession` with throttling (20 msg / min).

### 2.4 Security & Identity
- **Authentication**: `CookieJWTAuthentication` using HttpOnly `access_token` (15m) and `refresh_token` (7d) cookies.
- **Token Revocation**: Outstanding and blacklisted token models manage immediate invalidation upon logout.
- **RBAC**: Dynamic role-permission mapping engine enforced across all mutation endpoints.

### 2.5 Automated Testing Suite
- **Pytest Suite**: Complete unit and integration tests across accounts, leads, CMS, and chatbot subsystems.
- **Route Navigation**: `test_navigation_routes.py` verifies all dynamic public frontend routes.
