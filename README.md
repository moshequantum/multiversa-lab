# Multiversa.Lab — memoria y estructura como proceso desplegable

[![Estado: Research Preview](https://img.shields.io/badge/estado-Research_Preview-orange.svg)](ROADMAP.md)
[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Espacio de trabajo PNPM](https://img.shields.io/badge/node-pnpm-blue.svg)](#)
[![Infraestructura: InsForge](https://img.shields.io/badge/infraestructura-InsForge-brightgreen.svg)](https://insforge.app)

Multiversa.Lab es un laboratorio público que explora un dolor universal de los
sistemas con IA: cuando cambia el agente, el modelo o la herramienta, el contexto
y la forma de trabajar suelen romperse. La dirección es convertir **memoria +
estructura + criterio** en un proceso portable, instalable y verificable para la
IA que cada persona prefiera usar.

> **Estado actual: Research Preview.** Hay código, documentación y prototipos
> públicos, pero la integración completa todavía no está lista para uso general.
> Estamos realineando la arquitectura en público. Consulta [`ROADMAP.md`](./ROADMAP.md)
> antes de instalar.

El Lab puede usarse y extenderse sin costo de licencia. **Multiversa.Group** es
la consultoría que aplica criterio, diagnóstico, diseño e implementación en casos
reales. No necesitas contratarla para usar el Lab y el código abierto nunca envía
datos, credenciales ni perfiles a Group.

## Lab y Group: separación por integridad

Para respetar propiedad intelectual y fronteras de seguridad, el ecosistema se separa en dos ámbitos:

- **Multiversa.Lab (este repositorio):** contratos, código, documentación,
  pruebas y roadmap abiertos bajo licencia MIT.
- **Multiversa.Group:** servicio profesional opcional. Se paga por criterio y
  aplicación, nunca por permiso para usar el Lab.

Lo replicable vive en Lab. Los datos, contratos, credenciales y perfiles privados no se publican ni se transfieren a otra persona o sistema.

## Arquitectura en realineamiento

```text
Multiversa Pack        contexto y criterio portables
      ↓
Multiversa CLI         instala, audita, actualiza y revierte
      ↓
Multiversa MCP         expone el departamento al host elegido
      ↓
Receipts + checks      prueban cambios y compatibilidad
```

- **Pack:** contrato versionado para identidad, instrucciones, fuentes,
  capacidades y políticas. No contiene secretos.
- **CLI:** plano de control transaccional. Coordina proyectos de origen; no los reemplaza.
- **MCP:** puerta común para que distintos hosts consuman el mismo Pack.
- **Receipts + checks:** evidencia de cada cambio, prueba semántica y rollback.

Engram, GentleAI y Graphify son upstreams recomendados que el Lab busca conectar
y verificar, no duplicar. GentlePI, Hermes, OpenClaw, InsForge, MiroFish y otros
sistemas se tratan como adaptadores opcionales. Detectar un host no equivale a
declararlo compatible.

## Empezar

Hay dos rutas válidas. Consulta el detalle en [docs/cli.md](./docs/cli.md).

### Instalador del Lab · experimental

Un inicio en Bash descarga el binario [`multiversa`](https://github.com/moshequantum/multiversa-cli), prepara `~/.multiversa/` y te guía por la configuración (revisión del equipo → herramientas de construcción → motores curados). Funciona en macOS y Linux.

```bash
# Desde el espejo público
curl -fsSL https://lab.multiversa.group/install.sh | bash

# Desde una copia local de este repositorio
chmod +x multiversa-installer.sh
./multiversa-installer.sh
```

Variables de entorno:

| Variable | Predeterminado | Propósito |
|---|---|---|
| `MULTIVERSA_VERSION` | `latest` | Fija una etiqueta de versión, por ejemplo `v0.3.0` |
| `MULTIVERSA_PREFIX` | `~/.local` | Prefijo de instalación del binario |
| `MULTIVERSA_SKIP_STACK` | sin valor | Omite `multiversa stack` |
| `MULTIVERSA_SKIP_INIT` | sin valor | Omite `multiversa init` |

Antes de ejecutarlo, lee el script y usa un entorno de prueba. El objetivo es que
cada cambio tenga `dry-run`, receipt y rollback, pero esa garantía todavía forma
parte del roadmap de realineamiento.

### Multiversa CLI directa

Repositorio: [`moshequantum/multiversa-cli`](https://github.com/moshequantum/multiversa-cli) (MIT).

```bash
# Cualquier plataforma con Go
go install github.com/moshequantum/multiversa-cli/cmd/multiversa@latest

# También puedes descargar el archivo binario desde GitHub Releases
# https://github.com/moshequantum/multiversa-cli/releases
```

Con el binario en tu PATH:

```bash
multiversa detect      # revisión de solo lectura del equipo
multiversa stack       # herramientas de construcción: Go/Rust/Python/Node/pnpm
multiversa init        # asistente de motores: Engram, Graphify, Gentle, …
multiversa workspace   # configuración privada: SSH/GPG/repositorios/bóveda
multiversa tenant new|list|show|use   # perfiles aislados por espacio
multiversa updates     # revisa lanzamientos del conjunto curado
multiversa mcp serve   # superficies de solo lectura por MCP sobre stdio
multiversa credits     # atribución de origen
```

Los subcomandos de solo lectura (`detect`, `credits`, `version`, `manifest`, `updates`, `tenant list|show`) también aceptan `--json` para un formato estable y legible por agentes (`multiversa.<nombre>/v1`). Cada ejecución termina con atribución completa de origen. *«La IA propone; tú decides».*

### Requisitos de los motores

Según los motores que elijas: **Go** (Engram, Gentle AI), **Python 3** con **pipx** (Graphify), **Node.js** con **pnpm** (Gentle PI, codegraph) y **Docker** (MiroFish, AGPL-3.0, siempre externo). Multiversa usa **solo pnpm**; no usa npm.

### Desarrollo del sitio SvelteKit

```bash
# Instala dependencias del espacio de trabajo
pnpm install

# Inicia el servidor local
pnpm dev

# Compila para producción
pnpm build
```

## Documentación técnica

- [Arquitectura](./docs/architecture.md)
- [Engram: capa de memoria](./docs/engram.md)
- [Graphify: grafo de conocimiento](./docs/graphify.md)
- [Gentle AI / GentlePI: desarrollo guiado por especificación](./docs/gentle.md)
- [MiroFish: simulación de escenarios](./docs/mirofish.md)
- [InsForge: infraestructura BaaS](./docs/insforge.md)
- [Origen y atribución](./docs/upstream.md)
- [Multiversa CLI](https://github.com/moshequantum/multiversa-cli) — instalador y CLI en su repositorio propio.

## Atribución

> *«Crédito donde corresponde».*

Multiversa Lab no reinventa los motores que conecta. Se apoya en proyectos de
origen mantenidos por otros constructores, respeta sus licencias y publica la
atribución completa en [docs/upstream.md](./docs/upstream.md).

> **MiroFish usa AGPL-3.0.** El Lab lo ejecuta localmente como componente externo y compatible con su licencia. Multiversa.Group puede mencionarlo, pero no incorpora su código en una superficie cerrada. Si en el futuro lo integrara, esa porción deberá publicarse de acuerdo con AGPL. Consulta [docs/upstream.md](./docs/upstream.md) para el razonamiento completo.

Si mejoras uno de estos pilares, abre una contribución en su repositorio original. El Lab documenta y orquesta; no es una bifurcación ni se atribuye su trabajo.

## Contribuciones y conducta

Revisa el [Código de conducta](CODE_OF_CONDUCT.md) antes de enviar una contribución.

## Licencia

Distribuido bajo licencia MIT. Consulta [LICENSE](LICENSE).
