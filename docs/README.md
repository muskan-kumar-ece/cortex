# Cortex Platform Documentation Hub

Welcome to the canonical documentation for the **Cortex Enterprise Platform** developed by **Cortex IT Solution**.

---

## 📚 Canonical Documentation Index

### 🏗️ 1. Architecture & Design
* [System Architecture](file:///c:/workflow/b10itsolution/docs/architecture/system-architecture.md) — High-level topology, ecosystem boundaries, and inter-codebase ownership.
* [Application Architecture](file:///c:/workflow/b10itsolution/docs/architecture/application-architecture.md) — Django modular monolith, 22 subsystems, service & selector layers.
* [Database Architecture](file:///c:/workflow/b10itsolution/docs/architecture/database-architecture.md) — 79 relational models, ER diagrams, SQLite stabilization & Supabase target.
* [API Architecture](file:///c:/workflow/b10itsolution/docs/architecture/api-architecture.md) — Gateway routing, throttling tiers, response envelopes, and telemetry.
* [Frontend Architecture](file:///c:/workflow/b10itsolution/docs/architecture/frontend-architecture.md) — Next.js 15 App Router, React Server Components (RSC), and ISR caching.
* [Chatbot Architecture](file:///c:/workflow/b10itsolution/docs/architecture/chatbot-architecture.md) — RAG pipeline, intent detection, prompt builder, and OpenRouter integration.

---

### 🎯 2. Product & Features
* [Product Requirements (PRD)](file:///c:/workflow/b10itsolution/docs/product/product-requirements.md) — Product vision, user personas, core functional modules, and NFRs.
* [Feature Matrix](file:///c:/workflow/b10itsolution/docs/product/feature-matrix.md) — Comprehensive status matrix across Public Website, Admin OS, CMS, CRM, and AI.

---

### 🔌 3. API & Contracts
* [API Reference](file:///c:/workflow/b10itsolution/docs/api/api-reference.md) — Complete endpoint catalog, query parameters, auth requirements, and payloads.
* [API Contracts & Security](file:///c:/workflow/b10itsolution/docs/api/api-contracts.md) — Error code specifications, CookieJWT contract, and RBAC matrix.

---

### 📰 4. CMS & CRM Subsystems
* [CMS Architecture](file:///c:/workflow/b10itsolution/docs/cms/cms-architecture.md) — Headless content models, ISR delivery pipeline, and fallback guarantees.
* [Lead Pipeline & CRM](file:///c:/workflow/b10itsolution/docs/crm/lead-pipeline.md) — Inbound lead ingestion, CQRS commands, Kanban stages, and anti-abuse traps.

---

### 🚀 5. Deployment & Security
* [Deployment Guide](file:///c:/workflow/b10itsolution/docs/deployment/deployment-guide.md) — Production topology, container specs, Gunicorn/Uvicorn ASGI, and Nginx.
* [Environment Setup](file:///c:/workflow/b10itsolution/docs/deployment/environment-setup.md) — Local development guide and environment variables dictionary.
* [Security Architecture](file:///c:/workflow/b10itsolution/docs/security/security-architecture.md) — Zero-Trust CookieJWT standard, token blacklisting, CSRF, and RBAC registry.

---

### 🛠️ 6. Operations & Testing
* [Operations Guide](file:///c:/workflow/b10itsolution/docs/operations/operations-guide.md) — Health telemetry (`/health/`), structured JSON logging, and maintenance routines.
* [Recovery Guide](file:///c:/workflow/b10itsolution/docs/operations/recovery-guide.md) — Disaster recovery, database backups, cache failover, and secret rotation.
* [Testing Guide](file:///c:/workflow/b10itsolution/docs/testing/testing-guide.md) — Pytest test runner, navigation test script, and API regression checklist.

---

### 📊 7. Baseline & Audits
* [Baseline v1.0 (Ground Truth)](file:///c:/workflow/b10itsolution/docs/baseline/baseline-v1.0.md) — Authoritative baseline of verified current-state technical capabilities.
* [Audit Report](file:///c:/workflow/b10itsolution/docs/baseline/audit-report.md) — Conflict resolutions, technical debt audit, and settings equivalence.
* [Documentation Cleanup Report](file:///c:/workflow/b10itsolution/docs/baseline/documentation-cleanup-report.md) — Audit of cleaned, consolidated, and removed documentation.
