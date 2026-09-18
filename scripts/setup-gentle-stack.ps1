[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$gentleVersion = '3.3.0'
$gentlePiVersion = '3.2.1'
$multiversaVersion = '0.10.1'
$codexVersion = '0.154.0'
$piVersion = '0.85.1'
$geminiVersion = '0.59.0'
$openCodeVersion = '1.18.30'

function Require-Command([string]$Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Falta '$Name'. Instala Git, Go y Node.js antes de continuar."
  }
}

Require-Command git
Require-Command go
Require-Command npm

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  npm install --global 'pnpm@12.3.4'
}

npm install --global "@earendil-works/pi-coding-agent@$piVersion" "@google/gemini-cli@$geminiVersion"
pnpm add --global "@openai/codex@$codexVersion"

if (-not (Get-Command opencode -ErrorAction SilentlyContinue)) {
  if (Get-Command scoop -ErrorAction SilentlyContinue) {
    scoop install opencode
  } else {
    npm install --global "opencode-ai@$openCodeVersion"
  }
}

go install "github.com/gentleman-programming/gentle-ai/v3/cmd/gentle-ai@v$gentleVersion"
pi install "npm:gentle-pi@$gentlePiVersion"
gentle-ai install --agents pi,codex --scope global
gentle-ai sync --agents gemini-cli,opencode,pi,codex --sdd-mode multi --pi-background-subagents=on --opencode-background-subagents=on
gentle-ai review mode enable --scope global

$releaseBase = "https://github.com/moshequantum/multiversa-cli/releases/download/v$multiversaVersion"
$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("multiversa-cli-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tempRoot | Out-Null
$archiveName = "multiversa_${multiversaVersion}_windows_amd64.zip"
$archive = Join-Path $tempRoot $archiveName
$checksums = Join-Path $tempRoot 'checksums.txt'

Invoke-WebRequest -Uri "$releaseBase/$archiveName" -OutFile $archive
Invoke-WebRequest -Uri "$releaseBase/checksums.txt" -OutFile $checksums
$checksumLine = Get-Content -LiteralPath $checksums | Where-Object { $_ -match "$([regex]::Escape($archiveName))$" } | Select-Object -First 1
if (-not $checksumLine) { throw "No se encontró el checksum de $archiveName." }
$expectedHash = ($checksumLine -split '\s+')[0].ToLowerInvariant()
$actualHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $archive).Hash.ToLowerInvariant()
if ($actualHash -ne $expectedHash) { throw 'El checksum del CLI de Multiversa no coincide.' }

$expanded = Join-Path $tempRoot 'expanded'
Expand-Archive -LiteralPath $archive -DestinationPath $expanded
$candidate = Get-ChildItem -LiteralPath $expanded -Filter 'multiversa.exe' -Recurse | Select-Object -First 1
if (-not $candidate) { throw 'El release verificado no contiene multiversa.exe.' }

$goPath = ((go env GOPATH) -split ';')[0]
$targetDirectory = Join-Path $goPath 'bin'
New-Item -ItemType Directory -Path $targetDirectory -Force | Out-Null
Copy-Item -LiteralPath $candidate.FullName -Destination (Join-Path $targetDirectory 'multiversa.exe') -Force

$repoRoot = Split-Path -Parent $PSScriptRoot
if (Test-Path -LiteralPath (Join-Path $repoRoot '.git')) {
  Push-Location $repoRoot
  try { gga install } finally { Pop-Location }
}

gentle-ai doctor
multiversa status --json

Write-Output 'Gentle Stack listo. Reinicia las terminales abiertas para adoptar el PATH y los launchers.'
