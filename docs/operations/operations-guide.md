# Operations & Monitoring Guide — Cortex Platform

**Operational Tier:** Production Runbook & SRE Operations  
**Status:** Canonical Reference

---

## 1. System Health Telemetry & Probes

The Cortex backend exposes health monitoring endpoints at `/health/`:

| Endpoint | Probe Type | Description | Healthy Response |
|---|---|---|---|
| `/health/` | Deep Health Check | Checks database connection, Redis broker, and cache latency. | `{"status": "healthy", "database": "ok", "redis": "ok"}` |
| `/health/liveness/` | Liveness Probe | Verifies web server is running and accepting sockets. | `{"status": "alive"}` |
| `/health/readiness/` | Readiness Probe | Verifies database migrations and cache dependencies are ready. | `{"status": "ready"}` |

---

## 2. Structured Telemetry & Logging

All backend services emit structured JSON logs to stdout:

```json
{
  "timestamp": "2026-08-08T10:15:30.123Z",
  "level": "INFO",
  "request_id": "req-8b2c-94a1d0fe",
  "method": "POST",
  "path": "/api/v1/public/leads/",
  "status_code": 201,
  "duration_ms": 42.6,
  "user_id": null,
  "client_ip": "198.51.100.24"
}
```

---

## 3. Routine Maintenance & Cache Hygiene

1. **Token Blacklist Cleanup**: Periodically purge expired JWT blacklist records:
   ```bash
   python manage.py flushexpiredtokens
   ```
2. **Cache Eviction**: Invalidate CMS query caches upon major content migrations:
   ```bash
   python manage.py invalidate_cms_cache
   ```
