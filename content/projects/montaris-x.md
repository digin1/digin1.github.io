---
title: "Montaris-X"
date: "2025-01-01"
featured: true
featuredOrder: 4
category: "research"
summary: "A cross-platform desktop ROI editor for scientific microscopy workflows. Built with PySide6 and published on PyPI, it gives researchers a fast local tool for annotation, ROI editing, and ImageJ-compatible interoperability without relying on heavyweight proprietary software."
image: ""
tag: "Python, PySide6, NumPy, SciPy, scikit-image, tifffile, PyPI, Desktop App"
role: "Solo Developer"
duration: "4 months"
problem: "Researchers needed a fast local ROI tool they could install and use without depending on heavyweight or proprietary microscopy software."
scope: "Built a native desktop application for ROI drawing, editing, layering, import/export, and high-resolution microscopy image handling."
outcome: "Montaris-X became a distributable local tool for microscopy annotation workflows, with PyPI distribution and institutional interest."
highlights:
  - "Cross-platform Python desktop app built with PySide6"
  - "Supports 16/32-bit TIFF, ImageJ ROI import/export, layering, and undo/redo"
  - "Published on PyPI and designed for real lab workflows rather than demo use"
---

## Overview

Montaris-X is a pip-installable desktop ROI editor for scientific microscopy. It is designed for researchers who need local, responsive annotation workflows without relying on large proprietary applications or a fragile chain of manual steps.

Currently under review for listing at the University of Edinburgh's Software Centre for institutional distribution.

## Problem

Microscopy annotation is often trapped between two bad options: heavyweight vendor tooling or improvised research workflows that are hard to standardise. The goal here was to build a local tool that:

- works well on large scientific images
- supports the ROI formats researchers already use
- feels responsive enough for real annotation work
- is easy to install and distribute

## What I Built

Montaris-X includes:

- ROI drawing and editing tools for practical image annotation
- multi-layer ROI management
- ImageJ ROI and ZIP import/export
- 16/32-bit TIFF handling and multi-channel image support
- undo/redo and transform operations
- an install path simple enough for researchers to adopt

## Technical Decisions

### Native desktop instead of browser

For this tool, a desktop application was the right choice. The workflow is local, image-heavy, and interaction-intensive. PySide6 provided a reliable base for building something distributable and responsive across platforms.

### Interoperability first

ImageJ compatibility was non-negotiable. The point was not to create another isolated editor. It was to fit into the tools researchers already trust while giving them a better interface for day-to-day work.

### Distribution

Publishing on PyPI mattered because it turned the tool into something that could actually be installed, versioned, and shared, rather than staying as a one-off internal script.

## Constraints

The challenge was to balance a real microscopy feature set with a tool that remained fast enough and simple enough to use in practice. It had to handle scientific image formats and ROI workflows without becoming a bloated desktop application.

## Outcome

Montaris-X gives researchers a practical local tool for ROI work and reduces dependence on proprietary software for a key part of the microscopy workflow. It also shows a different side of the portfolio: packaged desktop software, not just web applications.

## Installation

```bash
pip install montaris-x
```
