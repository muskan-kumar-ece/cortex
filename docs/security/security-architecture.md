# Security & Identity Architecture — Cortex Platform

**Security Framework:** Zero-Trust Identity & CookieJWT Standard  
**Compliance Target:** SOC2 Ready / OWASP Top 10 Compliant  
**Status:** Canonical Reference

---

## 1. Zero-Trust Identity & Token Lifecycle

The Cortex Platform implements a modern CookieJWT architecture designed to neutralize token theft via XSS while supporting seamless sliding session renewal:

```
                            AUTHENTICATION FLOW
      Browser / Admin Client                           Django Backend
                │                                             │
                │ 1. POST /api/v1/auth/login/ (Credentials)   │
                ├────────────────────────────────────────────>│
                │                                             │ Validate User & Hash
                │ 2. Set-Cookie: access_token (15m HttpOnly)  │ Generate JWT Pair
                │    Set-Cookie: refresh_token (7d HttpOnly)  │ Record OutstandingToken
                │<────────────────────────────────────────────┤
                │                                             │
                │ 3. Authenticated Request (Cookies attached) │
                ├────────────────────────────────────────────>│
                │                                             │ CookieJWTAuthentication
                │                                             │ (Verifies Sig & Blacklist)
                │ 4. 200 OK Response Payload                  │
                │<────────────────────────────────────────────┤
                │                                             │
          (After 15m)                                         │
                │ 5. POST /api/v1/auth/token/refresh/         │
                ├────────────────────────────────────────────>│ Validate refresh_token
                │                                             │ Issue new access_token
                │ 6. Set-Cookie: new access_token (15m)       │
                │<────────────────────────────────────────────┤
                │                                             │
             (Logout)                                         │
                │ 7. POST /api/v1/auth/logout/                │
                ├────────────────────────────────────────────>│ Add token to Blacklist
                │ 8. Clear Cookies (`Max-Age=0`)              │ Invalidate Session
                │<────────────────────────────────────────────┤
```

---

## 2. Security Defense Layers & Mitigation Matrix

| Vulnerability Vector | Platform Defense Mechanism | Implementation Details |
|---|---|---|
| **XSS Token Theft** | HttpOnly Cookies | `access_token` and `refresh_token` are inaccessible to client JavaScript. |
| **CSRF Attacks** | Strict Origin & SameSite | `SameSite=Lax` cookie policy combined with Django CORS and CSRF token validation. |
| **Brute Force Attacks** | DRF IP & User Throttles | Strict rate limiting (10 req/min for anon, 100 req/min for users, 5 req/15min for forms). |
| **SQL Injection** | Parameterized Django ORM | 100% of database queries execute through Django ORM parameterized queries; raw SQL is strictly prohibited. |
| **Bot Scraping & Spam**| Honeypot Validation | Invisible honeypot traps on all public lead ingestion endpoints. |
| **Enumeration Attacks**| UUIDv4 Primary Keys | Public entities expose non-sequential UUIDs or unique alphanumeric slugs. |
| **Privilege Escalation**| Declarative RBAC Engine | Model-level and action-level permissions validated on every API mutation. |

---

## 3. RBAC Permission Registry

| Permission Codename | Subsystem | Purpose | Default Roles |
|---|---|---|---|
| `manage_users` | Accounts | Create, update, deactivate user accounts. | Super Admin |
| `manage_roles` | RBAC | Modify role permission matrices. | Super Admin |
| `view_leads` | CRM | Read inbound lead entries. | Super Admin, Ops Admin, Sales Rep |
| `manage_leads` | CRM | Update pipeline stages, assign lead owners. | Super Admin, Ops Admin, Sales Rep |
| `edit_content` | CMS | Create and publish Services, Case Studies, Blogs. | Super Admin, Content Editor |
| `upload_assets` | DAM | Upload and transform media in Cloudinary. | Super Admin, Content Editor |
| `manage_ai` | AI | Configure AI consultant personas and prompts. | Super Admin |
