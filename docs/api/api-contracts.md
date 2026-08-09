# API Contracts & Security Schemas — Cortex Platform

**Standard:** OpenAPI 3.1 & JSON Schema  
**Status:** Canonical Reference

---

## 1. Standard Error Code Specifications

Every non-2xx HTTP response from the Cortex API returns the standard error envelope. The following canonical error codes are strictly enforced:

| Error Code | HTTP Status | Description | Actionable Guidance |
|---|---|---|---|
| `AUTHENTICATION_FAILED` | `401 Unauthorized` | Access token missing, expired, or invalid. | Trigger token refresh via `/api/v1/auth/token/refresh/`. |
| `TOKEN_BLACKLISTED` | `401 Unauthorized` | Token has been revoked or logged out. | Force user redirect to login page. |
| `PERMISSION_DENIED` | `403 Forbidden` | User lacks the required RBAC permission. | Contact system administrator for role elevation. |
| `RESOURCE_NOT_FOUND` | `404 Not Found` | Target entity does not exist or was deleted. | Verify slug / UUID parameter. |
| `VALIDATION_ERROR` | `400 Bad Request` | Request payload failed schema validation. | Check `error.details` for field-specific errors. |
| `RATE_LIMIT_EXCEEDED` | `429 Too Many Requests` | Client exceeded API rate limit threshold. | Honor the `Retry-After` header value. |
| `INTERNAL_ERROR` | `500 Server Error` | Unhandled server exception occurred. | Check backend logs using the provided `request_id`. |

---

## 2. Authentication & Cookie Contract

Authentication employs dual HttpOnly cookies with sliding refresh:

```
+------------------+-------------------+----------------+-------------------------------------+
| Cookie Name      | Expiration Window | Security Flags | Target Endpoint Scope               |
+------------------+-------------------+----------------+-------------------------------------+
| `access_token`   | 15 Minutes        | HttpOnly; Secure; SameSite=Lax; Path=/ | All authenticated API routes        |
| `refresh_token`  | 7 Days (Sliding)  | HttpOnly; Secure; SameSite=Lax; Path=/api/v1/auth/token/refresh/ | Dedicated token refresh endpoint    |
+------------------+-------------------+----------------+-------------------------------------+
```

---

## 3. Authorization & RBAC Permission Matrix

| RBAC Role | Content CMS | Leads & CRM | Chatbot Logs | User Management | System Settings |
|---|:---:|:---:|:---:|:---:|:---:|
| **Super Admin** | Full (CRUD) | Full (CRUD) | Full (CRUD) | Full (CRUD) | Full (CRUD) |
| **Operations Admin** | Read / Edit | Full (CRUD) | Read | Read Only | None |
| **Content Editor** | Full (CRUD) | None | None | None | None |
| **Sales Representative** | Read Only | Full (CRUD) | Read | None | None |
| **Public Visitor** | Read (Published) | Ingest Only | Create Session | None | None |
