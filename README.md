# Multiversa.Lab — fábrica open source de sistemas operativos

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PNPM Workspace](https://img.shields.io/badge/node-pnpm-blue.svg)](#)
[![BaaS: InsForge](https://img.shields.io/badge/backend-InsForge-brightgreen.svg)](https://insforge.app)

Multiversa.Lab es una fábrica open source multiagéntica para crear y operar un
sistema operativo único por proyecto. Reúne identidad, memoria persistente,
conocimiento, skills, loops, gobernanza y superficies de trabajo en un Profile
portable y auditable. El proyecto es el OS; su nombre e identidad no son un tier ni
una plantilla disponible para otras personas.

Puedes construirlo y operarlo por tu cuenta sin costo de licencia. Cuando una
realidad requiere diagnóstico, arquitectura a medida, implementación o
acompañamiento, la ruta opcional es Multiversa.Group.

---

## 🌐 Lab vs Group: Integrity Separation

To protect intellectual property and maintain strict security boundaries, the Multiversa ecosystem is separated into two entities:

*   **Multiversa.Lab (este repositorio):** runtime, protocolos, schemas, recipes y
    adaptadores reusables, sin identidad ni datos privados de clientes (MIT).
*   **Multiversa.Group:** consultoría privada custom. Diagnostica, diseña, implementa
    y acompaña durante 90 días; la continuidad mensual evoluciona según el sistema.

Lo replicable vive en Lab. El criterio configurado, los contratos, las credenciales
y los Profiles de clientes permanecen en Group.

---

## 🏗 Core Architecture: The Six Pillars

Multiversa Lab is built around **six core architectural layers**, running from persistent memory up to multi-agent swarm simulations:

```
┌────────────────────────────────────────────────────────┐
│  Layer 05: SIMULATION (MiroFish Scenario Simulator)     │
├────────────────────────────────────────────────────────┤
│  Layer 04: IDENTITY (Multiversa VoiceProfile)          │
├────────────────────────────────────────────────────────┤
│  Layer 03: DISCIPLINE (gentle-ai custom + SDD)         │
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
3.  **[gentle-ai](./docs/gentle.md) (Discipline):** Configurador upstream; Multiversa proyecta contratos propios mediante su modo `custom`.
4.  **[VoiceProfile](https://github.com/moshequantum/multiversa-sdk) (Identity):** Contrato Multiversa confirmado por la persona para idioma, trato, regionalidad, tono, objetivos y límites. `gentle-pi` sigue siendo un harness SDD para Pi; no es el perfilador humano.
5.  **[MiroFish](./docs/mirofish.md) (Simulation):** Swarm intelligence powered by OASIS and Neo4j to test scenarios before deployment.
6.  **[InsForge](./docs/insforge.md) (Infrastructure):** Unified cloud backend providing database tables, storage buckets, and LLM gateways.

### How this actually runs locally

Los motores curados son proyectos upstream separados que Multiversa instala y conecta. El orquestador es `multiversa-cli`; la identidad portable vive en contratos públicos de `multiversa-sdk`. Antes de afirmar una versión publicada, consulta sus releases: este README describe arquitectura, no reemplaza el manifiesto de release.

---

## 🚀 Getting Started

Two equally valid entry points — pick the one that fits how you work. Detailed flow in [docs/cli.md](./docs/cli.md).

### Lab installer · recommended for first-time users

A bash bootstrap that downloads the [`multiversa`](https://github.com/moshequantum/multiversa-cli) binary, scaffolds `~/.multiversa/`, and walks you through the full lab setup (host scan → developer toolchain → curated engines). macOS and Linux.

```bash
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
multiversa tenant new|list|show|use   # isolated tenant profiles — DNA, vault, memory per client
multiversa updates     # check curated-stack releases against what's installed
multiversa mcp serve   # expose read-only surfaces as MCP tools over stdio (Claude Code, Cursor, Codex…)
multiversa credits     # upstream attribution
```

Read-only subcommands (`detect`, `credits`, `version`, `manifest`, `updates`, `tenant list|show`) also accept `--json` for a stable, agent-readable envelope (`multiversa.<name>/v1`) — the same surfaces `multiversa mcp serve` exposes natively over MCP.

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
*   [gentle-ai / gentle-pi y la frontera con VoiceProfile](./docs/gentle.md)
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
