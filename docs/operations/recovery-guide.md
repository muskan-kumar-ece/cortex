# Disaster Recovery & Incident Response Guide — Cortex Platform

**Operational Tier:** Tier-1 Recovery & Business Continuity  
**Status:** Canonical Reference

---

## 1. Database Backup & Restoration Protocols

### SQLite (Stabilization / Development Environment)
- **Snapshot Creation**:
  ```bash
  # Create timestamped backup of SQLite database
  sqlite3 db.sqlite3 ".backup 'backups/db_backup_$(date +%Y%m%d_%H%M%S).sqlite3'"
  ```
- **Database Restoration**:
  ```bash
  # Restore from target snapshot
  cp backups/db_backup_target.sqlite3 db.sqlite3
  python manage.py migrate
  ```

### PostgreSQL (Production Environment)
- **Automated Backup**:
  ```bash
  pg_dump -Fc --no-acl --no-owner -h $DB_HOST -U $DB_USER $DB_NAME > cortex_prod_$(date +%Y%m%d_%H%M%S).dump
  ```
- **Point-In-Time Restoration**:
  ```bash
  pg_restore --clean --no-acl --no-owner -h $DB_HOST -U $DB_USER -d $DB_NAME cortex_prod_target.dump
  ```

---

## 2. Service Outage & Queue Recovery

1. **Redis Cache Failure**:
   - The Django application gracefully falls back to direct database execution if Redis becomes unavailable.
   - Upon Redis restart, cached keys will automatically rebuild through normal traffic reads.
2. **Celery Worker Crash / Queue Stalling**:
   - Inspect active and unacknowledged tasks: `celery -A core inspect active`
   - Purge dead tasks if corrupted: `celery -A core purge`
   - Restart worker processes: `systemctl restart celery-worker`

---

## 3. Cryptographic Secret Rotation Playbook

When rotating `DJANGO_SECRET_KEY`:
1. Generate new 64-character secret key.
2. Deploy backend instances with the new key.
3. Note: Active user JWT sessions will expire and trigger a single re-authentication cycle.
