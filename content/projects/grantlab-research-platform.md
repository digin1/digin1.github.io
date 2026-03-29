---
title: "Grant Lab Research Platform"
date: "2024-06-01"
featured: true
featuredOrder: 2
category: "research"
summary: "A distributed research software platform for microscopy processing and synaptome analysis at the University of Edinburgh. It combines web applications, queueing, orchestration, GPU-enabled pipelines, and internal tools into one operational system that supports day-to-day neuroscience workflows."
image: ""
tag: "Flask, Docker Swarm, Celery, Dask, Redis, MySQL, Python, CUDA, Three.js"
role: "Lead Developer & Infrastructure Architect"
duration: "2+ years (ongoing)"
problem: "The lab needed more than scripts. It needed a reliable platform that could turn raw microscopy data into repeatable analysis across multiple tools, services, and users."
scope: "Built and operated the distributed platform, analysis services, orchestration, internal tools, and deployment workflows that sit behind multiple microscopy and synaptome pipelines."
outcome: "It became the backbone for day-to-day microscopy processing in the lab and supports workflows that feed published research."
highlights:
  - "Docker Swarm platform coordinating web apps, task queues, Dask workers, storage, and GPU-enabled processing"
  - "10+ internal research tools brought under one operational platform"
  - "Used in live workflows for conversion, ROI analysis, segmentation, detection, and heatmap generation"
visibilityNote: "Large parts of this platform are internal to the lab. This case study focuses on architecture, workflow design, and engineering patterns rather than internal interfaces."
---

## Overview

The Grant Lab Research Platform is the operational layer behind a large part of the microscopy processing work in the Seth Grant Lab. It is not a single tool. It is a research software platform that brings together services, data workflows, internal interfaces, and compute orchestration so researchers can move from raw microscopy data to analysis-ready outputs.

This is one of the strongest examples of my systems range because it combines product engineering, infrastructure, workflow design, and ongoing operations in one environment.

## Problem

Research labs often accumulate scripts, desktop tools, and disconnected processing steps over time. That works until scale, reproducibility, collaboration, and maintenance start to matter more than one-off execution.

The problem here was to create a platform that could:

- coordinate long-running and heterogeneous microscopy workflows
- support multiple internal tools without every new feature becoming operational chaos
- use distributed and GPU-enabled processing where needed
- remain maintainable for real researchers using it day to day

## What I Built

I built and evolved the platform as both an application layer and an operational system. That included:

- A Flask-based application layer with multiple route blueprints and internal tool surfaces
- Distributed task execution using Celery and Dask
- MySQL, Redis, and queue-backed background processing
- Docker Swarm orchestration for multi-service deployment
- Integration points for GPU-enabled and domain-specific processing tools
- Operational patterns for testing, deployment, migrations, and service management

The platform also became the place where related tools could live together coherently: ROI workflows, converters, segmentation, detection pipelines, heatmap generation, and supporting utilities.

## Architecture and Technical Decisions

### Service orchestration

The platform runs as an orchestrated set of services, including:

- web application layer
- Celery workers
- Dask scheduler and workers
- MySQL
- Redis
- reverse proxy and deployment edge services
- supporting internal tools such as ROI interfaces

### Workflow design

The key architectural decision was to treat the lab's processing environment as a platform rather than as a set of separate scripts. That made it possible to standardise:

- how jobs are submitted and tracked
- how results are stored and handed off
- how new tools are added
- how compute-heavy steps are moved onto the right execution layer

### Operational quality

This is not just a prototype stack. It needed to be stable enough for repeated use and flexible enough for new research workflows. Testing, deployment, migrations, and maintainability mattered as much as feature delivery.

## Constraints

The platform had to absorb a difficult mix of requirements:

- long-running microscopy jobs
- heterogeneous scientific tools and dependencies
- internal users with very practical workflow needs
- infrastructure that had to stay maintainable in a real research environment

It also had to support scale: large datasets, many processing stages, and multiple tools sharing a common operational base.

## Outcome

The Grant Lab Research Platform became the backbone for microscopy processing and related research tooling in the lab. It supports workflows that feed published work, reduces operational fragmentation, and creates a durable foundation for adding new tools without rebuilding the stack each time.
