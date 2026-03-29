---
title: "Statistical Analysis Pipeline for Neuroscience Data"
date: "2024-10-01"
featured: false
category: "research"
summary: "A comprehensive statistical analysis framework for neuroscience research data. Supports multi-group comparisons (ANOVA, t-tests, Mann-Whitney), post-hoc corrections (Bonferroni, Tukey HSD), effect size calculations, and publication-ready visualisations via R/ggplot2 integration."
image: ""
tag: "Python, R, SciPy, pandas, ggplot2, Flask, Statistics"
role: "Solo Developer"
duration: "1 month"
---

## Project Overview

A web-accessible statistical analysis pipeline built into the Grant Lab research platform. Researchers upload experimental datasets and receive comprehensive statistical reports with multiple test types, post-hoc corrections, and publication-quality plots — all without writing code or using external statistics software.

## Project Details

### Technologies Used

* Python (SciPy, pandas, NumPy)
* R (ggplot2, scales, readxl, dplyr)
* Flask (web interface)
* Dask (distributed computation for large datasets)

### Key Features

* **Multi-Test Framework**: ANOVA (one-way, two-way), independent/paired t-tests, Mann-Whitney U, Kruskal-Wallis
* **Post-Hoc Corrections**: Bonferroni, Tukey HSD, Holm-Sidak for multiple comparison correction
* **Effect Size Calculations**: Cohen's d, eta-squared for quantifying practical significance
* **R Plot Generation**: Publication-ready box plots, violin plots, density plots, and interaction plots via ggplot2
* **Batch Processing**: Run the same analysis across multiple brain regions or experimental conditions
* **Data Validation**: Automatic normality testing (Shapiro-Wilk) to recommend parametric vs non-parametric tests
* **Export**: Results as CSV/Excel tables, plots as high-resolution PNG/SVG

### Supported Plot Types

* Box plots with individual data points
* Violin plots with quartile markers
* Density distribution plots
* Interaction plots for two-way comparisons
* Bar plots with error bars

## Technical Highlights

* **Intelligent Test Selection**: Automatically recommends appropriate statistical tests based on data distribution and group structure
* **Python-R Bridge**: Python orchestrates data processing and test execution, then delegates visualisation to R/ggplot2 for publication-quality output
* **Reproducibility**: Every analysis generates a complete log of parameters, tests applied, and p-values for audit trails

## Impact

Eliminates the need for researchers to manually run statistics in SPSS, R, or Excel. Used to generate statistical analyses and figures for synaptome mapping publications.
