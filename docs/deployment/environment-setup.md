# Environment Setup & Configuration — Cortex Platform

**Target Environment:** Local Development & Continuous Integration (CI)  
**Status:** Canonical Reference

---

## 1. Prerequisites & Tooling

- **Node.js**: 20.x or 22.x LTS
- **Python**: 3.12+
- **Package Managers**: `npm` (v10+) for frontend; `pip` / `venv` for backend

---

## 2. Environment Variables Catalog

### Frontend Environment (`b10itsolution/.env.local`)

| Variable | Type | Description | Default / Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL | Base URL of the Django backend API | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | URL | Public URL of the Next.js website | `http://localhost:3000` |
| `NODE_ENV` | String | Node environment mode | `development` |

### Backend Environment (`b10backend/.env`)

| Variable | Type | Description | Development Default |
|---|---|---|---|
| `DJANGO_SECRET_KEY` | String | Cryptographic key for JWT & session signatures | (Required in production) |
| `DEBUG` | Boolean | Django debug mode | `True` (dev only) |
| `DATABASE_URL` | String | Database connection string | `sqlite:///db.sqlite3` |
| `REDIS_URL` | String | Redis cache and Celery broker URL | `redis://localhost:6379/0` |
| `OPENROUTER_API_KEY` | String | API key for AI Consultant LLM requests | (Secret token) |
| `CLOUDINARY_URL` | String | Cloudinary media storage credentials | `cloudinary://api_key:secret@cloud` |
| `CORS_ALLOWED_ORIGINS` | List | Allowed frontend origins for CORS | `http://localhost:3000,http://localhost:3001` |

---

## 3. Local Development Quickstart

### Starting the Frontend (`b10itsolution`)
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

### Starting the Backend (`b10backend/backend`)
```bash
# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# or: .\venv\Scripts\Activate.ps1 # Windows

# Apply database migrations
python manage.py migrate

# Start development server on port 8000
python manage.py runserver 8000
```
