---
title: "Brain Heatmap Visualization Tool"
date: "2025-06-01"
featured: false
category: "research"
summary: "A web application for generating publication-ready brain region heatmaps from experimental data. Supports multiple atlas templates, scientific colormaps, CSV upload, and PNG/SVG export, replacing manual atlas colouring with a reproducible workflow."
image: ""
tag: "Next.js, D3.js, Flask, TypeScript, Tailwind CSS, Zustand, Vitest"
demo: "https://git-pages.ecdf.ed.ac.uk/brain-heatmap-visualization-tool-f94056/"
role: "Lead Developer"
duration: "6 weeks"
problem: "Researchers needed a fast way to turn region-level experimental values into publication-ready brain heatmaps without manual SVG editing, brittle scripts, or ad hoc colour mapping."
scope: "Built the full web application, atlas rendering layer, validation flow, export system, and Flask backend for data and template handling."
outcome: "Turned a manual figure-making process into a repeatable tool used to generate publication-quality neuroscience visuals."
highlights:
  - "Supports mouse, rat, human, and development templates with real-time switching"
  - "Provides 10+ scientific colormaps, range controls, validation, and typo suggestions for region names"
  - "Export-ready PNG and SVG output backed by 73 passing tests"
visibilityNote: "This tool is used in research workflows. The case study focuses on atlas rendering, validation, and export design rather than internal datasets."
---

## Project Overview

A production-grade web application for neuroscience researchers to generate brain region heatmaps from experimental data. Supports multiple species brain templates and provides real-time interactive controls for colour mapping, range adjustment, and export.

## Project Details

### Technologies Used

* Next.js 16 with React 19 (TypeScript)
* D3.js v7 (SVG-based brain atlas rendering)
* Zustand (state management)
* Tailwind CSS 4
* Vitest + React Testing Library (73 passing tests)
* Flask 2.3 (Python backend)
* pandas, NumPy, Matplotlib, lxml, BeautifulSoup4

### Key Features

* **Multiple Brain Templates**: DevMouse, Mouse, Rat, Human — switchable in real-time
* **10+ Scientific Colormaps**: Viridis, Plasma, Inferno, Magma, Cividis, Turbo, Cool, Warm, RdYlBu, Spectral
* **Data Upload**: CSV/Excel upload with validation, error messages, and typo suggestions for region names
* **Interactive Controls**: Real-time range adjustment, colour selection, linear/log scale toggle
* **Dual Export**: PNG (raster) and SVG (vector) for publication-quality figures
* **Responsive Design**: Works across desktop and tablet browsers
* **CI/CD**: Automated deployment to GitLab Pages on push to main

### Testing

* 73 passing tests covering data processing, colour mapping, region matching, and export functionality

## Technical Highlights

* **D3.js SVG Rendering**: Dynamic colouring of brain atlas SVG regions based on uploaded data values
* **Intelligent Validation**: Fuzzy matching suggests corrections for mistyped brain region names
* **Full-Stack**: Next.js frontend communicates with Flask API for data processing and SVG template management
* **Production Deployment**: GitLab CI/CD pipeline with automated build, test, and deploy stages

## Impact

Used by researchers at the Grant Lab to generate publication-quality brain heatmap figures for synaptome mapping papers. Replaces manual SVG editing workflows with an automated, reproducible tool.
