# Platform Audit Report & Architectural Decisions — Cortex Platform

**Scope:** Whole-Platform Architectural & Dependency Audit  
**Status:** Canonical Reference

---

## 1. Architectural Conflict Resolutions

| Domain / Issue | Conflicting Statements / Artifacts | Verified Ground Truth | Decision & Resolution |
|---|---|---|---|
| **Database Engine** | Earlier docs claimed PostgreSQL/Supabase active in dev; others listed SQLite. | Current active codebase uses SQLite 3 with WAL mode for local dev & stabilization testing. | **Documented SQLite as active baseline**; Supabase PostgreSQL documented as planned production target. |
| **Platform Branding** | Legacy docs used "B10 IT Solution" / "B10 Platform". | Organization officially renamed to **Cortex IT Solution**. | **Rebranded canonical documentation to Cortex IT Solution** while preserving underlying code symbol names. |
| **Admin Frontend Codebases** | Multiple admin folders existed (`b10backend/adminfrontend` vs `b10-admin-os`). | `b10-admin-os` is the modern Next.js 15 App Router Admin OS with Zustand & Drawers. | Consolidated all admin architecture references to the Next.js 15 Admin OS standard. |
| **CMS Data Source State** | Some notes stated mock providers used everywhere; others stated 100% DB. | 9 of 10 homepage sections & all detail pages query Django CMS REST endpoints. Products section remains on mock provider. | Documented exact DB connection matrix; verified resilient fallback architecture. |

---

## 2. Technical Debt & Stabilization Summary

1. **Root Directory Clutter**: Over 32 duplicate Markdown files were scattered in the repository root alongside development copies in `docs/`. Resolved via canonical consolidation.
2. **Settings Equivalence**: Verified that development (`settings.py`) and production (`settings_production.py`) maintain parity in installed apps, middleware ordering, and authentication backends.
3. **Security Standards Compliance**: All public mutations enforce honeypot traps and rate throttling. Token blacklisting and HttpOnly cookie authentication are 100% enforced.
