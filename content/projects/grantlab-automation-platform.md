---
title: "Grant Lab Automation — AI Workflow Platform"
date: "2025-03-10"
featured: false
category: "research"
summary: "An internal AI workflow platform with a visual builder for composing repeatable multi-step automations. It supports multiple model providers, real-time execution tracking, file processing, and administrative controls in one system."
image: ""
tag: "Next.js, FastAPI, PostgreSQL, Docker, WebSocket, AI, Zustand"
role: "Lead Developer"
duration: "1 month"
problem: "Researchers needed a way to compose repeatable AI-assisted workflows without rebuilding prompts, file handling, execution tracking, and provider integrations each time."
scope: "Built the full-stack platform: workflow designer, provider abstraction layer, WebSocket execution tracking, file processing, admin tooling, and deployment."
outcome: "Turned experimental AI-assisted tasks into a controllable internal platform instead of a scattered collection of one-off scripts."
highlights:
  - "Visual workflow designer for multi-step AI runs"
  - "Supports Claude, OpenAI, and Gemini behind a unified execution layer"
  - "WebSocket execution tracking, file handling, admin controls, and audit logging"
visibilityNote: "This is an internal workflow system. The case study focuses on platform design, provider abstraction, and execution control rather than private workflow definitions."
---

## Project Overview

A full-stack AI workflow orchestration platform built to automate research tasks at the Grant Lab. Provides a visual interface for designing multi-step AI workflows, executing them in real-time, and managing results — all with enterprise-grade authentication and audit logging.

## Project Details

### Technologies Used

* Next.js 14 (frontend with Tailwind CSS)
* FastAPI (Python backend)
* PostgreSQL 15 (database)
* Zustand (state management)
* WebSocket (real-time execution updates)
* JWT + bcrypt (authentication)
* Docker Compose (deployment)

### Key Features

* **Visual Workflow Designer**: Drag-and-drop interface for composing multi-step AI workflows
* **Multi-AI Provider Support**: Integrates Claude (Anthropic), OpenAI, and Google Gemini
* **Real-Time Execution**: WebSocket-based live progress tracking during workflow runs
* **File Processing**: Upload and process files through AI-powered pipelines
* **Admin Panel**: User management, API key configuration, system settings, and audit logs
* **Security**: JWT authentication with bcrypt password hashing

## Technical Highlights

* **Full-Stack Architecture**: Decoupled Next.js frontend and FastAPI backend communicating via REST + WebSocket
* **Multi-Provider Abstraction**: Unified interface across Claude, OpenAI, and Gemini APIs
* **Production-Ready**: Dockerised deployment with PostgreSQL persistence and environment-based configuration
