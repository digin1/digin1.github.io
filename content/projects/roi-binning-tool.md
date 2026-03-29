---
title: "ROI Binning Tool — Interactive Brain Region Grid Generator"
date: "2024-08-01"
featured: false
category: "research"
summary: "A Three.js + Flask interactive web tool for drawing polyline boundaries on large microscopy images and generating uniform ROI grids. Supports 5GB+ file uploads, server-side image adjustments, and exports ImageJ-compatible ROI ZIP files."
image: ""
tag: "Three.js, Flask, WebGL, Python, ImageJ, Gunicorn"
role: "Solo Developer"
duration: "3 weeks"
---

## Project Overview

The ROI Binning Tool provides an interactive canvas for researchers to define brain region boundaries on large microscopy images, then automatically generates a uniform grid of ROI bins across the defined area. The output is a ZIP file of ImageJ-compatible ROI polygons ready for downstream analysis.

## Project Details

### Technologies Used

* Three.js (WebGL canvas rendering)
* Flask (Python backend)
* Gunicorn (production WSGI server)
* Pillow (server-side image adjustments)
* ImageJ ROI format (export)

### Key Features

* **Two-Line Boundary Workflow**: Draw a red boundary line and a blue boundary line to define a region — the tool generates uniform bins between them
* **Configurable Grid**: Set the number of bins along and perpendicular to the boundary lines
* **Server-Side Image Adjustments**: Brightness, contrast, and exposure controls with live preview — processing happens on the server to handle large files
* **5GB+ File Support**: Handles very large microscopy images that would crash browser-based tools
* **Fullscreen Mode**: Dedicated fullscreen view with independent settings for detailed annotation
* **ImageJ ROI Export**: Exports each bin as a polygon in a ZIP file compatible with ImageJ/Fiji workflows
* **Docker Deployment**: Containerised with Docker for consistent deployment across lab machines

### Workflow

1. Upload a large microscopy image (TIFF, PNG, etc.)
2. Draw the first boundary line (red polyline)
3. Draw the second boundary line (blue polyline)
4. Configure bin count (along boundary, perpendicular to boundary)
5. Preview the generated grid overlay
6. Export as ImageJ ROI ZIP file

## Technical Highlights

* **WebGL Rendering**: Three.js handles smooth pan/zoom/draw interactions even on very large images
* **Server-Side Processing**: Heavy image operations (brightness/contrast/exposure) run on the server rather than the browser, enabling support for multi-gigabyte files
* **Coordinate Precision**: Accurate mapping between canvas coordinates and pixel coordinates for scientific reproducibility

## Impact

Enables researchers to define consistent, reproducible sampling regions across brain sections. The generated ROI grids are used in downstream synaptome analysis pipelines for quantifying protein density across brain regions.
