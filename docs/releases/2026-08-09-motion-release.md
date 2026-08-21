# Motion procedural de lanzamiento

Fecha: 2026-08-09  
Superficie: `lab.multiversa.group`

## Alcance

La landing adopta un campo dither reproducible y una capa de motion editorial. Se eliminó el render 3D pesado: la fuente visual vuelve a ser código inspeccionable, con seed estable y fallback de movimiento reducido.

## Contratos

- Canvas2D prerenderiza la base y anima solo señales vivas dispersas.
- GSAP se descarga después de intención real, nunca durante el primer paint.
- El hero entra con `transform` sin ocultar el contenido elegible como LCP.
- Scroll nativo, sin bloqueo ni inercia artificial.
- Cards con stagger, spotlight y elevación solo en puntero fino.
- `prefers-reduced-motion` evita el runtime avanzado.
- Sin JavaScript, todo el contenido y los enlaces siguen disponibles.

## Verificación

- `svelte-check`: 0 errores y 0 warnings.
- Build SvelteKit/Vercel: verde.
- Contexto público: sincronizado.
- Vulnerabilidades de producción: 0.
- Viewports: 390×844, 768×1024 y 1366×768, sin overflow horizontal.
- Lighthouse móvil local: Performance 87, Accessibility 100, Best Practices 100, SEO 100.
- Web Vitals sintéticos: FCP 2.0 s, LCP 2.7 s, TBT 340 ms, CLS 0.
- Audio atmosférico: aproximadamente -26.41 dBFS al 50%, sin clipping.
- 8 señales de capítulo y 27 spotlights, sin duplicación tras inicializar motion.
- Navegación, targets táctiles, jerarquía de headings y lectura accesible pasan Lighthouse.

## Defensa del endpoint

El endpoint de lista de espera rechaza origen ausente (403), tipo no JSON (415), JSON/campos inválidos (400), body mayor a 4096 bytes (413) y métodos no permitidos (405). El honeypot responde 202 sin escribir datos. Cada respuesta incluye `cache-control: no-store` y `x-request-id`.

## Headers

Vercel aplica CSP, HSTS, `nosniff`, bloqueo de framing, referrer policy y permissions policy. La única excepción externa de script/conexión es el widget público de `cerebro.multiversa.group` cuando su variable está configurada.

## Operación

Este release no despliega el worker. El deploy de la landing se verifica primero como preview y solo después se promueve. Ante una regresión persistente se vuelve a promover el deployment estable anterior.

## Cierre de producción

- Commit visual/motion: `39b30ce`.
- Preview verificado: `dpl_7JWLziZ1XdWLsrcJaVwYTsVN6prU`.
- Deployment promovido: `dpl_AFGYuF4EZtQJd7KYoXVU3aJGBTLC`.
- Dominio: `https://lab.multiversa.group`.
- Promoción: 2026-08-09, 13:28 (America/Caracas).

El canary posterior a promoción confirmó HTML y assets 200, headers endurecidos, hero procedural, fuentes cargadas, 8 capítulos, 27 cards/spotlights y rail de progreso operativo. Chromium real no encontró overflow en 1366×768 ni 390×844; la navegación móvil abre, expone sus seis enlaces y cierra con Escape. No hubo errores JavaScript, respuestas 5xx ni errores de runtime en Vercel. El control atmosférico pasó a `Activado`, habilitó silencio y mantuvo volumen 50%.

Los guards del endpoint conservaron 403 sin origen propio, 400 para campos inválidos y 202 neutro para el honeypot, con `cache-control: no-store` y `x-request-id`. No se envió ningún lead válido durante el canary.

El worker permanece fuera de este release y se retoma mañana.
