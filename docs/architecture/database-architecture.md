# Database Architecture — Cortex Platform

**Platform:** Cortex Enterprise Platform  
**Active Database Engine:** SQLite 3 (Current Local & Stabilization Baseline)  
**Production Target:** Supabase PostgreSQL 15+ (Planned Future Migration Target)  
**Total ORM Models:** 79 Relational Models across 22 Apps  
**Status:** Canonical Reference

---

## 1. Database Engine Strategy & Environments

> [!IMPORTANT]
> **Active Environment Baseline:** The current active environment runs on **SQLite** for zero-dependency local development, unit testing, and stabilization verification.  
> **Production Roadmap:** **Supabase PostgreSQL** is the designated production target. The codebase uses standard Django ORM constructs and standard SQL types to ensure 100% migration fidelity without vendor lock-in.

| Environment | Engine | Configuration | Connection / Protocol |
|---|---|---|---|
| **Development / Stabilization** | SQLite 3 | `db.sqlite3` with WAL Mode | Local filesystem ORM connection |
| **Testing (pytest)** | SQLite (In-Memory) | `:memory:` for high-speed test suites | Pytest django DB runner |
| **Production Target** | PostgreSQL 15 | Managed Supabase with Connection Pooler | `postgresql://user:pass@host:5432/db` |

---

## 2. Core Model Base Classes & Standards

All 79 platform models inherit from standardized abstract base classes:

1. **UUID Primary Keys (`UUIDModel`)**:
   - `id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)`
   - Eliminates auto-increment enumeration vulnerabilities across public APIs.
2. **Audit Timestamps (`TimeStampedModel`)**:
   - `created_at = models.DateTimeField(auto_now_add=True, db_index=True)`
   - `updated_at = models.DateTimeField(auto_now=True)`
3. **Soft Deletion (`SoftDeletableModel`)**:
   - `is_deleted = models.BooleanField(default=False, db_index=True)`
   - `deleted_at = models.DateTimeField(null=True, blank=True)`

---

## 3. Entity-Relationship (ER) Architecture

```
                    ┌─────────────────────────┐
                    │      accounts.User      │
                    │  (UUID PK, Custom User) │
                    └───────────┬─────────────┘
                                │ 1:N
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ role.RoleMap  │       │  leads.Lead   │       │ activity.Log  │
└───────────────┘       └───────┬───────┘       └───────────────┘
                                │ 1:1
                                ▼
                        ┌───────────────┐
                        │  crm.Contact  │
                        └───────┬───────┘
                                │ N:1
                        ┌───────▼───────┐
                        │  crm.Company  │
                        └───────┬───────┘
                                │ 1:N
                        ┌───────▼───────┐
                        │   crm.Deal    │
                        └───────────────┘

                 CMS CONTENT HIERARCHY
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│content.Service │      │content.Industry│      │content.Resource│
└───────┬────────┘      └───────┬────────┘      └───────┬────────┘
        │ 1:N                   │ M:N                   │ N:1
┌───────▼────────┐      ┌───────▼────────┐      ┌───────▼────────┐
│ ServiceFeature │      │ PortfolioItem  │      │Category / Tag  │
└────────────────┘      └────────────────┘      └────────────────┘

                  AI & CHATBOT SUBSYSTEM
┌─────────────────────────────────┐
│   chatbot.ConversationSession   │
└────────────────┬────────────────┘
                 │ 1:N
┌────────────────▼────────────────┐
│      chatbot.ChatMessage        │
│  (role, content, token_usage)   │
└─────────────────────────────────┘
```

---

## 4. Indexing & Optimization Guidelines

1. **Slugs and Routing**: Unique slug fields (`slug = models.SlugField(unique=True, db_index=True)`) are indexed on all public CMS entities (`Service`, `Industry`, `PortfolioItem`, `Resource`).
2. **Foreign Key Indices**: All foreign keys enforce explicit `db_index=True` or composite indices to accelerate join resolution.
3. **Composite Indices**: Multi-column indices applied on `(status, created_at)` and `(is_deleted, created_at)` for high-throughput listing queries.
4. **ORM Query Hygiene**: Service and selector layers enforce `select_related` on single relations and `prefetch_related` on M2M/reverse relations to strictly avoid N+1 query patterns.
