---
title: "GPU-Accelerated ROI Classification Tool"
date: "2024-11-01"
featured: false
category: "research"
summary: "A GPU-accelerated Python tool for classifying millions of microscopy datapoints into polygonal regions of interest. Built to make region-based analysis practical on large datasets instead of turning point-in-polygon classification into a bottleneck."
image: ""
tag: "Python, PyTorch, CUDA, NumPy, Multiprocessing, GPU Computing"
role: "Solo Developer"
duration: "1 month"
problem: "Regional analysis workflows needed to classify millions of synapse coordinates into anatomical ROIs quickly enough to be practical on real microscopy datasets."
scope: "Built a GPU-accelerated point-in-polygon classifier with chunked processing, debug visualisation, ImageJ ROI support, and batch dataset handling."
outcome: "Removed a major performance bottleneck in atlas-based heatmap and synaptome analysis workflows."
highlights:
  - "PyTorch CUDA ray-casting for point-in-polygon classification at research scale"
  - "Chunked processing to handle datasets larger than GPU memory"
  - "ImageJ ROI compatibility and visual QA overlays for correctness checking"
visibilityNote: "This tool is infrastructure within a broader analysis pipeline. The case study focuses on algorithmic and workflow value rather than a polished public interface."
---

## Project Overview

A specialised tool for classifying spatial data points into anatomical regions of interest (ROIs) defined as polygons. Designed for neuroscience microscopy workflows where millions of synapse coordinates need to be mapped to brain regions defined by hand-drawn or atlas-derived ROI boundaries.

## Project Details

### Technologies Used

* Python 3
* PyTorch (GPU-accelerated ray-casting)
* CUDA (NVIDIA GPU computing)
* NumPy (numerical processing)
* pandas (data management)
* Pillow (debug visualisation)
* tqdm (progress tracking)
* Multiprocessing (CPU parallelism)

### Key Features

* **GPU-Accelerated Ray-Casting**: PyTorch CUDA implementation for efficient point-in-polygon classification
* **Dataset Processing**: Tile and montage processing with metadata generation
* **Debug Visualisation**: Point cloud overlays with ROI polygon boundaries for verification
* **Chunked Processing**: Memory-efficient processing of large datasets that don't fit in GPU memory
* **Composite ROI Support**: Handles complex multi-polygon regions from ImageJ ROI files
* **Batch Processing**: Process entire experimental datasets with configurable parameters

## Technical Highlights

* **Performance**: GPU acceleration provides orders-of-magnitude speedup over CPU-based point-in-polygon algorithms
* **Memory Management**: Chunked processing strategy handles datasets larger than GPU memory
* **Correctness**: Debug visualisation mode enables visual verification of classification accuracy against ground truth
* **Integration**: Reads standard ImageJ ROI files and outputs data compatible with downstream analysis tools

## Impact

Core component of the lab's analysis pipeline for Allen Brain Atlas heatmap generation and synaptome architecture analysis across brain regions.
