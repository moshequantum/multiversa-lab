# Multiversa CLI

El binario `multiversa` ejecuta todas las rutas de instalación de este repositorio. El instalador del Lab (`multiversa-installer.sh`) descarga el binario y le delega el trabajo.

Fuente: [`moshequantum/multiversa-cli`](https://github.com/moshequantum/multiversa-cli) · MIT · Go + Cobra + Bubble Tea/Lipgloss.

La distribución pública se llama **Multiversa CLI**; `multiversa` es el comando. La v0.8.0 incorpora inicio de Project OS, corpus con procedencia, Graphify validado y proveedores configurables con respaldo (Gemini → Mistral → Groq), sin exponer claves.

## Por qué existen tres piezas

- **Instalador visual Tauri (`multiversa-installer`)**: aplicación de escritorio gráfica creada con Tauri (Rust + HTML/CSS/JS). Revisa requisitos del equipo, escribe configuraciones de ADN por tenant y configura el espacio de trabajo de forma guiada.
- **Instalador del Lab (`multiversa-installer.sh`)**: vive en este repositorio. Es el punto de entrada consultivo para conocer Multiversa por primera vez: presenta el contexto, hace preguntas de perfil, prepara `~/.multiversa/` y entrega el control a la CLI. Puedes leerlo completo en el navegador antes de ejecutarlo.
- **CLI `multiversa`**: vive en el repositorio hermano. Es un binario único, sin dependencias de ejecución; incluye lo necesario para correr sus subcomandos sin conexión después de una descarga.

La separación permite que el Lab se concentre en manifiesto, sistemas de diseño y curaduría, mientras la CLI y las herramientas visuales evolucionan de forma independiente.

## Mapa de subcomandos

| Subcomando | Propósito | ¿Modifica el equipo? |
|---|---|---|
| `multiversa detect` | Revisión de solo lectura del sistema operativo, gestor de paquetes, herramientas, motores y repositorios | No |
| `multiversa stack` | Instala herramientas de construcción (Go, Rust, Python, Node, pnpm, Docker) | Sí, con confirmación por herramienta |
| `multiversa init` | Asistente interactivo para motores curados (Engram, Graphify, Gentle, …) | Sí, con consentimiento por motor |
| `multiversa workspace` | Espacio privado de MultiversaGroup (SSH, GPG, repositorios, bóveda) | Sí, requiere requisitos de git/ssh |
| `multiversa usb` | Lab USB cifrado (LUKS en Linux, VeraCrypt/balenaEtcher en macOS) | **Borra el dispositivo elegido**; requiere escribir la ruta dos veces |
| `multiversa credits` | Atribución de origen para cada motor | No |
| `multiversa doctor` | Alias interno de `multiversa detect` | No |
| `multiversa version` | Muestra la versión | No |
| `multiversa manifest` | Muestra o edita `multiversa.toml` | Solo lectura por defecto |

## Flujo del instalador del Lab

```text
multiversa-installer.sh
  ├─ detect_platform       (Darwin/Linux × amd64/arm64)
  ├─ resolve_version       (API de lanzamientos de GitHub o variable de entorno)
  ├─ install_binary        (archivo tar con curl → ~/.local/bin/multiversa)
  ├─ ensure_path           (agrega PATH a ~/.zshrc o ~/.bashrc)
  ├─ profile_user          (INSTANCE_NAME, USER_ROLE, SETUP_MODE)
  ├─ scaffold_home         (~/.multiversa/{engram_db,…} + config.json)
  ├─ multiversa detect     (revisión del equipo y brechas)
  ├─ multiversa stack      (opcional: herramientas de construcción)
  └─ multiversa init       (opcional: motores con agentes)
```

Cada paso se puede ejecutar después de forma independiente. Puedes volver a correr `multiversa stack` o `multiversa init` sin repetir el instalador.

## Atribución de motores

La CLI no reclama autoría de los motores que orquesta. Cada instalación imprime la atribución de origen y `multiversa credits` es la fuente de verdad.

| Motor | Autor | Licencia | Nota |
|---|---|---|---|
| Engram | [Gentleman-Programming](https://github.com/Gentleman-Programming/engram) | MIT | Memoria persistente para agentes (Go + SQLite + FTS5) |
| Graphify | [safishamsi](https://github.com/safishamsi/graphify) | MIT | Motor de contenido a grafo (Python) |
| Gentle AI | [Gentleman-Programming](https://github.com/Gentleman-Programming/gentle-ai) | MIT | Ecosistema SDD (Go) |
| Gentle PI | [Gentleman-Programming](https://github.com/Gentleman-Programming/gentle-pi) | MIT | Arnés SDD para TypeScript |
| codegraph | [Colby McHenry](https://github.com/colbymchenry/codegraph) | MIT | Grafo semántico de código (TS) |
| MiroFish | [666ghj](https://github.com/666ghj/MiroFish) | **AGPL-3.0** | Simulación de enjambre, siempre externa y nunca embebida |

## Reglas obligatorias

1. **Solo pnpm.** La CLI no instala ni recomienda `npm`. Si detecta `npm`, `multiversa detect` lo reporta y `multiversa stack` no lo propone.
2. **Puerta AGPL.** MiroFish usa AGPL-3.0. La CLI requiere consentimiento explícito antes de instalarlo y nunca integra ni vende su fuente.
3. **Sin operaciones destructivas silenciosas.** `multiversa usb` exige escribir dos veces la ruta del dispositivo antes de llamar a `dd` o `cryptsetup luksFormat`.
4. **Sin datos de clientes en el Lab.** La CLI es MIT y vive en el repositorio público. Nombres de tenants, credenciales y contratos permanecen privados y no aparecen en la salida de la CLI.

## Lanzamientos

`multiversa-cli` usa [GoReleaser](https://goreleaser.com) para cada etiqueta anotada que coincida con `v*`. El flujo de `.github/workflows/release.yml` produce binarios para varias plataformas, `checksums.txt` (SHA-256) y una publicación de GitHub con registro de cambios generado automáticamente.

Brew, Scoop, NFPM y Docker están configurados en `.goreleaser.yml`, pero se omiten en el primer lanzamiento hasta que los repositorios auxiliares y secretos estén listos.

## Documentación relacionada

- [architecture.md](./architecture.md) — arquitectura de seis capas del Lab.
- [engram.md](./engram.md) · [graphify.md](./graphify.md) · [gentle.md](./gentle.md) · [mirofish.md](./mirofish.md) · [insforge.md](./insforge.md) — documentación por motor.
- [upstream.md](./upstream.md) — atribución completa de origen.
