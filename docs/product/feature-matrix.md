# Feature Matrix — Cortex Platform

**Platform:** Cortex Enterprise Ecosystem  
**Status:** Canonical Reference  
**Version:** 1.0 (Stabilization Baseline)

---

## 1. Public Digital Experience (`b10itsolution`)

| Feature | Description | Status | Verification / Source |
|---|---|---|---|
| **Dynamic Homepage** | 10 modular sections with parallel CMS fetching | **VERIFIED LIVE** | `src/app/page.tsx` |
| **Services Taxonomy** | Catalog and dynamic detail pages (`/services/[slug]`) | **VERIFIED LIVE** | `src/app/services/` |
| **Industry Solutions** | Sector-specific capability pages (`/industries/[slug]`)| **VERIFIED LIVE** | `src/app/industries/` |
| **Portfolio / Case Studies** | Client showcases and success stories (`/portfolio/[slug]`)| **VERIFIED LIVE** | `src/app/portfolio/` |
| **Knowledge Resources** | Articles and technical guides (`/resources/[slug]`) | **VERIFIED LIVE** | `src/app/resources/` |
| **Corporate About Page** | Company profile, leadership, and credentials | **VERIFIED LIVE** | `src/app/about/page.tsx` |
| **Lead Submission Forms** | Contact and consultation booking forms | **VERIFIED LIVE** | `src/app/contact/page.tsx` |
| **Dynamic Navigation** | Database-driven header menus and footer trees | **VERIFIED LIVE** | `navigation.service.ts` |
| **Resilient Fallback Engine** | High-fidelity static fallbacks for 100% uptime | **VERIFIED LIVE** | `src/services/cms/*` |

---

## 2. Internal Operations & Admin OS (`b10-admin-os` / `adminfrontend`)

| Feature | Description | Status | Verification / Source |
|---|---|---|---|
| **Secure CookieJWT Auth** | Sliding token refresh, login, logout, and blacklist | **VERIFIED LIVE** | `apps.accounts` |
| **User Directory** | User CRUD, password resets, and account states | **VERIFIED LIVE** | `apps.user_management` |
| **Role-Based RBAC** | Dynamic role mapping to granular permissions | **VERIFIED LIVE** | `apps.role_management` |
| **Lead Kanban Board** | Interactive stage transitions for sales pipelines | **VERIFIED LIVE** | `apps.leads`, `apps.crm` |
| **Company & Deal CRM** | Account management, contact books, deal MRR tracking | **VERIFIED LIVE** | `apps.crm` |
| **CMS Content Studio** | Editing for Services, Industries, Testimonials, FAQs | **VERIFIED LIVE** | `apps.content` |
| **Digital Asset Library** | Cloudinary asset management, media tagging | **VERIFIED LIVE** | `apps.assets` |
| **Audit Logs & Telemetry** | Administrative activity audit trails | **VERIFIED LIVE** | `apps.activity_logs` |
| **Platform Health Checks** | Multi-system telemetry and status reporting | **VERIFIED LIVE** | `apps.platform_settings` |

---

## 3. Conversational AI Subsystem

| Feature | Description | Status | Verification / Source |
|---|---|---|---|
| **RAG Retrieval Engine** | Semantic search across indexed knowledge entries | **VERIFIED LIVE** | `apps.knowledge_base` |
| **Intent Categorization** | Multi-intent classifier for guided dialogue | **VERIFIED LIVE** | `apps.chatbot.services` |
| **LLM Gateway** | OpenRouter integration with streaming & safety filters | **VERIFIED LIVE** | `apps.chatbot.services` |
| **Session State Tracking**| Conversation persistence and message histories | **VERIFIED LIVE** | `ConversationSession` |
| **In-Chat Lead Capture** | Automatic trigger for consultation booking | **VERIFIED LIVE** | `apps.chatbot` |
