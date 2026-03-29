---
title: "GridComposer — Image Layout & Design Tool"
date: "2025-03-01"
featured: false
category: "personal"
summary: "A modern image layout and design tool with a drag-and-drop canvas editor. Built with Next.js 14 and Fabric.js, featuring alignment tools, text editing, layer management, and multi-format export."
image: ""
tag: "Next.js, Fabric.js, Tailwind CSS, JavaScript, Canvas API"
role: "Solo Developer"
duration: "2 weeks"
---

## Project Overview

GridComposer is a browser-based image layout and design tool that provides an intuitive canvas editor for creating image compositions. Built as a modern alternative to heavyweight design tools, it focuses on fast image arrangement and export workflows.

## Project Details

### Technologies Used

* Next.js 14 (App Router)
* Fabric.js (Canvas manipulation)
* Tailwind CSS
* JavaScript (ES6+)

### Key Features

* **Drag-and-Drop Canvas**: Upload and arrange images freely on a resizable canvas
* **Alignment & Distribution Tools**: Snap-to-grid, align left/right/center/top/bottom, distribute evenly
* **Text Editor**: Add and style text elements with font, size, and color controls
* **Layer Management**: Bring forward, send backward, lock/unlock layers
* **Multi-Format Export**: Export compositions as PNG or JPEG with quality controls
* **Responsive Design**: Works across desktop browsers with touch-friendly controls

## Technical Highlights

* **Fabric.js Integration**: Custom wrapper around Fabric.js for declarative canvas manipulation with React state management
* **Performance**: Canvas rendering optimised for smooth drag interactions even with multiple high-resolution images
* **Non-Destructive Editing**: All transformations are non-destructive — original images preserved
