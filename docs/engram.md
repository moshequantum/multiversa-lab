# Multiversa Lab — Memory Layer: Engram

**Engram** is the persistent memory spine for AI coding agents. It prevents cognitive decay by persisting key architectural decisions, configurations, bug fixes, and user preferences across multiple model interactions and shell sessions.

---

## The Cognitive Gap

Most AI coding assistants suffer from **session amnesia**. Once you close a chat, the model loses all context about why specific libraries were chosen, how a bug was resolved, or what preferences you established. 

Engram solves this by providing a local, queryable memory registry that agents write to proactively.

---

## Construcción multi-modelo, con límites claros

Engram es la memoria de construcción del Lab: permite que modelos y agentes
compatibles recuperen decisiones, convenciones y hallazgos en vez de reiniciar el
razonamiento en cada sesión. No comparte secretos ni mezcla Project OS: cada tenant
mantiene su propio corpus, vault y permiso de acceso. La integración se configura por
agente; nunca se asume para plugins de terceros.

## SQLite + FTS5 Core

Engram is lightweight, local-first, and highly efficient:
- **Persistence:** SQLite database file stored at `~/.multiversa/engram.db`.
- **CLI Sync Bridge:** Sincronizado dinámicamente mediante el script [engram-sync.py](file:///home/moshe/.multiversa/engram-sync.py) que extrae memorias en formato Markdown con frontmatter desde tu entorno local (ej. Claude `.md` memory files) y realiza upsert en SQLite.
- **Search:** Built-in Full-Text Search (FTS5) para búsquedas indexadas y recuperación instantánea de recuerdos.
- **Agent Integration:** Standard Model Context Protocol (MCP) server.

---

## Structured Format

To keep context windows small and highly relevant, memories are not raw transcripts. They follow a strict format:

```markdown
**What**: [Concise description of the action taken or choice made]
**Why**: [Reasoning, user requirements, or constraints driving the action]
**Where**: [Files, paths, or code symbols affected]
**Learned**: [Gotchas, edge cases, or decisions made for future reference]
```

### Memory Categories (`type`)
- `decision`: Architectural trade-offs and choices.
- `bugfix`: What was broken, why, and how it was resolved.
- `pattern`: Established coding guidelines, styling rules, or design choices.
- `config`: Environment variables, dependency changes, or setup details.
- `discovery`: Discoveries in external APIs or codebase behaviors.

---

## CLI & MCP Server Usage

If Engram is installed, the following tools are available to your AI coding agents:

1. `mem_save`: Save a new structured memory.
2. `mem_search`: Search active memories using keywords.
3. `mem_context`: Retrieve recent memories relevant to the current directory context.
4. `mem_timeline`: View a chronological list of changes.

```bash
# Manual installation
brew install gentleman-programming/tap/engram
```
For integration into SvelteKit, the backend links to InsForge's relational memory table `l2_semantic_memory` for multi-device sync.
