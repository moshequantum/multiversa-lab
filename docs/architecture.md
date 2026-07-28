# Multiversa Architecture

> Current source of truth as of 2026-07-20. The former named-agent cosmology was retired; it is not active architecture.

## Shape

Multiversa is a curated, agent-agnostic stack. **Multiversa.Lab** publishes the
open source layer: Multiversa CLI plus the Cerebro architecture that can connect
InsForge and a Cloudflare Worker. **Multiversa Group** is private to its creator and
is not a public product or service boundary for Lab users.

## Active layers

1. **SvelteKit Lab** — public site, documentation, release notes, and design language.
2. **Multiversa CLI / Tauri Visual Installer** — the local installers and
   orchestrators that configure the curated stack in the operator's environment.
3. **Cerebro** — the integration boundary that can combine tenant-scoped Engram
   memory and Graphify knowledge with optional InsForge and Cloudflare Worker
   services; it never turns a private tenant into a shared public brain.
4. **Curated engines** — Engram, Graphify, `gentle-ai`, gentle-pi, codegraph, and
   optional external-only MiroFish.
5. **Optional backend** — local-first by default; remote backends are adapters,
   not the core.

## Boundaries

- Multiversa **orchestrates** upstream engines; it does not claim authorship over them.
- AGPL components are external-only. MiroFish must never be embedded, vendored, or compiled into Multiversa.
- The human leads. AI proposes, the human decides.
- Legacy imported design snapshots are references only. They are not product commitments.

## Source-of-truth docs

- `README.md` — public narrative and install path.
- `docs/upstream.md` — attribution and license posture.
- `CREDITS.md` in `multiversa-cli` — CLI attribution source of truth.
