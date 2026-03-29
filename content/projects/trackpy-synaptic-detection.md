---
title: "TrackPy Synaptic Detection Pipeline"
date: "2025-02-15"
featured: false
category: "research"
summary: "A Python-native synaptic protein detection pipeline for fluorescence microscopy. It replaces a manual Fiji/TrackMate step with an automatable workflow that fits directly into the lab's broader Python analysis stack."
image: ""
tag: "Python, TrackPy, NumPy, Multiprocessing, Image Processing, Microscopy"
role: "Lead Developer"
duration: "3 weeks"
problem: "The lab needed synapse detection to run end-to-end inside Python workflows instead of depending on a manual Fiji/TrackMate step that slowed automation."
scope: "Built the detection pipeline, adaptive thresholding strategy, quality-control overlays, batch processing, and downstream-compatible CSV outputs."
outcome: "Removed a manual bottleneck and made synapse detection automatable inside the broader microscopy pipeline."
highlights:
  - "10.7% average error against hand-validated reference samples"
  - "Adaptive thresholding and morphology filters tuned for tiled fluorescence data"
  - "Pure-Python output compatible with downstream ROI classification and heatmap generation"
visibilityNote: "This is a pipeline component rather than a public-facing product. The case study focuses on detection quality, automation, and integration value."
---

## Project Overview

A purpose-built Python pipeline for detecting synaptic proteins in fluorescence microscopy images. Replaces the Java-based TrackMate tool with a pure Python implementation that integrates directly into the lab's existing Python data processing workflows, enabling end-to-end automation.

## Project Details

### Technologies Used

* Python 3
* TrackPy (particle detection)
* NumPy (numerical processing)
* Multiprocessing (parallel tile processing)
* tifffile (microscopy I/O)
* Matplotlib (visualisation)

### Key Features

* **Adaptive Thresholding**: 65th percentile intensity threshold that adjusts to variable fluorescence levels across tiles
* **Parallel Processing**: Multi-core processing enabled by default for batch tile analysis
* **SNR Calculation**: Multiple signal-to-noise ratio methods (local, global, tile-based)
* **Area Filtering**: Morphological filtering (5-100 px²) to exclude noise and debris
* **Rich Output**: CSV with 24+ detection properties per particle (x, y, area, mean intensity, max intensity, radius, SNR)
* **Visualisation**: Optional rendering of first N tiles with detection overlays for quality control
* **Single-File Deployment**: Standalone script with no complex dependency chain

### Performance

* **10.7% average error** validated against hand-annotated reference samples
* Optimised parameters: diameter 7px, minmass 300, separation 11px
* Competitive with TrackMate (Java/Fiji) while being fully Python-native

## Technical Highlights

* **TrackMate Parity**: Achieves comparable detection accuracy to the established TrackMate tool without Java/Fiji dependency
* **Pipeline Integration**: Pure Python enables direct integration with downstream analysis (ROI classification, heatmap generation)
* **Robust Detection**: Adaptive threshold handles intensity variation across large tiled acquisitions

## Impact

Enables fully automated synapse detection as part of the lab's end-to-end processing pipeline, removing the manual Fiji/TrackMate step that was previously a bottleneck.
