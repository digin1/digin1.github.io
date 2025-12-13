---
title: "SynaptopathyDB - A Comprehensive Resource for Synaptopathy Research"
date: "2025-06-27"
featured: true
featuredOrder: 2
category: "research"
summary: "A comprehensive web platform for exploring synaptic protein-disease relationships, integrating data from 64 proteomic studies to facilitate research into synaptopathies. Developed as lead web developer for University of Edinburgh researchers, featuring advanced search interfaces, interactive visualizations, and RESTful API access."
image: "/images/synaptopathydb.png"
tag: "React, Flask, Python, SQLite, Tailwind CSS, REST API, Data Visualization"
demo: "https://www.synaptopathydb.org"
role: "Lead Web Developer"
duration: "6 months"
---

## Project Overview

SynaptopathyDB is an online resource designed to facilitate research into the genetic basis and clinical manifestations of synaptopathies — brain and behavioural disorders caused by mutations in genes encoding synaptic proteins. The platform integrates data from 64 mammalian synapse proteomic studies with multiple genetic and phenotypic resources, enabling researchers to explore connections between synaptic proteins, genetic variants, and human disease phenotypes.

## Project Details

### Technologies Used

* React.js
* Tailwind CSS
* Flask (Python)
* Flask-SQLAlchemy
* SQLite
* Recharts (Data Visualization)
* Docker
* nginx
* RESTful API

### Key Features

* **Gene Search Interface**: Comprehensive exploration of individual genes with detailed information including multiple species identifiers, associated publications, disease associations, mutation details, and synaptic compartment localization
* **Disease Search Interface**: Explore diseases and their associated synaptic genes with detailed mutation information, publication links, and downloadable reports
* **Publication Search**: Retrieve scientific publications with gene-disease connections, with filtering by associated genes and mutations
* **Autocomplete Search**: Real-time suggestions supporting multiple identifier types including Human/Mouse/Rat Entrez, MGI, Ensembl ID, and gene aliases
* **Interactive Data Visualizations**: Disease classification trends, protein localization history, discovery rate analyses, and compartment-specific protein distributions
* **CSV Data Export**: Structured datasets including synapse proteome lists for further analysis
* **RESTful API**: Programmatic access to raw data and complex queries with full documentation
* **Consensus Filtering**: Filter results by protein localization within synaptic compartments

### Development Process

As lead web developer, I built the full-stack web application while collaborating with researchers at the University of Edinburgh who provided the underlying databases and scientific data.

#### Frontend Architecture

Built a modular React.js application with custom hooks for reusable logic:

* **Custom Hooks**:
  * `useSearch` - Manages search state, autocomplete suggestions with debouncing (300ms), pagination, and tab data loading
  * `useConsensusFilter` - Filters search results to show only consensus genes (proteins found in 5+ studies)
  * `useToggle` - Handles expandable cards and collapsible sections
* **Search Implementation**:
  * Real-time autocomplete using lodash debounce
  * Protein name detection with MyGene.info API integration for protein-to-gene symbol resolution
  * Multi-identifier support (Entrez, MGI, Ensembl, UniProt)
  * URL query parameter support for shareable searches
* **Component Structure**:
  * 18 page components including GeneSearch (119KB), DiseaseSearch, PaperSearch
  * Reusable components: SearchForm, Pagination, DownloadButton, NoResults
  * Visualization components using Recharts for interactive charts

#### Backend Architecture

Developed a Flask REST API with modular route blueprints:

* **Database Layer**:
  * SQLAlchemy ORM with SQLite backend (~770MB database)
  * Complex JOIN queries across Gene, Disease, Paper, Mutation, and PaperGene tables
  * Connection pooling with 300-second timeout for long-running queries
  * SQL trace logging for debugging
* **API Endpoints**:
  * `/api/gene/search` - Gene search with pagination and filtering
  * `/api/gene/<id>/tab/<type>` - Lazy-loaded tab data (papers, diseases, mutations)
  * `/api/disease/search` - Disease search with gene associations
  * `/api/paper/search` - Publication search with gene/mutation counts
  * `/api/consensus/genes` - Returns 3,437 consensus gene IDs
  * `/api/protein/lookup` - MyGene.info integration for protein name resolution
  * `/api/stats/*` - Chart data endpoints for visualizations
  * `/api/autocomplete` - Multi-type autocomplete suggestions
* **Data Processing**:
  * Consensus gene loading from Human_syn_top5.txt at startup
  * CSV/Excel export with pandas and XlsxWriter
  * Concurrent request handling with ThreadPoolExecutor

#### Data Visualization

Implemented interactive charts for research insights:

* **Disease Discovery Trends**: Year-by-year new disease counts and cumulative totals
* **Synaptic Compartment Distribution**: Protein localization across presynaptic/postsynaptic compartments
* **ICD-11 Chapter Classification**: Disease categorization visualizations
* **Brain Region Distribution**: Protein distribution across brain regions

#### Deployment Infrastructure

* **Docker Compose**: Multi-container setup with backend, frontend, and nginx services
* **nginx**: Reverse proxy configuration for production deployment
* **SSL Support**: Separate docker-compose.ssl.yml for HTTPS configuration
* **Environment Variables**: Secure handling of API keys (NIH_KEY)

## Scientific Impact

The database serves the neuroscience research community by providing:

* A consensus set of 3,437 mammalian synapse proteins from presynaptic and postsynaptic compartments
* Mapping of 954 genes encoding synaptic proteins to 1,266 OMIM diseases of the central and peripheral nervous system
* Tools for understanding the pervasive role of synaptic gene variants in neurological, psychiatric, developmental, and systemic disorders

## Technical Highlights

* **Large-Scale Data Handling**: Efficiently manages queries against a 770MB+ SQLite database containing data from 64 proteomic studies with optimized JOIN queries and connection pooling
* **Intelligent Search**: Protein-to-gene resolution using MyGene.info API, debounced autocomplete, and multi-identifier support (Entrez, MGI, Ensembl, UniProt across Human, Mouse, and Rat)
* **Lazy Loading Architecture**: Tab data (papers, diseases, mutations) loaded on-demand to optimize initial page load performance
* **Real-Time Analytics**: Built-in visit tracking with dedicated stats database and API usage analytics dashboard
* **Modular Codebase**: Custom React hooks for reusable search logic, Flask blueprints for organized API routes
* **Export Capabilities**: CSV and Excel export using pandas and XlsxWriter for researcher data analysis
* **Responsive Design**: Tailwind CSS with mobile-first approach for cross-device accessibility

### Database Schema

The SQLite database integrates multiple biological data sources:

* **Gene Table**: Human/Mouse/Rat Entrez IDs, gene names, Ensembl IDs, UniProt accessions
* **Disease Table**: HDOID (Human Disease Ontology), descriptions, OMIM mappings
* **Paper Table**: PMID, publication year, title, description from 64 proteomic studies
* **Mutation Table**: Chromosome, position, variant, cDNA/protein variants, ClinVar annotations
* **Junction Tables**: PaperGene, DiseaseGene, PaperMutation for many-to-many relationships
* **Reference Tables**: Species (TaxID), BrainRegion, Localisation, Method

## Achievements

* **Equal Contribution Author** on the bioRxiv preprint: "SynaptopathyDB: a resource for studying the genetic and synaptic basis of nervous system disorders" (doi: 10.1101/2025.06.27.661932)
* Funded by The Wellcome Trust [218293/Z/19/Z]
* Collaboration with the Genes to Cognition Programme at the University of Edinburgh
* Platform used by researchers studying the molecular basis of brain diseases including schizophrenia, depression, and neurodevelopmental disorders

