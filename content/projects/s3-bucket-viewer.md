---
title: "S3 Bucket Viewer - Web-Based S3 File Browser"
date: "2025-01-15"
featured: true
featuredOrder: 3
summary: "A full-stack web application for browsing and previewing files in public S3-compatible storage buckets. Features include real-time file preview for multiple formats, resizable panel interface, shareable URLs, and AWS CLI command generation."
image: "https://raw.githubusercontent.com/digin1/s3-bucket-viewer/refs/heads/main/images/screenshot1.png"
tag: "React, Flask, Python, Tailwind CSS, Docker, AWS S3, boto3"
demo: "https://github.com/digin1/s3-bucket-viewer"
---

## Project Overview

S3 Bucket Viewer is a web application designed to simplify browsing and previewing files stored in public S3-compatible buckets. It provides an intuitive interface for navigating bucket contents, previewing various file types directly in the browser, and generating shareable links or AWS CLI commands for batch operations.

## Project Details

### Technologies Used

* React.js
* Tailwind CSS
* Flask (Python)
* boto3 (AWS SDK)
* Docker & Docker Compose
* nginx

### Key Features

* **Directory Navigation**: Browse bucket contents with breadcrumb navigation and pagination support using S3 continuation tokens
* **Multi-Format File Preview**: In-browser preview support for text files, images (including TIFF conversion), CSV, XLSX, and DOCX documents
* **Resizable Panel Layout**: Adjustable split-view interface with draggable dividers for customizing the browsing experience
* **Shareable URLs**: Generate URLs that preserve the current endpoint, bucket, and path configuration for easy sharing
* **AWS CLI Sync Commands**: Automatically generate `aws s3 sync` commands for batch downloading files
* **Configuration Persistence**: Hierarchical config system using URL parameters, localStorage, and backend fallback
* **File Size Display**: Human-readable file sizes with appropriate unit formatting

### Development Process

#### Frontend Architecture

Built a React.js single-page application with sophisticated state management:

* **App.js (Main Component)**:
  * Manages global state including endpoint configuration, current path, and selected file
  * Implements resizable panel layout using mouse event handlers for drag functionality
  * Configuration persistence with priority: URL params > localStorage > backend config
  * Panel width constraints with minimum/maximum boundaries

* **BucketExplorer Component**:
  * Directory listing with pagination using S3 continuation tokens
  * Breadcrumb navigation for quick directory traversal
  * File size formatting and sorting capabilities
  * Click handling for both directories and files

* **FileViewer Component**:
  * Dispatcher component that routes files to appropriate handlers based on MIME type
  * Supports lazy loading of file content for performance

* **FileTypeHandlers**:
  * `TextViewer`: Syntax-highlighted code and plain text display
  * `ImageViewer`: Image preview with TIFF-to-PNG conversion support
  * `CsvViewer`: Tabular display of CSV data with headers
  * `XlsxViewer`: Excel spreadsheet rendering
  * `DocxViewer`: Word document preview

* **Utility Components**:
  * `ConfigPanel`: S3 endpoint and bucket configuration interface
  * `ShareableLink`: URL generation for current view state
  * `SyncCommandBox`: AWS CLI command generation for batch operations

#### Backend Architecture

Developed a Flask REST API for S3 interactions:

* **API Endpoints**:
  * `GET/POST/DELETE /api/config` - Manage S3 connection configuration with validation
  * `GET /api/list` - List bucket contents with pagination (500 items per page)
  * `GET /api/file` - Download or stream files for preview
  * `GET /api/fileinfo` - Retrieve file metadata including size and content type

* **S3 Integration**:
  * Uses boto3 with `UNSIGNED` signature configuration for public bucket access
  * Handles S3-compatible endpoints (AWS, MinIO, Wasabi, etc.)
  * Continuation token management for large directory listings

* **File Processing (file_handlers.py)**:
  * MIME type detection using python-magic
  * Text file preview with encoding detection
  * Image processing with TIFF-to-PNG conversion using Pillow
  * CSV parsing with pandas for structured display
  * XLSX extraction with openpyxl
  * DOCX text extraction with python-docx
  * 100MB size limit for preview operations

#### Deployment Infrastructure

* **Docker Compose Configuration**:
  * Backend service: Flask app on port 5000 (exposed as 5050)
  * Frontend service: nginx serving React build on port 80 (exposed as 8080)
  * Resource limits: CPU and memory constraints for production stability
  * Health checks for backend service monitoring
  * Shared bridge network for inter-service communication

* **Volume Management**:
  * Development hot-reload with mounted source directories
  * Separate node_modules volume to prevent conflicts

## Technical Highlights

* **Public Bucket Access**: Implements unsigned S3 requests using boto3's `UNSIGNED` signature, eliminating the need for AWS credentials when accessing public buckets
* **Format Conversion**: Server-side TIFF-to-PNG conversion enables web display of formats not natively supported by browsers
* **Efficient Pagination**: Leverages S3's native continuation tokens for efficient navigation of buckets with thousands of objects
* **Flexible Configuration**: Three-tier configuration system (URL > localStorage > backend) enables both shareable links and persistent user preferences
* **Responsive Design**: Tailwind CSS utilities provide mobile-friendly layouts with consistent styling
* **Container Orchestration**: Docker Compose setup enables single-command deployment with proper service dependencies and resource management

### Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Browser       │────▶│   nginx (80)    │────▶│   React App     │
│                 │     │   Frontend      │     │   (Static)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │   Flask API     │────▶│   S3 Bucket     │
                        │   (5000)        │     │   (Public)      │
                        └─────────────────┘     └─────────────────┘
```

## Use Cases

* **Data Exploration**: Quickly browse and preview files in public datasets without downloading
* **Team Sharing**: Generate shareable links to specific files or directories
* **Batch Downloads**: Generate AWS CLI commands for downloading multiple files efficiently
* **Cross-Platform Access**: Web-based interface works on any device with a browser

## Project URL

[GitHub Repository](https://github.com/digin1/s3-bucket-viewer)
