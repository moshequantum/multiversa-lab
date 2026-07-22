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
#   MULTIVERSA_VERSION=v0.3.0   pin a specific release (default: latest)
#   MULTIVERSA_PREFIX=~/.local  override install prefix (default: ~/.local)
#   MULTIVERSA_SKIP_STACK=1     skip `multiversa stack` step
#   MULTIVERSA_SKIP_INIT=1      skip `multiversa init` step

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
  trap "rm -rf '$tmpdir'" RETURN

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
  local shell_rc=""
  case "${SHELL:-}" in
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
  echo "Necesitamos conocer los parámetros base de tu instancia."
  echo ""

  read -rp "¿Nombre de esta instancia? [Multiversa-AI]: " IA_NAME
  IA_NAME=${IA_NAME:-Multiversa-AI}

  read -rp "¿Tu rol principal? (Arquitecto, Consultor, Desarrollador): " USER_ROLE
  USER_ROLE=${USER_ROLE:-Arquitecto}

  echo ""
  echo "Modo de configuración:"
  echo "  1) Local — operación en este equipo"
  echo "  2) Híbrido — local con adaptadores remotos opcionales"
  read -rp "Opción [1/2]: " SETUP_MODE_OPT
  case "${SETUP_MODE_OPT:-1}" in
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

if [[ -z "${MULTIVERSA_SKIP_STACK:-}" ]]; then
  echo ""
  read -rp "Install the OS-level developer toolchain (Go/Rust/Python/Node/pnpm)? [y/N] " ans
  if [[ "${ans,,}" == "y" || "${ans,,}" == "yes" ]]; then
    run_cli_step "Stack install" stack || true
  fi
fi

if [[ -z "${MULTIVERSA_SKIP_INIT:-}" ]]; then
  echo ""
  read -rp "Install the curated agentic engines (Engram / Graphify / Gentle)? [y/N] " ans
  if [[ "${ans,,}" == "y" || "${ans,,}" == "yes" ]]; then
    run_cli_step "Engine install" init || true
  fi
fi

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}  MULTIVERSA LAB — READY                            ${NC}"
echo -e "${GREEN}====================================================${NC}"
echo -e "  Binary:  ${BIN_DIR}/multiversa"
echo -e "  Home:    ${INSTALL_DIR}"
echo -e "  Modo:    ${SETUP_MODE}"
echo ""
echo -e "Next:"
echo -e "  ${YELLOW}multiversa detect${NC}       — re-scan host state"
echo -e "  ${YELLOW}multiversa credits${NC}      — upstream attribution"
echo -e "  ${YELLOW}multiversa workspace${NC}    — private MultiversaGroup setup"
echo ""
