<script lang="ts">
  type Layer = {
    glyph: '◎' | '⬡' | '✦';
    glow: 'chartreuse' | 'ivory' | 'sand';
    code: string;
    name: string;
    nameEn: string;
    summary: string;
    detail: string;
    status: 'EXPERIMENTAL' | 'DEFINING' | 'NEXT';
  };

  const layers: Layer[] = [
    {
      glyph: '⬡',
      glow: 'sand',
      code: '01 · CONTRATO',
      name: 'Multiversa Pack',
      nameEn: 'contexto portable',
      summary: 'Identidad, instrucciones, fuentes y políticas en un contrato versionado.',
      detail: 'Es la unidad que debe sobrevivir al cambio de modelo o de agente. El esquema v0.1 está en definición y no incluirá credenciales ni datos privados.',
      status: 'DEFINING'
    },
    {
      glyph: '◎',
      glow: 'chartreuse',
      code: '02 · CONTROL',
      name: 'Multiversa CLI',
      nameEn: 'instala y audita',
      summary: 'El plano de control para detectar, configurar, actualizar y revertir.',
      detail: 'Existe como prototipo público. La realineación añade dry-run, receipts y rollback antes de considerar estable cualquier operación mutante.',
      status: 'EXPERIMENTAL'
    },
    {
      glyph: '✦',
      glow: 'ivory',
      code: '03 · PUERTA',
      name: 'Multiversa MCP',
      nameEn: 'interoperabilidad',
      summary: 'Una puerta común para que el host elegido consuma el mismo contexto.',
      detail: 'El prototipo actual expone herramientas de control de solo lectura. La siguiente versión debe leer el mismo Pack que la CLI, sin convertirse en otro agente.',
      status: 'EXPERIMENTAL'
    },
    {
      glyph: '⬡',
      glow: 'sand',
      code: '04 · EVIDENCIA',
      name: 'Receipts + checks',
      nameEn: 'compatibilidad verificable',
      summary: 'Pruebas comunes para demostrar qué cambió y qué funciona en cada host.',
      detail: 'Detectar Codex, Claude, Gemini u otro host no equivale a soportarlo. La compatibilidad llegará con prueba semántica, receipt y rollback reproducible.',
      status: 'NEXT'
    }
  ];

  const recommended = ['Engram · memoria', 'Graphify · conocimiento en evaluación', 'GentleAI · disciplina'];
  const optional = ['GentlePI', 'Hermes', 'OpenClaw', 'InsForge', 'MiroFish'];

  const statusLabel: Record<Layer['status'], string> = {
    EXPERIMENTAL: '◐ Prototipo',
    DEFINING: '◐ En definición',
    NEXT: '○ Siguiente puerta'
  };
</script>

<section id="arquitectura" class="architecture">
  <div class="site">
    <div class="mv-chrome-top">
      <span class="mv-label">Cap II · Arquitectura en realineamiento</span>
      <span class="mv-label-muted">pequeña · portable · verificable</span>
    </div>

    <div class="head">
      <h2 class="mv-two-beat">
        No construimos otro agente.
        <em>Construimos el departamento que puedes conectar.</em>
      </h2>
      <p class="lead">
        Un skill es un experto. Un plugin empaqueta un departamento. El MCP es
        su puerta y la CLI instala, audita y deja evidencia. Puedes usar Codex,
        Claude, Gemini, Hermes, OpenClaw o el host que prefieras.
      </p>
    </div>

    <div class="grid">
      {#each layers as layer}
        <article class="mv-card layer glow-{layer.glow}">
          <header>
            <span class="glyph glyph-{layer.glow}">{layer.glyph}</span>
            <div class="codes">
              <span class="mv-label">{layer.code}</span>
              <span class="status status-{layer.status.toLowerCase()}">{statusLabel[layer.status]}</span>
            </div>
          </header>

          <h3 class="name">{layer.name} <em>{layer.nameEn}.</em></h3>
          <p class="summary">{layer.summary}</p>
          <p class="detail">{layer.detail}</p>
        </article>
      {/each}
    </div>

    <div class="integration-map">
      <div>
        <span class="mv-label">Upstream recomendado</span>
        <p>Se conecta y verifica; no se copia ni se reclama como propio.</p>
        <ul aria-label="Proyectos upstream recomendados">
          {#each recommended as item}<li>{item}</li>{/each}
        </ul>
      </div>
      <div>
        <span class="mv-label">Adaptadores opcionales</span>
        <p>Se recomiendan según el caso; ninguno es requisito para usar el Pack.</p>
        <ul aria-label="Adaptadores opcionales">
          {#each optional as item}<li>{item}</li>{/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.architecture .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 24ch;
  }

  .head { max-width: 920px; margin-bottom: 56px; }
  .lead {
    margin: 24px 0 0;
    max-width: 68ch;
    color: rgba(250, 252, 232, 0.66);
    font: 300 clamp(1rem, 1.4vw, 1.2rem)/1.6 var(--font-sans);
  }

  .grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
  @media (min-width: 760px) { .grid { grid-template-columns: repeat(2, 1fr); } }

  .layer { display: flex; flex-direction: column; gap: 18px; height: 100%; }
  .layer.glow-chartreuse { box-shadow: 0 0 60px rgba(189, 235, 52, 0.04); }
  .layer.glow-sand { box-shadow: 0 0 60px rgba(184, 180, 172, 0.04); }
  .layer.glow-ivory { box-shadow: 0 0 60px rgba(250, 252, 232, 0.04); }

  header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
  .glyph { font: italic 400 2.75rem/1 var(--font-serif); }
  .glyph-chartreuse { color: var(--mv-primary); }
  .glyph-sand { color: var(--mv-sand); }
  .glyph-ivory { color: var(--mv-ivory); }
  .codes { display: flex; flex-direction: column; gap: 7px; align-items: flex-end; }

  .status {
    padding: 4px 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    font: 500 9px/1.2 var(--font-mono);
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .status-experimental, .status-defining {
    color: var(--mv-orange);
    border-color: rgba(255, 159, 90, 0.24);
    background: rgba(255, 159, 90, 0.05);
  }
  .status-next { color: rgba(250, 252, 232, 0.52); }

  .name {
    margin: 0;
    color: var(--mv-ivory);
    font: 400 clamp(1.5rem, 2vw, 1.875rem)/1.1 var(--font-serif);
    letter-spacing: -0.02em;
  }
  .name em { color: var(--mv-primary); opacity: 0.72; font-weight: 300; }
  .summary { margin: 0; color: var(--mv-ivory); font: 400 1rem/1.5 var(--font-sans); }
  .detail {
    margin: 0;
    padding-left: 14px;
    border-left: 2px solid rgba(255, 255, 255, 0.08);
    color: rgba(250, 252, 232, 0.58);
    font: 300 0.95rem/1.6 var(--font-sans);
  }

  .integration-map {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 28px;
    padding-top: 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  @media (min-width: 900px) { .integration-map { grid-template-columns: 1fr 1fr; } }
  .integration-map > div {
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.012);
  }
  .integration-map p {
    margin: 12px 0 18px;
    color: rgba(250, 252, 232, 0.58);
    font: 300 0.92rem/1.55 var(--font-sans);
  }
  .integration-map ul { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
  .integration-map li {
    padding: 7px 10px;
    border: 1px solid rgba(189, 235, 52, 0.14);
    border-radius: 999px;
    color: rgba(250, 252, 232, 0.72);
    font: 500 10px/1 var(--font-mono);
    letter-spacing: 0.08em;
  }
</style>
