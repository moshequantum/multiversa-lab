# Multiversa Lab — Capa de conocimiento: Graphify

**Graphify** es el motor de indexación semántica de Multiversa Lab. Lee directorios, dependencias de código, esquemas SQL, archivos multimedia y documentación para convertirlos en un grafo de conocimiento estructurado y consultable.

## El problema de navegación

Las búsquedas con grep y los listados de archivos son lineales: no explican relaciones, jerarquías de importación ni el flujo de la arquitectura. Graphify crea nodos (archivos, funciones, clases y tablas) y aristas (importaciones, llamadas, consultas y relaciones) que tu agente puede recorrer.

## Capacidades principales

- **Procesamiento de varios formatos:** TypeScript, Python, Rust, esquemas SQL, Markdown, PDF y metadatos multimedia.
- **Local y liviano:** funciona localmente y guarda `graph.json` dentro de `graphify-out/`.
- **Visualización interactiva:** genera `graph.html` para revisar el grafo de código.
- **Compatible con Git:** incluye un controlador de combinación para que equipos versionen sus grafos sin conflictos.

```text
[Archivo: index.ts] -- (importa) --> [Archivo: db.ts] -- (consulta) --> [Tabla: users]
```

## Inicio rápido

En cualquier espacio de trabajo, ejecuta Graphify desde la CLI o con tu agente:

```bash
# Inicializa e indexa el directorio actual
graphify .
```

### Archivos generados en `graphify-out/`

1. `graph.json`: mapa crudo de nodos y aristas.
2. `graph.html`: tablero interactivo de dependencias y estructura visual.
3. `GRAPH_REPORT.md`: resumen de puntos de entrada, modelos de datos y zonas de atención.

Al versionar `graphify-out/` con git, tus agentes obtienen contexto inmediato del repositorio al abrirlo.
