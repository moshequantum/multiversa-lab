# Loop de contexto público

La documentación para personas, crawlers, modelos y agentes nace de `docs/ecosystem.public.json`.

## Ciclo

1. Cambiar la fuente canónica después de una modificación pública del ecosistema.
2. Ejecutar `pnpm context:sync`.
3. Revisar el diff generado; ninguna salida puede introducir datos privados.
4. Ejecutar `pnpm context:check` y `pnpm build`.
5. Publicar mediante PR y comprobar los endpoints en producción.

## Salidas

`robots.txt` aplica el Robots Exclusion Protocol; no protege recursos. `llms.txt` ofrece un índice Markdown conciso. `llms-full.txt` expande el contrato. `agents.txt` declara orientación no vinculante para agentes. `ecosystem.json` es la interfaz machine-readable y `sitemap.xml` descubre páginas HTML públicas.

Los archivos generados se versionan para que cualquier cambio sea auditable. CI falla cuando la fuente y las salidas divergen.
