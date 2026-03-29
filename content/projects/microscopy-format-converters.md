---
title: "Microscopy Format Conversion Suite"
date: "2024-03-01"
featured: true
featuredOrder: 5
category: "research"
summary: "A suite of tools that converts proprietary microscopy formats such as ND2, CZI, and IMS into open TIFF-based workflows. Built to remove vendor lock-in and make large imaging datasets usable in reproducible analysis pipelines."
image: ""
tag: "Python, HDF5, OpenCV, PyTorch, tifffile, NumPy, CUDA, scikit-image"
role: "Solo Developer"
duration: "Ongoing"
problem: "The lab needed to get microscopy data out of proprietary formats and into reproducible, analysis-ready pipelines."
scope: "Built converters for ND2, CZI, and IMS data, including metadata extraction, stitching, GPU acceleration, and open TIFF output."
outcome: "The tools removed vendor lock-in and became core infrastructure in the microscopy processing pipeline."
highlights:
  - "Automated conversion from ND2, CZI, and IMS into open TIFF workflows"
  - "Correlation-based stitching with GPU acceleration and sparse-grid handling"
  - "Daily-use infrastructure for making raw imaging data analysis-ready"
visibilityNote: "These tools are infrastructure rather than public-facing products. The value is in pipeline reliability, format handling, and reproducibility."
---

## Overview

This conversion suite is core infrastructure for the lab's microscopy workflows. It takes raw acquisitions in proprietary vendor formats and moves them into open, analysis-ready TIFF-based pipelines that the rest of the tooling can use.

The work is not flashy, but it is foundational. Without reliable format conversion and stitching, the rest of the analysis stack becomes fragile or blocked by vendor software.

## Problem

Microscopy acquisition formats are often proprietary and awkward to integrate into open scientific workflows. Researchers needed a way to:

- convert ND2, CZI, and IMS data without depending on vendor applications
- preserve important acquisition metadata
- stitch tiled images accurately
- generate outputs that downstream tools could consume consistently

## What I Built

I built a set of Python tools for converting, stitching, and normalising microscopy data across multiple vendor formats.

That includes:

- ND2-to-TIFF conversion with Z-stack position extraction
- CZI-to-TIFF conversion with metadata preservation
- IMS handling with correlation-based stitching
- GPU-assisted correlation and stitching for large tiled datasets
- support for sparse grids, serpentine acquisition patterns, and memory-conscious output paths

## Technical Decisions

### Open formats as the target

The core decision was to treat open TIFF workflows as the hand-off layer for the rest of the research stack. That reduced dependency on vendor software and made it much easier to integrate with custom analysis tooling.

### Stitching and scale

The IMS path was the most technically demanding because it required accurate tile placement, stitching, and support for large montages. Correlation-based methods and GPU acceleration were important for making that practical on real datasets.

### Metadata preservation

Conversion without metadata would have been only a partial solution. The tools needed to preserve stage positions, channel information, and acquisition parameters so the converted data remained scientifically useful.

## Constraints

The work had to account for:

- proprietary format quirks
- very large montage sizes
- memory limits on practical systems
- the need for trustworthy outputs that could go straight into downstream analysis

## Outcome

These converters made the rest of the research pipeline more open, more reproducible, and less dependent on vendor tooling. They are a good example of infrastructure work that is easy to overlook visually but critical in practice.
