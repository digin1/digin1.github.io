---
title: "SynapticConnectDB — Synaptic Connection Database"
date: "2025-01-15"
featured: false
category: "research"
summary: "A full-stack database application for exploring synaptic connection data through charts, flow diagrams, and searchable records. It turns a large connectivity dataset into a navigable research interface instead of leaving it trapped in raw tables."
image: ""
tag: "React, Flask, SQLAlchemy, Tailwind CSS, Recharts, Docker, Redis"
role: "Lead Developer"
duration: "3 months"
problem: "Researchers needed a way to query and visualise synaptic connection data without working directly from raw tables, database files, or one-off analysis notebooks."
scope: "Built the React + Flask application, interactive visualisation layer, export paths, caching, and production deployment around a large SQLite dataset."
outcome: "Turned a connectivity dataset into a usable research interface with charts, diagrams, and downloadable results."
highlights:
  - "React frontend with charts, flow diagrams, and filterable views for connectivity exploration"
  - "Flask API querying a 770MB+ SQLite database with caching and export support"
  - "Production deployment using Docker Compose, Nginx, SSL, and Redis"
visibilityNote: "This case study focuses on data modelling, query surfaces, and interface architecture rather than reproducing the underlying research dataset."
---

## Project Overview

SynapticConnectDB is a research database platform for exploring synaptic connection data. It provides interactive visualisations and a searchable interface for researchers studying how neurons connect and communicate across brain regions.

## Project Details

### Technologies Used

* React 18 with React Router
* Tailwind CSS
* Recharts (data visualisation)
* XYFlow (interactive flow diagrams)
* Framer Motion (animations)
* Flask (Python) REST API
* SQLAlchemy + SQLite (~770MB database)
* Redis (caching)
* Docker Compose (production deployment)
* Nginx (reverse proxy)
* Gunicorn (WSGI server)

### Key Features

* **Interactive Data Visualisation**: Charts and flow diagrams showing synaptic connectivity patterns
* **Searchable Database**: Query synaptic connections across brain regions and cell types
* **CSV Export**: Download filtered datasets for downstream analysis
* **Real-Time Statistics**: Live tracking of database metrics and usage
* **Responsive UI**: Modern component library with Lucide icons and animations
* **Containerised Deployment**: Docker Compose with SSL configuration for production

## Technical Highlights

* **Full-Stack Architecture**: Decoupled React SPA communicating with Flask REST API
* **Large Dataset Handling**: Efficient queries against a 770MB+ SQLite database with pandas integration
* **Production-Ready**: Docker Compose with Nginx reverse proxy, SSL termination, and Redis caching
