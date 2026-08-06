#!/usr/bin/env bash

# ==============================================================================
# MULTIVERSA LAB — INSTALLER
# ==============================================================================
# Bootstrap installer for Multiversa Lab. Downloads the official
# `multiversa` CLI binary from GitHub Releases, sets up ~/.multiversa/,
# and delegates the real install work to:
#
#   multiversa stack    — OS-level developer toolchain (Go, Rust, Python, Node, pnpm)
#   multiversa init     — curated agentic engines (Engram, Graphify, Gentle, …)
#
# The CLI source lives at github.com/moshequantum/multiversa-cli (MIT).
# Upstream attribution for every engine is in `multiversa credits` after
# install.
#
# Usage:
#   curl -fsSL https://lab.multiversa.group/install.sh | bash
#   # or, from a local checkout:
#   ./multiversa-installer.sh
#
# Flags (via env vars):
#   MULTIVERSA_VERSION=v0.3.0        pin a specific release (default: latest)
#   MULTIVERSA_PREFIX=~/.local       override install prefix (default: ~/.local)
#   MULTIVERSA_SKIP_STACK=1          skip `multiversa stack` step
#   MULTIVERSA_SKIP_INIT=1           skip `multiversa init` step
#   MULTIVERSA_NONINTERACTIVE=1      force non-interactive mode (no prompts, defaults only)

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
DIM='\033[2m'
NC='\033[0m'

REPO="moshequantum/multiversa-cli"
PREFIX="${MULTIVERSA_PREFIX:-$HOME/.local}"
BIN_DIR="$PREFIX/bin"
INSTALL_DIR="$HOME/.multiversa"
VERSION="${MULTIVERSA_VERSION:-latest}"

# Under `curl | bash`, stdin is the pipe carrying the script itself: every
# `read` would silently consume the next source line instead of user input.
# /dev/tty is the controlling terminal (still available in that mode when run
# from an interactive shell), so we read from there instead of stdin. When no
# TTY is reachable at all (cron, CI, containers with no controlling terminal),
# fall back to defaults rather than aborting on EOF.
#
# Note: `[[ -r /dev/tty ]]` is NOT enough — the device node is often
# world-readable (crw-rw-rw-) even when there is no controlling terminal to
# actually open, which would misdetect as interactive. Attempt a real open
# on a scratch fd instead.
NONINTERACTIVE=0
if [[ -n "${MULTIVERSA_NONINTERACTIVE:-}" ]]; then
  NONINTERACTIVE=1
elif { exec 3</dev/tty; } 2>/dev/null; then
  exec 3<&-
else
  NONINTERACTIVE=1
fi

# ── UI ────────────────────────────────────────────────────────────────────────

banner() {
  echo -e "${BLUE}====================================================${NC}"
  echo -e "${GREEN}   MULTIVERSA LAB — INSTALLER                       ${NC}"
  echo -e "${BLUE}====================================================${NC}"
  echo ""
  echo -e "${DIM}La IA propone, tú decides.${NC}"
  echo ""
}

step()    { echo -e "${YELLOW}→ $*${NC}"; }
ok()      { echo -e "${GREEN}[✓] $*${NC}"; }
warn()    { echo -e "${YELLOW}[!] $*${NC}"; }
err()     { echo -e "${RED}[X] $*${NC}" >&2; }

# ask <prompt> <default> <outvar> — prompts on /dev/tty, falls back to
# <default> when non-interactive. Never touches stdin.
ask() {
  local prompt="$1" default="$2" __outvar="$3" reply=""
  if [[ "$NONINTERACTIVE" -eq 1 ]]; then
    printf -v "$__outvar" '%s' "$default"
    return 0
  fi
  IFS= read -rp "$prompt" reply < /dev/tty || reply=""
  printf -v "$__outvar" '%s' "${reply:-$default}"
}

# confirm <prompt> — returns 0 only on an explicit interactive y/yes.
# No TTY means no consent: always answers "no" so we never install a
# toolchain or engines without the user explicitly asking for it.
confirm() {
  local prompt="$1" reply=""
  if [[ "$NONINTERACTIVE" -eq 1 ]]; then
    warn "Modo no interactivo: se omite este paso (requiere confirmación explícita)."
    return 1
  fi
  IFS= read -rp "$prompt" reply < /dev/tty || reply=""
  [[ "${reply,,}" == "y" || "${reply,,}" == "yes" ]]
}

# ── 1. Detect platform ────────────────────────────────────────────────────────

detect_platform() {
  local os arch
  os="$(uname -s)"
  arch="$(uname -m)"
  case "$arch" in
    x86_64|amd64) arch="amd64" ;;
    aarch64|arm64) arch="arm64" ;;
    *) err "Unsupported architecture: $arch"; exit 1 ;;
  esac
  case "$os" in
    Darwin|Linux) ;;
    *) err "Unsupported OS: $os. Use scoop/winget on Windows."; exit 1 ;;
  esac
  echo "${os}_${arch}"
}

# ── 2. Resolve latest version via the GitHub API ──────────────────────────────

resolve_version() {
  if [[ "$VERSION" != "latest" ]]; then
    echo "$VERSION"
    return
  fi
  local tag
  tag=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
        | grep -m1 '"tag_name"' \
        | cut -d '"' -f 4) || true
  if [[ -z "$tag" ]]; then
    err "Could not resolve the latest release tag for ${REPO}."
    err "Set MULTIVERSA_VERSION=vX.Y.Z to pin a known release."
    exit 1
  fi
  echo "$tag"
}

# ── 3. Download + install the binary ──────────────────────────────────────────

install_binary() {
  local platform version url tmpdir
  platform="$1"
  version="$2"

  url="https://github.com/${REPO}/releases/download/${version}/multiversa_${version#v}_${platform}.tar.gz"
  tmpdir=$(mktemp -d)
  # RETURN alone misses the `exit 1` error path below (exit kills the process
  # without returning from the function, so the temp dir would be orphaned).
  # EXIT covers that case too; rm -rf is idempotent so firing twice is fine.
  trap "rm -rf '$tmpdir'" RETURN EXIT

  step "Downloading multiversa ${version} for ${platform}"
  echo -e "   ${DIM}${url}${NC}"
  if ! curl -fL --progress-bar "$url" -o "$tmpdir/multiversa.tar.gz"; then
    err "Download failed. Verify the release exists at:"
    err "  https://github.com/${REPO}/releases"
    exit 1
  fi

  tar -xzf "$tmpdir/multiversa.tar.gz" -C "$tmpdir"
  mkdir -p "$BIN_DIR"
  install -m 0755 "$tmpdir/multiversa" "$BIN_DIR/multiversa"
  ok "Installed: ${BIN_DIR}/multiversa"
}

# ── 4. Ensure $BIN_DIR is in PATH ─────────────────────────────────────────────

ensure_path() {
  case ":$PATH:" in
    *":$BIN_DIR:"*) return ;;
  esac

  warn "$BIN_DIR is not in PATH for the current shell."
  local shell_rc="" shell_name="${SHELL:-desconocida}"
  case "$shell_name" in
    */zsh)  shell_rc="$HOME/.zshrc" ;;
    */bash) shell_rc="$HOME/.bashrc" ;;
  esac

  if [[ -n "$shell_rc" ]]; then
    if ! grep -q "$BIN_DIR" "$shell_rc" 2>/dev/null; then
      echo "" >> "$shell_rc"
      echo "# Added by multiversa-installer" >> "$shell_rc"
      echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$shell_rc"
      ok "Appended PATH update to $shell_rc"
    fi
    warn "Open a new terminal or run:  source $shell_rc"
  else
    # Unrecognized shell ($SHELL is neither bash nor zsh): we don't know
    # which rc file to edit, so hand the user the exact line instead of
    # repeating the same unfixable warning on every run.
    warn "No se reconoce tu shell ($shell_name) — no puedo editar su archivo de configuración automáticamente."
    warn "Añade esta línea al archivo de arranque de tu shell:"
    echo -e "   ${DIM}export PATH=\"$BIN_DIR:\$PATH\"${NC}"
  fi
  export PATH="$BIN_DIR:$PATH"
}

# ── 5. ~/.multiversa scaffolding ──────────────────────────────────────────────

scaffold_home() {
  step "Creating ${INSTALL_DIR}/"
  mkdir -p "$INSTALL_DIR"/{engram_db,graphify_context,gentle_personas,projects}

  local config="$INSTALL_DIR/config.json"
  if [[ -f "$config" ]]; then
    ok "Config already exists at $config — leaving as-is."
    return
  fi
  cat > "$config" <<EOF
{
  "instance_name": "${IA_NAME:-Multiversa-AI}",
  "user_role": "${USER_ROLE:-Arquitecto}",
  "setup_mode": "${SETUP_MODE:-LOCAL}",
  "active_plugins": ["engram_memory", "graphify_indexer", "gentle_sdd"],
  "installed_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
  ok "Config saved: $config"
}

# ── 6. Interactive profiling ──────────────────────────────────────────────────

profile_user() {
  echo ""
  echo -e "${BLUE}--- FASE DE PERFILADO ---${NC}"
  if [[ "$NONINTERACTIVE" -eq 1 ]]; then
    warn "Modo no interactivo: usando valores por defecto para el perfilado."
  else
    echo "Necesitamos conocer los parámetros base de tu instancia."
  fi
  echo ""

  ask "¿Nombre de esta instancia? [Multiversa-AI]: " "Multiversa-AI" IA_NAME
  ask "¿Tu rol principal? (Arquitecto, Consultor, Desarrollador) [Arquitecto]: " "Arquitecto" USER_ROLE

  echo ""
  echo "Modo de configuración:"
  echo "  1) Local — operación en este equipo"
  echo "  2) Híbrido — local con adaptadores remotos opcionales"
  ask "Opción [1/2]: " "1" SETUP_MODE_OPT
  case "$SETUP_MODE_OPT" in
    2) SETUP_MODE="HYBRID" ;;
    *) SETUP_MODE="LOCAL" ;;
  esac
  echo -e "${GREEN}→ Modo seleccionado: $SETUP_MODE${NC}"
  echo ""
}

# ── 7. Delegate to the CLI ────────────────────────────────────────────────────

run_cli_step() {
  local label="$1"; shift
  step "$label"
  if ! "$BIN_DIR/multiversa" "$@"; then
    err "Step failed: multiversa $*"
    err "You can retry just this step with:  multiversa $*"
    return 1
  fi
}

# ── main ──────────────────────────────────────────────────────────────────────

banner

PLATFORM=$(detect_platform)
VERSION_TAG=$(resolve_version)

install_binary "$PLATFORM" "$VERSION_TAG"
ensure_path
profile_user
scaffold_home

echo ""
step "Running multiversa detect (read-only host scan)…"
"$BIN_DIR/multiversa" detect

FAILED_STEPS=()

if [[ -z "${MULTIVERSA_SKIP_STACK:-}" ]]; then
  echo ""
  if confirm "Install the OS-level developer toolchain (Go/Rust/Python/Node/pnpm)? [y/N] "; then
    # A failed `stack` step must not block `init` from being attempted, but
    # it must not be silently discarded either — record it for the summary.
    run_cli_step "Stack install" stack || FAILED_STEPS+=("stack")
  fi
fi

if [[ -z "${MULTIVERSA_SKIP_INIT:-}" ]]; then
  echo ""
  if confirm "Install the curated agentic engines (Engram / Graphify / Gentle)? [y/N] "; then
    run_cli_step "Engine install" init || FAILED_STEPS+=("init")
  fi
fi

echo ""
if [[ ${#FAILED_STEPS[@]} -eq 0 ]]; then
  echo -e "${GREEN}====================================================${NC}"
  echo -e "${GREEN}  MULTIVERSA LAB — READY                            ${NC}"
  echo -e "${GREEN}====================================================${NC}"
else
  echo -e "${YELLOW}====================================================${NC}"
  echo -e "${YELLOW}  MULTIVERSA LAB — INSTALLED WITH ERRORS            ${NC}"
  echo -e "${YELLOW}====================================================${NC}"
  err "Failed steps: ${FAILED_STEPS[*]}"
  err "Retry them individually with:  multiversa <step>"
fi
echo -e "  Binary:  ${BIN_DIR}/multiversa"
echo -e "  Home:    ${INSTALL_DIR}"
echo -e "  Modo:    ${SETUP_MODE}"
echo ""
echo -e "Next:"
echo -e "  ${YELLOW}multiversa detect${NC}       — re-scan host state"
echo -e "  ${YELLOW}multiversa credits${NC}      — upstream attribution"
echo -e "  ${YELLOW}multiversa workspace${NC}    — private MultiversaGroup setup"
echo ""

if [[ ${#FAILED_STEPS[@]} -gt 0 ]]; then
  exit 1
fi
