# Product Requirements Document (PRD) — Cortex Platform

**Product:** Cortex Enterprise Digital Platform  
**Organization:** Cortex IT Solution  
**Status:** Canonical Reference  
**Version:** 1.0 (Stabilization Baseline)

---

## 1. Product Vision & Mission

Cortex IT Solution develops enterprise-grade software platforms, AI orchestration infrastructure, and digital transformation solutions. The Cortex Platform serves as the central digital engine for client engagement, technical showcase, inbound lead qualification, and enterprise operations.

---

## 2. Key User Personas

1. **Enterprise Decision Maker (CTO / VP Engineering / Founder)**:
   - Evaluates technical capability, architecture rigor, security compliance, and past case studies.
   - Requires rapid page loading, crystal-clear service taxonomy, and frictionless consultation booking.
2. **Inbound Prospect / Website Visitor**:
   - Seeks solution recommendations, interacts with the AI Consultant Chatbot, and submits contact requests.
3. **Internal Account Executive / Sales Lead**:
   - Manages inbound leads on the CRM Kanban board, tracks proposal lifecycles, and logs client interactions.
4. **Content Editor & Marketing Specialist**:
   - Publishes case studies, service features, industry spotlights, and blog resources via the CMS.
5. **Platform Administrator**:
   - Manages user accounts, enforces RBAC permissions, monitors system health metrics, and oversees audit logs.

---

## 3. Core Functional Domains

### 3.1 Public Digital Experience (`b10itsolution`)
- **Homepage Showcase**: 10 high-impact sections highlighting technical capabilities, metrics, client trust, and workflow.
- **Service Catalog**: Detailed multi-page breakdown of cloud architecture, AI engineering, and software development.
- **Portfolio & Case Studies**: Categorized client success stories with quantitative performance metrics.
- **Interactive Contact & Consultation**: Low-friction form submissions with honeypot security and instant routing.

### 3.2 Internal Admin OS (`b10-admin-os` / `adminfrontend`)
- **Executive Dashboard**: Real-time KPI cards for lead velocity, MRR pipeline, system health, and activity feeds.
- **Lead & CRM Management**: Full Kanban board with drag-and-drop stage updates, contact profiles, and deal pipelines.
- **Headless CMS Studio**: Rich management for Services, Industries, Testimonials, and FAQs.
- **Identity & RBAC Engine**: Granular role assignments, permission matrices, and active session monitoring.

### 3.3 AI Consultant Subsystem
- **Intelligent Dialogue**: RAG-powered chatbot delivering deterministic, grounded technical responses.
- **Contextual Knowledge Retrieval**: Deep integration with platform knowledge base and service catalogs.

---

## 4. Non-Functional Requirements (NFRs)

- **Performance**: Sub-50ms TTFB on edge-cached public pages; sub-200ms API response times for administrative mutations.
- **Security**: Zero-Trust CookieJWT architecture, token blacklisting, CSRF protection, strict input sanitization, and parameterized ORM queries.
- **Availability**: High availability design with fault-tolerant service fallbacks to guarantee zero-downtime client experiences.
