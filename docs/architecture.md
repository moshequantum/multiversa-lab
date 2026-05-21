# Multiversa Architecture

> Current source of truth as of 2026-05-21. The former named-agent cosmology was retired; it is not active architecture.

## Shape

Multiversa is a curated, agent-agnostic stack. The Lab publishes the open technical layer; the Group applies it commercially without leaking client work back into the Lab.

## Active layers

1. **SvelteKit Lab** — public site, documentation, waitlist, and design language.
2. **Multiversa CLI** — the installer/orchestrator that wires the curated stack into the user's local agent environment.
3. **Curated engines** — Engram, Graphify, gentle-ai, gentle-pi, codegraph, and optional external-only MiroFish.
4. **Optional backend** — local-first by default; remote backends such as InsForge are adapters, not the core.

## Boundaries

- Multiversa **orchestrates** upstream engines; it does not claim authorship over them.
- AGPL components are external-only. MiroFish must never be embedded, vendored, or compiled into Multiversa.
- The human leads. AI proposes, the human decides.
- Legacy imported design snapshots are references only. They are not product commitments.

## Source-of-truth docs

- `README.md` — public narrative and install path.
- `docs/upstream.md` — attribution and license posture.
- `CREDITS.md` in `multiversa-cli` — CLI attribution source of truth.
