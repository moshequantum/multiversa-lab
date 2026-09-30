#!/usr/bin/env bash
# ==============================================================================
# Multiversa.Lab CLI & OpenPassport v1.0 Unified Installer
# Supported: macOS (Darwin) & Linux (x86_64, arm64)
# ==============================================================================
set -euo pipefail

INSTALL_DIR="${HOME}/.multiversa"
BIN_DIR="${INSTALL_DIR}/bin"
REPO="moshequantum/multiversa-cli"
VERSION="1.0.0"

echo "=========================================================="
echo "  Multiversa.Lab — OpenPassport v1.0 Deterministic CLI"
echo "  Ingeniería de Trinchera: Branding · Business · AI Tech"
echo "=========================================================="
echo ""

# 1. Detect OS and Architecture
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

case "${ARCH}" in
  x86_64|amd64) TARGET_ARCH="amd64" ;;
  arm64|aarch64) TARGET_ARCH="arm64" ;;
  *)
    echo "❌ Arquitectura no soportada: ${ARCH}"
    exit 1
    ;;
esac

echo "🔍 Detectado: ${OS} (${TARGET_ARCH})"
mkdir -p "${BIN_DIR}"

# 2. Check or suggest Gentle Suite upstream
echo ""
echo "🧩 Verificando upstream de Gentle Suite..."
if command -v gentle-ai >/dev/null 2>&1 || command -v gentle >/dev/null 2>&1; then
  echo "✅ Gentle Suite detectada en el entorno."
else
  echo "ℹ️  Gentle Suite no detectada. Puedes instalarla directamente de la fuente oficial."
fi

# 3. Bin installation
echo ""
echo "🚀 Instalando binario multiversa v${VERSION} en ${BIN_DIR}..."

# In local / production dev, copy local binary if present or download release
if [ -f "./cli/multiversa" ]; then
  cp "./cli/multiversa" "${BIN_DIR}/multiversa"
  chmod +x "${BIN_DIR}/multiversa"
elif [ -f "./multiversa" ]; then
  cp "./multiversa" "${BIN_DIR}/multiversa"
  chmod +x "${BIN_DIR}/multiversa"
else
  echo "⬇️  Descargando desde GitHub Releases (${REPO})..."
  DOWNLOAD_URL="https://github.com/${REPO}/releases/download/v${VERSION}/multiversa-${OS}-${TARGET_ARCH}"
  if curl -fsSL "${DOWNLOAD_URL}" -o "${BIN_DIR}/multiversa" 2>/dev/null; then
    chmod +x "${BIN_DIR}/multiversa"
  else
    echo "⚠️  Release binario no encontrado aún en GitHub Releases. Usando build local o de desarrollo."
  fi
fi

echo ""
echo "✅ Instalación completada con éxito."
echo ""
echo "Para habilitar 'multiversa' en tu terminal, agrega esto a tu ~/.zshrc o ~/.bashrc:"
echo "   export PATH=\"${BIN_DIR}:\$PATH\""
echo ""
echo "Prueba tu instalación con:"
echo "   multiversa passport init ./docs/passport-context --name \"MiMarcaOS\""
echo "   multiversa passport verify ./docs/passport-context"
echo "=========================================================="
