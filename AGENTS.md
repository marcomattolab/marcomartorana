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

## Images

Two image locations serve **different purposes** — do not confuse them:

- **`assets/img/`** — referenced by the front matter `image` field. Hugo processes these with `resources.Get` (resize + fingerprint) to build the **card images** shown on the homepage and section listings. Images here are NOT served at `/img/...` directly.
- **`static/img/`** — referenced **inline** in Markdown bodies (`![](/img/...)`), by shortcodes (e.g. the gallery), or by config (e.g. `logo` for `og:image`). Served verbatim at `/img/...`.

A post that uses an image in both the card and the body needs a copy in **both** locations (e.g. `assets/img/posts/x.png` + `static/img/posts/x.png`).

## Navigation

Main menu defined in `hugo.toml` under `[[menu.main]]`: Home, Notes, School (`/tags/school/`), Meetings, AI, Informatics, About.

Section landing pages (`ai/`, `informatics/`, `meetings/`) use the `collections` layout (`layouts/tags/collections.html`) with top-image cards. The old taxonomy URLs `/categories/ai/`, `/categories/informatics/`, `/categories/events/` redirect to those sections via `layouts/taxonomy/category.html`.

## CI / Deploy

- GitHub Actions (`.github/workflows/hugo.yml`) builds on push to `main`.
- Build step: `hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`.
- Hugo version: `0.128.0` (extended edition). Local version should match.
- Custom domain: `marcomartorana.it` (set via `CNAME` and `docs/CNAME`).
