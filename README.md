# Multiversa Lab — Engine Room

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PNPM Workspace](https://img.shields.io/badge/node-pnpm-blue.svg)](#)
[![BaaS: InsForge](https://img.shields.io/badge/backend-InsForge-brightgreen.svg)](https://insforge.app)

Welcome to the technical foundation of **Multiversa Lab**. This repository houses the open-source logic, AI agent harnesses, and local development configurations that run the Intelligent Personal OS.

---

## 🌐 Lab vs Group: Integrity Separation

To protect intellectual property and maintain strict security boundaries, the Multiversa ecosystem is separated into two entities:

*   **Multiversa Lab (This Repository):** The open-source R&D laboratory. Where we design, experiment, and release core software agents, plugins, and architectures (MIT licensed).
*   **Multiversa Group:** The commercial consulting and delivery entity. Delivers custom, private integrations for enterprise customers under strict NDAs.

---

## 🏗 Core Architecture: The Six Pillars

Multiversa Lab is built around **six core architectural layers**, running from persistent memory up to multi-agent swarm simulations:

```
┌────────────────────────────────────────────────────────┐
│  Layer 05: SIMULATION (MiroFish Scenario Simulator)     │
├────────────────────────────────────────────────────────┤
│  Layer 04: PERSONAL (GentlePI Agent Persona)           │
├────────────────────────────────────────────────────────┤
│  Layer 03: DISCIPLINE (GentleAI SDD Harness)           │
├────────────────────────────────────────────────────────┤
│  Layer 02: KNOWLEDGE (Graphify Semantic Map)           │
├────────────────────────────────────────────────────────┤
│  Layer 01: MEMORY (Engram SQLite Context Spine)       │
├────────────────────────────────────────────────────────┤
│  Layer 06: INFRASTRUCTURE (InsForge Cloud Sync BaaS)   │
└────────────────────────────────────────────────────────┘
```

1.  **[Engram](./docs/engram.md) (Memory):** A local SQLite database + FTS5 full-text search indexing architectural decisions to combat agent session amnesia.
2.  **[Graphify](./docs/graphify.md) (Knowledge):** Codebase ingestor mapping files, databases, and dependencies into an interactive visual graph.
3.  **[GentleAI](./docs/gentle.md) (Discipline):** Spec-Driven Development (SDD) pipeline enforcing Research ➔ Specification ➔ Execution phases.
4.  **[GentlePI](./docs/gentle.md) (Personal):** Standard agent configuration infusing human-like tone, style, and rules.
5.  **[MiroFish](./docs/mirofish.md) (Simulation):** Swarm intelligence powered by OASIS and Neo4j to test scenarios before deployment.
6.  **[InsForge](./docs/insforge.md) (Infrastructure):** Unified cloud backend providing database tables, storage buckets, and LLM gateways.

---

## 🚀 Getting Started

Two equally valid entry points — pick the one that fits how you work. Detailed flow in [docs/cli.md](./docs/cli.md).

### Lab installer · recommended for first-time users

A bash bootstrap that downloads the [`multiversa`](https://github.com/moshequantum/multiversa-cli) binary, scaffolds `~/.multiversa/`, and walks you through the full lab setup (host scan → developer toolchain → curated engines). macOS and Linux.

```bash
# One-liner (when the public mirror is live)
curl -fsSL https://lab.multiversa.group/install.sh | bash

# From a local checkout of this repo
chmod +x multiversa-installer.sh
./multiversa-installer.sh
```

Environment overrides:

| Variable | Default | Purpose |
|---|---|---|
| `MULTIVERSA_VERSION` | `latest` | Pin a specific release tag (e.g. `v0.3.0`) |
| `MULTIVERSA_PREFIX` | `~/.local` | Install prefix for the binary |
| `MULTIVERSA_SKIP_STACK` | unset | Skip `multiversa stack` |
| `MULTIVERSA_SKIP_INIT` | unset | Skip `multiversa init` |

The installer is non-destructive: re-running it is safe, every step is idempotent, and `~/.multiversa/config.json` is preserved if it already exists.

### Multiversa CLI direct · for users who already manage their toolchain

Repo: [`moshequantum/multiversa-cli`](https://github.com/moshequantum/multiversa-cli) (MIT).

```bash
# Any platform with Go installed
go install github.com/moshequantum/multiversa-cli/cmd/multiversa@latest

# Or grab the binary archive from GitHub Releases (no Go required)
# https://github.com/moshequantum/multiversa-cli/releases

# Homebrew (macOS) — available once homebrew-multiversa is published
# brew tap moshequantum/multiversa && brew install multiversa
```

Once the binary is on PATH:

```bash
multiversa detect      # read-only host scan
multiversa stack       # OS-level dev toolchain (Go/Rust/Python/Node/pnpm)
multiversa init        # interactive engine wizard (Engram, Graphify, Gentle, …)
multiversa workspace   # private MultiversaGroup setup (SSH/GPG/repos/vault)
multiversa credits     # upstream attribution
```

Every run ends with full upstream attribution. *"La IA propone, tú decides."*

### Prerequisites for the engines themselves

Depending on which engines you choose: **Go** (Engram, Gentle AI), **Python 3** with **pipx** (Graphify), **Node.js** with **pnpm** (Gentle PI, codegraph), **Docker** (MiroFish, AGPL-3.0, external-only). Multiversa is **pnpm-only by policy** — npm is banned across the stack ([why](https://pnpm.io)).

### Developing the SvelteKit Frontend

To launch the local dashboard and waitlist landing page:

```bash
# Install dependencies across the workspace
pnpm install

# Run local dev server
pnpm dev

# Build for production
pnpm build
```

---

## 📚 Technical Documentation

Explore the detailed architecture guides in the [`docs/`](./docs) directory:
*   [Core Architecture](./docs/architecture.md)
*   [Engram (Local Memory Layer)](./docs/engram.md)
*   [Graphify (Knowledge Graph Mapping)](./docs/graphify.md)
*   [Gentle AI / GentlePI (Spec-Driven Development)](./docs/gentle.md)
*   [MiroFish (Agent Scenario Swarm)](./docs/mirofish.md)
*   [InsForge (BaaS cloud integration)](./docs/insforge.md)
*   [**Upstream / Standing on the shoulders**](./docs/upstream.md) — authors, repos, licenses
*   **[Multiversa CLI](https://github.com/moshequantum/multiversa-cli)** — the installer (separate repo)

---

## 🙏 Standing on the shoulders / Sobre los hombros

> *"Crédito donde corresponde."* — Multiversa DNA Brand · Cap I · Principios

Multiversa Lab does not reinvent the wheel — it **orchestrates**. Five of the
six pillars stand on open-source work by other builders. Full attribution
lives in [`docs/upstream.md`](./docs/upstream.md). Brief credit here:

| Pillar / Companion | Upstream project | Author | License |
|---|---|---|---|
| **Engram** | [`Gentleman-Programming/engram`](https://github.com/Gentleman-Programming/engram) | Alan Muscaglia ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Gentle AI** | [`Gentleman-Programming/gentle-ai`](https://github.com/Gentleman-Programming/gentle-ai) | Alan Muscaglia ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Gentle PI** | [`Gentleman-Programming/gentle-pi`](https://github.com/Gentleman-Programming/gentle-pi) | Alan Muscaglia ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Graphify** | [`safishamsi/graphify`](https://github.com/safishamsi/graphify) | Safi ([@safishamsi](https://github.com/safishamsi)) | MIT |
| **codegraph** *(code-specific companion to Graphify)* | [`colbymchenry/codegraph`](https://github.com/colbymchenry/codegraph) | Colby McHenry ([@colbymchenry](https://github.com/colbymchenry)) | MIT |
| **MiroFish** | [`666ghj/MiroFish`](https://github.com/666ghj/MiroFish) · [mirofish.homes](https://mirofish.homes/) | BaiFu ([@666ghj](https://github.com/666ghj)) | **AGPL-3.0** ⚠️ |
| **InsForge** | [insforge.dev](https://insforge.dev) | InsForge (BaaS) | Commercial |

> **MiroFish is AGPL-3.0** (copyleft, viral over network service). Multiversa
> Lab runs it locally and is itself open-source — fully compatible. The
> commercial Multiversa Group _mentions_ MiroFish but does not embed its
> code; if it ever does, that portion will be open-sourced in compliance.
> See [`docs/upstream.md`](./docs/upstream.md) for the full reasoning.

If you want to improve one of these pillars, please open a PR **on the
original repository**. We are grateful users who document — not a fork.

---

## 🤝 Contributing & Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
