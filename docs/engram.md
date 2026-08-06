# Multiversa Lab — Capa de memoria: Engram

**Engram** es la memoria persistente para agentes de construcción con IA. Conserva decisiones arquitectónicas, configuración, correcciones y preferencias entre modelos y sesiones de terminal.

## El problema de contexto

Al cerrar una conversación, un asistente puede perder el motivo de una decisión o la forma de resolver un error. Engram ofrece un registro local y consultable al que los agentes compatibles escriben de forma proactiva.

## Construcción con varios modelos y límites claros

Engram permite recuperar decisiones, convenciones y hallazgos en vez de reiniciar el razonamiento en cada sesión. No comparte secretos ni mezcla Project OS: cada tenant mantiene su corpus, bóveda y permisos. La integración se configura por agente; nunca se presupone para complementos de terceros.

## SQLite + FTS5

Engram es liviano, local primero y eficiente:

- **Persistencia:** archivo SQLite en `~/.multiversa/engram.db`.
- **Puente de sincronización de CLI:** puede sincronizar memorias Markdown con metadatos desde el entorno local y hacer inserciones o actualizaciones en SQLite.
- **Búsqueda:** Full-Text Search (FTS5) para búsquedas indexadas y recuperación rápida.
- **Integración con agentes:** servidor del Protocolo de Contexto de Modelo (MCP).

## Formato estructurado

Para conservar ventanas de contexto pequeñas y relevantes, las memorias no son transcripciones crudas. Siguen este formato:

```markdown
**Qué**: [Descripción concisa de la acción o decisión]
**Por qué**: [Requisitos, razón o restricciones]
**Dónde**: [Archivos, rutas o símbolos afectados]
**Aprendido**: [Casos límite o decisiones útiles a futuro]
```

### Categorías de memoria (`type`)

- `decision`: decisiones y compensaciones arquitectónicas.
- `bugfix`: qué falló, por qué y cómo se resolvió.
- `pattern`: convenciones de código, estilo o diseño establecidas.
- `config`: variables de entorno, dependencias o detalles de preparación.
- `discovery`: hallazgos en APIs externas o comportamiento del repositorio.

## Uso de CLI y servidor MCP

Si Engram está instalado, tus agentes de construcción pueden usar:

1. `mem_save`: guarda una memoria estructurada.
2. `mem_search`: busca memorias con palabras clave.
3. `mem_context`: recupera memorias recientes para el directorio actual.
4. `mem_timeline`: muestra cambios en orden cronológico.

```bash
# Instalación manual
brew install gentleman-programming/tap/engram
```

Para SvelteKit, un backend opcional puede vincular la tabla relacional `l2_semantic_memory` de InsForge para sincronización entre dispositivos.
