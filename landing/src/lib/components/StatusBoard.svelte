<script lang="ts">
  // La sección honesta — manifesto before product.
  const columns = [
    {
      key: 'ready',
      label: '✓ LISTO',
      title: 'Lo que ya existe.',
      items: [
        'Manifiesto público',
        'Design System (Liquid Glass Pro + Onion UI)',
        'DNA Brand · 47 slides bilingüe',
        'Principios de orquestación humana',
        'Code of Conduct',
        'Templates Engram / Graphify / Gentle'
      ]
    },
    {
      key: 'wip',
      label: '◐ EN OBRA',
      title: 'Donde estamos cavando.',
      items: [
        'Engram (capa SQLite + MCP)',
        'Graphify CLI · neo4j_lite',
        'Installer real (multiversa init)',
        'GentlePI: captura de voz personal',
        'InsForge: backend del laboratorio',
        'Documentación abierta'
      ]
    },
    {
      key: 'roadmap',
      label: '○ VISIÓN',
      title: 'A dónde apunta el arco.',
      items: [
        'MiroFish: swarm simulation',
        'MultiversaOS: context sync universal',
        'Recipes portables para cada proyecto',
        'Cross-LLM memory portability',
        'Panel público del laboratorio',
        'Programa de contribuidores'
      ]
    }
  ];
</script>

<section id="estado" class="status">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap IV · Estado público</span>
      <span class="mv-label-muted">04 / 05 · sin maquillaje</span>
    </div>

    <h2 class="mv-two-beat">
      Dónde estamos,
      <em>sin maquillaje.</em>
    </h2>

    <p class="lead">
      El laboratorio es público porque la responsabilidad también.
      Esto es lo que ya corre, lo que estamos construyendo y a dónde apunta el arco.
      <strong>Roto se arregla. No se esconde.</strong>
    </p>

    <div class="grid">
      {#each columns as col}
        <div class="mv-card column column-{col.key}">
          <span class="mv-label col-label">{col.label}</span>
          <h3 class="col-title">{col.title}</h3>
          <ul>
            {#each col.items as item}
              <li>
                <span class="dot" aria-hidden="true"></span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <p class="footer-line">
      <em>El Lab es un manifiesto antes que un producto. Ese es el punto.</em>
    </p>

  </div>
</section>

<style>
  :global(.status .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 18ch;
    margin: 0;
  }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.6);
    max-width: 60ch;
    margin: 24px 0 56px;
  }
  .lead strong {
    color: var(--mv-ivory);
    font-weight: 400;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  @media (min-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }

  .column { display: flex; flex-direction: column; gap: 16px; }

  .column-ready   { border-color: rgba(189, 235, 52, 0.18); background: rgba(189, 235, 52, 0.025); }
  .column-wip     { border-color: rgba(255, 159, 90, 0.16); background: rgba(255, 159, 90, 0.02); }
  .column-roadmap { border-color: rgba(255, 255, 255, 0.06); }

  .col-label { font-size: 11px; letter-spacing: 0.3em; }
  .column-ready   .col-label { color: var(--mv-primary); }
  .column-wip     .col-label { color: var(--mv-orange); }
  .column-roadmap .col-label { color: rgba(250, 252, 232, 0.5); }

  .col-title {
    margin: 0;
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.25rem, 2vw, 1.625rem);
    line-height: 1.15;
    color: var(--mv-ivory);
    letter-spacing: -0.02em;
  }

  ul { list-style: none; padding: 0; margin: 8px 0 0; display: flex; flex-direction: column; gap: 12px; }

  li {
    display: flex;
    align-items: baseline;
    gap: 12px;
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 0.98rem;
    line-height: 1.5;
    color: rgba(250, 252, 232, 0.78);
  }

  .dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--mv-primary);
    display: inline-block;
    flex-shrink: 0;
    transform: translateY(-2px);
  }
  .column-wip      .dot { background: var(--mv-orange); }
  .column-roadmap  .dot { background: rgba(250, 252, 232, 0.35); }

  .footer-line {
    margin-top: 56px;
    text-align: center;
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: rgba(250, 252, 232, 0.5);
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    letter-spacing: 0.01em;
  }
</style>
