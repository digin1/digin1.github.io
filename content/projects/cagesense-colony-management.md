---
title: "CageSense — AI-Powered Mouse Colony Management System"
date: "2025-03-15"
featured: false
featuredOrder: 5
category: "research"
summary: "A full-stack colony management platform for transgenic mouse facilities, with AI-assisted querying and approval-gated updates. It replaces spreadsheet-heavy tracking with a centralised system for mice, matings, litters, cages, genotypes, reporting, and audit history."
image: ""
tag: "Next.js, FastAPI, PostgreSQL, OpenAI Agents, Docker, Celery, Redis, TypeScript"
role: "Lead Developer"
duration: "2 months"
problem: "The breeding facility needed more than spreadsheets. It needed auditable colony tracking, controlled data updates, and faster querying across mice, matings, cages, litters, and genotypes."
scope: "Built the full platform across Next.js, FastAPI, PostgreSQL, background jobs, authentication, reporting, audit logging, and the AI-assisted query/update workflow."
outcome: "Centralised colony operations, improved traceability, and introduced practical AI assistance without giving up approval control."
highlights:
  - "Tracks mice, matings, litters, cages, genotypes, cryostorage, and lifecycle state in one system"
  - "AI assistant built with the OpenAI Agents SDK for natural-language querying and staged proposed updates"
  - "8-service Docker Compose deployment with Celery, Redis, automated reports, and full audit history"
visibilityNote: "This is an internal institutional platform. The case study focuses on workflow design, system architecture, and operational controls rather than exposing facility data."
---

## Project Overview

CageSense is a web-based colony management system built for the Grant Lab at the University of Edinburgh to manage all aspects of a transgenic mouse breeding facility. It replaces spreadsheet-based tracking with a centralised database, AI-powered query interface, automated reporting, and full audit logging for regulatory compliance.

## Project Details

### Technologies Used

* Next.js 15 (React 19, TypeScript)
* FastAPI (async Python backend)
* PostgreSQL 16 (SQLAlchemy 2.0 with asyncpg)
* OpenAI Agents Python SDK (multi-agent orchestration)
* Celery + Redis (async job queue with scheduled tasks)
* Alembic (database migrations)
* Docker Compose (8 orchestrated services)
* Nginx (reverse proxy)
* TanStack React Table + React Query
* Recharts (data visualisation)
* Zustand (state management)
* JWT + bcrypt (authentication)
* Playwright (E2E testing)

### Architecture

8 Docker Compose services on a custom bridge network:

1. **Nginx** — Reverse proxy (port 8080)
2. **Frontend** — Next.js 15 application
3. **Backend** — FastAPI with async SQLAlchemy
4. **PostgreSQL** — Persistent database
5. **Redis** — Cache and Celery message broker
6. **Celery Worker** — Async job processor
7. **Celery Beat** — Scheduled task scheduler (daily reports)
8. **Health Checks** — Monitoring across all services

### Key Features

#### Core Data Management
* **Mouse Tracking**: Unique IDs, sex, DOB/DOD, ear marks, genotype, status lifecycle (alive → in_mating → culled/dead/transferred)
* **Breeding Lines**: Background strains, colony codes, gene/clone info, active/frozen status
* **Mating Records**: Setup, plugging, litter tracking with pup counts by sex
* **Cage Management**: Occupancy monitoring, location tracking, line association
* **Genotype Tracking**: Homozygous, heterozygous, wild-type distribution with allele management
* **Cryopreservation**: Frozen sperm/embryo sample tracking

#### AI Chat Assistant
* Natural language queries against the colony database (no SQL needed)
* **OpenAI Agents SDK** with multi-agent orchestration and guardrails
* Staged proposed updates — AI suggests changes, researchers approve in the UI
* File attachments with OCR support (Excel, PDF, images)
* Streaming responses via Server-Sent Events
* Execution logging and response quality tripwires
* Persistent conversation history and user memory

#### Reporting & Analytics
* Automated daily reports via Celery Beat
* Dashboard with colony overview charts (Recharts)
* Excel/CSV/PDF export of mice, matings, cages, litters
* Bulk data import from Excel spreadsheets

#### Admin & Compliance
* Role-based access control (admin, write, read)
* Complete audit trail for all data mutations
* Admin impersonation with auto-expiry
* Configurable alert rules with dashboard
* Transaction ID tracking with undo capability

## Technical Highlights

* **AI-Augmented Workflow**: Researchers can ask natural language questions like "show me all unmated females from the APP line" or "set up a new mating with mouse 1234 and 5678" — the AI translates to database operations with approval gates
* **Full Async Stack**: FastAPI + asyncpg + Celery for non-blocking operations across the entire backend
* **Institutional Integration**: SMTP configured for University of Edinburgh mail relay
* **Data Integrity**: Reconciliation service for data integrity checks, import quality scoring, and validation with helpful error messages

## Impact

Centralises colony management for a research breeding facility, eliminating spreadsheet chaos and enabling regulatory compliance through automated audit trails. The AI assistant significantly reduces the time researchers spend on data entry and querying.
