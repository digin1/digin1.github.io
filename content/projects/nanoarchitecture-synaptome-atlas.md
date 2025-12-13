---
title: "Nanoarchitecture Synaptome Atlas - Interactive Brain Visualization"
date: "2025-11-24"
featured: true
featuredOrder: 5
category: "research"
summary: "An interactive web application for visualizing PSD95 proximity index measurements across 43 mouse brain regions and 4 developmental stages. Built for the Grant Lab at University of Edinburgh, featuring SVG-based brain atlas, real-time data visualization, and comprehensive research methodology documentation."
image: "https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/nanoarchitecturesynaptomeatlas.jpg"
tag: "Next.js, TypeScript, React, Tailwind CSS, SVG, Data Visualization, Neuroscience"
demo: "https://git-pages.ecdf.ed.ac.uk/grantlab/nanoarchitecture-synaptome-atlas/"
role: "Lead Developer"
duration: "3 months"
---

## Project Overview

The Nanoarchitecture Synaptome Atlas is a modern web application for visualizing research data on PSD95 protein proximity within synaptic structures across the mouse brain. The platform enables researchers to explore how synaptic molecular organization varies across brain regions and developmental stages through an interactive brain atlas interface.

## Project Details

### Technologies Used

* Next.js 14 (App Router)
* TypeScript
* React 18
* Tailwind CSS
* SVG Manipulation
* Allen Brain Atlas Integration
* GitLab CI/CD
* Static Site Generation

### Key Features

* **Interactive Brain Atlas**: SVG-based mouse brain visualization with clickable and hoverable regions, color-coded by PSD95 proximity index values
* **Multi-Age Comparison**: View and compare data across 4 developmental stages (2W, 4M, 12M, 18M)
* **Region Search**: Autocomplete search functionality to quickly find specific brain regions by name or classification
* **Dynamic Color Mapping**: Real-time color scale visualization mapping proximity index values (15-40) to a gradient color scheme
* **Regional Data Table**: Sortable list of all 43 brain regions with proximity index values
* **Selected Region Details**: Floating panel showing comprehensive data for selected regions across all age groups
* **Dataset Download**: Excel file export of complete research data
* **Methodology Documentation**: Detailed research methodology including animal model, measurement techniques, and data analysis procedures
* **Responsive Design**: Full mobile/tablet support with collapsible sidebar and touch-optimized controls

### Development Process

Developed as the web developer for the Grant Lab at University of Edinburgh to present their neuroscience research data in an accessible, interactive format.

#### Frontend Architecture

Built with Next.js 14 App Router and TypeScript for type-safe development:

* **Component Structure**:
  * `BrainAtlas.tsx` - Interactive SVG brain visualization with mouse event handling, color mapping, and region highlighting
  * `RegionalDataTable.tsx` - Filterable, searchable table of brain regions with proximity index values
* **Data Flow**:
  * JSON-based research data with 43 brain regions and 4 age groups
  * Allen Brain Atlas structure hierarchy for region mapping
  * Real-time filtering and search with autocomplete suggestions
* **SVG Manipulation**:
  * Dynamic color application based on proximity index values
  * Hover and selection state management
  * Parent-child region hierarchy support for nested brain structures

#### Data Visualization

* **Color Scale Algorithm**: Custom gradient mapping from blue (low values) through green/yellow to orange/red (high values)
* **Value Range**: Normalized visualization for PSD95 proximity index values (15-40 range)
* **Interactive Tooltips**: Hover information showing region name, classification, and current age value
* **Selection Panel**: Detailed view of selected region with values across all developmental stages

#### SEO & Accessibility

* Comprehensive JSON-LD structured data for Dataset schema
* Semantic HTML with proper heading hierarchy
* Keyboard navigation support (ESC to deselect)
* Mobile-first responsive design

### Technical Highlights

* **Type-Safe Development**: Full TypeScript implementation with proper interfaces for brain data, region mappings, and component props
* **Performance Optimization**: Memoized components, efficient SVG updates, and debounced search
* **Static Export**: Generates fully static site for GitLab Pages deployment
* **Allen Brain Atlas Integration**: Maps research data to standardized brain structure IDs for consistent visualization
* **Hierarchical Region Mapping**: Supports parent-child relationships in brain structure hierarchy

### Research Context

The application visualizes actual research data on PSD95–PSD95 Supercomplex Proximity Index:

* **Measurement Method**: FRET efficiency between PSD95 molecules labeled with JF552 and JFX650 fluorophores
* **Animal Model**: PSD95 (Halo/Halo) knock-in mice with HaloTag labeling technology
* **Brain Coverage**: 43 anatomically defined regions from the Allen Mouse Brain Atlas
* **Replication**: Data from six biological replicates per condition
* **Publication**: Associated with eLife publication (Morris K., et al. 2024)

## Scientific Impact

The atlas serves the neuroscience research community by providing:

* Interactive exploration of synaptic protein organization across the brain
* Comparison of molecular architecture changes during development
* Downloadable datasets for further analysis
* Visual representation of complex FRET measurement data

## Deployment

* **Platform**: GitLab Pages with CI/CD pipeline
* **Build**: Static export via Next.js for optimal performance
* **URL**: Hosted on University of Edinburgh GitLab infrastructure

## Funding

Research supported by:
* Uehara Memorial Foundation
* Marie Skłodowska-Curie Actions
* Wellcome Trust

## Project Context

Developed for Professor Seth G.N. Grant's lab at the Centre for Clinical Brain Sciences, University of Edinburgh, to make their synaptic nanoarchitecture research accessible through modern web visualization.
