# Deployment Guide — Cortex Platform

**Target Infrastructure:** Docker Containerized / Cloud Virtual Private Cloud (VPC)  
**Status:** Canonical Reference

---

## 1. Production Deployment Topology

```
                                INTERNET / CLIENTS
                                        │
                                        ▼ (HTTPS 443)
                         ┌─────────────────────────────┐
                         │   Cloudflare / Nginx Proxy  │
                         │   SSL Termination & WAF     │
                         └──────────────┬──────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 │                                             │
                 ▼                                             ▼
  ┌─────────────────────────────┐               ┌─────────────────────────────┐
  │   Next.js Public Frontend   │               │     Next.js Admin OS        │
  │   (Node.js 20 / Edge SSR)   │               │   (Node.js 20 / Edge SPA)   │
  └──────────────┬──────────────┘               └──────────────┬──────────────┘
                 │                                             │
                 └──────────────────────┬──────────────────────┘
                                        │ Internal VPC HTTP
                                        ▼
                         ┌─────────────────────────────┐
                         │    Django REST Monolith     │
                         │    (Gunicorn + Uvicorn ASGI)│
                         └──────────────┬──────────────┘
                                        │
         ┌──────────────────────────────┼─────────────────────────────┐
         ▼                              ▼                             ▼
┌──────────────────┐           ┌──────────────────┐          ┌──────────────────┐
│   PostgreSQL     │           │   Redis Broker   │          │  Celery Workers  │
│(Supabase Managed)│           │ (Cache & Queues) │          │(Async Background)│
└──────────────────┘           └──────────────────┘          └──────────────────┘
```

---

## 2. Service Component Specifications

| Component | Technology | Runtime Configuration | Health Check |
|---|---|---|---|
| **Public Website** | Next.js 15 | Node.js 20 LTS, Standalone Output | `GET /` |
| **Admin OS** | Next.js 15 | Node.js 20 LTS, Standalone Output | `GET /admin` |
| **Backend Monolith** | Django 5.0 / DRF | Python 3.12, Gunicorn (4 workers) | `GET /health/` |
| **Async Task Worker** | Celery 5.3 | Concurrency 4, Prefetch 1 | Celery Ping / Status |
| **Primary Database** | PostgreSQL 15 | Managed Supabase with Connection Pooler | `SELECT 1;` |
| **Cache & Queue** | Redis 5.0+ | `maxmemory-policy allkeys-lru` | `PING` |

---

## 3. Production Deployment Checklist

1. **Database Migrations**: Run `python manage.py migrate --noinput` prior to traffic switch.
2. **Static Asset Collection**: Run `python manage.py collectstatic --noinput`.
3. **Environment Secrets**: Verify all environment variables (`SECRET_KEY`, `DATABASE_URL`, `OPENROUTER_API_KEY`, `CLOUDINARY_URL`) are populated from vault secrets.
4. **Health Verification**: Query `GET /health/` to confirm database connectivity, cache status, and queue health.
