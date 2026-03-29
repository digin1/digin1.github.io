#!/usr/bin/env python3
"""
Generate a professional 2-page PDF resume for Digin Dominic.
Uses reportlab with Lato font family and a neural-science themed color palette.
Output: public/Digin_Dominic_Resume.pdf
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen.canvas import Canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "public", "Digin_Dominic_Resume.pdf")
FONT_DIR = "/usr/share/fonts/truetype/lato"

PAGE_W, PAGE_H = A4  # 595.27, 841.89 pts
MARGIN_LEFT = 40
MARGIN_RIGHT = 40
MARGIN_TOP = 35
MARGIN_BOTTOM = 30
CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT

# Colors
NEURAL_BLUE = HexColor("#3B82F6")
DEEP_SPACE = HexColor("#0A0F1C")
MUTED_STEEL = HexColor("#64748B")
SYNAPSE_CYAN = HexColor("#06B6D4")
SIGNAL_GREEN = HexColor("#10B981")
LIGHT_BORDER = HexColor("#E2E8F0")
TAG_BG = HexColor("#EFF6FF")
TAG_TEXT = HexColor("#2563EB")
WHITE = HexColor("#FFFFFF")
CARD_BG = HexColor("#F8FAFC")
GREEN_BADGE_BG = HexColor("#ECFDF5")
GREEN_BADGE_TEXT = HexColor("#059669")

# ---------------------------------------------------------------------------
# Font registration
# ---------------------------------------------------------------------------
def register_fonts():
    fonts = {
        "Lato": "Lato-Regular.ttf",
        "Lato-Bold": "Lato-Bold.ttf",
        "Lato-Light": "Lato-Light.ttf",
        "Lato-Black": "Lato-Black.ttf",
        "Lato-Medium": "Lato-Medium.ttf",
        "Lato-Semibold": "Lato-Semibold.ttf",
        "Lato-Heavy": "Lato-Heavy.ttf",
        "Lato-Italic": "Lato-Italic.ttf",
    }
    for name, filename in fonts.items():
        path = os.path.join(FONT_DIR, filename)
        if os.path.exists(path):
            pdfmetrics.registerFont(TTFont(name, path))


# ---------------------------------------------------------------------------
# Drawing helpers
# ---------------------------------------------------------------------------
class ResumeBuilder:
    def __init__(self, output_path):
        self.c = Canvas(output_path, pagesize=A4)
        self.c.setTitle("Digin Dominic - Resume")
        self.c.setAuthor("Digin Dominic")
        self.y = PAGE_H - MARGIN_TOP
        self.page_num = 1

    def save(self):
        self._draw_footer()
        self.c.save()

    def new_page(self):
        self._draw_footer()
        self.c.showPage()
        self.page_num += 1
        self.y = PAGE_H - MARGIN_TOP
        self._draw_accent_bar()

    def _draw_accent_bar(self):
        self.c.setFillColor(NEURAL_BLUE)
        self.c.rect(0, PAGE_H - 6, PAGE_W, 6, fill=1, stroke=0)

    def _draw_footer(self):
        self.c.setFont("Lato", 7.5)
        self.c.setFillColor(MUTED_STEEL)
        self.c.drawString(MARGIN_LEFT, 18, "digindominic.me")
        self.c.drawRightString(PAGE_W - MARGIN_RIGHT, 18,
                               f"Page {self.page_num} of 2")
        # subtle top line
        self.c.setStrokeColor(LIGHT_BORDER)
        self.c.setLineWidth(0.5)
        self.c.line(MARGIN_LEFT, 28, PAGE_W - MARGIN_RIGHT, 28)

    def check_space(self, needed):
        if self.y - needed < MARGIN_BOTTOM + 30:
            self.new_page()

    # -- text helpers --
    def set_font(self, name, size, color=DEEP_SPACE):
        self.c.setFont(name, size)
        self.c.setFillColor(color)

    def draw_text(self, text, x=None, font="Lato", size=9.5, color=DEEP_SPACE,
                  max_width=None):
        if x is None:
            x = MARGIN_LEFT
        self.set_font(font, size, color)
        if max_width:
            text = self._truncate(text, font, size, max_width)
        self.c.drawString(x, self.y, text)

    def draw_text_right(self, text, font="Lato", size=9.5, color=DEEP_SPACE):
        self.set_font(font, size, color)
        self.c.drawRightString(PAGE_W - MARGIN_RIGHT, self.y, text)

    def _truncate(self, text, font, size, max_w):
        w = pdfmetrics.stringWidth(text, font, size)
        if w <= max_w:
            return text
        while w > max_w and len(text) > 3:
            text = text[:-1]
            w = pdfmetrics.stringWidth(text + "...", font, size)
        return text + "..."

    def text_width(self, text, font, size):
        return pdfmetrics.stringWidth(text, font, size)

    # -- section header --
    def draw_section_header(self, title):
        self.check_space(30)
        self.y -= 14
        self.set_font("Lato-Bold", 12, NEURAL_BLUE)
        self.c.drawString(MARGIN_LEFT, self.y, title.upper())
        # underline
        self.y -= 4
        self.c.setStrokeColor(NEURAL_BLUE)
        self.c.setLineWidth(2)
        self.c.line(MARGIN_LEFT, self.y, MARGIN_LEFT + 40, self.y)
        self.y -= 10

    # -- bullet point --
    def draw_bullet(self, text, x=None, indent=10, bullet_size=3):
        if x is None:
            x = MARGIN_LEFT
        bullet_x = x + indent
        text_x = bullet_x + 8
        available_w = PAGE_W - MARGIN_RIGHT - text_x

        lines = self._wrap_text(text, "Lato", 9.5, available_w)
        self.check_space(len(lines) * 13 + 2)

        # draw blue dot
        self.c.setFillColor(NEURAL_BLUE)
        self.c.circle(bullet_x + 2, self.y + 3, bullet_size / 2, fill=1, stroke=0)

        self.set_font("Lato", 9.5, DEEP_SPACE)
        for i, line in enumerate(lines):
            self.c.drawString(text_x, self.y, line)
            self.y -= 13
        self.y -= 1

    def _wrap_text(self, text, font, size, max_w):
        words = text.split()
        lines = []
        current = ""
        for word in words:
            test = f"{current} {word}".strip()
            if pdfmetrics.stringWidth(test, font, size) <= max_w:
                current = test
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        return lines if lines else [""]

    def _wrap_text_with_bold(self, text, font, bold_font, size, max_w):
        """Wrap text that may contain **bold** markers. Returns list of
        (line_segments) where each segment is (text, is_bold)."""
        import re
        # Split into segments: bold vs normal
        parts = re.split(r'(\*\*.*?\*\*)', text)
        segments = []
        for part in parts:
            if part.startswith("**") and part.endswith("**"):
                segments.append((part[2:-2], True))
            else:
                segments.append((part, False))

        # Now wrap
        lines = []
        current_line = []
        current_w = 0

        for seg_text, is_bold in segments:
            f = bold_font if is_bold else font
            words = seg_text.split()
            for word in words:
                word_w = pdfmetrics.stringWidth(word + " ", f, size)
                if current_w + word_w > max_w and current_line:
                    lines.append(list(current_line))
                    current_line = []
                    current_w = 0
                current_line.append((word + " ", is_bold))
                current_w += word_w
        if current_line:
            lines.append(current_line)
        return lines if lines else [[(text, False)]]

    def draw_bullet_rich(self, text, x=None, indent=10, bullet_size=3):
        """Draw a bullet point with **bold** support."""
        if x is None:
            x = MARGIN_LEFT
        bullet_x = x + indent
        text_x = bullet_x + 8
        available_w = PAGE_W - MARGIN_RIGHT - text_x

        lines = self._wrap_text_with_bold(text, "Lato", "Lato-Bold", 9.5,
                                          available_w)
        self.check_space(len(lines) * 13 + 2)

        # draw blue dot
        self.c.setFillColor(NEURAL_BLUE)
        self.c.circle(bullet_x + 2, self.y + 3, bullet_size / 2, fill=1, stroke=0)

        for line_segs in lines:
            cx = text_x
            for seg_text, is_bold in line_segs:
                f = "Lato-Bold" if is_bold else "Lato"
                self.set_font(f, 9.5, DEEP_SPACE)
                self.c.drawString(cx, self.y, seg_text)
                cx += pdfmetrics.stringWidth(seg_text, f, 9.5)
            self.y -= 13
        self.y -= 1

    # -- tag badges --
    def draw_tags(self, tags, x=None, y_offset=0):
        if x is None:
            x = MARGIN_LEFT
        cx = x
        tag_h = 14
        tag_pad = 6
        tag_gap = 4
        row_start_y = self.y + y_offset

        for tag in tags:
            tw = pdfmetrics.stringWidth(tag, "Lato-Medium", 7.5)
            badge_w = tw + tag_pad * 2
            # wrap to next row
            if cx + badge_w > PAGE_W - MARGIN_RIGHT:
                cx = x
                row_start_y -= (tag_h + 4)
                self.y = row_start_y

            # draw rounded rect background
            self.c.setFillColor(TAG_BG)
            self.c.roundRect(cx, row_start_y - 3, badge_w, tag_h, 3,
                            fill=1, stroke=0)
            self.set_font("Lato-Medium", 7.5, TAG_TEXT)
            self.c.drawString(cx + tag_pad, row_start_y + 1, tag)
            cx += badge_w + tag_gap

        self.y = row_start_y - tag_h - 2

    # -- skill bars --
    def draw_skill_bar(self, label, level, x, width, bar_height=6):
        """Draw a skill category label with a filled bar underneath."""
        self.set_font("Lato-Medium", 8, DEEP_SPACE)
        self.c.drawString(x, self.y, label)
        bar_y = self.y - bar_height - 3
        # track
        self.c.setFillColor(LIGHT_BORDER)
        self.c.roundRect(x, bar_y, width, bar_height, 2, fill=1, stroke=0)
        # fill
        self.c.setFillColor(NEURAL_BLUE)
        fill_w = width * (level / 100.0)
        self.c.roundRect(x, bar_y, fill_w, bar_height, 2, fill=1, stroke=0)

    # -- project card --
    def draw_project_card(self, title, subtitle, tags_str, x, w, h):
        """Draw a rounded project card."""
        self.c.setStrokeColor(LIGHT_BORDER)
        self.c.setLineWidth(0.5)
        self.c.setFillColor(CARD_BG)
        self.c.roundRect(x, self.y - h + 10, w, h, 4, fill=1, stroke=1)

        inner_x = x + 8
        inner_y = self.y + 2
        self.set_font("Lato-Bold", 9, DEEP_SPACE)
        self.c.drawString(inner_x, inner_y, title)
        inner_y -= 12
        self.set_font("Lato", 8, MUTED_STEEL)
        # wrap subtitle
        max_sw = w - 16
        sub_lines = self._wrap_text(subtitle, "Lato", 8, max_sw)
        for sl in sub_lines[:2]:
            self.c.drawString(inner_x, inner_y, sl)
            inner_y -= 10

        # mini tags
        inner_y -= 2
        tag_list = [t.strip() for t in tags_str.split(",")]
        cx = inner_x
        for tag in tag_list:
            tw = pdfmetrics.stringWidth(tag, "Lato-Medium", 6.5)
            bw = tw + 8
            if cx + bw > x + w - 8:
                break
            self.c.setFillColor(TAG_BG)
            self.c.roundRect(cx, inner_y - 2, bw, 11, 2, fill=1, stroke=0)
            self.set_font("Lato-Medium", 6.5, TAG_TEXT)
            self.c.drawString(cx + 4, inner_y, tag)
            cx += bw + 3

    # -- impact card --
    def draw_impact_card(self, metric, label, accent_color, x, w, h=38):
        self.c.setStrokeColor(LIGHT_BORDER)
        self.c.setLineWidth(0.5)
        self.c.setFillColor(WHITE)
        self.c.roundRect(x, self.y, w, h, 4, fill=1, stroke=1)
        # colored left border
        self.c.setFillColor(accent_color)
        self.c.roundRect(x, self.y, 4, h, 2, fill=1, stroke=0)

        # auto-scale metric text to fit card
        avail_w = w - 16
        metric_size = 11
        while metric_size > 7:
            mw = pdfmetrics.stringWidth(metric, "Lato-Bold", metric_size)
            if mw <= avail_w:
                break
            metric_size -= 0.5
        self.set_font("Lato-Bold", metric_size, accent_color)
        self.c.drawString(x + 10, self.y + h - 15, metric)
        self.set_font("Lato", 7.5, MUTED_STEEL)
        self.c.drawString(x + 10, self.y + h - 27, label)


# ---------------------------------------------------------------------------
# Main build
# ---------------------------------------------------------------------------
def build_resume():
    register_fonts()
    rb = ResumeBuilder(OUTPUT_PATH)

    # ===================== PAGE 1 =====================

    # -- Accent bar --
    rb._draw_accent_bar()
    rb.y = PAGE_H - MARGIN_TOP - 8

    # -- Header --
    # Name
    rb.set_font("Lato-Black", 26, DEEP_SPACE)
    rb.c.drawString(MARGIN_LEFT, rb.y, "DIGIN DOMINIC")
    rb.y -= 18
    rb.set_font("Lato-Light", 12, MUTED_STEEL)
    rb.c.drawString(MARGIN_LEFT,rb.y,
                     "Research Software Engineer  |  Computational Scientist")

    # Contact info (right aligned)
    contact_x = PAGE_W - MARGIN_RIGHT
    contact_y = PAGE_H - MARGIN_TOP - 8
    contacts = [
        "digindominic@outlook.com",
        "+44 7340 341174",
        "Edinburgh, UK",
        "digindominic.me",
        "github.com/digin1",
        "linkedin.com/in/digin",
    ]
    rb.set_font("Lato", 8.5, MUTED_STEEL)
    for line in contacts:
        rb.c.drawRightString(contact_x, contact_y, line)
        contact_y -= 12

    rb.y -= 16

    # -- Divider --
    rb.c.setStrokeColor(LIGHT_BORDER)
    rb.c.setLineWidth(0.5)
    rb.c.line(MARGIN_LEFT, rb.y, PAGE_W - MARGIN_RIGHT, rb.y)
    rb.y -= 12

    # -- Professional Summary --
    rb.draw_section_header("Professional Summary")
    summary = (
        "Research software engineer with 8+ years of experience building "
        "production-grade scientific platforms at the University of Edinburgh. "
        "Equal contribution author on a Nature Scientific Reports publication. "
        "Specialises in large-scale microscopy data pipelines processing 24M+ "
        "synapses, GPU-accelerated analysis, interactive 3D brain visualisations, "
        "and distributed infrastructure serving 500+ researchers worldwide. "
        "Manages multi-node compute clusters and full-stack web platforms "
        "bridging neuroscience research and modern software engineering."
    )
    lines = rb._wrap_text(summary, "Lato", 9.5,
                          PAGE_W - MARGIN_LEFT - MARGIN_RIGHT)
    rb.set_font("Lato", 9.5, MUTED_STEEL)
    for line in lines:
        rb.c.drawString(MARGIN_LEFT, rb.y, line)
        rb.y -= 13
    rb.y -= 4

    # -- Experience --
    rb.draw_section_header("Experience")

    # Job 1
    rb.set_font("Lato-Bold", 10, DEEP_SPACE)
    rb.c.drawString(MARGIN_LEFT, rb.y, "Research Software Developer")
    rb.set_font("Lato", 9.5, MUTED_STEEL)
    rb.c.drawString(MARGIN_LEFT + rb.text_width("Research Software Developer  ",
                    "Lato-Bold", 10), rb.y,
                    "|  University of Edinburgh, Grant Lab \u2013 CCBS")
    rb.draw_text_right("2020 \u2013 Present", font="Lato-Medium", size=9,
                       color=MUTED_STEEL)
    rb.y -= 15

    bullets_1 = [
        "Developed SynaptopathyDB (Nature Scientific Reports), a comprehensive "
        "database integrating 64 proteomic studies with 3,437 synapse proteins "
        "mapped to 1,266 diseases, serving 500+ researchers",

        "Built GPU-accelerated synapse detection pipeline (TrackMate + PyTorch "
        "CUDA) processing 24M+ synaptic puncta with ray-casting ROI projection "
        "across 243+ tiled montages",

        "Created MontageROI Segmenter \u2014 web-based annotation tool with "
        "Three.js canvas, multi-channel TIFF support, and ImageJ-compatible "
        "export for production research workflows",

        "Designed custom image stitching pipeline achieving 6.4x speedup over "
        "baseline (45 min \u2192 7 min) with correlation-weighted cross-channel "
        "optimisation",

        "Built NeuroSphere interactive 3D brain atlas (Three.js/WebGL) covering "
        "43 human and 25 mouse brain regions with real-time neural circuit "
        "simulation",

        "Developed multiple Next.js/TypeScript synaptome atlas platforms "
        "(SV2A, Nanoarchitecture) with interactive SVG visualisations and "
        "multi-age/sex comparison",

        "Architected AI-powered workflow automation platform (FastAPI + Next.js) "
        "integrating Claude, OpenAI, and Gemini APIs with Celery task queues",

        "Managed 7-node compute cluster via Ansible, Docker Swarm orchestration, "
        "and CI/CD pipelines (GitLab CI)",
    ]
    for b in bullets_1:
        rb.draw_bullet(b)

    rb.y -= 4

    # Job 2
    rb.check_space(50)
    rb.set_font("Lato-Bold", 10, DEEP_SPACE)
    rb.c.drawString(MARGIN_LEFT, rb.y, "Full Stack Developer")
    rb.set_font("Lato", 9.5, MUTED_STEEL)
    rb.c.drawString(MARGIN_LEFT + rb.text_width("Full Stack Developer  ",
                    "Lato-Bold", 10), rb.y, "|  Freelance & Commercial")
    rb.draw_text_right("2017 \u2013 2020", font="Lato-Medium", size=9,
                       color=MUTED_STEEL)
    rb.y -= 15

    bullets_2 = [
        "Delivered e-commerce platforms, CMS systems, IoT asset management, "
        "and inventory management applications for multiple clients",
        "Managed Linux server infrastructure, virtualisation (KVM, Xen, "
        "OpenVZ), and monitoring (Nagios, Prometheus, Grafana)",
    ]
    for b in bullets_2:
        rb.draw_bullet(b)

    rb.y -= 2

    # -- Key Projects --
    rb.draw_section_header("Key Projects")

    projects = [
        ("SynaptopathyDB", "Nature publication, 770MB+ DB",
         "React, Flask, PostgreSQL"),
        ("NeuroSphere", "Interactive 3D Brain Atlas",
         "Three.js, WebGL, React"),
        ("MontageROI Segmenter", "Web annotation tool",
         "Flask, Three.js, Canvas"),
        ("TrackMate Mapping", "GPU synapse detection",
         "PyTorch, CUDA, Python"),
        ("SV2A Synaptome Atlas", "Multi-age/sex comparison",
         "Next.js 14, TypeScript, SVG"),
        ("Code-Pad.me", "Best Project Award (NTU)",
         "Django, Docker, WebSocket"),
    ]

    card_w = (CONTENT_W - 10) / 2
    card_h = 52
    for i, (title, subtitle, tags) in enumerate(projects):
        col = i % 2
        row = i // 2
        cx = MARGIN_LEFT + col * (card_w + 10)
        card_top_y = rb.y - row * (card_h + 6)
        # temporarily set y for drawing
        save_y = rb.y
        rb.y = card_top_y
        rb.draw_project_card(title, subtitle, tags, cx, card_w, card_h)
        rb.y = save_y

    rb.y -= 3 * (card_h + 6) + 4

    # -- Technical Skills --
    rb.draw_section_header("Technical Skills")

    skills = [
        ("Languages", "Python, JavaScript/TypeScript, Shell, R, SQL, C#", 92),
        ("Frontend", "React, Next.js, Three.js/WebGL, Tailwind CSS", 90),
        ("Backend", "Flask, FastAPI, Django, Celery, Dask", 88),
        ("DevOps", "Docker/Swarm, Ansible, AWS, GitLab CI, K8s", 85),
        ("Data / ML", "PyTorch (CUDA), OpenCV, NumPy, TensorFlow", 82),
        ("Databases", "PostgreSQL, SQLite, MongoDB, MySQL, Redis", 86),
    ]

    col_w = (CONTENT_W - 20) / 3
    bar_w = col_w - 8
    row_h = 32
    base_y = rb.y

    for i, (label, techs, level) in enumerate(skills):
        col = i % 3
        row = i // 3
        sx = MARGIN_LEFT + col * (col_w + 10)
        sy = base_y - row * row_h

        rb.set_font("Lato-Bold", 8.5, DEEP_SPACE)
        rb.c.drawString(sx, sy, label)
        rb.set_font("Lato", 7, MUTED_STEEL)
        # truncate tech list to fit
        tech_display = techs
        tw = pdfmetrics.stringWidth(tech_display, "Lato", 7)
        if tw > bar_w:
            while tw > bar_w and len(tech_display) > 10:
                tech_display = tech_display[:-1]
                tw = pdfmetrics.stringWidth(tech_display + "...", "Lato", 7)
            tech_display += "..."
        rb.c.drawString(sx, sy - 11, tech_display)
        # bar
        bar_y = sy - 20
        rb.c.setFillColor(LIGHT_BORDER)
        rb.c.roundRect(sx, bar_y, bar_w, 5, 2, fill=1, stroke=0)
        rb.c.setFillColor(NEURAL_BLUE)
        rb.c.roundRect(sx, bar_y, bar_w * level / 100, 5, 2, fill=1, stroke=0)

    rb.y = base_y - 2 * row_h - 8

    # ===================== PAGE 2 =====================
    rb.new_page()

    # -- Education --
    rb.draw_section_header("Education")

    rb.set_font("Lato-Bold", 10, DEEP_SPACE)
    rb.c.drawString(MARGIN_LEFT, rb.y, "MSc Cyber Security")
    rb.set_font("Lato", 9.5, MUTED_STEEL)
    rb.c.drawString(MARGIN_LEFT + rb.text_width("MSc Cyber Security  ",
                    "Lato-Bold", 10), rb.y, "|  Nottingham Trent University")
    rb.draw_text_right("2021 \u2013 2022", font="Lato-Medium", size=9,
                       color=MUTED_STEEL)
    rb.y -= 15

    rb.draw_bullet("Best Project Award \u2014 Code-Pad.me (online code execution "
                    "platform with real-time collaboration)")
    rb.draw_bullet("Focus: Secure systems, infrastructure hardening, "
                    "risk-aware architecture")

    rb.y -= 4

    # -- Publications --
    rb.draw_section_header("Publications")

    # Published badge
    badge_text = "PUBLISHED"
    bw = pdfmetrics.stringWidth(badge_text, "Lato-Bold", 7) + 10
    rb.c.setFillColor(GREEN_BADGE_BG)
    rb.c.roundRect(MARGIN_LEFT, rb.y - 2, bw, 13, 3, fill=1, stroke=0)
    rb.set_font("Lato-Bold", 7, GREEN_BADGE_TEXT)
    rb.c.drawString(MARGIN_LEFT + 5, rb.y + 1, badge_text)

    pub_x = MARGIN_LEFT + bw + 8
    pub_w = PAGE_W - MARGIN_RIGHT - pub_x

    pub1_title = (
        '"SynaptopathyDB integrates synaptic proteomes with disease data '
        'to reveal shared and unique pathogenic mechanisms"'
    )
    rb.set_font("Lato-Bold", 9, DEEP_SPACE)
    title_lines = rb._wrap_text(pub1_title, "Lato-Bold", 9, pub_w)
    for tl in title_lines:
        rb.c.drawString(pub_x, rb.y, tl)
        rb.y -= 12

    rb.set_font("Lato", 8.5, MUTED_STEEL)
    authors = ("Sorokina O*, Dominic D*, Bay\u00e9s \u00c0, Armstrong JD, "
               "Grant SGN. Scientific Reports 15(1), 42986 (2025)")
    auth_lines = rb._wrap_text(authors, "Lato", 8.5, pub_w)
    for al in auth_lines:
        rb.c.drawString(pub_x, rb.y, al)
        rb.y -= 11

    rb.set_font("Lato", 8, SYNAPSE_CYAN)
    rb.c.drawString(pub_x, rb.y, "DOI: 10.1038/s41598-025-26969-z")
    # equal contribution note
    ec_x = pub_x + pdfmetrics.stringWidth(
        "DOI: 10.1038/s41598-025-26969-z   ", "Lato", 8)
    rb.set_font("Lato-Italic", 8, SIGNAL_GREEN)
    rb.c.drawString(ec_x, rb.y, "* Equal contribution")
    rb.y -= 18

    # Preprint
    badge_text2 = "PREPRINT"
    bw2 = pdfmetrics.stringWidth(badge_text2, "Lato-Bold", 7) + 10
    rb.c.setFillColor(TAG_BG)
    rb.c.roundRect(MARGIN_LEFT, rb.y - 2, bw2, 13, 3, fill=1, stroke=0)
    rb.set_font("Lato-Bold", 7, TAG_TEXT)
    rb.c.drawString(MARGIN_LEFT + 5, rb.y + 1, badge_text2)

    pub2_x = MARGIN_LEFT + bw2 + 8
    pub2_w = PAGE_W - MARGIN_RIGHT - pub2_x

    pub2_title = (
        '"PRMix: Primary Region Mix Augmentation for Instance '
        'Segmentation in Volumetric Brain Electron Microscopy"'
    )
    rb.set_font("Lato-Bold", 9, DEEP_SPACE)
    t2_lines = rb._wrap_text(pub2_title, "Lato-Bold", 9, pub2_w)
    for tl in t2_lines:
        rb.c.drawString(pub2_x, rb.y, tl)
        rb.y -= 12

    rb.set_font("Lato", 8.5, MUTED_STEEL)
    authors2 = ("Yuan K, Woods H, G\u00fcnar \u00dc, Dominic D, Wu Y, Qiu Z, "
                "Grant SGN. bioRxiv (2025)")
    a2_lines = rb._wrap_text(authors2, "Lato", 8.5, pub2_w)
    for al in a2_lines:
        rb.c.drawString(pub2_x, rb.y, al)
        rb.y -= 11

    rb.set_font("Lato", 8, SYNAPSE_CYAN)
    rb.c.drawString(pub2_x, rb.y, "DOI: 10.1101/2025.08.13.670045")
    rb.y -= 18

    # -- Additional Competencies --
    rb.draw_section_header("Additional Competencies")

    competencies = [
        ("Scientific Computing", [
            "Microscopy pipelines (ND2/CZI/TIFF/IMS)",
            "Image stitching & 3D segmentation (nnUNet)",
            "Brain atlas mapping & colocalization analysis",
        ]),
        ("Infrastructure", [
            "Docker Swarm & 7-node cluster management",
            "NAS (Synology), GPU pinning, NUMA scheduling",
            "Network tuning & performance optimisation",
        ]),
        ("Soft Skills", [
            "Bridges scientists and software engineering",
            "Translates research needs into robust systems",
            "Autonomous end-to-end ownership & training",
        ]),
    ]

    col_w_comp = (CONTENT_W - 20) / 3
    base_y_comp = rb.y
    lowest_cy = base_y_comp  # track lowest point across all columns

    for i, (cat_title, items) in enumerate(competencies):
        cx = MARGIN_LEFT + i * (col_w_comp + 10)
        cy = base_y_comp

        rb.set_font("Lato-Bold", 9, DEEP_SPACE)
        rb.c.drawString(cx, cy, cat_title)
        cy -= 14

        for item in items:
            # small bullet
            rb.c.setFillColor(NEURAL_BLUE)
            rb.c.circle(cx + 4, cy + 3, 1.5, fill=1, stroke=0)
            rb.set_font("Lato", 8.5, MUTED_STEEL)
            item_lines = rb._wrap_text(item, "Lato", 8.5, col_w_comp - 14)
            for il in item_lines:
                rb.c.drawString(cx + 12, cy, il)
                cy -= 11
            cy -= 2

        if cy < lowest_cy:
            lowest_cy = cy

    rb.y = lowest_cy - 10

    # -- Impact Highlights --
    rb.draw_section_header("Impact Highlights")

    impacts = [
        ("Nature Publication", "Scientific Reports", NEURAL_BLUE),
        ("500+", "Researchers Served", SYNAPSE_CYAN),
        ("24M+", "Synapses Processed", NEURAL_BLUE),
        ("Best Project Award", "NTU MSc", SIGNAL_GREEN),
        ("8+ Years", "Experience", MUTED_STEEL),
    ]

    card_w_imp = (CONTENT_W - 4 * 8) / 5
    card_h_imp = 40

    for i, (metric, label, color) in enumerate(impacts):
        cx = MARGIN_LEFT + i * (card_w_imp + 8)
        rb.draw_impact_card(metric, label, color, cx, card_w_imp, card_h_imp)

    rb.y -= card_h_imp + 10

    # -- Save --
    rb.save()
    print(f"Resume generated: {OUTPUT_PATH}")
    print(f"File size: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    build_resume()
