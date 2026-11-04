---
title: "Cortex — AI Memory & Agent Fleet Management"
seoTitle: "Cortex: AI Memory & Agent Management"
seoDescription: "Open-source memory and agent management for AI coding, with hybrid search, ChromaDB, Claude Code hooks, MCP tools, reminders and persistent plans."
date: "2026-10-27"
featured: false
category: "personal"
summary: "An open-source memory and agent-management system for AI coding workflows. Cortex combines project-aware recall, hybrid search, agent lifecycle management, skill discovery, reminders, and persistent plans, with Claude Code hooks and a reusable MCP server."
image: "/images/cortex-demo.jpg"
imageAlt: "Illustrative Cortex demo showing a recalled project preference guiding a new Claude Code session"
imageCaption: "Illustrative recall demo from the Cortex repository"
tag: "Python, Bash, ChromaDB, MCP, Sentence Transformers, BM25, AI, Developer Tools"
github: "https://github.com/digin1/cortex"
role: "Creator & Developer"
problem: "AI coding sessions lose useful project context, repeat past mistakes, and leave agent instructions and unfinished work scattered across conversations."
scope: "Developed a persistent memory layer, hybrid retrieval pipeline, local MCP server, session hooks, agent and skill management, and separate reminder and plan stores."
outcome: "A reusable open-source system that carries project knowledge and ongoing work across coding sessions, with automatic lifecycle integration for Claude Code and tool access for other MCP clients."
highlights:
  - "Project-aware recall combining vector search, BM25 keyword retrieval, reciprocal rank fusion, and cross-encoder reranking"
  - "Agent creation, evaluation, updates, and retirement informed by accumulated knowledge and usage"
  - "Separate stores for memories, reminders, and multi-session plans, exposed through a local MCP server"
visibilityNote: "Independent developer tooling, released under the MIT licence. This case study describes the public repository at its 27 October 2026 revision; the project image is an illustrative demo from that repository."
---

## The idea

Cortex gives AI coding workflows a persistent layer of project knowledge. Instead of reconstructing conventions, decisions, and past corrections at the start of each conversation, an agent can retrieve relevant context and continue working with it.

The system brings together memory, agent management, skill discovery, and ongoing work tracking. Claude Code hooks connect these capabilities to the session lifecycle, while a local Model Context Protocol (MCP) server makes the underlying tools available to other compatible coding clients.

## Project-aware memory

Memories are stored in ChromaDB with types, tags, and project metadata. The recall flow identifies the current project and retrieves relevant knowledge before a prompt is processed. A context-injection path also supplies relevant knowledge when a subagent starts.

Memory types distinguish project decisions, user preferences, feedback, and reference material. This supports a store that can retain both technical context and the corrections that should influence future work.

The learning flow gives the coding agent an opportunity to save useful knowledge as a session concludes. Other hooks support context compaction, session summaries, and cleanup.

## Hybrid retrieval

Coding context contains both conceptual knowledge and exact identifiers: filenames, flags, commands, and node names. Cortex combines several retrieval signals to handle that mix:

1. **Dense retrieval:** ChromaDB searches vector embeddings for semantically related memories.
2. **Keyword retrieval:** BM25 retrieves documents containing matching tokens, including identifiers that semantic search can miss.
3. **Rank fusion:** reciprocal rank fusion combines the candidate lists.
4. **Reranking:** a cross-encoder reorders the fused candidates before the final results are returned.

The retrieval code degrades gracefully when individual components are unavailable. Fused results can be used without a reranker, and either dense or keyword retrieval can supply candidates if the other path fails.

Embeddings use `Alibaba-NLP/gte-modernbert-base`, served through a warm local sidecar to avoid repeatedly loading the model. The embedding integration also provides an in-process fallback using the same model and normalisation settings.

## An agent fleet that can evolve

Cortex can propose agents from accumulated project knowledge and recurring patterns in conversations. Usage tracking and evaluation feed a lifecycle that includes creating, updating, and retiring agent definitions.

Agent updates create backups, and retired agents are moved into a separate archive. Project and global scopes allow specialised knowledge to remain close to the work it belongs to.

Skill discovery follows a related pattern: detect the project's technology stack, identify useful capabilities, and generate slash-command skills. Cooldowns, per-run limits, and overwrite protection constrain automated changes.

## Memories, reminders, and plans

Cortex separates three kinds of persistent information:

| Store | Purpose |
|---|---|
| Memories | Facts, preferences, corrections, and reference knowledge |
| Reminders | Individual obligations with due dates, relevance matching, and completion states |
| Plans | Goals and checklists that can progress across multiple sessions |

Keeping these in separate collections prevents knowledge consolidation from merging distinct obligations or plans. Reminders surface within coding sessions through due lists and subject matching. Plans retain checklist progress and distinguish active work from future work.

Reminder delivery happens during a session; it does not run as an external alarm or notification service.

## Integration and operational controls

The implementation combines Python modules, Bash hooks, ChromaDB, and an MCP server. Claude Code receives automatic recall and lifecycle integration through its hooks. Other MCP-compatible clients, including Codex CLI and OpenCode, can call the memory, reminder, and plan tools through the same local server; their automation depends on the client's configuration.

The repository documents controls for maintaining the system over time:

- Audit records for memory operations and archived content for deleted memories.
- Duplicate detection, merge tracking, recall statistics, and consolidation.
- Stale-path flags that preserve the underlying memory.
- Path validation and filename sanitisation for generated agents.
- Backups before agent updates and an archive for retired agents.
- Cooldowns, process locks, and limits for automated background work.

## Source and documentation

Cortex is available under the MIT licence. The public repository includes installation instructions, hook configuration, embedding-service documentation, and tests for persistent plans.

- [Source code and README](https://github.com/digin1/cortex)
- [Embedding service and hybrid retrieval documentation](https://github.com/digin1/cortex/blob/main/config/cortex-embed-service.md)
- [Plan implementation tests](https://github.com/digin1/cortex/blob/main/tests/test_plans.py)

This case study is based on repository revision [`3c480b9`](https://github.com/digin1/cortex/tree/3c480b9440823f563606183ce143e53928933fee), dated 27 October 2026.
