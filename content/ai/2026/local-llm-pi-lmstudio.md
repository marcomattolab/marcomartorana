---
title: "Build a Local LLM Agent with pi + LM Studio and Custom Skills"
date: 2026-09-20
tags: ["ai", "llm", "pi", "lm-studio", "agents", "skills", "angular"]
image: "/img/posts/local-llm-pi-lmstudio.png"
Description: "Run pi fully offline with a local model served by LM Studio, then teach it four custom skills: code review, coding, Angular 21+ and a mail agent."
featured: true
---

# Build a Local LLM Agent with pi + LM Studio

You don't need a cloud API to have a capable coding agent. In this guide we run **[pi](https://pi.dev)** — the coding agent — entirely offline against a local model served by **[LM Studio](https://lmstudio.ai)**, and then we extend it with **four custom skills**:

1. **code-review** — systematic review of diffs and pull requests
2. **coding** — general coding assistant workflow
3. **angular-21** — conventions and patterns for modern Angular (21+)
4. **mail-agent** — draft, reply to and polish emails

The result is a private, free, local agent that knows *your* rules.

---

## Why a local agent?

- **Privacy** — every token, note and code snippet stays on your machine.
- **No token costs** — the model runs on your GPU/CPU.
- **Offline** — works on a plane, in a lab, behind a firewall.
- **Reproducible** — the model + the skills are versioned in your repo.

---

## Prerequisites

- **pi** installed globally:

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

- **LM Studio** — download from [lmstudio.ai](https://lmstudio.ai) and install it.
- A **local model** — a coding-capable one. Good starting points:
  - `Qwen 2.5 Coder 14B Instruct` (or 32B if you have the VRAM)
  - `Llama 3.1 8B` for lighter hardware
  - any GGUF model that fits your RAM/VRAM

---

## Step 1 — Serve the model with LM Studio

1. Open LM Studio and download your model from the **Discover** tab.
2. Load it in the **Chat** tab.
3. Go to **Developer → Local Server** and click **Start Server**.

LM Studio exposes an **OpenAI-compatible** endpoint at:

```text
http://localhost:1234/v1
```

Keep the server running while you work with pi.

---

## Step 2 — Register the model in pi

pi reads custom providers and models from `~/.pi/agent/models.json` (create the file if it doesn't exist):

```json
{
  "providers": {
    "lmstudio": {
      "baseUrl": "http://localhost:1234/v1",
      "api": "openai-completions",
      "apiKey": "lm-studio",
      "compat": {
        "supportsDeveloperRole": false,
        "supportsReasoningEffort": false
      },
      "models": [
        { "id": "qwen2.5-coder-14b-instruct" }
      ]
    }
  }
}
```

Notes:

- `api` is `openai-completions` (LM Studio speaks the OpenAI Chat Completions API).
- `apiKey` is a **dummy value**: LM Studio ignores it, but pi treats models as requiring some auth before they appear in `/model`. Any placeholder works.
- `compat.supportsDeveloperRole: false` tells pi to send the system prompt as a `system` message, which local OpenAI-compatible servers understand.
- Change the model `id` to match the exact model name shown in LM Studio.

The file is reloaded every time you open `/model`, so you can edit it without restarting pi.

---

## Step 3 — Select the local model

Verify the model is discovered:

```bash
pi --list-models | grep lmstudio
```

Start pi with the local model:

```bash
pi --model lmstudio/qwen2.5-coder-14b-instruct
```

Or start pi normally and switch with `/model` in the TUI (press **Ctrl+S** in the picker to save it as the startup default).

---

## Step 4 — Add skills

Skills are self-contained capability packages that pi loads **on demand**. A skill is a folder containing a `SKILL.md` file with YAML frontmatter.

- **Global:** `~/.pi/agent/skills/<skill-name>/SKILL.md`
- **Project:** `.pi/skills/<skill-name>/SKILL.md` (shared with the team via git)

At startup pi scans these locations and lists the skills in the system prompt; when a task matches a skill's `description`, the agent loads the full `SKILL.md`. You can also force it with `/skill:<name>`.

Create the four skills:

```bash
mkdir -p ~/.pi/agent/skills/{code-review,coding,angular-21,mail-agent}
```

### 1. code-review

`~/.pi/agent/skills/code-review/SKILL.md`

````markdown
---
name: code-review
description: Review code changes for correctness, security, performance and maintainability. Use when asked to review a PR, a diff, a commit, or a specific file.
---

# Code Review

## Workflow
1. Run `git diff` (or read the changed files) to see exactly what changed.
2. Read enough surrounding code to understand the context.
3. Check the items below, in order.
4. Report findings grouped by severity.

## Checklist
- **Correctness** — edge cases, off-by-one, null/undefined, error handling, async/await, races.
- **Security** — injection, secrets, unsafe input, path traversal, broken authz.
- **Performance** — unnecessary work in loops, N+1 queries, memory leaks, blocking calls.
- **Maintainability** — naming, duplication, function size, dead code, missing types.
- **Tests** — are the key paths covered? did the change break existing behavior?

## Output format
- **Summary** — one or two sentences.
- **Blocking** — must fix before merge.
- **Non-blocking** — nice to have.
- **Suggested diff** — concrete fix, never just a description.

Be specific: reference file, line, and why it matters. Do not nitpick style unless it affects readability.
````

### 2. coding

`~/.pi/agent/skills/coding/SKILL.md`

````markdown
---
name: coding
description: General coding assistant workflow. Use when writing, refactoring, explaining, or fixing code in any language.
---

# Coding

## Principles
- Read existing code before changing it; match its conventions.
- Prefer small, pure functions with clear names.
- Handle errors explicitly; never swallow exceptions silently.
- Add types (or docstrings) on public interfaces.
- Keep changes minimal and focused; do not refactor unrelated code.

## Workflow
1. Restate the task and confirm the acceptance criteria.
2. Explore the relevant files (`read`, `grep`, `find`).
3. Propose the plan, then implement with `edit`/`write`.
4. Run the project's checks (tests, linter, build) before declaring done.
5. Summarize what changed and any manual verification steps.

## When unsure
- Ask a clarifying question instead of guessing.
- Prefer the simplest solution that satisfies the requirements.
- If the project has an `AGENTS.md`, follow it strictly.
````

### 3. angular-21

`~/.pi/agent/skills/angular-21/SKILL.md`

````markdown
---
name: angular-21
description: Angular 21+ conventions and patterns. Use when working on Angular components, services, templates, signals, dependency injection, or routing.
---

# Angular 21+

## Standalone & DI
- Components are standalone by default; do not create NgModules for new code.
- Use `inject()` instead of constructor injection.
- Prefer `provide*` functions in `app.config.ts` (e.g. `provideHttpClient`, `provideRouter`).

## Signals (preferred over RxJS for state)
- Use `signal`, `computed`, and `effect` for local state.
- Use `input()`, `output()`, `model()` for component APIs instead of `@Input`/`@Output`.
- Keep the app zoneless: avoid mutating state outside signals.
- Interop only when needed: `toSignal` / `toObservable`.

## Templates
- Use the new control flow: `@if`, `@for` (with `track`), `@switch`.
- Use `@defer` to lazy-load heavy parts of a template.
- Prefer `let` bindings and signal reads over method calls in templates.

## RxJS & HTTP
- Use the new signals-based `httpResource` for declarative HTTP when available.
- Keep `AsyncPipe` usage where observables remain; prefer signals for new code.

## Style
- Use `OnPush`/zoneless change detection; avoid `ChangeDetectorRef` hacks.
- Strong typing: no `any`, prefer `interface` and generics.
- Small, focused components; move logic to services or stores.
- Follow the Angular Style Guide naming (`*.component.ts`, `*.service.ts`).
````

### 4. mail-agent

`~/.pi/agent/skills/mail-agent/SKILL.md`

````markdown
---
name: mail-agent
description: Draft, reply to and polish emails. Use when asked to write, answer, or improve an email or message.
---

# Mail Agent

## Workflow
1. Ask for recipient, context and goal if not provided.
2. Draft the email following the structure below.
3. Keep it short: one topic, one clear call to action.

## Structure
- **Subject** — specific and honest (4–8 words).
- **Greeting** — match the relationship (formal/informal).
- **Body** — context in 1–2 sentences, then the request/answer.
- **Call to action** — what you need and by when.
- **Signature** — name, role, and optional contact.

## Tone rules
- Professional, warm, no jargon.
- Never passive-aggressive; reframe complaints as requests.
- For replies: quote only the relevant part, answer point by point.

## Safety
- Draft text only by default; do not send email automatically.
- If a send script exists (`./scripts/send.sh`), run it only after the user explicitly confirms the final draft.

## Example

Subject: Follow-up on the Angular migration review

Hi Marco,

just following up on the migration review we discussed on Monday. Could you have a look at the open PR by Thursday so we can unblock the release?

Thanks,
[Your name]
````

---

## Step 5 — Verify the skills

List what pi discovered (or just ask it):

```text
/skill:code-review
/skill:angular-21
```

Now the agent will load the matching skill automatically. Try:

```text
Review the last commit for security issues.
```

```text
Add a standalone component with signals that fetches a list of users with httpResource.
```

```text
Draft a polite follow-up email to the team about the delayed release.
```

---

## Final result

- **Local inference** — pi talks to LM Studio at `http://localhost:1234/v1`.
- **No cloud** — everything stays on your machine.
- **Custom behavior** — four skills that encode *your* conventions, reusable across projects (global) or shared with the team (project `.pi/skills/`).

To go further: put skills in `.pi/skills/` and commit them to your repo so every teammate gets the same agent behavior.

**References**

- [pi — custom models](https://pi.dev) · `~/.pi/agent/models.json`
- [Agent Skills specification](https://agentskills.io/specification)
- [LM Studio](https://lmstudio.ai)
