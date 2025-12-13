---
title: "MontageROI Segmenter - Web-Based ROI Annotation Tool"
date: "2025-11-13"
featured: true
featuredOrder: 1
category: "research"
summary: "A powerful web-based application for viewing high-resolution montage TIFF images and creating, editing, and managing Region of Interest (ROI) overlays. Built for the Grant Lab at University of Edinburgh, featuring Three.js WebGL rendering, comprehensive editing tools, and ImageJ-compatible export."
image: "/images/montageroisegmenter.jpg"
tag: "Flask, Python, Three.js, WebGL, JavaScript, Bootstrap, Docker, ImageJ, TIFF Processing"
role: "Lead Developer"
duration: "Ongoing"
---

## Project Overview

MontageROI Segmenter is a specialized web application designed for neuroscience researchers to annotate and segment high-resolution microscopy montage images. The tool enables researchers to load large multi-channel TIFF images, create precise ROI annotations, and export them in ImageJ-compatible formats for downstream analysis.

## Project Details

### Technologies Used

* Flask (Python Backend)
* Three.js (WebGL Rendering)
* JavaScript/HTML5 Canvas
* Bootstrap 5
* NumPy & SciPy (Image Processing)
* tifffile (TIFF Handling)
* scikit-image (Image Analysis)
* PyImageJ (ImageJ Integration)
* Docker

### Key Features

* **High-Resolution Image Viewing**: Load and navigate large montage TIFF files with smooth pan/zoom using Three.js WebGL rendering and tile pyramid system
* **Multi-Channel Support**: View composite, false color, max projection, first channel, or grayscale display modes
* **Comprehensive ROI Tools**:
  * Brush painting with adjustable size
  * Eraser tool for precise removal
  * Bucket fill with tolerance-based filling
  * Rectangle and circle shape tools
  * Polygon drawing tool
  * Square stamp tool with custom dimensions
* **Transform Operations**: Scale, rotate, and move individual or all visible ROIs with bounding box preview
* **ROI Management**: Create, rename, duplicate, merge, reorder (drag-and-drop), and delete ROI layers
* **Color Customization**: Pick custom colors or use preset palette with adjustable opacity
* **Undo/Redo System**: Per-ROI history tracking for non-destructive editing
* **Image Adjustments**: Real-time brightness, contrast, and exposure controls with live preview
* **Import/Export**: Load ROI ZIP files or individual .roi/.png files; export all ROIs as ImageJ-compatible ZIP
* **Instructions Upload**: Optional text file upload for custom protocols or notes
* **Touch Support**: Optimized for iPad and touch devices with gesture controls

### Development Process

Developed as the primary developer for the Grant Lab at University of Edinburgh to support their neuroscience research workflows.

#### Frontend Architecture

Built an interactive canvas-based editor using Three.js for WebGL rendering:

* **WebGL Rendering**: Three.js scene with orthographic camera for precise 2D image viewing
* **Tile Pyramid System**: Efficient loading and rendering of large images through multi-resolution tiling
* **Canvas Compositing**: Separate canvases for montage image and ROI overlay layers
* **Tool System**:
  * Mode-based tool switching (brush, erase, bucket, shapes, transform, move)
  * Zoom-aware cursor sizing that matches actual paint area
  * Right-click panning while in any editing mode
* **ROI Layer Management**:
  * Visibility toggling per layer
  * Drag-and-drop reordering
  * Insert-at-position functionality
  * Selection highlighting with crosshair indicators

#### Backend Architecture

Flask-based Python backend handling image processing:

* **TIFF Processing**:
  * Multi-page TIFF support using tifffile library
  * Channel compositing and color mapping
  * Flip and rotation transformations
* **ROI Conversion**:
  * ImageJ .roi file parsing and generation
  * PNG mask to ROI conversion
  * Coordinate transformation handling
* **Session Management**: Per-session file storage with automatic cleanup
* **Progress Streaming**: Real-time progress updates during file processing

#### Image Processing Pipeline

* **Tile Generation**: Creates multi-resolution tile pyramids for smooth zooming
* **Channel Compositing**: RGB composite from multi-channel fluorescence images
* **Adjustment Processing**: Server-side brightness/contrast/exposure adjustments
* **ROI Export**: Converts canvas masks to ImageJ-compatible ROI format with polygon optimization

### Technical Highlights

* **Large Image Handling**: Efficiently processes and displays TIFF files over 100MB through chunked loading and tile pyramids
* **Binary Mask Painting**: Hard-edged painting for precise ROI boundaries without anti-aliasing artifacts
* **Flood Fill Algorithm**: Tolerance-based bucket fill for handling similar colors in biological images
* **Transform Pipeline**: Non-destructive transform preview with final baking to canvas on confirmation
* **Overlap Detection**: Tool to fix overlapping ROIs by removing intersecting regions from other layers
* **Multi-Montage Support**: Load and switch between multiple montage images with per-image adjustment memory
* **Keyboard Shortcuts**: Ctrl+Z/Y for undo/redo, Ctrl+B/E/U for tool switching

### User Interface

* **Left Sidebar**: Tools and upload controls with collapsible sections
* **Center Viewer**: WebGL canvas with coordinate overlay and minimap navigation
* **Right Sidebar**: ROI list management with visibility toggles and color controls
* **Responsive Design**: Auto-collapsing sidebars on mobile/tablet for maximum viewing area
* **Debug Console**: Built-in debugging panel for troubleshooting

## Scientific Application

The tool supports neuroscience research workflows by enabling:

* Precise annotation of synaptic structures in high-resolution microscopy images
* Consistent ROI creation across multiple sample images
* Export of annotations compatible with ImageJ/FIJI analysis pipelines
* Collaborative annotation through shareable ROI files

## Deployment

* **Docker Support**: Containerized deployment with docker-compose for easy installation
* **Private Registry**: Hosted on institutional GitLab container registry
* **Port Configuration**: Runs on configurable port (default: 6743)

## Project Context

Designed for Grant Lab at University of Edinburgh to streamline the annotation workflow for synaptic microscopy research, enabling researchers to efficiently create and manage ROI annotations for quantitative analysis.
