# CRM & Inbound Lead Pipeline — Cortex Platform

**Subsystems:** Lead Capture & Enterprise CRM (`apps.leads`, `apps.crm`, `apps.business`)  
**Architecture Pattern:** CQRS Command Execution (`lead_commands.py`)  
**Status:** Canonical Reference

---

## 1. Inbound Lead Ingestion & Stage Progression

```
                           PUBLIC CLIENT / USER
                                     │
                                     ▼
         ┌────────────────────────────────────────────────────────┐
         │  Public Form / Chatbot Ingestion                       │
         │  `POST /api/v1/public/leads/`                          │
         └───────────────────────────┬────────────────────────────┘
                                     │ Validation + Rate Limiting
                                     ▼
         ┌────────────────────────────────────────────────────────┐
         │  CQRS Ingestion Command (`lead_commands.py`)           │
         │  • Enforces schema validation and honeypot check       │
         │  • Creates `leads.Lead` entity (Initial stage: `NEW`)  │
         │  • Logs activity timeline event                        │
         └───────────────────────────┬────────────────────────────┘
                                     │
                                     ▼
         ┌────────────────────────────────────────────────────────┐
         │  Async Celery Tasks                                    │
         │  • Sends internal Slack / Email alert                  │
         │  • Triggers AI lead scoring & enrichment               │
         └───────────────────────────┬────────────────────────────┘
                                     │
                                     ▼
                     ADMIN KANBAN PIPELINE MANAGEMENT
  ┌──────────┐    ┌─────────────┐    ┌───────────────┐    ┌─────────────┐    ┌──────────┐
  │   NEW    │ ─> │  QUALIFIED  │ ─> │ PROPOSAL_SENT │ ─> │ NEGOTIATION │ ─> │   WON    │
  └──────────┘    └─────────────┘    └───────────────┘    └─────────────┘    └──────────┘
```

---

## 2. Pipeline Lifecycle Stages

| Stage Code | Stage Name | Trigger / Business Action | Next Steps |
|---|---|---|---|
| `NEW` | Inbound Ingestion | Ingested from contact form, consultation request, or AI chat. | Initial review by Sales Lead. |
| `QUALIFIED` | Opportunity Verified | Scope, enterprise budget, and delivery timelines validated. | Company and Contact records created in CRM. |
| `PROPOSAL_SENT` | Architecture Proposed | Technical proposal, architecture blueprint, and SOW sent. | Follow-up review scheduled. |
| `NEGOTIATION` | Contract Review | Legal, compliance (SOC2/GDPR), and SLA terms finalized. | Final signature pending. |
| `WON` | Engagement Active | Contract executed; converted to active Project in CRM. | Engineering onboarding initiated. |
| `LOST` | Disqualified / Closed | Project cancelled or prospect disqualified. | Reason logged for win/loss analytics. |

---

## 3. Security & Anti-Abuse Measures

- **Honeypot Traps**: Forms include a hidden `honeypot` field; submissions containing text in this field are silently dropped.
- **Strict Rate Limiting**: Maximum 5 lead submissions per 15-minute window per IP address.
- **Input Sanitization**: All form inputs undergo strict validation to prevent injection or malicious payloads.
