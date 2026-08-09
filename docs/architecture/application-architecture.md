# Application Architecture — Cortex Backend Monolith

**Platform:** Cortex Enterprise Monolith (`b10backend/backend`)  
**Framework:** Django 5.0 + Django REST Framework (DRF)  
**Architectural Style:** Modular Monolith with CQRS / Service-Selector Pattern  
**Status:** Canonical Reference

---

## 1. Enterprise Layering Architecture

The Cortex backend follows a strict 7-layer decoupled architecture:

```
+-----------------------------------------------------------------------------+
|                          1. GATEWAY & MIDDLEWARE                            |
|  SecurityMiddleware -> WhiteNoise -> RequestID -> StructuredLogging ->      |
|  Strict CORS -> Session -> CSRF -> CookieJWTAuthentication -> Performance   |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                          2. API ROUTING & NAMESPACES                        |
|  core/urls.py (33 Mounted Namespaces across /api/v1/public, admin, auth, kb)|
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                          3. DRF CONTROLLERS & VIEWS                         |
|  ModelViewSet (CMS / CRM), GenericViewSet (RBAC), APIView (Chat / Health)   |
|  Throttling: Anon (10/min), User (100/min), Chat (20/min), Lead (5/15m)     |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                          4. SERIALIZATION ENVELOPE                          |
|  Input Ingestion & Validation -> StandardResponse -> MetaSerializer         |
+-----------------------------------------------------------------------------+
                                       |
                    +------------------+------------------+
                    |                                     |
                    v                                     v
+------------------------------------+  +-------------------------------------+
|        5A. SERVICE LAYER           |  |       5B. CQRS COMMAND LAYER        |
|  - apps.chatbot.services           |  |  - apps.business.commands           |
|  - apps.leads.services             |  |    (e.g. LeadCommands)              |
|  - apps.user_management.services   |  |  - apps.crm.commands                |
+------------------------------------+  +-------------------------------------+
                    |                                     |
                    +------------------+------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                          6. SELECTOR / QUERY LAYER                          |
|  apps.<domain>.selectors: QuerySet optimization with select_related /       |
|  prefetch_related to eliminate N+1 database queries                         |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                          7. RELATIONAL ORM MODELS                           |
|  79 Relational Models across 22 Django Apps (UUID PKs, TimeStampedModel)   |
+-----------------------------------------------------------------------------+
```

---

## 2. Inventory of 22 Django Subsystems

| # | Django App | Core Domain & Responsibilities | Key Models |
|---|---|---|---|
| 1 | `accounts` | Identity, custom User with UUID PK, CookieJWT auth, token blacklisting. | `User`, `UserSession`, `PasswordResetToken` |
| 2 | `activity_logs` | Platform audit logs, administrative action telemetry. | `ActivityLog`, `AdminAuditEvent` |
| 3 | `analytics` | Telemetry, public route analytics, conversion tracking. | `PageView`, `ConversionEvent` |
| 4 | `assets` | Digital Asset Management (DAM), Cloudinary CDN sync. | `Asset`, `AssetFolder`, `AssetTag` |
| 5 | `blog` / `resources` | Knowledge articles, technical whitepapers, author profiles. | `Resource`, `Category`, `Tag`, `Author` |
| 6 | `business` | Project engagements, proposals, CQRS pipeline operations. | `Proposal`, `Project`, `Milestone` |
| 7 | `chatbot` | AI conversation engine, RAG pipeline, session management. | `ConversationSession`, `ChatMessage` |
| 8 | `company` | Corporate profile, offices, leadership, certifications. | `CompanyInfo`, `OfficeLocation`, `TeamMember` |
| 9 | `contact` / `leads` | Inbound lead capture, validation, notification routing. | `Lead`, `ContactSubmission`, `LeadNote` |
| 10 | `content` | CMS core: Services, Industries, Case Studies, Testimonials. | `Service`, `Industry`, `Portfolio`, `Testimonial` |
| 11 | `crm` | Customer Relationship Management, accounts, deals, pipeline. | `Company`, `Contact`, `Deal`, `PipelineStage` |
| 12 | `faqs` | Categorized frequently asked questions. | `FAQItem`, `FAQCategory` |
| 13 | `industries` | Sector-specific solutions and case study associations. | `IndustryCard`, `IndustryDetail` |
| 14 | `intelligence` | AI persona configurations, prompt versions, evaluation benchmarks. | `AIPersona`, `PromptTemplate` |
| 15 | `knowledge_base` | Vector embeddings, indexed knowledge entries, semantic search. | `KnowledgeEntry`, `KnowledgeVersion` |
| 16 | `navigation` | Dynamic navigation menus, header links, footer trees. | `NavigationMenu`, `NavigationItem` |
| 17 | `notifications` | In-app alerts, transactional email dispatch. | `Notification`, `NotificationPreference` |
| 18 | `platform_settings` | System configuration, health endpoints (`/health/`), feature toggles. | `PlatformSetting`, `SystemHealthMetric` |
| 19 | `portfolio` | Client projects, architecture showcases, impact metrics. | `PortfolioItem`, `CaseStudyMetric` |
| 20 | `role_management` | Granular RBAC, dynamic permission mappings, permission matrix. | `Role`, `RolePermissionMapping` |
| 21 | `services` | Service taxonomy, capabilities, deliverables. | `ServiceDetail`, `ServiceFeature` |
| 22 | `testimonials` | Client reviews, enterprise references, verification badges. | `TestimonialReview`, `ClientLogo` |
