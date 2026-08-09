# Testing & Quality Assurance Guide — Cortex Platform

**Frameworks:** Pytest, Django Test Runner, Playwright, Node/Next Test Utilities  
**Status:** Canonical Reference

---

## 1. Testing Pyramid & Quality Gates

The Cortex Platform enforces a rigorous multi-tier testing strategy across all codebases:

```
                          ▲
                         / \
                        / E2E \        Playwright & Route Nav Tests
                       /-------\       (test_navigation_routes.py)
                      /  API &  \      API Regression Checklist & DRF View Tests
                     /Integration\     (test_auth.py, test_cms_api.py)
                    /-------------\
                   /  Unit Models  \   ORM Models, Services & Command Tests
                  /  & Selectors    \  (apps/*/tests/)
                 /-------------------\
```

---

## 2. Test Execution Commands

### Backend Pytest Suite (`b10backend/backend`)
```bash
# Run all backend unit & integration tests
pytest

# Run tests with coverage report
pytest --cov=apps --cov-report=term-missing

# Run specific domain test module
pytest apps/accounts/tests/test_auth.py
pytest apps/leads/tests/test_leads.py
pytest apps/chatbot/tests/test_chatbot.py
```

### Route & Navigation Integration Tests (`b10itsolution`)
```bash
# Run Python navigation route verification against Next.js app
python test_navigation_routes.py
```

---

## 3. Regression Testing Checklist

| Test Category | Target Subsystem | Verification Criteria | Test Module |
|---|---|---|---|
| **Authentication Flow** | `apps.accounts` | CookieJWT login, token refresh, logout blacklist, 401 handling. | `test_auth.py` |
| **Lead Capture & CQRS** | `apps.leads` | Schema validation, honeypot rejection, stage creation. | `test_leads.py` |
| **CMS Data Fetching** | `src/services/cms/*` | Parallel fetching, ISR revalidation, static fallback recovery. | `test_cms.py` |
| **Chatbot RAG Pipeline** | `apps.chatbot` | Intent detection, prompt building, OpenRouter error handling. | `test_chatbot.py` |
| **RBAC Authorization** | `apps.role_management`| Permission checks prevent unauthorized mutations. | `test_roles.py` |
