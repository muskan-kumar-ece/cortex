# Cortex Platform — Public Digital Experience

**Company:** Cortex IT Solution  
**Repository:** `b10itsolution`  
**Technology Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, React Server Components (RSC), Incremental Static Regeneration (ISR)

---

## 🚀 Quickstart

### Prerequisites
- Node.js 20.x LTS or 22.x LTS
- npm 10+

### Installation & Development
```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Architectural Overview

- **Rendering**: React Server Components (RSC) fetch dynamic CMS data in parallel with 60-second Incremental Static Regeneration (ISR) for sub-50ms TTFB.
- **Backend API**: Connects to the Django REST backend at `/api/v1/public/` with resilient fallback safety if the database is offline or unpopulated.
- **Design System**: Strict design token architecture (`src/tokens/`) with high-contrast, accessible styling.

---

## 📚 Complete Canonical Documentation

All system architecture, API contracts, deployment guides, security specifications, and operational runbooks are maintained in the [`docs/`](file:///c:/workflow/b10itsolution/docs/README.md) directory:

- [System Architecture](file:///c:/workflow/b10itsolution/docs/architecture/system-architecture.md)
- [Frontend Architecture](file:///c:/workflow/b10itsolution/docs/architecture/frontend-architecture.md)
- [API Reference](file:///c:/workflow/b10itsolution/docs/api/api-reference.md)
- [CMS Architecture](file:///c:/workflow/b10itsolution/docs/cms/cms-architecture.md)
- [Security Architecture](file:///c:/workflow/b10itsolution/docs/security/security-architecture.md)
- [Baseline v1.0 Ground Truth](file:///c:/workflow/b10itsolution/docs/baseline/baseline-v1.0.md)

👉 See the complete [Documentation Hub](file:///c:/workflow/b10itsolution/docs/README.md) for full details.
