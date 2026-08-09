# Chatbot & Conversational AI Architecture — Cortex Platform

**Subsystem:** Cortex AI Consultant & Knowledge Engine (`apps/chatbot`, `apps/intelligence`)  
**LLM Gateway:** OpenRouter API  
**Status:** Canonical Reference

---

## 1. AI Conversational Pipeline Architecture

The Cortex Chatbot employs a modular, 6-stage Retrieval-Augmented Generation (RAG) pipeline that completely separates intent detection, knowledge retrieval, and LLM inference:

```
                                USER MESSAGE
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  1. INTENT DETECTION (`intent_detector.py`)              │
        │  Classifies intent: Technical, Pricing, Lead, FAQ        │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  2. QUERY PLANNING (`query_planner.py`)                  │
        │  Formulates targeted search vectors from user input      │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  3. KNOWLEDGE RETRIEVAL (`knowledge_provider.py`)        │
        │  Fetches relevant KnowledgeEntry & Service capabilities  │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  4. CONTEXT & PROMPT COMPOSITION (`prompt_builder.py`)   │
        │  Combines Persona + Grounded Knowledge + History         │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  5. LLM ORCHESTRATION (`chat_service.py` via OpenRouter) │
        │  Executes deterministic completion with token limits     │
        └────────────────────────────┬─────────────────────────────┘
                                     │
                                     ▼
        ┌──────────────────────────────────────────────────────────┐
        │  6. SESSION & LEAD HOOKS (`ConversationSession`)         │
        │  Persists message, checks lead capture thresholds        │
        └──────────────────────────────────────────────────────────┘
```

---

## 2. Subsystem Components & Responsibilities

| Component | Module Path | Purpose |
|---|---|---|
| **Intent Detector** | `apps.chatbot.services.intent_detector` | Categorizes intent to apply specific conversational rules (e.g. Sales qualification vs. Technical deep dive). |
| **Query Planner** | `apps.chatbot.services.query_planner` | Extracts domain entities and keywords to query the knowledge base accurately. |
| **Knowledge Provider**| `apps.chatbot.services.knowledge_provider` | Pulls verified facts from `knowledge_base.KnowledgeEntry` and CMS entities. |
| **Prompt Builder** | `apps.chatbot.services.prompt_builder` | Enforces enterprise brand voice, anti-hallucination guardrails, and markdown formatting rules. |
| **Chat Service** | `apps.chatbot.services.chat_service` | Manages OpenRouter HTTP client, error handling, retry backoff, and token budgeting. |
| **Session Model** | `apps.chatbot.models.ConversationSession` | Tracks ongoing session state, user contact details, and message histories. |

---

## 3. Security & Anti-Hallucination Guardrails

1. **Strict Context Grounding**: The prompt builder instructs the LLM to only answer based on provided knowledge context. If the requested information is absent, the bot politely directs the user to book a consultation.
2. **Rate Limiting**: Throttled to 20 messages per minute per session to prevent API abuse and token exhaustion.
3. **Zero Secrets in Client**: All LLM API keys remain securely on the Django server (`OPENROUTER_API_KEY`); the client only communicates with the Django API endpoint (`POST /api/v1/chatbot/message/`).
