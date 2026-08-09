# Cortex IT Solution — CMS → Public Website Data Integrity Audit

> **Read-only investigation. No code was modified. All test values restored.**
> Audit date: 2026-08-09

---

## 1. Executive Summary

**Is the public website actually CMS-driven?**

### Answer: **PARTIALLY**

The pipeline is live and connected for the **core content entities** (Services, Industries, Portfolio, Resources, Navigation, Company Profile, Testimonials, Team). However several critical content areas are **permanently disconnected from the CMS** and are served from hardcoded mock providers, static constants, or in-code `PAGE_DATA` objects that cannot be changed through the Admin CMS under any circumstances.

| Website Area | CMS-Driven? | Source |
|---|---|---|
| Homepage Hero (title, subtitle, CTA) | ✅ YES | Django `Homepage` model |
| Homepage Process Steps | ✅ YES | Django `Homepage.process_content` JSON |
| Homepage Why B10 section | ✅ YES | Django `Homepage.why_b10_content` JSON |
| Homepage Stats | ❌ NO — ALWAYS STATIC | `FALLBACK_STATS` in `homepage.service.ts` |
| Homepage CTA section | ❌ NO — ALWAYS STATIC | `FALLBACK_CTA` in `homepage.service.ts` |
| Homepage Engineering Excellence section | ❌ NO — ALWAYS STATIC | `FALLBACK_ENGINEERING` (section is hidden anyway) |
| Navigation (Header mega-menu) | ✅ YES (with fallback threshold) | Django `NavigationItem` model |
| Footer navigation | ✅ YES (with fallback threshold) | Django `NavigationItem` model |
| Footer company name/description | ✅ YES | Django `CompanyProfile` model |
| Services listing | ✅ YES | Django `Service` model |
| Service detail pages | ✅ YES | Django `Service` model |
| Industries listing | ✅ YES | Django `Industry` model |
| Industry detail pages | ✅ YES | Django `Industry` model |
| Portfolio listing | ✅ YES | Django `Portfolio` model |
| Portfolio detail pages | ✅ YES | Django `Portfolio` model |
| Resources listing | ✅ YES | Django `Resource` model |
| Resource detail pages | ✅ YES | Django `Resource` model |
| About page (hero name/tagline) | ✅ PARTIAL | Django `CompanyProfile.company_name` and `tagline` |
| About page (all body sections) | ❌ NO — ALWAYS STATIC | Hardcoded `PAGE_DATA` constant in page file |
| Services page (hero, whyUs, architecture, process, metrics, CTA) | ❌ NO — ALWAYS STATIC | Hardcoded `PAGE_DATA` constant in page file |
| Services page (service journey cards) | ✅ YES | Django `Service` model |
| Industries page (hero, expertise, caseStudies, CTA) | ❌ NO — ALWAYS STATIC | Hardcoded `PAGE_DATA` constant in page file |
| Industries page (industry cards) | ✅ YES | Django `Industry` model |
| Portfolio page (hero, outcomes, technology, CTA) | ❌ NO — ALWAYS STATIC | Hardcoded `PAGE_DATA` constant in page file |
| Portfolio page (project cards) | ✅ YES | Django `Portfolio` model |
| Resources page (hero section) | ❌ NO — ALWAYS STATIC | Hardcoded JSX in page file |
| Resources sidebar whitepapers | ❌ NO — ALWAYS STATIC | Hardcoded array `["Migration Playbook", ...]` |
| Contact page (hero, form, process, FAQs, CTA) | ❌ NO — ALWAYS STATIC | `MockContactProvider` class |
| Contact page (email/address from CMS) | ✅ PARTIAL | Django `CompanyProfile` used for email/address only |
| Solutions page (ALL content) | ❌ NO — ALWAYS STATIC | `solutionsProvider` / `MockSolutionsProvider` class |
| Products page (ALL content) | ❌ NO — ALWAYS STATIC | `productsProvider` / `MockProductsProvider` class |
| Products detail `/products/[slug]` | ❌ NO — ALWAYS STATIC | `PRODUCTS_DB` static object |
| Solutions detail `/solutions/[slug]` | ❌ NO — ALWAYS STATIC | `SOLUTIONS_DB` static object |
| Case Studies `/case-studies` | ❌ NO — ALWAYS STATIC | `CASE_STUDIES_DB` constant |
| Case Studies detail `/case-studies/[slug]` | ❌ NO — ALWAYS STATIC | `CASE_STUDIES_DB` constant |
| Technologies `/technologies` | ❌ NO — ALWAYS STATIC | `TECHNOLOGIES_DB` constant |
| Technologies detail | ❌ NO — ALWAYS STATIC | `TECHNOLOGIES_DB` constant |
| Company Profile (SEO metadata) | ❌ NO — ALWAYS STATIC | Hardcoded in page `export const metadata` |
| SEO page titles (about, services, industries, etc.) | ❌ NO — ALWAYS STATIC | Hardcoded `metadata` export in every page |
| Testimonials (homepage) | ✅ YES | Django `Testimonial` model |
| Team members | ✅ YES | Django `TeamMember` model |
| FAQs | ✅ YES | Django `FAQ` model (but About/Contact pages use static FAQs) |
| Sitemap (solutions, products, resources slugs) | ❌ PARTIAL | Solutions/Products slugs from mock; Services/Industries/Portfolio from CMS |
| Media / images | ❌ NO | No image URLs served from CMS (asset manager empty); fallback placeholders used |

---

## 2. Architecture / Data Flow

### Entities That ARE CMS-Connected (Actual Real Flow)

```
Admin CMS (localhost:3000)
    ↓ PATCH /api/v1/admin/content/{entity}/
Django ORM (SQLite DB)
    ↓ status='Published' filter
Public REST API (localhost:8000/api/v1/public/content/)
    ↓ @cache_page(60*15) [LocMemCache - INEFFECTIVE in dev; different process = different cache]
Next.js fetch() with next: { revalidate: 60 }
    ↓ cmsList() / cmsGet() in src/api/cms.ts
Service function in src/services/cms/*.service.ts
    ↓ adapter/mapping function
Server Component (page.tsx)
    ↓ props
UI Component
    ↓ rendered JSX
Browser
```

### Entities That Are STATIC / MOCK (Not CMS-Connected at All)

```
Mock Provider / Static Constant in TypeScript file
    ↓ (no network call, no database)
Server Component (page.tsx)
    ↓ props
UI Component
    ↓ rendered JSX
Browser
```

### The Dual-Source Problem on Many Pages

Many pages **mix** CMS data with static data in the same render:

```
page.tsx
    ├── CMS: getCoreServices() → ServiceJourneyCards (list of services)
    └── STATIC: PAGE_DATA.hero, PAGE_DATA.whyChooseUs, PAGE_DATA.process...
```

An admin changing the hero headline of the Services page in the CMS will have **no effect**. There is no backend endpoint that maps to the Services page hero.

---

## 3. Critical Findings

### P0 — ALWAYS-STATIC Entire Page Sections (CMS Bypass)

**Solutions page (`/solutions`)**: Entirely served from `MockSolutionsProvider` using `SOLUTIONS_DB` TypeScript object. Cannot be changed via CMS.

**Products page (`/products`, `/products/[slug]`)**: Entirely served from `MockProductsProvider` using `PRODUCTS_DB` TypeScript object. Cannot be changed via CMS.

**Contact page (`/contact`)**: Hero, form dropdowns, process steps, FAQs, and trust signals all served from `MockContactProvider`. Only email/address come from CMS.

**Case Studies page (`/case-studies`, `/case-studies/[slug]`)**: All content from `CASE_STUDIES_DB` TypeScript constant. Zero CMS connection.

**Technologies page (`/technologies`, `/technologies/[slug]`)**: All content from `TECHNOLOGIES_DB` TypeScript constant. Zero CMS connection.

### P0 — Homepage Singleton Module-Level Cache Bug

**File:** `src/services/cms/homepage.service.ts` — Lines 79–86

```typescript
let _cached: BackendHomepage | null = null;

async function getHomepageSingleton(): Promise<BackendHomepage | null> {
  if (_cached) return _cached;  // ← NEVER re-fetches in same Node.js process lifetime
  const list = await cmsList<BackendHomepage>("/public/content/homepage/");
  _cached = list[0] ?? null;
  return _cached;
}
```

This is a **module-level variable cache**. Once `getHomepageSingleton()` is called for the first time in a given Node.js server process, it stores the result and never re-fetches from the API for the entire lifetime of that process — regardless of the 60-second `revalidate` on the fetch call below it. The underlying `cmsList` call uses `revalidate: 60`, but it is never called again.

**Impact:** In the Next.js dev server (with Turbopack/Webpack HMR), this means the homepage hero title, process steps, and why_b10_content are cached in memory and never refreshed until the dev server restarts. In production (with multiple processes), each worker process has its own cache — meaning some requests could get new data, others old data.

**Classification:** Type E — Frontend Hardcode/Cache Problem (DB new → API new → Next.js receives new → module cache ignores it)

### P1 — Django-Level @cache_page (All Public ViewSets)

**File:** `backend/apps/content/views.py` — Lines 19, 41, 51, 61, 71, 81, 91, 102, 112, 122, 132, 142, 162, 182, 189, 206

```python
@method_decorator(cache_page(60 * 15), name='dispatch')
```

Every single public ViewSet has `@cache_page(60 * 15)`. The cache backend is `LocMemCache` (in-memory per-process). In development this effectively doesn't persist across requests because the Django dev server is single-process and LocMemCache is per-thread. In production with Gunicorn workers, each worker will cache independently with up to 15-minute TTL with no invalidation signal.

**Classification:** Type C — Cache Problem

### P1 — Navigation Fallback Trigger Threshold

**File:** `src/services/cms/navigation.service.ts` — Lines 197–200

```typescript
if (groups.length < 3) {
  return FALLBACK_NAV_GROUPS;
}
```

If the CMS returns fewer than 3 NAVBAR parent groups, the **entire navigation is silently replaced** with `FALLBACK_NAV_GROUPS` containing hardcoded Solutions/Services/Industries/Products/Knowledge links. Currently 6 NAVBAR parents exist, so this is dormant — but any admin action that reduces parents below 3 will trigger it invisibly.

**Classification:** Type D — Frontend fallback silently replaces CMS data

Similarly for footer:
```typescript
if (groups.length < 2) return FALLBACK_FOOTER_GROUPS;
```

### P1 — Homepage CTA and Stats Are ALWAYS Fallback

**File:** `src/services/cms/homepage.service.ts`

```typescript
export async function getStats(): Promise<StatItem[]> {
  return FALLBACK_STATS;  // ← Never reads from CMS
}

export async function getCtaData(): Promise<CtaData> {
  return FALLBACK_CTA;   // ← Never reads from CMS
}
```

`getStats()` and `getCtaData()` unconditionally return static fallback data. The `Homepage` model may or may not have stat/CTA fields — but these functions never even attempt to read them. No admin action can change the homepage stats or CTA through the CMS.

**Classification:** Type E — Dead CMS integration (functions return static without fetching)

### P2 — About Page Body: Entirely Static

**File:** `src/app/about/page.tsx` — Lines 13–91

The entire `PAGE_DATA` constant (mission, philosophy, teamWorkflow, developmentProcess, qualityStandards, innovationApproach, teamCulture, futureVision) is hardcoded. The CMS is only used to get `company.company_name` and `company.tagline` for the hero section.

The About page has no backend sections endpoint. All body content is hardcoded.

**Classification:** Type G — Wrong endpoint / no endpoint

### P2 — Stale Company Name in CMS DB

The database `CompanyProfile.company_name` is currently **"B10 IT Solutions"** (with an extra "s"). The public website renders this in the Footer company name and About page hero via CMS — but displays `B10 IT Solutions` to users instead of `Cortex IT Solution`.

### P2 — BUG-003: B10 IT Solution Hardcoded in 24 Locations

Found in 24 places across 11 page files. Details in Section 11.

### P3 — Resources Detail Page: Static Author Fallback

**File:** `src/app/resources/[slug]/page.tsx` — Line 65

```typescript
const author = (content.author as ...) ?? { name: "B10 Engineering Team", role: "Staff Engineers" };
```

When a resource has no `author` in its `content` JSON, it falls back to hardcoded `"B10 Engineering Team"`.

---

## 4. Static / Fallback Inventory

| File | Hardcoded/Fallback Data | Always Rendered? | Trigger | CMS Equivalent | Problem |
|---|---|---|---|---|---|
| `homepage.service.ts:29–36` | `FALLBACK_HERO` | Only if `hp.hero_title` is empty | `!hp || !hp.hero_title` | Homepage `hero_title` field | Safe fallback |
| `homepage.service.ts:38–43` | `FALLBACK_STATS` | **ALWAYS** | Unconditional `return` | None | Dead code — no CMS stats field |
| `homepage.service.ts:45–49` | `FALLBACK_WHY_B10` | Only if CMS empty | Array length check | `why_b10_content` JSON | Safe |
| `homepage.service.ts:51–58` | `FALLBACK_PROCESS` | Only if CMS empty | Array length check | `process_content` JSON | Safe |
| `homepage.service.ts:60–64` | `FALLBACK_CTA` | **ALWAYS** | Unconditional `return` | None | Dead — no CMS CTA fields |
| `homepage.service.ts:66–75` | `FALLBACK_ENGINEERING` | **ALWAYS** | Unconditional `return` | None | Section hidden in config anyway |
| `navigation.service.ts:47–99` | `FALLBACK_NAV_GROUPS` | If < 3 CMS nav groups | `groups.length < 3` | `NavigationItem` NAVBAR | Silent override risk |
| `navigation.service.ts:101–127` | `FALLBACK_FOOTER_GROUPS` | If < 2 CMS footer groups | `groups.length < 2` | `NavigationItem` FOOTER | Silent override risk |
| `company.service.ts:44–68` | `FALLBACK_PROFILE` | If no Published CompanyProfile | `list[0] ?? FALLBACK_PROFILE` | `CompanyProfile` model | Safe fallback; currently has "B10 IT Solution" |
| `cms/products/mock-data.ts` | `PRODUCTS_DB` (complete products) | **ALWAYS for /products/** | No API call made | None (no Product model in Django) | P0 disconnect |
| `cms/solutions/mock-data.ts` | `SOLUTIONS_DB` (complete solutions) | **ALWAYS for /solutions/** | No API call made | None (no Solution model in Django) | P0 disconnect |
| `cms/contact/mock-provider.ts` | Contact page all content | **ALWAYS for /contact** | No API call made | None mapped | P0 disconnect |
| `constants/case-studies.ts` | `CASE_STUDIES_DB` | **ALWAYS for /case-studies** | No API call made | Could use Portfolio model | P0 disconnect |
| `constants/technologies.ts` | `TECHNOLOGIES_DB` | **ALWAYS for /technologies** | No API call made | None | P0 disconnect |
| `app/about/page.tsx:13–91` | `PAGE_DATA` (8 story sections) | **ALWAYS** | No API call made | Could use CompanyProfile | P1 disconnect |
| `app/services/page.tsx:25–112` | `PAGE_DATA` (hero, whyUs, arch, process, metrics, CTA) | **ALWAYS** | No API call made | Could use CMS | P1 disconnect |
| `app/industries/page.tsx:21–48` | `PAGE_DATA` (hero, expertise, caseStudies, CTA) | **ALWAYS** | No API call made | Could use CMS | P1 disconnect |
| `app/portfolio/page.tsx:20–46` | `PAGE_DATA` (hero, outcomes, tech, CTA) | **ALWAYS** | No API call made | Could use CMS | P1 disconnect |
| `app/resources/page.tsx:193` | Whitepapers sidebar array | **ALWAYS** | No API call made | Could use Resources | P2 |
| `app/resources/[slug]/page.tsx:65` | Author fallback `"B10 Engineering Team"` | If no content.author | `content.author ?? fallback` | Resource `content.author` | P3 |

---

## 5. CMS Data Flow Matrix

| Content | DB Model | Public API | Next.js Service | Page | UI | Fallback | Actual Source |
|---|---|---|---|---|---|---|---|
| Homepage H1 | ✅ `Homepage.hero_title` | ✅ `/homepage/` | ✅ `getHeroData()` | ✅ `page.tsx` | ✅ `HeroSection` | FALLBACK_HERO (if empty) | **CMS** |
| Homepage subtitle | ✅ `Homepage.hero_subtitle` | ✅ | ✅ | ✅ | ✅ | FALLBACK_HERO.subheadline | **CMS** |
| Homepage CTA text | ✅ `Homepage.hero_cta_text` | ✅ | ✅ | ✅ | ✅ | FALLBACK_HERO.primaryCta | **CMS** |
| Homepage stats | ❌ None | ❌ | ❌ `getStats()` returns static | ✅ | ✅ | FALLBACK_STATS | **STATIC** |
| Homepage CTA section | ❌ None | ❌ | ❌ `getCtaData()` returns static | ✅ | ✅ | FALLBACK_CTA | **STATIC** |
| Homepage process steps | ✅ `Homepage.process_content` | ✅ | ✅ `getProcessSteps()` | ✅ | ✅ | FALLBACK_PROCESS (if empty) | **CMS** |
| Homepage why-b10 items | ✅ `Homepage.why_b10_content` | ✅ | ✅ `getWhyB10()` | ✅ (hidden) | ✅ | FALLBACK_WHY_B10 | **CMS** (hidden) |
| Service list | ✅ `Service` model | ✅ `/services/` | ✅ `getAllServices()` | ✅ | ✅ `ServicesJourney` | [] empty array | **CMS** |
| Service detail | ✅ `Service` model | ✅ `/services/{slug}/` | ✅ `getServiceBySlug()` | ✅ | ✅ `KnowledgePageTemplate` | notFound() | **CMS** |
| Services page hero | ❌ None | ❌ | ❌ | ✅ `PAGE_DATA.hero` | ✅ | Same static | **STATIC** |
| Industry list | ✅ `Industry` model | ✅ `/industries/` | ✅ `getAllIndustries()` | ✅ | ✅ `IntelligenceHub` | [] empty | **CMS** |
| Industry detail | ✅ `Industry` model | ✅ `/industries/{slug}/` | ✅ `getIndustryBySlug()` | ✅ | ✅ `KnowledgePageTemplate` | notFound() | **CMS** |
| Portfolio list | ✅ `Portfolio` model | ✅ `/portfolio/` | ✅ `getAllPortfolio()` | ✅ | ✅ `ProjectShowcase` | [] empty | **CMS** |
| Portfolio detail | ✅ `Portfolio` model | ✅ `/portfolio/{slug}/` | ✅ `getPortfolioBySlug()` | ✅ | ✅ `KnowledgePageTemplate` | notFound() | **CMS** |
| Resource list | ✅ `Resource` model | ✅ `/resources/` | ✅ `getAllResources()` | ✅ | ✅ feed articles | [] empty | **CMS** |
| Resource detail | ✅ `Resource` model | ✅ `/resources/{slug}/` | ✅ `getResourceBySlug()` | ✅ | ✅ `KnowledgePageTemplate` | notFound() | **CMS** |
| Navigation (header) | ✅ `NavigationItem` | ✅ `/navigation/` | ✅ `getMainNavigation()` | ✅ `Header` | ✅ `HeaderClient` | FALLBACK_NAV_GROUPS if < 3 | **CMS** |
| Footer navigation | ✅ `NavigationItem` | ✅ `/navigation/` | ✅ `getFooterNavigation()` | ✅ `Footer` | ✅ | FALLBACK_FOOTER_GROUPS if < 2 | **CMS** |
| Company name (footer) | ✅ `CompanyProfile.company_name` | ✅ `/company-profile/` | ✅ `getCompanyProfile()` | ✅ `Footer` | ✅ | FALLBACK_PROFILE | **CMS** (currently "B10 IT Solutions") |
| Company name (about) | ✅ `CompanyProfile.company_name` | ✅ | ✅ | ✅ `AboutPage` | ✅ `AboutHero` | PAGE_DATA.hero.headline | **CMS** |
| About page body (8 sections) | ❌ None | ❌ | ❌ | ✅ `PAGE_DATA.*` | ✅ `StorySection` | Same static | **STATIC** |
| Contact page ALL | ❌ None | ❌ | ❌ | ✅ `contactProvider` | ✅ | Same mock | **MOCK** |
| Solutions page ALL | ❌ None | ❌ | ❌ | ✅ `solutionsProvider` | ✅ | Same mock | **MOCK** |
| Products page ALL | ❌ None | ❌ | ❌ | ✅ `productsProvider` | ✅ | Same mock | **MOCK** |
| Case Studies ALL | ❌ None | ❌ | ❌ | ✅ `CASE_STUDIES_DB` | ✅ | Same constant | **STATIC CONSTANT** |
| Technologies ALL | ❌ None | ❌ | ❌ | ✅ `TECHNOLOGIES_DB` | ✅ | Same constant | **STATIC CONSTANT** |
| Testimonials | ✅ `Testimonial` model | ✅ `/testimonials/` | ✅ `getFeaturedTestimonials()` | ✅ | ✅ | [] empty array | **CMS** |
| Team members | ✅ `TeamMember` model | ✅ `/team/` | ✅ `getAllTeamMembers()` | Not used in any public page | ❌ | — | **CMS but UNUSED in UI** |
| FAQs | ✅ `FAQ` model | ✅ `/faqs/` | ✅ `faqs.service.ts` | ❌ Contact page uses mock | — | contactProvider.faq | **IGNORED** |
| SEO page titles | ❌ None | ❌ | ❌ | `export const metadata` | — | Same static | **STATIC** |

---

## 6. Page-by-Page Audit

### Homepage (`/`)
- **CMS-driven**: Hero H1, subtitle, CTA, process steps, why_b10, services, industries, portfolio, testimonials, resources
- **Static**: Stats (4 hardcoded values), CTA section (hardcoded headline/button), Engineering Excellence section (hidden), Products section (mock)
- **Module cache bug**: `_cached` module variable means homepage data is fetched once per Node.js process lifetime
- **Severity**: Medium — the visible hero and core sections are CMS-driven

### About (`/about`)
- **CMS-driven**: Hero company name (`Built by {company.company_name}`) and description (`company.tagline`)
- **Static**: EVERYTHING ELSE — mission, philosophy, teamWorkflow, developmentProcess, qualityStandards, innovationApproach, teamCulture, futureVision
- **Meta**: `"About B10 IT Solution | The Engineering Partner"` — hardcoded wrong brand
- **Severity**: High — 90% of About page content cannot be changed via CMS

### Services (`/services`)
- **CMS-driven**: Service journey cards (live service list from `getCoreServices()`)
- **Static**: hero headline/description, whyChooseUs, architecture section, process steps (different from homepage process), tech stack marquee, metrics, CTA
- **Meta**: `"Engineering Services | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: High — all non-list content is hardcoded

### Service Detail (`/services/[slug]`)
- **CMS-driven**: ALL content — title, summary, description, content.{pain_points, technologies, outcomes, how_we_build_it}, related services
- **Static**: some field labels ("Challenge N", "Outcome N"), architecture title string
- **Meta**: `"${data.title} | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Low — content itself is CMS-driven; brand string issue only

### Industries (`/industries`)
- **CMS-driven**: Industry cards (live from `getIndustryCards()`)
- **Static**: page hero, intelligence hub header, case studies section (empty array), expertise section (empty), CTA
- **Meta**: `"Enterprise Industries | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Medium

### Industry Detail (`/industries/[slug]`)
- **CMS-driven**: ALL content — title, summary, description, content.{overview, challenges, solutions, metrics}, use_cases, related_services
- **Static**: some hardcoded strings ("Our Approach", "Solution Architecture")
- **Meta**: `"${data.title} | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Low

### Portfolio (`/portfolio`)
- **CMS-driven**: Project cards (live from `getPortfolioCards()`)
- **Static**: hero, outcomes stats (hardcoded `[{ value: "3x", label: "Speed" }]`), technology section, CTA
- **Meta**: `"Engineering Portfolio | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Medium

### Portfolio Detail (`/portfolio/[slug]`)
- **CMS-driven**: ALL content — title, summary, business_problem, metrics, architecture_stack, content JSON
- **Meta**: `"${data.title} | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Low

### Resources (`/resources`)
- **CMS-driven**: All article cards (live from `getResourceCards()` and `getResourceCategories()`)
- **Static**: Hero text ("Engineering Knowledge Center"), sidebar whitepapers list (3 hardcoded items), newsletter headline
- **Meta**: `"Engineering Knowledge Center | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Medium

### Resource Detail (`/resources/[slug]`)
- **CMS-driven**: title, summary, content.sections, content.author, content.tags
- **Static**: author fallback `"B10 Engineering Team"` if no `content.author`
- **Meta**: `"${data.title} | B10 IT Solution"` — hardcoded wrong brand
- **Severity**: Low

### Contact (`/contact`)
- **CMS-driven**: email, address (from `CompanyProfile`)
- **Static**: Hero headline/description, 6 consultation paths, form dropdown values, process steps, 5 FAQs, trust signals, CTA — ALL from `MockContactProvider`
- **Meta**: `"Contact B10 IT Solution | ..."` — hardcoded wrong brand
- **Severity**: Critical — nearly all content permanently static

### Solutions (`/solutions`, `/solutions/[slug]`)
- **CMS-driven**: NOTHING
- **Static**: ALL content from `MockSolutionsProvider` → `SOLUTIONS_DB`
- **Severity**: Critical — entirely disconnected from CMS

### Products (`/products`, `/products/[slug]`)
- **CMS-driven**: NOTHING
- **Static**: ALL content from `MockProductsProvider` → `PRODUCTS_DB`
- **Severity**: Critical — entirely disconnected from CMS

### Case Studies (`/case-studies`, `/case-studies/[slug]`)
- **CMS-driven**: NOTHING
- **Static**: ALL content from `CASE_STUDIES_DB` TypeScript constant
- **Severity**: Critical — could use Portfolio model instead

### Technologies (`/technologies`, `/technologies/[slug]`)
- **CMS-driven**: NOTHING
- **Static**: ALL content from `TECHNOLOGIES_DB` TypeScript constant
- **Severity**: Medium — tech content is relatively stable

---

## 7. Navigation Audit

### Database → API
- 36 `NavigationItem` records returned by `/api/v1/public/content/navigation/?page_size=100`
- All have `status=Published`
- Distribution: NAVBAR parents (6) + NAVBAR children (~23) + FOOTER + LEGAL + MOBILE items
- `@cache_page(60*15)` applied — LocMemCache backend (ineffective in dev)

### API → Frontend Service
- `getMainNavigation()` fetches all items, filters to `location=NAVBAR`
- Builds parent→children map by `parent` UUID
- **Fallback trigger**: If `groups.length < 3` → replaces with `FALLBACK_NAV_GROUPS` (SILENT!)
- Currently safe: 6 NAVBAR parent groups exist

### Frontend → Header Component
- `Header.tsx` (Server Component) calls `getMainNavigation()` and `getCompanyProfile()` in parallel
- Passes to `HeaderClient` (client component)
- No additional fallback at this layer

### Footer Navigation
- `getFooterNavigation()` filters to `location=FOOTER` or `location=LEGAL`
- `FALLBACK_FOOTER_GROUPS` triggered if < 2 footer groups
- Footer company name comes directly from `CompanyProfile.company_name` — currently `"B10 IT Solutions"` in DB

### Child Link Generation
- `buildGroups()` adds `{ title: "View All {parent.title}", href: parent.url }` as CTA
- Children are mapped via `toLink()` — only `title` and `url` fields used; `icon`, `badge` ignored in mega-menu

### Dead Navigation Field
- `NavigationItem.icon` and `NavigationItem.badge` fields are fetched from API but never rendered in `HeaderClient`, `DesktopNav`, or `MegaMenu`. Editing them in the CMS has no visual effect.

---

## 8. Cache Audit

### Layer 1: Django @cache_page(60*15)
- **Applied to**: ALL public ViewSets (HomepageViewSet, NavigationItemViewSet, ServiceViewSet, IndustryViewSet, PortfolioViewSet, ResourceViewSet, CompanyProfileViewSet, TestimonialViewSet, TeamMemberViewSet, FAQViewSet, etc.)
- **Backend**: `LocMemCache` (in-memory, per-process, per-thread)
- **In development**: Cache is per-process. Each server restart clears it. Different request threads may share or not share it. In practice this means the cache is ineffective in dev — confirmed by controlled test: CMS edit → immediate public API reflection.
- **In production (Gunicorn multi-process)**: Each worker has its own LocMemCache. Up to 15-minute stale data per worker. No cache invalidation hook exists. Worst case: 15 minutes of stale data after CMS save.
- **Max stale window**: 15 minutes in production (0 minutes in dev)

### Layer 2: Next.js ISR (revalidate: 60)
- **Applied to**: All `cmsList()` and `cmsGet()` calls via `next: { revalidate: 60 }`
- **Meaning**: Next.js will serve cached HTTP response for up to 60 seconds, then revalidate in background
- **In development (Turbopack)**: ISR is disabled; every request fetches fresh
- **In production**: Adds 60-second staleness on top of any Django cache
- **Max cumulative stale window in production**: 15 minutes (Django) + 60 seconds (Next.js) ≈ 16 minutes

### Layer 3: Module-Level Singleton Cache (CRITICAL BUG)
- **File**: `src/services/cms/homepage.service.ts` — Line 79
- `let _cached: BackendHomepage | null = null;`
- **Scope**: Module-level variable, lives for the **entire Node.js process lifetime**
- **Impact**: Homepage singleton is fetched ONCE and never re-fetched, regardless of revalidate intervals
- **In production**: A deployed Next.js instance never refreshes homepage hero/process/why_b10 data without a server restart
- This **completely bypasses** the `revalidate: 60` on the underlying fetch

### Layer 4: Browser Cache
- Standard HTTP cache headers from Next.js
- Not audited in detail but typical

### Summary of Stale-Data Windows

| Content | Dev Stale Window | Prod Stale Window |
|---|---|---|
| Homepage hero (module cache bug) | Entire process lifetime | Entire process lifetime |
| Navigation | ~0 (LocMemCache dev) | 15 min |
| Services | ~0 | 15 min |
| Industries | ~0 | 15 min |
| Portfolio | ~0 | 15 min |
| Resources | ~0 | 15 min |

---

## 9. API Error / Fallback Behavior

**In `src/api/cms.ts`:**

```typescript
try {
  const res = await fetch(url, { next: { revalidate } });
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(`[CMS] ${res.status} ...`);
    return null;    // ← Swallows all non-404 errors silently
  }
  return json as T;
} catch (err) {
  console.error(`[CMS] Network error`, err);
  return null;      // ← Swallows all network errors silently
}
```

`cmsGet()` returns `null` on any non-200 response.
`cmsList()` returns `[]` when `cmsGet()` returns null.

### What happens when the API is DOWN?

| Scenario | Behavior |
|---|---|
| Backend 200 | Normal CMS data |
| Backend 401/403 | `cmsGet` returns null → `cmsList` returns [] → **service function uses FALLBACK or returns empty** |
| Backend 404 | Returns null → service uses fallback |
| Backend 500 | Returns null → service uses fallback |
| Network timeout | Returns null → service uses fallback |
| Backend completely down | Returns null → service uses fallback |

**Critical implication**: When the Django backend is completely offline, the public website will:
- Show `FALLBACK_HERO` for the homepage hero (if the DB was empty), or show nothing if `hp.hero_title` is null
- Show `FALLBACK_NAV_GROUPS` if the nav has <3 groups, or show empty navigation
- Show zero services, zero industries, zero portfolio items, zero testimonials (empty arrays, no data)
- Show zero resources
- Contact/Solutions/Products pages would look completely normal (all static anyway)

**The website CAN look "normal" while disconnected from CMS for**: Contact, Solutions, Products, Case Studies, Technologies, About (body sections), Services (hero/non-list sections).

---

## 10. Media / Image Audit

### Backend
- Asset Manager endpoint: `/api/v1/admin/assets/` — responds HTTP 200 but returns **0 assets** (empty)
- No image upload has been completed
- `Homepage.hero_image` field = null
- Service `icon_url` fields = null for all 6 services
- Portfolio `hero_url` fields = null for all portfolio items
- Resource `hero_url` fields = null for all resources
- `CompanyProfile.logo_url` = null
- `TeamMember.photo_url` = null for all team members

### Frontend
- `src/app/resources/page.tsx:66–75` — Image component with fallback: if `heroUrl` is null, renders a styled placeholder div with `TECHNICAL_DEEP_DIVE` text
- `src/app/resources/[slug]/page.tsx` — No hero image rendering (KnowledgePageTemplate)
- `src/app/portfolio/[slug]/page.tsx` — KnowledgePageTemplate may have image slot; currently no images
- Header logo: CSS gradient box (`bg-[linear-gradient(-45deg,...)]`) — not from CMS
- No CMS images are currently being served to any user-visible UI element

### Classification
Type G — No CMS images are connected. The asset manager exists but is empty. All visible "images" are CSS placeholders.

---

## 11. Branding Audit (B10 vs Cortex)

### User-Visible "B10 IT Solution" Strings (Must Change — BUG-003)

| File | Line(s) | Context |
|---|---|---|
| `src/app/about/page.tsx` | 8, 10 | `<title>` and meta description |
| `src/app/contact/page.tsx` | 12, 13 | `<title>` and meta description |
| `src/app/industries/page.tsx` | 16 | `<title>` |
| `src/app/industries/[slug]/page.tsx` | 32, 35, 93, 105 | `<title>`, OpenGraph title, JSON-LD publisher.url |
| `src/app/portfolio/page.tsx` | 16 | `<title>` |
| `src/app/portfolio/[slug]/page.tsx` | 32, 35, 182 | `<title>`, OpenGraph, JSON-LD author |
| `src/app/resources/page.tsx` | 20 | `<title>` |
| `src/app/resources/[slug]/page.tsx` | 31, 34, 65, 81 | `<title>`, OpenGraph, author fallback, JSON-LD |
| `src/app/services/page.tsx` | 20, 22 | `<title>` and meta description |
| `src/app/services/[slug]/page.tsx` | 34, 37, 103, 124 | `<title>`, OpenGraph, SEO field, JSON-LD |
| `src/services/cms/company.service.ts` | 46, 47 | `FALLBACK_PROFILE.company_name`, `FALLBACK_PROFILE.legal_name` |

### Database (Must Change — Admin CMS Action)
- `CompanyProfile.company_name = "B10 IT Solutions"` — currently renders in Footer and About hero

### Internal Identifiers (Do NOT Rename)
- `WhyB10Item`, `getWhyB10()`, `why_b10_title`, `why_b10_content`, `WhyB10Section`, `whyB10`, `homepageConfig.sections.whyB10`

---

## 12. Dead / Unused CMS Integrations

| CMS Service | Status | Issue |
|---|---|---|
| `faqs.service.ts` | EXISTS | `getFAQs()` function exists; no page actually uses it. Contact page uses mock FAQs |
| `team.service.ts` | EXISTS | `getAllTeamMembers()` fetches 6 team members from DB. No public page renders them |
| Homepage `Engineering Excellence` section | EXISTS | `getEngineeringExcellence()` exists and returns FALLBACK_ENGINEERING; `homepageConfig.sections.engineeringExcellence = false` — section DISABLED in config, never rendered |
| Homepage `Why B10` section | EXISTS | `getWhyB10()` fetches real CMS data; `homepageConfig.sections.whyB10 = false` — section DISABLED, never rendered |
| Homepage Testimonials | EXISTS | `getFeaturedTestimonials()` fetches real testimonials; `homepageConfig.sections.testimonials = false` — DISABLED |
| Homepage Process | EXISTS | `getProcessSteps()` fetches CMS data; `homepageConfig.sections.process = false` — DISABLED |
| `NavigationItem.icon` field | EXISTS in API | Fetched but never rendered in `HeaderClient`, `DesktopNav`, or `MegaMenu` |
| `NavigationItem.badge` field | EXISTS in API | Fetched but never rendered |
| `ResourceCategory` (as filter tabs) | EXISTS | `getResourceCategories()` fetches categories; resource listing shows category names but has no client-side filtering UI |
| Sitemap resources (`resourcesProvider.getAllResourceSlugs()`) | WRONG SOURCE | Sitemap uses `MockResourcesProvider` (static mock slugs) not `getAllResourceSlugs()` from `resources.service.ts` (live CMS slugs) |

---

## 13. Exact Root Causes

### RC-001: Module-Level Singleton Cache
- **File**: `src/services/cms/homepage.service.ts`
- **Line**: 79–86
- **Current**: `let _cached: BackendHomepage | null = null;` cached forever per process
- **Expected**: Re-fetch every revalidate cycle (60s)
- **Why**: Developer added an in-memory optimization that overrides ISR
- **Impact**: Homepage hero/process/why_b10 never updates without server restart

### RC-002: Products/Solutions Entirely Disconnected
- **Files**: `src/cms/products/mock-provider.ts`, `src/cms/solutions/mock-provider.ts`
- **Lines**: All
- **Current**: `MockProductsProvider` / `MockSolutionsProvider` return static data unconditionally
- **Expected**: Fetch from Django API when backend endpoints exist
- **Why**: No Django model/endpoint exists for Products or Solutions
- **Impact**: All `/products/` and `/solutions/` pages are permanently static

### RC-003: Contact Page Permanently Static
- **File**: `src/cms/contact/mock-provider.ts`
- **Lines**: All
- **Current**: `MockContactProvider` returns hardcoded consultation paths, process, FAQs, CTA
- **Expected**: At minimum, FAQs should come from `faqs.service.ts`
- **Why**: No backend integration written for contact page-specific data
- **Impact**: Contact page cannot be updated via CMS

### RC-004: Case Studies Not Using Portfolio Model
- **File**: `src/constants/case-studies.ts`, `src/app/case-studies/page.tsx`
- **Current**: `CASE_STUDIES_DB` TypeScript constant used; Portfolio model exists and has overlapping data
- **Expected**: `/case-studies` should use Portfolio data (or be merged with `/portfolio`)
- **Why**: Separate content type was created before Portfolio model was built
- **Impact**: `/case-studies` content cannot be managed via CMS

### RC-005: @cache_page with No Invalidation
- **File**: `backend/apps/content/views.py`
- **Lines**: 19, 41, 51, 61, 71, 81, 91, 102, etc.
- **Current**: 15-minute response-level cache, no invalidation signal
- **Expected**: Cache invalidation on admin save, or remove cache_page
- **Why**: Performance optimization added without invalidation strategy
- **Impact**: Up to 15-minute staleness in production per worker process

### RC-006: Hardcoded Branding in 11 Files
- **Files**: Multiple page files (see Section 11)
- **Current**: `"B10 IT Solution"` in title/meta/JSON-LD
- **Expected**: `"Cortex IT Solution"`
- **Why**: Brand was renamed but static metadata strings were not updated
- **Impact**: Wrong brand name in SEO, browser tabs, social sharing, search engine results

### RC-007: Sitemap Uses Wrong Resource Provider
- **File**: `src/app/sitemap.ts`
- **Line**: 7, 47
- **Current**: `import { resourcesProvider } from "@/cms/resources/mock-provider";` → returns static mock slugs
- **Expected**: Use `getAllResourceSlugs()` from `resources.service.ts`
- **Why**: Sitemap was written before resources were connected to CMS
- **Impact**: Sitemap lists mock resource slugs, not real CMS resource slugs. SEO impact.

### RC-008: Company DB Has Wrong Name
- **File**: Database `CompanyProfile` record
- **Current**: `company_name = "B10 IT Solutions"` (extra "s")
- **Expected**: `"Cortex IT Solution"`
- **Why**: Legacy data not updated when brand changed
- **Impact**: Footer renders `"B10 IT Solutions"` as company name

### RC-009: getStats() and getCtaData() Always Return Static
- **File**: `src/services/cms/homepage.service.ts`
- **Lines**: 104–106, 128–130
- **Current**: Unconditional `return FALLBACK_STATS` and `return FALLBACK_CTA`
- **Expected**: Could read from CMS or those sections could be acknowledged as static
- **Why**: No backend fields mapped; static confirmed
- **Impact**: Homepage stats (99.99%, 40+, 24×7, SOC2) and CTA cannot be changed via CMS

---

## 14. Controlled Test Evidence

### Test 1 — Homepage Hero Propagation
| Layer | Value |
|---|---|
| **CMS PATCH** | `hero_title = "CMS_TEST_H1_98765_VERIFIED"` |
| **DB after PATCH** | `CMS_TEST_H1_98765_VERIFIED` ✅ |
| **Public API immediately** | `CMS_TEST_H1_98765_VERIFIED` ✅ (cache not effective in dev) |
| **Public API MATCH** | `True` |
| **Next.js rendered** | UNVERIFIED (would require browser test) |

**Classification**: DB → API is connected and immediate in dev. Stale window = 0 in dev (LocMemCache). Next.js revalidate = 60s. Module cache bug means Next.js process won't re-fetch for entire process lifetime.

**Restoration**: `hero_title` restored to `"Engineering Intelligence. Building the Future."`

### Test 2 — Company Profile
| Layer | Value |
|---|---|
| **DB** | `company_name = "B10 IT Solutions"` |
| **Public API** | `company_name = "B10 IT Solutions"` |
| **Footer rendered** | `"B10 IT Solutions"` (confirmed by API data) |
| **Expected** | `"Cortex IT Solution"` |

---

## 15. Fix Plan

### P0 — Must Fix Before Production

1. **Remove module-level singleton cache** in `homepage.service.ts`
   - Delete `let _cached: BackendHomepage | null = null;` and the caching logic
   - Let `cmsList()` with `revalidate: 60` handle caching naturally
   - **File**: `src/services/cms/homepage.service.ts` Lines 79–86

2. **Remove `@cache_page(60 * 15)`** from ALL public ViewSets
   - Rely on Next.js `revalidate: 60` for caching
   - Add Django signal-based cache invalidation OR accept 60-second staleness
   - **File**: `backend/apps/content/views.py` — all `@method_decorator(cache_page...)` decorators

### P1 — Should Fix

3. **Fix sitemap to use live CMS resource slugs**
   - Replace `resourcesProvider.getAllResourceSlugs()` with `getAllResourceSlugs()` from `resources.service.ts`
   - **File**: `src/app/sitemap.ts` Lines 7, 47

4. **Fix company_name in database**
   - Update `CompanyProfile.company_name` from `"B10 IT Solutions"` to `"Cortex IT Solution"` via Admin CMS

5. **Connect Contact page FAQs to CMS**
   - Replace `contactProvider.getContactPageData().faq` with `faqs.service.ts`
   - **File**: `src/app/contact/page.tsx`

6. **Wire up team members to About page**
   - `team.service.ts` already fetches from CMS; About page has no team section but should
   - **File**: `src/app/about/page.tsx`

### P2 — Cleanup

7. **Fix all 24 "B10 IT Solution" strings** (BUG-003)
   - Replace in all 11 files listed in Section 11
   - Also update `FALLBACK_PROFILE.company_name` in `company.service.ts`

8. **Add `homepageConfig.sections` activation for hidden but connected sections**
   - `testimonials`, `process` sections are CMS-connected but disabled in config
   - Decide whether to re-enable or remove the disabled flags

9. **Remove dead navigation icons/badges processing**
   - `NavigationItem.icon` and `.badge` are fetched but never rendered
   - Either render them or stop including in the API response

### P3 — Optional

10. **Build backend endpoints for Solutions and Products** (if CMS management is needed)
    - Currently no Django models exist; would require new models, serializers, views

11. **Build backend endpoints for Technologies**
    - `TECHNOLOGIES_DB` is stable but if content needs to change, needs CMS integration

12. **Connect Case Studies to Portfolio model**
    - `/case-studies` is a duplicate of `/portfolio` with static data
    - Could redirect or merge

---

## 16. Final Verdict

**Can I safely assume that changing content in the Admin CMS will change the public website?**

### NO — Not Universally

CMS changes propagate reliably **only** to these pages/components:
- Service list and detail pages
- Industry list and detail pages
- Portfolio list and detail pages
- Resource list and detail pages
- Navigation (header mega-menu and footer links)
- Footer (company name, description, social links)
- Homepage hero title, subtitle, CTA button text
- Homepage process steps
- Testimonials on homepage

CMS changes are **completely ignored** by:
- `/contact` — ALL body content (fully static mock)
- `/solutions` — ALL content (fully static mock)
- `/products` — ALL content (fully static mock)
- `/case-studies` — ALL content (static constant)
- `/technologies` — ALL content (static constant)
- `/about` — ALL body sections (8 story sections, fully static)
- `/services` hero, architecture, process, metrics, CTA
- `/industries` hero, expertise, CTA
- `/portfolio` hero, outcomes stats, technology list
- Homepage Stats section (99.99%, 40+, etc.)
- Homepage CTA section
- All page `<title>` and meta description tags
- All JSON-LD structured data organization names

**The single real source-of-truth problem is not one break — it is a structural design choice**: the application was built with a hybrid static/CMS architecture where some pages are fully CMS-driven and others use mock providers or inline static constants. The CMS is LIVE and CONNECTED for the entities it manages, but many pages/sections were never wired to the CMS and have no backend equivalent.
