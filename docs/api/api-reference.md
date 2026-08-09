# API Reference — Cortex Platform REST API

**Base URL:** `/api/v1/`  
**Authentication:** CookieJWT (`access_token` / `refresh_token` in HttpOnly cookies or Bearer Authorization header)  
**Status:** Canonical Reference

---

## 1. Authentication Endpoints (`/api/v1/auth/`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/login/` | Authenticate with username/email & password. Sets secure JWT cookies. | `AllowAny` |
| `POST` | `/api/v1/auth/token/refresh/` | Refresh expired access token using refresh token cookie. | `AllowAny` |
| `POST` | `/api/v1/auth/logout/` | Invalidate tokens and add refresh token to blacklist. | `IsAuthenticated` |
| `GET` | `/api/v1/auth/user/` | Retrieve current authenticated user profile & permissions. | `IsAuthenticated` |
| `POST` | `/api/v1/auth/password/change/` | Update authenticated user password. | `IsAuthenticated` |

---

## 2. Public Content & CMS Endpoints (`/api/v1/public/`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/public/content/homepage/` | Fetch homepage hero, stats, process steps, and CTA config. | `AllowAny` |
| `GET` | `/api/v1/public/content/services/` | List published services with capabilities and features. | `AllowAny` |
| `GET` | `/api/v1/public/content/services/{slug}/` | Retrieve full detail for a single service by slug. | `AllowAny` |
| `GET` | `/api/v1/public/content/industries/` | List vertical market solution cards. | `AllowAny` |
| `GET` | `/api/v1/public/content/industries/{slug}/` | Retrieve single industry solution and related portfolio items. | `AllowAny` |
| `GET` | `/api/v1/public/content/portfolio/` | List case studies and project success stories. | `AllowAny` |
| `GET` | `/api/v1/public/content/portfolio/{slug}/` | Retrieve single case study with metrics and tech stack. | `AllowAny` |
| `GET` | `/api/v1/public/content/testimonials/` | List verified client testimonials and ratings. | `AllowAny` |
| `GET` | `/api/v1/public/content/resources/` | List knowledge articles, technical whitepapers, and guides. | `AllowAny` |
| `GET` | `/api/v1/public/content/resources/{slug}/` | Retrieve full markdown content for a single article. | `AllowAny` |
| `GET` | `/api/v1/public/content/company/` | Retrieve corporate profile, office locations, and leadership. | `AllowAny` |
| `GET` | `/api/v1/public/content/navigation/` | Retrieve structured navigation menu hierarchy. | `AllowAny` |
| `GET` | `/api/v1/public/content/faqs/` | List categorized FAQ questions and answers. | `AllowAny` |

---

## 3. Inbound Leads & Consultation Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/public/leads/` | Ingest public contact / consultation form submission. | `AllowAny` (Rate-Limited) |

**Sample Lead Ingestion Payload:**
```json
{
  "name": "Sarah Jenkins",
  "email": "s.jenkins@enterprise-corp.com",
  "company": "Enterprise Corp",
  "phone": "+1-555-0199",
  "service_interest": "cloud-infrastructure",
  "message": "Looking to architect a multi-region Kubernetes platform.",
  "honeypot": ""
}
```

---

## 4. AI Consultant & Knowledge Base Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/chatbot/message/` | Send message to AI Consultant; returns RAG-grounded response. | `AllowAny` (Throttled) |
| `GET` | `/api/v1/kb/entries/` | Semantic and keyword search across indexed knowledge entries. | `AllowAny` |

---

## 5. Administrative & CRM Endpoints (`/api/v1/admin/`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/admin/leads/kanban/` | Retrieve leads grouped by pipeline stage for Kanban display. | `HasPermission('view_leads')` |
| `PATCH` | `/api/v1/admin/leads/{id}/stage/` | Update lead pipeline stage and trigger stage webhooks. | `HasPermission('manage_leads')` |
| `GET` | `/api/v1/admin/crm/companies/` | List corporate accounts and relationship histories. | `HasPermission('view_crm')` |
| `GET` | `/api/v1/admin/crm/deals/` | List active deals, revenue forecasts, and pipeline values. | `HasPermission('manage_crm')` |
| `GET` | `/api/v1/admin/users/` | List system users and assigned roles. | `IsAdminUser` |
| `GET` | `/api/v1/admin/roles/` | List platform RBAC roles and granular permission sets. | `IsSuperUser` |
