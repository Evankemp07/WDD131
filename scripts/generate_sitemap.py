#!/usr/bin/env python3
"""
Build sitemap.xml and robots.txt from all *.html under the repo root
(excludes .git, .github, node_modules, etc.).

CI / local:
  GITHUB_REPOSITORY=owner/repo  — infers https://owner.github.io/repo
  BASE_URL=https://...          — optional override of site origin
"""
from __future__ import annotations

import datetime
import os
import sys
from urllib.parse import quote
from xml.sax.saxutils import escape

NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
SKIP_DIRS = {".git", ".github", "node_modules", "vendor", "__pycache__", ".cursor", "mcps"}


def site_base() -> str:
    if base := os.environ.get("BASE_URL", "").strip():
        return base.rstrip("/")
    repo = os.environ.get("GITHUB_REPOSITORY", "").strip()
    if not repo or "/" not in repo:
        print(
            "Set BASE_URL or GITHUB_REPOSITORY (owner/repo), e.g.\n"
            "  GITHUB_REPOSITORY=Me/MySite python scripts/generate_sitemap.py",
            file=sys.stderr,
        )
        sys.exit(1)
    owner, name = repo.split("/", 1)
    return f"https://{owner.lower()}.github.io/{name}".rstrip("/")


def collect_html_files(root: str) -> list[tuple[str, str]]:
    out: list[tuple[str, str]] = []
    root = os.path.abspath(root)
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [
            d
            for d in dirnames
            if not d.startswith(".") and d not in SKIP_DIRS
        ]
        for name in sorted(filenames):
            if not name.endswith(".html"):
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, root)
            relp = rel.replace(os.sep, "/")
            try:
                m = os.path.getmtime(full)
                day = (
                    datetime.datetime.fromtimestamp(m, datetime.timezone.utc)
                    .date()
                    .isoformat()
                )
            except OSError:
                day = (
                    datetime.datetime.now(datetime.timezone.utc).date().isoformat()
                )
            out.append((relp, day))
    out.sort(key=lambda x: x[0])
    return out


def to_loc(base: str, relp: str) -> str:
    if relp == "index.html":
        return f"{base}/"
    return f"{base}/{quote(relp)}"


def render_sitemap(base: str, files: list[tuple[str, str]]) -> str:
    lines: list[str] = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<urlset xmlns="{NS}">',
    ]
    for relp, day in files:
        loc = to_loc(base, relp)
        lines.append("  <url>")
        lines.append(f"    <loc>{escape(loc)}</loc>")
        lines.append(f"    <lastmod>{escape(day)}</lastmod>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def write_robots(path: str, base: str) -> None:
    text = f"""User-agent: *
Allow: /

Sitemap: {base}/sitemap.xml
"""
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def main() -> None:
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_root)
    base = site_base()
    files = collect_html_files(".")
    if not files:
        print("No .html files found.", file=sys.stderr)
        sys.exit(1)
    sitemap = render_sitemap(base, files)
    out = os.path.join(repo_root, "sitemap.xml")
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(sitemap)
    write_robots(os.path.join(repo_root, "robots.txt"), base)
    print(f"Wrote sitemap for {len(files)} URL(s) — base: {base}")
    for relp, _ in files:
        print(f"  {relp}")


if __name__ == "__main__":
    main()
