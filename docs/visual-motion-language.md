# Lenguaje visual procedural del Lab

La landing de Multiversa.Lab usa visuales generados en código y ligados al significado del contenido. Este documento permite reproducirlos sin depender de prompts, rutas privadas ni referencias locales.

## Gramática

- Fondo Carbon/Void.
- Ivory para estructura y contexto.
- Chartreuse para actividad o señal viva.
- Dither, halftone, grids, puntos y grafos de procedencia.
- Una seed estable por pieza.
- Movimiento lento, inspeccionable y con propósito narrativo.

## Contrato

Las piezas se registran en `landing/src/lib/visuals/manifest.ts`. Cada entrada declara:

- intención narrativa;
- primitive;
- seed;
- comportamiento;
- fallback de movimiento reducido;
- máximo de FPS;
- límite de DPR.

## Runtime

La implementación prioriza SVG/CSS y Canvas2D. GSAP se reserva para timelines o scroll. WebGL requiere justificar que Canvas2D no cumple el objetivo.

Todo loop se detiene fuera del viewport y cuando la pestaña está oculta. `prefers-reduced-motion` debe producir un poster estático completo.

## Primera pieza: `lab-open-signal`

`OpenSignalField.svelte` dibuja un campo dither determinista en el hero. El campo concentra la señal lejos del bloque principal de lectura, responde con baja amplitud al puntero y limita la ejecución a 30 FPS y DPR 1.5. Una base completa se prerenderiza al cambiar de dimensión; durante el loop solo se redibujan señales vivas dispersas.

La pieza representa una estructura computacional visible bajo la superficie pública del Lab. Su source y manifest son la fuente de verdad; cualquier poster futuro debe derivarse de este runtime.

## Motion de lanzamiento

El movimiento del Lab explica apertura, recorrido y procedencia. Se conserva el scroll nativo y se evita cualquier inercia artificial que compita con el control de la persona.

### Jerarquía

1. **Orientación:** rail Chartreuse de 2 px ligado al progreso real.
2. **Entrada:** hero, meta, titular, copy, CTA y controles forman un ritmo editorial CSS transform-only; el contenido elegible como LCP nunca parte de opacidad cero.
3. **Profundidad:** foreground y campo dither avanzan a ritmos diferentes; el horizonte responde con una amplitud menor.
4. **Capítulos:** cada sección activa una señal numerada al cruzar el centro del viewport.
5. **Tarjetas:** stagger corto, perspectiva contenida, elevación y spotlight local en puntero fino.
6. **Deseo:** los CTA principales reciben una respuesta magnética rara y deliberada.

### Ritmo

- Hero: entradas de 620–860 ms con `power3.out`.
- Títulos: 760 ms.
- Tarjetas: 780 ms con stagger de 65 ms.
- Hover: 200 ms de entrada y 420 ms de retorno.
- CTA magnético: 180 ms de respuesta y 500 ms de retorno.
- Profundidad ligada al scroll: scrub de 0.7–0.8.

La implementación avanzada anima `transform` y `opacity`; no cambia el layout durante el scroll. La entrada inicial del hero usa solo `transform` para no retrasar el LCP. Las entradas se ejecutan una sola vez y no mantienen `will-change` permanente.

### Accesibilidad y cleanup

- `prefers-reduced-motion: reduce` evita GSAP, conserva el estado final y oculta el rail.
- GSAP y ScrollTrigger se importan solo después de intención real: puntero, toque, rueda, scroll o teclado.
- Las respuestas al puntero solo existen cuando el dispositivo declara `hover: hover` y `pointer: fine`.
- Markers, listeners, triggers y spotlights se eliminan al desmontar o cambiar la preferencia.
- La espera de `document.fonts.ready` precede al refresh de ScrollTrigger.

### Fuente de verdad

- `landing/src/lib/motion.ts`: timeline y lifecycle.
- `landing/src/lib/components/ScrollProgress.svelte`: rail de orientación.
- `landing/src/lib/styles/global.css`: contratos visuales.
- `landing/src/routes/+page.svelte`: montaje progresivo.

### QA de aceptación

- Contenido visible y utilizable con JavaScript deshabilitado.
- Sin overflow horizontal en móvil, tablet o escritorio.
- Markers y spotlights no se duplican tras HMR.
- Reduced motion no ejecuta timelines ni parallax.
- Sin errores de consola, requests fallidos ni interrupciones del ambiente sonoro.
