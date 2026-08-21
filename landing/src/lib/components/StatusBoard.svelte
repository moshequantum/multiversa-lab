<script lang="ts">
  const phases = [
    {
      key: 'now',
      label: '◐ AHORA · F0',
      title: 'Realinear la verdad pública.',
      items: [
        'Retirar el modelo de seis pilares obligatorios',
        'Nombrar Pack + CLI + MCP + receipts como arquitectura objetivo',
        'Auditar capacidades reales del CLI y los adaptadores',
        'Marcar el instalador y la integración como experimentales',
        'Publicar una matriz de funciona / parcial / no soportado'
      ]
    },
    {
      key: 'next',
      label: '○ SIGUIENTE · F1–F3',
      title: 'Convertir dirección en evidencia.',
      items: [
        'Publicar el contrato Multiversa Pack v0.1',
        'Unificar la fuente de verdad de CLI y MCP',
        'Añadir dry-run, receipt y rollback a cada cambio',
        'Probar el mismo contexto en dos proyectos y varios hosts',
        'Declarar compatibilidad solo después de una prueba semántica común'
      ]
    },
    {
      key: 'later',
      label: '◇ DESPUÉS · F4–F5',
      title: 'Dogfood, beta y versión MIT.',
      items: [
        'Usar el sistema en dos ciclos reales de entrega',
        'Abrir una beta pequeña a revisores técnicos',
        'Documentar fallos conocidos por plataforma',
        'Coordinar compatibilidad estable con los upstreams',
        'Publicar ejemplos reproducibles y contribuciones comunitarias'
      ]
    }
  ];
</script>

<section id="roadmap" class="roadmap">
  <div class="site">
    <div class="mv-chrome-top">
      <span class="mv-label">Roadmap público · Build in Public</span>
      <span class="mv-label-muted">actualizado · 21 ago 2026</span>
    </div>

    <h2 class="mv-two-beat">
      No prometemos que está listo.
      <em>Prometemos mostrar cómo llega a estarlo.</em>
    </h2>

    <p class="lead">
      Hoy existen piezas útiles, un CLI público y un MCP de control de solo
      lectura. La integración completa continúa inmadura. Esta hoja de ruta
      publica la secuencia, las puertas de salida y los límites antes de terminarla.
      <strong>Roto se arregla. Lo inmaduro se nombra.</strong>
    </p>

    <div class="grid">
      {#each phases as phase}
        <article class="mv-card phase phase-{phase.key}">
          <span class="mv-label phase-label">{phase.label}</span>
          <h3>{phase.title}</h3>
          <ul>
            {#each phase.items as item}
              <li><span class="dot" aria-hidden="true"></span><span>{item}</span></li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    <div class="roadmap-foot">
      <p>Las fechas orientan. Las puertas de salida deciden.</p>
      <a href="https://github.com/moshequantum/multiversa-lab/blob/main/ROADMAP.md" target="_blank" rel="noopener">
        Leer el roadmap completo ↗
      </a>
    </div>
  </div>
</section>

<style>
  :global(.roadmap .mv-two-beat) {
    margin: 0;
    max-width: 22ch;
    font-size: clamp(2rem, 4.5vw, 3.5rem);
  }
  .lead {
    max-width: 66ch;
    margin: 24px 0 56px;
    color: rgba(250, 252, 232, 0.64);
    font: 300 clamp(1rem, 1.4vw, 1.2rem)/1.6 var(--font-sans);
  }
  .lead strong { color: var(--mv-ivory); font-weight: 400; }

  .grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }
  .phase { display: flex; flex-direction: column; gap: 16px; height: 100%; }
  .phase-now { border-color: rgba(255, 159, 90, 0.22); background: rgba(255, 159, 90, 0.025); }
  .phase-next { border-color: rgba(189, 235, 52, 0.16); background: rgba(189, 235, 52, 0.02); }
  .phase-later { border-color: rgba(255, 255, 255, 0.06); }
  .phase-label { font-size: 10px; letter-spacing: 0.22em; }
  .phase-now .phase-label { color: var(--mv-orange); }
  .phase-next .phase-label { color: var(--mv-primary); }
  .phase-later .phase-label { color: rgba(250, 252, 232, 0.5); }
  h3 {
    margin: 0;
    color: var(--mv-ivory);
    font: 400 clamp(1.25rem, 2vw, 1.625rem)/1.15 var(--font-serif);
    letter-spacing: -0.02em;
  }
  ul { display: flex; flex: 1; flex-direction: column; gap: 12px; margin: 8px 0 0; padding: 0; list-style: none; }
  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    color: rgba(250, 252, 232, 0.76);
    font: 300 0.96rem/1.5 var(--font-sans);
  }
  .dot {
    width: 5px;
    height: 5px;
    flex-shrink: 0;
    transform: translateY(-2px);
    border-radius: 50%;
    background: rgba(250, 252, 232, 0.36);
  }
  .phase-now .dot { background: var(--mv-orange); }
  .phase-next .dot { background: var(--mv-primary); }

  .roadmap-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  .roadmap-foot p { margin: 0; color: rgba(250, 252, 232, 0.5); font: italic 300 1rem/1.5 var(--font-serif); }
  .roadmap-foot a { color: var(--mv-primary); font: 500 10px/1.4 var(--font-mono); letter-spacing: 0.18em; text-transform: uppercase; }
  @media (max-width: 640px) { .roadmap-foot { align-items: flex-start; flex-direction: column; } }
</style>
