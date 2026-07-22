# Multiversa.Lab · manifiesto de release paraguas

**Repositorio canónico:** `moshequantum/multiversa-lab`  
**Estado:** preparación de release inicial  
**Licencia del repositorio:** MIT, salvo componentes externos indicados

## Propósito

Multiversa.Lab publica la capa replicable para crear un sistema operativo único
por proyecto: protocolos, recipes, documentación, instalación y adaptadores. Un
recipe describe capacidades reutilizables; nunca impone el nombre, identidad o
gobernanza de otra persona o proyecto.

## Superficies incluidas

| Superficie | Autoridad | Estado inicial |
|---|---|---|
| Portal y documentación pública | `multiversa-lab` | Incluido |
| Instalación y operación local | `multiversa-cli` | Proyecto relacionado |
| Contratos y schemas programáticos | `multiversa-sdk` | Preparado como proyecto relacionado |
| Instalador gráfico | `multiversa-installer` | Proyecto relacionado |
| Implementación y acompañamiento | `multiversa-group` | Privado; no forma parte del release OSS |

## Motores curados

Engram, Graphify, Gentle AI, Gentle PI, codegraph y MiroFish son proyectos
externos. Multiversa los integra con atribución y respeta sus licencias. MiroFish
permanece external-only por su licencia AGPL-3.0.

## Garantías de frontera pública

- Cero perfiles, nombres, contratos o datos de clientes.
- Cero credenciales, endpoints productivos o identificadores de proyectos cloud.
- Cero precios o tiers universales: el producto abierto no condiciona capacidades
  a una taxonomía comercial.
- InsForge y otros backends remotos son adaptadores opcionales; local-first es la
  base operativa.
- Cada componente relacionado mantiene su propia cadencia y publicación. Este
  manifiesto declara compatibilidad, no copia su código.

## Gate antes de publicar

- [ ] Build y pruebas del sitio pasan con `pnpm`.
- [ ] Enlaces apuntan a `moshequantum/multiversa-lab`.
- [ ] Escaneo del working tree y de todo el historial Git sin secretos.
- [ ] Revisión de licencias, fuentes, imágenes y binarios.
- [ ] Revisión humana de privacidad y exactitud técnica.
- [ ] Tag, checksums y notas de release preparados; publicación requiere aprobación.

## Compatibilidad

La primera versión paraguas se declarará solo cuando CLI, SDK e Installer puedan
referenciar una versión explícita del contrato de Profile/Recipe. Hasta entonces,
este archivo es el inventario de alcance y el gate de salida, no una promesa de
estabilidad de API.
