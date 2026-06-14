# AGENTS.md — Marco Martorana Website

Hugo static site (single user's personal website). Minimal toolchain — just Hugo 0.128.0 (pinned in CI). No tests, no linters, no package.json.

## Commands

```bash
hugo server                         # dev server at localhost:1313
hugo server --buildDrafts           # include draft pages
hugo --minify                       # production build → public/
```

## Content

- All content in `content/` as Markdown with **YAML front matter** (`---`). Fields: `title`, `date`, `draft`, `tags`, `categories`, `image`, `Description`, `featured`.
- Sections: `post/`, `notes/`, `meetings/`, `informatics/`, `about/` (latter 4 have `_index.md`).
- Default archetype (`archetypes/default.md`) uses **TOML front matter** (`+++`) — don't rely on it as a template for content.
- Default language is **Italian** (`hugo.toml: languageCode = "it"`).
- Goldmark renderer has `unsafe = true` (raw HTML allowed in Markdown).

## Theme & Layout

- Theme: `lightbi-hugo` at `themes/lightbi-hugo/` (not a git submodule — folder lives in-repo).
- Custom overrides in `layouts/` (partials, shortcodes).
- Custom shortcode: `{{< pdfReader "/path/to/file.pdf" >}}` renders an `<embed>`.
- Card image layout controlled by `previewCardImagePlacement` in `hugo.toml` (`"top"` / `"bottom"`).

## CI / Deploy

- GitHub Actions (`.github/workflows/hugo.yml`) builds on push to `main`.
- Build step: `hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`.
- Hugo version: `0.128.0` (extended edition). Local version should match.
- Custom domain: `marcomartorana.it` (set via `CNAME` and `docs/CNAME`).

## Navigation

Main menu defined in `hugo.toml` under `[[menu.main]]`: Home, Notes, School (`/tags/school/`), Meetings, Informatics, About.
