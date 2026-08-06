# Multiversa.Lab — fábrica de código abierto para sistemas operativos de trabajo

[![Estado de compilación](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Espacio de trabajo PNPM](https://img.shields.io/badge/node-pnpm-blue.svg)](#)
[![Infraestructura: InsForge](https://img.shields.io/badge/infraestructura-InsForge-brightgreen.svg)](https://insforge.app)

Multiversa.Lab es la capa de código fuente abierta de Multiversa. Publica **Multiversa CLI** y **Cerebro**, una arquitectura que conecta memoria, conocimiento, infraestructura y procesos de trabajo sin encerrar a nadie en una plataforma. Cada proyecto conserva un **Sistema Operativo de Proyecto** auditable —identificado como `Project OS` en los contratos técnicos— con identidad, fuentes, grafo, proveedores y secretos aislados.

El Lab puede usarse y extenderse sin costo de licencia. **Multiversa.Group** es el ámbito privado de su creador; no es una oferta pública del Lab y nunca recibe datos, credenciales ni perfiles de quienes usan el código abierto.

## Lab y Group: separación por integridad

Para respetar propiedad intelectual y fronteras de seguridad, el ecosistema se separa en dos ámbitos:

- **Multiversa.Lab (este repositorio):** código abierto, protocolos, esquemas, documentación y componentes reutilizables: CLI + Cerebro (MIT).
- **Multiversa.Group:** ámbito privado del creador. No es un producto ni una ruta comercial publicada por el Lab.

Lo replicable vive en Lab. Los datos, contratos, credenciales y perfiles privados no se publican ni se transfieren a otra persona o sistema.

## Arquitectura: seis pilares

Multiversa Lab se organiza en seis capas arquitectónicas, desde memoria persistente hasta simulaciones de escenarios con agentes:

```text
┌────────────────────────────────────────────────────────┐
│  Capa 05: SIMULACIÓN (MiroFish)                         │
├────────────────────────────────────────────────────────┤
│  Capa 04: PERSONAL (GentlePI)                           │
├────────────────────────────────────────────────────────┤
│  Capa 03: DISCIPLINA (Arnés SDD GentleAI)               │
├────────────────────────────────────────────────────────┤
│  Capa 02: CONOCIMIENTO (Mapa semántico Graphify)        │
├────────────────────────────────────────────────────────┤
│  Capa 01: MEMORIA (Contexto SQLite Engram)              │
├────────────────────────────────────────────────────────┤
│  Capa 06: INFRAESTRUCTURA (BaaS InsForge opcional)      │
└────────────────────────────────────────────────────────┘
```

1. **[Engram](./docs/engram.md):** memoria local con SQLite + FTS5 para conservar decisiones.
2. **[Graphify](./docs/graphify.md):** indexa código, bases de datos y dependencias en un grafo visual.
3. **[GentleAI](./docs/gentle.md):** disciplina de desarrollo guiado por especificación.
4. **[GentlePI](./docs/gentle.md):** configuración de agente con tono, estilo y reglas.
5. **[MiroFish](./docs/mirofish.md):** simulación de escenarios basada en OASIS y Neo4j.
6. **[InsForge](./docs/insforge.md):** servicio en la nube opcional para datos, almacenamiento y pasarelas de modelos.

Estos pilares son proyectos de origen curados. **Multiversa CLI** instala y configura el entorno local; **Cerebro** define cómo el Lab puede conectar un servicio de datos InsForge y una función de Cloudflare sin volverlos obligatorios. Engram conserva memoria de construcción y Graphify ancla cada Sistema Operativo de Proyecto a su propio corpus. Los secretos y el contexto permanecen aislados por perfil. Si falta un modelo o la red, la operación local sigue siendo útil.

## Empezar

Hay dos rutas válidas. Consulta el detalle en [docs/cli.md](./docs/cli.md).

### Instalador del Lab · recomendado para tu primera vez

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

El instalador no destruye datos: volver a ejecutarlo es seguro, los pasos son idempotentes y conserva `~/.multiversa/config.json` si ya existe.

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

Multiversa Lab no reinventa los motores que orquesta. Cinco de los seis pilares se apoyan en trabajo de otros constructores. La atribución completa está en [docs/upstream.md](./docs/upstream.md).

> **MiroFish usa AGPL-3.0.** El Lab lo ejecuta localmente como componente externo y compatible con su licencia. Multiversa.Group puede mencionarlo, pero no incorpora su código en una superficie cerrada. Si en el futuro lo integrara, esa porción deberá publicarse de acuerdo con AGPL. Consulta [docs/upstream.md](./docs/upstream.md) para el razonamiento completo.

Si mejoras uno de estos pilares, abre una contribución en su repositorio original. El Lab documenta y orquesta; no es una bifurcación ni se atribuye su trabajo.

## Contribuciones y conducta

Revisa el [Código de conducta](CODE_OF_CONDUCT.md) antes de enviar una contribución.

## Licencia

Distribuido bajo licencia MIT. Consulta [LICENSE](LICENSE).
