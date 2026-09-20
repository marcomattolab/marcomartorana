---
Title: "Building a Privacy-First Local Second Brain"
Date: 2026-09-11
Tags: ["Python", "LLM", "Opencode", "AI", "Ollama", "brain"]
image: "/img/collections/secondbrain.png"
Description: "Building a Privacy-First Local Second Brain with OpenCode, Ollama, and Quantized LLMs"
Draft:
---
# Building a Privacy-First Local Second Brain with OpenCode, Ollama, and Quantized LLMs

In an era where personal data, research notes, and proprietary codebases are increasingly funneled into third-party cloud APIs, running a local intelligence layer is no longer just a hobbyist exercise—it is an architectural necessity.

Whether you are synthesizing technical notes, orchestrating code generation, or querying your personal knowledge base, you can build a fully offline Local Second Brain using open-weight models that run on consumer hardware (≤ 16GB VRAM).

This article provides a complete blueprint for setting up a performant, private knowledge orchestration layer using Ollama, OpenCode, and modern quantization techniques.

## System Architecture Overview

The system operates across five distinct layers, ensuring local memory isolation and fast inference without relying on external APIs:

1. **Inference Engine** — Ollama serves quantized open-weight models via a local OpenAI-compatible API.
2. **Agentic Harness** — OpenCode handles context routing, tool use, terminal execution, and multi-step workflows.
3. **Knowledge Layer** — Local Markdown vault + vector store (ChromaDB or FAISS) for retrieval-augmented generation (RAG).
4. **Tooling Layer** — Local file system access, shell commands, and code editing capabilities.
5. **Orchestration Layer** — Your interaction surface (CLI or terminal UI) that ties everything together offline.

This architecture keeps every token, note, and code snippet on your machine.

## Prerequisites & Hardware Footprint

To achieve fluid, real-time responses locally, target the following baseline:

- **Hardware**: Dedicated GPU with 16GB VRAM (e.g., NVIDIA RTX 4060 Ti 16GB, RTX 3090, or Apple Silicon M-series with unified memory).
- **RAM**: 32GB system RAM recommended.
- **Storage**: NVMe SSD (model files typically range from 4GB to 18GB on disk).
- **OS**: Linux (Ubuntu 22.04/24.04), macOS, or Windows via WSL2.

Lower-spec machines can still work with smaller models (7B–14B) or heavier CPU offloading, at the cost of speed.

## Step 1: Deploy the Local Inference Engine (Ollama)

Ollama serves as the engine room. It abstracts the details of llama.cpp quantization behind a simple REST API endpoint that is fully OpenAI-compatible.

### Installation

On Linux or macOS, run:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

On Windows (PowerShell):

```powershell
irm https://ollama.com/install.ps1 | iex
```

Start the server (it often runs automatically as a service):

```bash
ollama serve
```

Verify the installation:

```bash
ollama -v
```

### Pulling & Quantizing Models for ≤16GB VRAM

To run larger-parameter models such as Qwen3-27B or DeepSeek-Coder variants on 16GB VRAM, rely on 4-bit quantization (primarily `Q4_K_M`). This approach preserves a high percentage of native FP16 performance while reducing memory requirements by roughly 70–75%.

Pull capable models with:

```bash
# Strong general reasoning + RAG synthesis
ollama pull qwen3:27b          # or the specific quant tag available, e.g. qwen3.6:27b-q4_K_M

# Excellent for code generation and refactoring
ollama pull deepseek-coder:33b # adjust to the best available DeepSeek Coder quant that fits

# Fast fallback for quick tasks
ollama pull llama3.1:8b
```

You can also create a custom Modelfile for finer control over context length and GPU layers:

```bash
# Example Modelfile
FROM qwen3:27b
PARAMETER num_ctx 16384
PARAMETER num_gpu 99   # force as many layers as possible onto GPU
```

Then create and run it:

```bash
ollama create my-qwen-27b -f Modelfile
ollama run my-qwen-27b
```

Confirm the local API is active:

```bash
curl http://localhost:11434/api/tags
```

## Step 2: Configure OpenCode as the Agentic Harness

While Ollama hosts the model, **OpenCode** acts as the agentic harness. It manages context routing, tool usage, terminal execution, file editing, and multi-step workflows across your local files—all offline.

### Installation

```bash
curl -fsSL https://opencode.ai/install | bash
```

### Configuration

Point OpenCode at Ollama’s local OpenAI-compatible endpoint. Create or edit `opencode.json` (project root or `~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen3:27b": {
          "name": "qwen3:27b"
        },
        "deepseek-coder:33b": {
          "name": "deepseek-coder:33b"
        },
        "llama3.1:8b": {
          "name": "llama3.1:8b"
        }
      }
    }
  },
  "model": "ollama/qwen3:27b"
}
```

Alternatively, use Ollama’s built-in launcher for a quick start:

```bash
ollama launch opencode
```

## Step 3: Index Your Personal Knowledge Base (RAG Integration)

A true Second Brain requires continuous ingestion of personal notes, technical documents, and code snippets. Combine your local Markdown vault with a local vector database (ChromaDB or FAISS).

### Simple Ingestion Script (Python)

```python
# ingest.py
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
import os

# Point to your Markdown / notes directory
loader = DirectoryLoader(
    "./vault",          # your local second-brain folder
    glob="**/*.md",
    loader_cls=TextLoader
)

docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
splits = text_splitter.split_documents(docs)

embeddings = OllamaEmbeddings(model="nomic-embed-text")  # or any local embedding model

vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

print("Knowledge base indexed successfully.")
```

Run it whenever you add new notes:

```bash
python ingest.py
```

You can later query this vector store from OpenCode or a simple RAG chain that feeds retrieved context into the main model.

## Step 4: Execution & Workflow Integration

With the architecture in place, your local Second Brain can handle multi-step agent workflows completely offline:

1. **Context Retrieval** — Query the local vector store for relevant Markdown notes or code snippets.
2. **Reasoning & Planning** — Pass the retrieved context through OpenCode into the chosen model (e.g., Qwen3-27B).
3. **Execution** — OpenCode uses local tools to update files, run scripts, generate documentation, or refactor code.

### Example CLI Execution

```bash
# Start OpenCode in your project directory
opencode

# Or with an explicit model
opencode --model ollama/qwen3:27b
```

Inside the session you can ask natural-language requests such as:

- “Summarize the architecture decisions in my notes about the auth service and propose improvements.”
- “Refactor the payment module using patterns from my design-docs folder.”
- “Generate unit tests for the files that changed this week.”

Everything stays local.

## Step 5: Extend Your Second Brain with Specialized Skills (Code Review Example)

One of the most powerful features of modern agent harnesses like OpenCode is support for **Skills** — reusable, structured instruction sets defined in `SKILL.md` files. Skills allow you to inject domain expertise (for example, Angular best practices or rigorous code review methodology) without bloating the main system prompt.

A highly regarded community skill for this purpose is the comprehensive **code-review-skill** from the [awesome-skills/code-review-skill](https://github.com/awesome-skills/code-review-skill) repository. It provides structured, multi-language code review guidance and includes a dedicated section for **Angular 17+** (covering Signals, standalone components, zoneless change detection, RxJS patterns, template optimization, and more). It is designed to work with OpenCode, Claude Code, Cursor, and other skill-compatible agents.

### Installing the Skill

Most skill-compatible agents (including OpenCode) support installation via the community skills CLI:

```bash
npx skills add awesome-skills/code-review-skill
```

Alternatively, you can manually clone or copy the repository into your agent’s skills directory (commonly `~/.opencode/skills/` or the project-level skills folder) so the `SKILL.md` becomes available.

### Example: Performing an Angular Code Review

Once the skill is installed, you can invoke it naturally inside an OpenCode session:

```text
Review the Angular components in the src/app/features/auth folder using the code-review skill.
Focus on Signals usage, change detection strategy, and potential performance issues.
```

Or more explicitly:

```text
/code-review
Please review the recent changes related to the user profile page. Apply Angular 17+ best practices from the skill.
```

The agent will load the skill’s structured checklist and produce prioritized, actionable feedback covering correctness, architecture, performance, security, and Angular-specific patterns — all while remaining fully local and private.

You can create your own specialized skills the same way (for example, a custom “Angular Style Guide Review” or “Security Audit for NestJS”) by writing a simple `SKILL.md` with clear front-matter and instructions. This turns your Local Second Brain into a highly specialized engineering teammate.

## Performance Optimization & Memory Management Tips

- **KV Cache & Layer Offloading**: When VRAM is tight during long-context work, adjust `num_gpu` in a custom Modelfile or use Ollama’s environment variables to control how many layers stay on GPU versus CPU.
- **Context Window Budgeting**: Keep the context window between 8,000 and 16,000 tokens for 27B–33B models on 16GB cards. Larger windows dramatically increase memory pressure and risk OOM errors.
- **Model Selection Strategy**:
  - Use **Qwen3-27B (Q4_K_M)** for complex architectural analysis and RAG synthesis.
  - Switch to a strong coding model (DeepSeek-Coder or Qwen Coder variants) when writing or refactoring local codebases.
  - Fall back to **Llama 3.1 8B** (or similar small models) when instant response speed is more important than deep reasoning.
- **Embedding Models**: Keep a lightweight embedding model (e.g., `nomic-embed-text`) loaded for RAG; it consumes far less VRAM than the main LLM.
- **Batch Ingestion**: Re-index only changed files rather than the entire vault on every update.
- **Skills Overhead**: Skills are loaded on demand. Keep their descriptions concise so the agent only pulls the full instructions when relevant.

## Closing Thoughts

Building a privacy-first Local Second Brain is now practical on consumer hardware. By combining Ollama’s efficient quantized inference, OpenCode’s agentic capabilities, and a local vector store, you regain full control over your data, your models, and your intellectual workflow.

No tokens leave your machine. No usage bills accumulate. And the system improves as open-weight models continue to advance.

Start with the steps above, tune the models to your specific hardware, and iterate. Your private intelligence layer is only a few commands away.
