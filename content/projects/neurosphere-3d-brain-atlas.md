---
title: "NeuroSphere - Interactive 3D Brain Atlas"
date: "2024-12-20"
featured: true
featuredOrder: 1
category: "research"
summary: "An interactive 3D brain atlas platform featuring human and mouse brain visualizations with real-time neural simulations. Built with Three.js, featuring Desikan-Killiany Atlas (43 regions) for human brain and Allen CCFv3 Atlas (25 regions) for mouse brain with connectivity-based activity propagation."
image: "/images/neurosphere.jpg"
tag: "Three.js, WebGL, JavaScript, Neural Simulation, Neuroscience, 3D Visualization"
demo: "https://digindominic.me/brain-threejs/"
github: "https://github.com/digin1/brain-threejs"
role: "Solo Developer"
duration: "2 weeks"
---

## Project Overview

NeuroSphere is a comprehensive 3D brain atlas platform that allows users to explore both human and mouse brain anatomy through stunning WebGL visualizations. The platform features interactive neural pathway simulations, region-specific information panels, and real-time activity propagation based on neuroanatomical connectivity data.

## Demo Videos

### Human Brain Atlas
<video controls width="100%" poster="/images/neurosphere.jpg">
  <source src="/videos/human-threejs.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Mouse Brain Atlas
<video controls width="100%">
  <source src="/videos/mouse-threejs.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Project Details

### Technologies Used

* Three.js (WebGL 3D Engine)
* Vanilla JavaScript (ES6+ Modules)
* CSS3 with Glassmorphism Design
* OBJ Mesh Loader
* JSON Connectivity Matrices
* GitHub Pages Deployment

### Key Features

#### Human Brain Atlas
* **43 Anatomical Regions** based on Desikan-Killiany Atlas
* **7 Brain Lobes** with color-coded visualization (Frontal, Parietal, Temporal, Occipital, Limbic, Subcortical)
* **Interactive Region Selection** with detailed function information
* **Neural Pathway Presets**: Visual Processing, Motor Control, Language Production/Comprehension, Memory Encoding/Retrieval, Emotional Response, Attention Network, Decision Making, Resting State (DMN)

#### Mouse Brain Atlas
* **25 Regions** from Allen CCFv3 Atlas
* **Real-time Neural Simulations** with connectivity-based activity propagation
* **8 Neural Circuit Presets**:
  * Whisker Sensation (barrel cortex pathway)
  * Visual Processing
  * Auditory Processing
  * Motor Control
  * Fear Response (amygdala circuit)
  * Spatial Navigation (hippocampal circuit)
  * Olfactory Processing
  * Reward Processing (mesolimbic pathway)

#### Visualization Features
* Wireframe and Solid color render modes
* Adjustable opacity and glow intensity
* Auto-rotation and manual OrbitControls
* Region filtering by lobe/category
* Responsive design for desktop and mobile

### Development Process

#### 3D Rendering Architecture

Built with Three.js for high-performance WebGL rendering:

* **Scene Management**: Custom `BrainViewer` class managing scene, camera, renderer, and controls
* **Mesh Loading**: OBJLoader for brain region meshes with custom material application
* **Interaction**: Raycaster-based mouse picking for region selection and hover effects
* **Visual Effects**: Custom glow shader and emission-based highlighting for active regions

#### Neural Simulation Engine (Mouse Brain)

* **ConnectivityGraph.js**: Loads and manages weighted connectivity matrix based on Allen Mouse Brain Connectivity Atlas
* **RegionalActivity.js**: Handles activity propagation using weighted connections between regions
* **NeuralSimulation.js**: Main controller for preset scenarios with timed region activations

#### Data Sources

| Atlas | Source | Coverage |
|-------|--------|----------|
| Human Brain | [brainder.org](https://brainder.org) (CC BY-SA 3.0) | Desikan-Killiany via FreeSurfer |
| Mouse Brain | [Allen Institute](https://mouse.brain-map.org) | CCFv3 Common Coordinate Framework |

### Technical Highlights

* **Coordinate System Handling**: Allen CCF uses microns (5000-8000 range) requiring geometry translation and scaling to normalize with human brain coordinates
* **Performance Optimization**: Efficient mesh management, LOD considerations, and optimized render loop
* **Modular Architecture**: Separate modules for viewer, simulation, data, and UI components
* **SEO Optimized**: Full Open Graph and Twitter card meta tags, sitemap, robots.txt

### Architecture

```
neurosphere/
├── index.html              # Landing page with species selector
├── human/
│   ├── js/brain.js         # Human brain viewer
│   ├── js/regions.js       # Region metadata
│   └── models/             # OBJ meshes
└── mouse/
    ├── js/brain.js         # Mouse brain viewer
    ├── js/simulation/      # Neural simulation engine
    ├── js/data/            # Region data, presets
    └── data/connectome/    # Connectivity matrix
```

## Scientific Context

The platform serves as an educational and research tool for:

* Understanding brain anatomy and regional organization
* Visualizing neural pathway activations
* Comparing human and mouse brain structures
* Demonstrating connectivity-based signal propagation

## Deployment

* **Platform**: GitHub Pages with custom domain
* **URL**: [https://digindominic.me/brain-threejs/](https://digindominic.me/brain-threejs/)
* **Source**: [GitHub Repository](https://github.com/digin1/brain-threejs)

## Future Enhancements

* Additional species (rat, macaque)
* VR/AR support
* Real experimental data overlays
* Custom pathway creation tool
