---
title: "SV2A Mouse Synaptome Atlas - Synaptic Diversity Visualization"
date: "2025-11-26"
featured: true
featuredOrder: 6
category: "research"
summary: "An interactive web application for visualizing SV2A synaptic vesicle protein density and intensity measurements across mouse brain regions, developmental stages, and sex differences. Built for the Grant Lab at University of Edinburgh, featuring dual-metric analysis and comprehensive sex-specific data visualization."
image: "https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/sv2amousesynaptomeatlas.jpg"
tag: "Next.js, TypeScript, React, Tailwind CSS, SVG, Data Visualization, Neuroscience"
demo: "https://git-pages.ecdf.ed.ac.uk/grantlab/sv2a-mouse-synaptome-atlas/"
role: "Lead Developer"
duration: "2 months"
---

## Project Overview

The SV2A Mouse Synaptome Atlas is a modern web application for visualizing research data on Synaptic Vesicle Glycoprotein 2A (SV2A) protein diversity across the mouse brain. The platform enables researchers to explore how synaptic vesicle protein density and intensity vary across brain regions, developmental stages, and between sexes through an interactive brain atlas interface.

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

* **Interactive Brain Atlas**: SVG-based mouse brain visualization with clickable regions, color-coded by SV2A measurements
* **Dual Metric Analysis**: Toggle between SV2A density and intensity measurements
* **Sex Differences Analysis**: View data for male, female, or combined cohorts to reveal sex-specific patterns
* **Multi-Age Comparison**: Compare data across 3 developmental stages (6 weeks, 6 months, 18 months)
* **Region Search**: Autocomplete search functionality to quickly find specific brain regions
* **Dynamic Color Mapping**: Real-time color scale visualization based on selected metric and filters
* **Regional Data Table**: Sortable list of brain regions with measurement values
* **Selected Region Details**: Floating panel showing comprehensive data across all conditions
* **Dataset Download**: Excel file export of complete research data
* **Methodology Documentation**: Detailed research methodology and data analysis procedures
* **Responsive Design**: Full mobile/tablet support with optimized touch controls

### Development Process

Developed as the web developer for the Grant Lab at University of Edinburgh to present their synaptic vesicle protein research in an accessible, interactive format.

#### Frontend Architecture

Built with Next.js 14 App Router and TypeScript:

* **Component Structure**:
  * `BrainAtlas.tsx` - Interactive SVG brain visualization with dynamic coloring
  * `ControlPanel.tsx` - Metric, age, and sex selection controls
  * `RegionalDataTable.tsx` - Filterable table of brain regions with values
* **Data Management**:
  * Separate JSON datasets for density and intensity measurements
  * Sex-stratified data (male, female, combined)
  * Allen Brain Atlas structure hierarchy integration
* **State Management**:
  * Metric selection (density/intensity)
  * Age group filtering (6W, 6M, 18M)
  * Sex cohort selection (male/female/combined)
  * Region selection and hover states

#### Data Visualization

* **Color Scale**: Custom gradient mapping for SV2A measurement values
* **Multi-dimensional Filtering**: Combine metric, age, and sex filters
* **Interactive Tooltips**: Hover information with region details and current values
* **Comparison Views**: Side-by-side analysis across different conditions

### Technical Highlights

* **Type-Safe Development**: Full TypeScript implementation with interfaces for brain data and component props
* **Dual Dataset Architecture**: Separate density and intensity data files with unified visualization
* **Sex-Stratified Analysis**: Built-in support for male/female/combined cohort comparisons
* **Allen Brain Atlas Integration**: Maps research data to standardized brain structure IDs
* **Static Export**: Generates fully static site for GitLab Pages deployment

### Research Context

The application visualizes research data on SV2A synaptic vesicle proteins:

* **Target Protein**: SV2A (Synaptic Vesicle Glycoprotein 2A) - essential for neurotransmitter release and synaptic vesicle trafficking
* **Measurements**: Density and intensity values across brain regions
* **Developmental Stages**: 6 weeks, 6 months, 18 months
* **Sample Size**: Data from 33 mice total
* **Sex Analysis**: Separate cohorts for male, female, and combined analysis
* **Brain Coverage**: Multiple anatomically defined regions from Allen Mouse Brain Atlas

## Scientific Impact

The atlas serves the neuroscience research community by providing:

* Interactive exploration of synaptic vesicle protein distribution across the brain
* Sex-specific analysis revealing differences in synaptic protein expression
* Developmental trajectory visualization across three life stages
* Downloadable datasets for further analysis

## Deployment

* **Platform**: GitLab Pages with CI/CD pipeline
* **Build**: Static export via Next.js for optimal performance
* **URL**: Hosted on University of Edinburgh GitLab infrastructure

## Funding

Research supported by:
* Wellcome Trust
* University of Edinburgh

## Project Context

Developed for Professor Seth G.N. Grant's lab at the Centre for Clinical Brain Sciences, University of Edinburgh, to make their SV2A synaptic vesicle protein research accessible through modern web visualization.
