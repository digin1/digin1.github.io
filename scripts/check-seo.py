#!/usr/bin/env python3
"""Audit the emitted static site. Requires Python 3's standard library only."""
import json
import sys
from collections import defaultdict
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree as ET

SITE_URL = "https://digindominic.me"
# Editorial budgets for concise snippets, not search-engine indexing limits.
TITLE_BUDGET = 65
DESCRIPTION_BUDGET = 170


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.title = ""
        self.meta = {}
        self.canonicals = []
        self.h1_count = 0
        self.schemas = []
        self.language = None
        self.in_title = False
        self.in_json = False
        self.json_text = ""
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.language = attrs.get("lang")
        elif tag == "title":
            self.in_title = True
        elif tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            if key:
                self.meta.setdefault(key.lower(), []).append(attrs.get("content", ""))
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_json = True
            self.json_text = ""

    def handle_data(self, text):
        if self.in_title:
            self.title += text
        if self.in_json:
            self.json_text += text

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self.in_json:
            self.schemas.append(json.loads(self.json_text))
            self.in_json = False

    def value(self, key):
        return self.meta.get(key, [""])[0]


def audit(root):
    errors = []
    canonicals = set()
    titles = defaultdict(list)
    descriptions = defaultdict(list)
    files = sorted(root.rglob("index.html")) + [root / "404.html"]
    if not (root / "index.html").is_file():
        raise ValueError("No static export found. Run npm run build first.")

    for path in files:
        relative = path.relative_to(root).as_posix()
        try:
            page = Page(path.read_text(encoding="utf-8"))
        except (OSError, ValueError) as error:
            errors.append(f"{relative}: cannot parse page or JSON-LD: {error}")
            continue
        if relative in ("404.html", "404/index.html"):
            if "noindex" not in page.value("robots") or page.canonicals:
                errors.append(f"{relative}: 404 pages must be noindex without a canonical")
            continue

        expected_path = "/" + relative.removesuffix("index.html")
        expected_url = SITE_URL + expected_path
        if page.canonicals != [expected_url]:
            errors.append(f"{relative}: expected exactly one canonical, {expected_url}")
        canonicals.add(expected_url)
        if not page.title or len(page.title) > TITLE_BUDGET:
            errors.append(f"{relative}: title is missing or exceeds {TITLE_BUDGET} characters")
        description = page.value("description")
        if not description or len(description) > DESCRIPTION_BUDGET:
            errors.append(f"{relative}: description is missing or exceeds {DESCRIPTION_BUDGET} characters")
        titles[page.title].append(relative)
        descriptions[description].append(relative)
        for key in ("description", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"):
            if len(page.meta.get(key, [])) != 1 or not page.value(key):
                errors.append(f"{relative}: missing, empty or duplicate {key}")
        if page.value("og:url") != expected_url:
            errors.append(f"{relative}: Open Graph URL does not match canonical")
        for key in ("og:description", "twitter:description"):
            if page.value(key) != description:
                errors.append(f"{relative}: {key} does not match the search description")
        for key in ("og:image", "twitter:image"):
            image = urlparse(page.value(key))
            if image.scheme != "https":
                errors.append(f"{relative}: {key} must be an absolute HTTPS URL")
            elif image.netloc == urlparse(SITE_URL).netloc:
                if not (root / unquote(image.path).lstrip("/")).is_file():
                    errors.append(f"{relative}: missing {key} file: {image.path}")
        if page.h1_count != 1 or not page.language:
            errors.append(f"{relative}: expected one H1 and a document language")
        if "noindex" in page.value("robots") or "noindex" in page.value("googlebot"):
            errors.append(f"{relative}: content page unexpectedly excludes indexing")
        if not page.schemas or any(not isinstance(s, dict) or not s.get("@context") or not s.get("@type") for s in page.schemas):
            errors.append(f"{relative}: missing or incomplete JSON-LD")

    for label, groups in (("title", titles), ("description", descriptions)):
        for paths in groups.values():
            if len(paths) > 1:
                errors.append(f"Duplicate {label}: {', '.join(paths)}")

    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap = ET.parse(root / "sitemap.xml")
    entries = sitemap.findall("s:url", ns)
    urls = [entry.findtext("s:loc", namespaces=ns) for entry in entries]
    if len(urls) != len(set(urls)) or set(urls) != canonicals:
        errors.append("Sitemap must contain every indexable canonical exactly once")
    for entry in entries:
        try:
            modified = date.fromisoformat(entry.findtext("s:lastmod", namespaces=ns) or "")
            if modified > date.today():
                errors.append("Sitemap contains a future lastmod date")
        except ValueError:
            errors.append("Sitemap contains an invalid lastmod date")
    if f"Sitemap: {SITE_URL}/sitemap.xml" not in (root / "robots.txt").read_text():
        errors.append("robots.txt must advertise the canonical sitemap")
    if errors:
        print("SEO checks failed:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print(f"SEO checks passed: {len(canonicals)} indexable pages, unique concise metadata, canonicals, social images, JSON-LD and sitemap; 404 excluded.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(audit(Path(sys.argv[1] if len(sys.argv) > 1 else "out")))
    except (OSError, ValueError, ET.ParseError) as error:
        print(f"SEO check could not run: {error}", file=sys.stderr)
        sys.exit(1)
