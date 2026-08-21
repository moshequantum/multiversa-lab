# Arquitectura de Multiversa

> Fuente de verdad vigente al 2026-08-21. Estado: Research Preview y realineamiento público.

## Forma

Multiversa no es otro agente. Es un departamento portable y agnóstico al host:
empaqueta contexto y criterio, ofrece una puerta MCP y utiliza una CLI para
instalar, auditar y dejar evidencia. **Multiversa.Lab** publica los contratos,
el código y las pruebas. **Multiversa.Group** aplica el sistema como consultoría;
usar el Lab no crea una relación comercial ni transfiere datos a Group.

## Núcleo objetivo

1. **Multiversa Pack** — contrato versionado para identidad del proyecto,
   instrucciones, fuentes, capacidades y políticas. Los secretos quedan fuera.
2. **Multiversa CLI** — plano de control para detectar, planificar, instalar,
   actualizar y revertir. Una operación mutante estable requiere `dry-run`,
   receipt y rollback.
3. **Multiversa MCP** — puerta de consumo interoperable. Expone el mismo Pack
   a cualquier host compatible y no ejecuta decisiones autónomas por sí solo.
4. **Receipts + conformance checks** — evidencia de cambios y prueba semántica
   común. Detectar un host no equivale a soportarlo.

## Upstreams y adaptadores

- **Recomendados:** Engram para memoria, GentleAI para disciplina y Graphify
  para conocimiento, este último en evaluación mediante dogfood.
- **Opcionales:** GentlePI, Hermes, OpenClaw, InsForge, MiroFish y otras
  superficies según el caso. Ninguno es obligatorio para interpretar el Pack.
- **Hosts:** Codex, Claude, Gemini u otros se consideran compatibles solo
  después de superar el mismo contrato de prueba.

## Superficies experimentales

1. **SvelteKit Lab** — landing, documentación, bitácora y roadmap público.
2. **Instaladores y CLI visual** — rutas de distribución todavía experimentales.

## Fronteras

- Multiversa **orquesta** motores de origen; no reclama su autoría.
- Multiversa **no** crea otra memoria o grafo paralelo cuando un upstream ya
  resuelve esa responsabilidad.
- Los componentes AGPL son exclusivamente externos. MiroFish nunca se integra, vende ni compila dentro de Multiversa.
- La persona lidera. La IA propone; la persona decide.
- Las referencias de diseño importadas y heredadas no son compromisos de producto.

## Documentos fuente

- `README.md` — narrativa pública y ruta de instalación.
- `ROADMAP.md` — fases, estado y puertas de salida públicas.
- `docs/upstream.md` — atribución y postura de licencias.
- `CREDITS.md` en `multiversa-cli` — fuente de verdad de la atribución de la CLI.
