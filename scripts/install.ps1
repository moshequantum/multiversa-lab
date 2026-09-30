# ==============================================================================
# MultiversaLab CLI & OpenPassport v1.0 Windows PowerShell Installer
# ==============================================================================
$ErrorActionPreference = "Stop"

$InstallDir = Join-Path $HOME ".multiversa"
$BinDir = Join-Path $InstallDir "bin"
$ExePath = Join-Path $BinDir "multiversa.exe"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  MultiversaLab — OpenPassport v1.0 Deterministic CLI" -ForegroundColor White
Write-Host "  Ingeniería de Trinchera: Branding · Business · AI Tech" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $BinDir)) {
  New-Item -ItemType Directory -Path $BinDir -Force | Out-Null
}

# If local binary exists in cli/, copy it
$LocalBin = Join-Path $PSScriptRoot "..\cli\multiversa.exe"
if (Test-Path $LocalBin) {
  Copy-Item -Path $LocalBin -Destination $ExePath -Force
  Write-Host "✅ Binario local multiversa.exe instalado en: $ExePath" -ForegroundColor Green
} else {
  Write-Host "ℹ️  Descargando multiversa.exe..." -ForegroundColor Gray
}

# Ensure in PATH
$UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($UserPath -notlike "*$BinDir*") {
  [Environment]::SetEnvironmentVariable("Path", "$UserPath;$BinDir", "User")
  Write-Host "✅ $BinDir agregado a tu PATH de usuario." -ForegroundColor Green
}

Write-Host ""
Write-Host "Prueba tu instalación ejecutando:" -ForegroundColor White
Write-Host "   multiversa passport verify `"$HOME\Documents\SoyMoisesVera\docs\passport-context`"" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
