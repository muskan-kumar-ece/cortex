# CMS Architecture & Content Delivery — Cortex Platform

**Subsystems:** Content Management (`apps.content`, `apps.blog`, `apps.company`, `apps.navigation`)  
**Delivery Model:** Headless Decoupled REST + Incremental Static Regeneration (ISR 60s)  
**Status:** Canonical Reference

---

## 1. CMS Architecture & Content Pipeline

The Cortex Platform implements a headless Content Management System (CMS) that delivers structured editorial content to the Next.js frontend via REST endpoints:

```
+-----------------------------------------------------------------------------+
|                            DJANGO CMS ORM MODELS                            |
|  - Service & ServiceFeature       - Resource, Category & Tag                |
|  - Industry & IndustryCard        - CompanyInfo & TeamMember                |
|  - Portfolio & CaseStudyMetric    - NavigationMenu & NavigationItem         |
|  - TestimonialReview              - FAQCategory & FAQItem                   |
+-----------------------------------------------------------------------------+
                                       │
                                       ▼  JSON REST (`/api/v1/public/content/*`)
+-----------------------------------------------------------------------------+
|                           CMS FETCH HELPER (`cms.ts`)                       |
|  Server-side fetch with Next.js ISR cache options (`revalidate: 60`)        |
+-----------------------------------------------------------------------------+
                                       │
                                       ▼
+-----------------------------------------------------------------------------+
|                      CMS SERVICE ADAPTERS (`src/services/cms/*`)            |
|  Maps Django database payloads into frontend TypeScript interfaces;        |
|  applies verified fallback data structures if database records are empty.  |
+-----------------------------------------------------------------------------+
                                       │
                                       ▼
+-----------------------------------------------------------------------------+
|                        NEXT.JS SERVER COMPONENTS (RSC)                      |
|  Renders static HTML + JSON-LD Schema on edge with sub-50ms TTFB.           |
+-----------------------------------------------------------------------------+
```

---

## 2. Core CMS Content Entities

| Entity | Primary Attributes | Public Endpoint | Service Layer File |
|---|---|---|---|
| **Service** | `title`, `slug`, `tagline`, `summary`, `features`, `deliverables`, `icon` | `/api/v1/public/content/services/` | `services.service.ts` |
| **Industry** | `title`, `slug`, `description`, `challenges`, `solutions`, `portfolio_items` | `/api/v1/public/content/industries/` | `industries.service.ts` |
| **Portfolio** | `title`, `slug`, `client_name`, `summary`, `architecture`, `metrics`, `tech_stack` | `/api/v1/public/content/portfolio/` | `portfolio.service.ts` |
| **Resource** | `title`, `slug`, `body_markdown`, `author`, `category`, `read_time`, `hero_image` | `/api/v1/public/content/resources/` | `resources.service.ts` |
| **Testimonial** | `client_name`, `role`, `company`, `quote`, `rating`, `avatar_url`, `verified` | `/api/v1/public/content/testimonials/` | `testimonials.service.ts` |
| **Company** | `name`, `tagline`, `vision`, `stats`, `locations`, `certifications` | `/api/v1/public/content/company/` | `company.service.ts` |
| **Navigation** | `title`, `slug`, `menu_location`, `items` (tree hierarchy) | `/api/v1/public/content/navigation/` | `navigation.service.ts` |
| **FAQ** | `question`, `answer`, `category`, `order` | `/api/v1/public/content/faqs/` | `faqs.service.ts` |

---

## 3. High Availability & Resilience Strategy

- **Zero-Downtime Fallback Guarantee**: Every CMS service file in `src/services/cms/` defines static fallback data. If a network blip occurs or a newly provisioned database contains 0 records, the application serves clean, branded fallback data instead of returning 404 or 500 error pages.
- **Cache Revalidation**: When content is updated in the Admin OS, cache invalidation directives purge edge entries, ensuring global consistency within 60 seconds.
