# Marco Martorana — Official Website

Personal website of **Marco Martorana** — Lead Software Engineer, Computer Science Teacher, Angular expert and AI enthusiast.

Built as a static site with **Hugo** and deployed to **GitHub Pages** at [marcomartorana.it](https://marcomartorana.it/).

**Framework:** [Hugo](https://gohugo.io/) v0.128.0 extended (static site generator) · Theme: [`lightbi-hugo`](https://github.com/binokochumolvarghese/lightbi-hugo)

---

## ✨ Features

- **Blog & sections** — `post`, `notes`, `meetings`, `informatics`, `ai`, `about`
- **Dark mode** — curated light/dark palette (toggle + system preference, persisted in `localStorage`)
- **Lunr search** — client-side full-text search
- **Featured carousel** — homepage spotlight of `featured: true` posts
- **Automatic table of contents** — on long posts (>400 words)
- **Text-to-speech** — "Ascolta" button on posts via the browser Web Speech API (no server)
- **Site assistant** — a lightweight chat widget (`static/js/site-assistant.js`) that answers from the content index (`search.json`)
- **Reading progress bar & back-to-top button**
- **Related posts**, social sharing, tag chips
- **`pdfReader` shortcode** — embeds a PDF viewer (`{{< pdfReader "/path/to/file.pdf" >}}`)

---

## 🛠 Tech stack

- [Hugo](https://gohugo.io/) **0.128.0** (extended edition — pinned in CI)
- Theme: [`lightbi-hugo`](https://github.com/binokochumolvarghese/lightbi-hugo) (kept **in-repo**, not a submodule)
- Bootstrap 5, Lunr, highlight.js — all **self-hosted** (`selfHosted = true`)
- No package.json, no build pipeline beyond Hugo

---

## 📁 Project structure

```
.
├── content/            # Markdown content (YAML front matter)
│   ├── post/           # blog posts
│   ├── notes/          # developer notes
│   ├── meetings/       # events / GDG talks
│   ├── informatics/    # teaching resources
│   ├── ai/             # AI articles
│   └── about/          # about page
├── layouts/            # custom templates (override the theme)
│   ├── index.html      # homepage (hero + featured carousel + latest)
│   ├── _default/single.html   # single post (TOC + TTS button)
│   ├── about/about.html       # about hero
│   ├── partials/       # head_custom, footer, footer_custom, seo, share-links…
│   ├── tags/collections.html  # section landing layout (top-image cards)
│   └── taxonomy/category.html # redirects /categories/* → sections
├── assets/             # processed images (front-matter `image`, cards, resizes)
├── static/             # verbatim files (inline images, js, pdf-js)
├── i18n/               # it / en translations (merged with theme)
├── hugo.toml           # site config + menu
└── .github/workflows/hugo.yml   # CI → GitHub Pages
```

---

## 🚀 Getting started

### 1. Install Hugo

The site is pinned to **Hugo 0.128.0 extended** — use the same version as CI to avoid build diffs.

- **macOS (Homebrew):**
  ```bash
  brew install hugo
  ```
- **Linux (Ubuntu/Debian):**
  ```bash
  # download the matching release (v0.128.0 extended)
  wget https://github.com/gohugoio/hugo/releases/download/v0.128.0/hugo_extended_0.128.0_linux-amd64.deb
  sudo dpkg -i hugo_extended_0.128.0_linux-amd64.deb
  ```
- **Windows (Chocolatey):**
  ```powershell
  choco install hugo-extended
  ```

> 💡 Package managers may install a newer version. For the exact pinned version, download the binary from the [Hugo releases page](https://github.com/gohugoio/hugo/releases/tag/v0.128.0).

Verify the installation:
```bash
hugo version   # expect: v0.128.0+extended
```

### 2. Clone & run locally

```bash
git clone <repo-url>
cd marcomartorana

hugo server                        # dev server → http://localhost:1313
hugo server --buildDrafts          # include draft pages
hugo server --disableFastRender    # full rebuild on change (custom templates)
hugo server -p 8080                # custom port
```

Stop the dev server with `Ctrl+C`.

### 3. Production build

```bash
hugo --minify        # → public/
```

---

## ✍️ Writing content

- All content is Markdown with **YAML front matter** (`---`). Fields: `title`, `date`, `draft`, `tags`, `categories`, `image`, `Description`, `featured`.
- Default language is **Italian** (`hugo.toml: languageCode = "it"`).
- Goldmark renderer has `unsafe = true` (raw HTML allowed in Markdown).
- The default archetype uses TOML front matter — **don't** rely on it as a template.

### Images

Two locations, two different purposes:

| Location | Purpose |
|---|---|
| `assets/img/` | front-matter `image` field — Hugo processes/resizes these for **cards** |
| `static/img/` | **inline** Markdown images, shortcodes, `og:image` logo — served verbatim |

A post that uses an image in both the card and the body needs a copy in **both** locations.

### Featured posts

Add `featured: true` to the front matter to surface a post in the homepage carousel.

---

## 🔧 Configuration

Key settings live in `hugo.toml`:

- `[Params]` — `previewCardImagePlacement`, `mainSections`, social/author details, `logo`
- `[[menu.main]]` — main navigation
- `[markup.tableOfContents]` — TOC levels
- `[markup.goldmark.renderer] unsafe = true` — raw HTML in Markdown

Custom styles/scripts are injected via `layouts/partials/head_custom.html` and `footer_custom.html`.

---

## 🌐 Deployment

Pushing to `main` triggers GitHub Actions (`.github/workflows/hugo.yml`):

1. Installs Hugo 0.128.0 extended
2. Builds with `hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"`
3. Deploys to GitHub Pages

Custom domain: `marcomartorana.it` (see `CNAME`).

---

## 📬 Contact

Marco Martorana — [marcomatto@gmail.com](mailto:marcomatto@gmail.com)

- LinkedIn: [marcomartorana](https://linkedin.com/in/marcomartorana)
- GitHub: [marcomattolab](https://github.com/marcomattolab)
- YouTube: [@MarcoMartoranaAI](https://www.youtube.com/@MarcoMartoranaAI)
