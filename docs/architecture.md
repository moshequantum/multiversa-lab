# Arquitectura de Multiversa

> Fuente de verdad vigente al 2026-07-20. La cosmología anterior de agentes con nombre fue retirada; no forma parte de la arquitectura activa.

## Forma

Multiversa es un conjunto curado y agnóstico al agente. **Multiversa.Lab** publica la capa de código abierto: Multiversa CLI y la arquitectura Cerebro, capaz de conectar InsForge y un Worker de Cloudflare. **Multiversa.Group** es el ámbito privado de su creador; no es un producto ni una frontera de servicio pública para quienes usan el Lab.

## Capas activas

1. **SvelteKit Lab** — sitio público, documentación, notas de lanzamiento y lenguaje visual.
2. **Multiversa CLI / instalador visual Tauri** — instaladores y orquestadores locales que configuran el conjunto curado en el entorno de quien opera.
3. **Cerebro** — frontera de integración que puede combinar memoria Engram y conocimiento Graphify por tenant con servicios opcionales de InsForge y Cloudflare Worker; nunca transforma un tenant privado en un cerebro público compartido.
4. **Motores curados** — Engram, Graphify, `gentle-ai`, gentle-pi, codegraph y MiroFish opcional, siempre externo.
5. **Backend opcional** — local primero por defecto; los backends remotos son adaptadores, no el núcleo.

## Fronteras

- Multiversa **orquesta** motores de origen; no reclama su autoría.
- Los componentes AGPL son exclusivamente externos. MiroFish nunca se integra, vende ni compila dentro de Multiversa.
- La persona lidera. La IA propone; la persona decide.
- Las referencias de diseño importadas y heredadas no son compromisos de producto.

## Documentos fuente

- `README.md` — narrativa pública y ruta de instalación.
- `docs/upstream.md` — atribución y postura de licencias.
- `CREDITS.md` en `multiversa-cli` — fuente de verdad de la atribución de la CLI.
