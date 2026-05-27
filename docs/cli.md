# Multiversa CLI

The `multiversa` binary is the engine behind every install path in this repo. The Lab installer (`multiversa-installer.sh`) is a thin bootstrap that downloads the binary and delegates the real work to it.

Source: [`moshequantum/multiversa-cli`](https://github.com/moshequantum/multiversa-cli) · MIT · Go + Cobra + Bubble Tea/Lipgloss.

## Why two artifacts

- **Lab installer (`multiversa-installer.sh`)** lives in this repo. It is the *consultive entry point* for someone meeting Multiversa for the first time: banner, profiling questions, scaffolds `~/.multiversa/`, then hands off to the CLI for the destructive work. Designed to be safe to read top-to-bottom in a browser before running.
- **`multiversa` CLI** lives in the sibling repo. It is the *engine*: single binary, no runtime dependencies, ships everything it needs (including embedded bash scripts) so a fresh machine can run any subcommand offline after one download.

Keeping them separate lets the Lab repo stay focused on manifesto + design system + curation, while the CLI evolves independently with its own release cadence.

## Subcommand map

| Subcommand | Purpose | Destructive? |
|---|---|---|
| `multiversa detect` | Read-only scan of OS, package manager, dev tools, engines, repos | No |
| `multiversa stack` | Install OS-level developer toolchain (Go, Rust, Python, Node, pnpm, Docker) | Yes — but confirms per tool |
| `multiversa init` | Interactive wizard for the curated engines (Engram, Graphify, Gentle, …) | Yes — per engine consent |
| `multiversa workspace` | MultiversaGroup private workspace (SSH, GPG, repos, vault) | Yes — requires git/ssh prereqs |
| `multiversa usb` | Encrypted bootable USB lab (LUKS on Linux, VeraCrypt/balenaEtcher on macOS) | **Wipes target device** — typed device confirmation required |
| `multiversa credits` | Upstream attribution for every engine | No |
| `multiversa doctor` | Hidden alias of `multiversa detect` | No |
| `multiversa version` | Print version | No |
| `multiversa manifest` | Print/edit `multiversa.toml` | Read-only by default |

## Flow from the Lab installer

```
multiversa-installer.sh
  │
  ├─ detect_platform              (Darwin/Linux × amd64/arm64)
  ├─ resolve_version              (GitHub Releases API or env override)
  ├─ install_binary               (curl tarball → ~/.local/bin/multiversa)
  ├─ ensure_path                  (append to ~/.zshrc or ~/.bashrc)
  ├─ profile_user                 (IA_NAME, USER_ROLE, TIER)
  ├─ scaffold_home                (~/.multiversa/{engram_db,…} + config.json)
  │
  ├─ multiversa detect            (host scan, surfaces gaps)
  ├─ multiversa stack             (opt-in: install dev toolchain)
  └─ multiversa init              (opt-in: install agentic engines)
```

Each delegated step is independently runnable later — re-run `multiversa stack` or `multiversa init` at any time without re-running the installer.

## Engine attribution (canonical)

The CLI never claims authorship of the engines it orchestrates. Every install prints upstream attribution at the end, and `multiversa credits` is the canonical source of truth.

| Engine | Author | License | Notes |
|---|---|---|---|
| Engram | [Gentleman-Programming](https://github.com/Gentleman-Programming/engram) | MIT | Persistent agent memory (Go + SQLite + FTS5) |
| Graphify | [safishamsi](https://github.com/safishamsi/graphify) | MIT | Content-to-graph engine (Python) |
| Gentle AI | [Gentleman-Programming](https://github.com/Gentleman-Programming/gentle-ai) | MIT | SDD ecosystem (Go) |
| Gentle PI | [Gentleman-Programming](https://github.com/Gentleman-Programming/gentle-pi) | MIT | TypeScript SDD harness |
| codegraph | [Colby McHenry](https://github.com/colbymchenry/codegraph) | MIT | Semantic code knowledge graph (TS) |
| MiroFish | [666ghj](https://github.com/666ghj/MiroFish) | **AGPL-3.0** | Swarm simulation — **external-only**, never embedded |

## Hard policy rules (enforced by the binary)

1. **pnpm only.** The CLI never installs or recommends `npm`. If `npm` is detected on the host, `multiversa detect` flags it; `multiversa stack` will not propose it.
2. **AGPL gate.** MiroFish is AGPL-3.0. The CLI requires explicit consent before any MiroFish install and never embeds or vendors its source.
3. **No silent destructive ops.** `multiversa usb` requires the user to type the device path twice before any `dd` or `cryptsetup luksFormat` call.
4. **No client data in Lab.** The CLI is MIT and lives in the public repo. Anything private (tenant names, credentials, contracts) stays in `01_Multiversa/Group/` and never appears in CLI output.

## Releasing

`multiversa-cli` uses [GoReleaser](https://goreleaser.com) on every annotated tag matching `v*`. The release workflow at `.github/workflows/release.yml` produces:

- Cross-platform binaries (`darwin/linux/windows × amd64/arm64`) as `.tar.gz` / `.zip` archives
- `checksums.txt` (SHA-256)
- A GitHub Release with auto-generated changelog grouped by Features / Fixes / Others

Brew, Scoop, NFPM (.deb/.rpm/.archlinux), and Docker (ghcr.io) are configured in `.goreleaser.yml` but skipped on the first release until the auxiliary repos and secrets are set up — see the comments in the workflow file.

## Related

- [architecture.md](./architecture.md) — the six-layer Lab architecture
- [engram.md](./engram.md) · [graphify.md](./graphify.md) · [gentle.md](./gentle.md) · [mirofish.md](./mirofish.md) · [insforge.md](./insforge.md) — per-engine docs
- [upstream.md](./upstream.md) — full upstream attribution
