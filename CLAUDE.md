# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Marco Martorana's official personal website, built with Hugo (static site generator) using the Lightbi theme. The site is deployed to GitHub Pages via GitHub Actions.

## Commands

### Local Development

```bash
hugo server                    # Start local dev server
hugo server --buildDrafts      # Include draft posts
hugo server --disableFastRender # Full rebuild on changes
```

### Build

```bash
hugo --minify                  # Production build
```

The `public/` directory contains the generated static site.

## Architecture

### Technology Stack
- **Hugo** - Static site generator (Go-based)
- **Lightbi Theme** - Minimalistic blog theme with mobile-first responsive design
- **GitHub Pages** - Hosting with automated CI/CD via GitHub Actions

### Directory Structure

```
├── content/           # Markdown content files (YAML front matter)
│   ├── about/         # About page
│   ├── informatics/   # Computer science posts
│   ├── meetings/      # Meeting notes
│   ├── notes/         # Short notes
│   └── post/          # Blog posts
├── layouts/           # Custom Hugo templates (overrides theme defaults)
│   ├── partials/      # Reusable template fragments
│   └── shortcodes/    # Custom shortcodes
├── themes/lightbi-hugo/  # Theme (git submodule)
├── static/            # Static assets (CSS, JS, images)
├── assets/            # Processed assets (SCSS, etc.)
├── data/              # Data files for templates
├── i18n/              # Internationalization strings
├── archetypes/        # Content templates for `hugo new`
└── public/            # Generated output (gitignored in dev, deployed)
```

### Content Organization

Content uses YAML front matter with these key fields:
- `title`, `date`, `draft`, `tags`, `categories`
- Content sections: Blog (post), Notes, Meetings, Informatics, About

Main navigation is defined in `hugo.toml` under `[[menu.main]]`.

### Configuration

`hugo.toml` contains:
- Site metadata (baseURL, title, language)
- Theme configuration (`theme = "lightbi-hugo"`)
- Author info and social links
- Menu structure
- Feature flags (search, social share, related posts)
- `previewCardImagePlacement` controls card image layout

### CI/CD

GitHub Actions workflow (`.github/workflows/`) builds with Hugo 0.128.0 and deploys to GitHub Pages on pushes to `main`. Requires `submodules: recursive` for theme.
