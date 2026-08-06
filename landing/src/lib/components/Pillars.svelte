<script lang="ts">
  // Pilares canónicos del Lab — DNA Brand slide 20 ("Aquí viven")
  // Copy para Engram extraído del slide 40 ("README · primer párrafo")

  type Pillar = {
    glyph: '◎' | '⬡' | '✦';
    glow: 'chartreuse' | 'ivory' | 'sand';
    code: string;
    layer: string;
    name: string;
    nameEn: string;
    summary: string;
    detail: string;
    status: 'READY' | 'WIP' | 'ROADMAP';
    docLink: string;
  };

  const pillars: Pillar[] = [
    {
      glyph: '⬡',
      glow: 'sand',
      code: 'CAPA 01',
      layer: 'MEMORIA',
      name: 'Engram',
      nameEn: 'Contexto con memoria',
      summary: 'Memoria de construcción recuperable entre modelos y sesiones.',
      detail: 'Guarda decisiones y hallazgos para que agentes compatibles partan del contexto correcto. Cada Project OS conserva sus límites y sus secretos.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/engram.md'
    },
    {
      glyph: '✦',
      glow: 'ivory',
      code: 'CAPA 02',
      layer: 'CONOCIMIENTO',
      name: 'Graphify',
      nameEn: 'Grafo de conocimiento',
      summary: 'Ingesta automática de código y documentación a grafos.',
      detail: 'Mapea importaciones, consultas a base de datos y dependencias para reducir contexto innecesario y ganar velocidad.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/graphify.md'
    },
    {
      glyph: '◎',
      glow: 'chartreuse',
      code: 'CAPA 03',
      layer: 'DISCIPLINA',
      name: 'GentleAI',
      nameEn: 'Arnés SDD',
      summary: 'Arnés de origen para disciplina y configuración del agente.',
      detail: 'Organiza el ciclo de construcción en investigación, especificación y ejecución. Su nombre y lanzamientos se respetan desde su repositorio de origen.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/gentle.md'
    },
    {
      glyph: '✦',
      glow: 'ivory',
      code: 'CAPA 04',
      layer: 'PERSONAL',
      name: 'GentlePI',
      nameEn: 'Inteligencia personal',
      summary: 'Personalización de agente con el criterio del programador.',
      detail: 'Aplica tono, estilo y reglas de el_gentleman a tu agente local de construcción.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/gentle.md'
    },
    {
      glyph: '◎',
      glow: 'chartreuse',
      code: 'CAPA 05',
      layer: 'SIMULACIÓN',
      name: 'MiroFish',
      nameEn: 'Enjambre de escenarios',
      summary: 'Simulaciones paralelas de comportamiento de agentes.',
      detail: 'Crea mundos simulados basados en OASIS para explorar decisiones, probar mensajes y validar reglas antes de implementar.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/mirofish.md'
    },
    {
      glyph: '⬡',
      glow: 'sand',
      code: 'CAPA 06',
      layer: 'INFRAESTRUCTURA',
      name: 'InsForge',
      nameEn: 'Infraestructura BaaS',
      summary: 'Infraestructura opcional para el Cerebro del Lab.',
      detail: 'InsForge y un Cloudflare Worker pueden conectar datos, automatizaciones y superficies públicas sin sustituir la operación local ni absorber secretos de tenants.',
      status: 'READY',
      docLink: 'https://github.com/moshequantum/multiversa-lab/blob/main/docs/insforge.md'
    }
  ];
</script>

<section id="arquitectura" class="pillars">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap II · Arquitectura</span>
      <span class="mv-label-muted">02 / 05</span>
    </div>

    <div class="head">
      <h2 class="mv-two-beat">
        Aquí viven
        <em>los seis pilares del laboratorio.</em>
      </h2>
      <p class="lead">
        Cada pilar representa una capa robusta con alcance, memoria y criterio propio. Explora su documentación técnica haciendo clic en sus enlaces.
      </p>
    </div>

    <div class="grid">
      {#each pillars as p}
        <article class="mv-card pillar glow-{p.glow}">
          <header>
            <span class="glyph glyph-{p.glow}">{p.glyph}</span>
            <div class="codes">
              <span class="mv-label">{p.code} · {p.layer}</span>
              <span class="status status-{p.status.toLowerCase()}">
                {p.status === 'READY' ? '✓ Listo' : p.status === 'WIP' ? '◐ En obra' : '○ Hoja de ruta'}
              </span>
            </div>
          </header>

          <h3 class="name">
            {p.name}
            <em>{p.nameEn}.</em>
          </h3>

          <p class="summary">{p.summary}</p>

          <p class="detail">{p.detail}</p>

          <div class="card-action">
            <a href={p.docLink} target="_blank" rel="noopener" class="doc-btn">
              Ver documentación técnica &nbsp;↗
            </a>
          </div>
        </article>
      {/each}
    </div>

    <div class="foot">
      <span class="mv-label-muted">También viven aquí: habilidades, MCP, complementos, validación de esquemas y documentación abierta</span>
    </div>

  </div>
</section>

<style>
  :global(.pillars .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 22ch;
  }

  .head { max-width: 880px; margin-bottom: 56px; }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.6);
    margin: 24px 0 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (min-width: 768px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1280px) { .grid { grid-template-columns: repeat(3, 1fr); } }

  .pillar {
    display: flex;
    flex-direction: column;
    gap: 18px;
    height: 100%;
    justify-content: space-between;
  }

  .pillar.glow-chartreuse { box-shadow: 0 0 60px rgba(189, 235, 52, 0.04); }
  .pillar.glow-sand       { box-shadow: 0 0 60px rgba(184, 180, 172, 0.04); }
  .pillar.glow-ivory      { box-shadow: 0 0 60px rgba(250, 252, 232, 0.04); }

  .pillar:hover.glow-chartreuse { box-shadow: 0 0 80px rgba(189, 235, 52, 0.12); }
  .pillar:hover.glow-sand       { box-shadow: 0 0 80px rgba(184, 180, 172, 0.12); }
  .pillar:hover.glow-ivory      { box-shadow: 0 0 80px rgba(250, 252, 232, 0.12); }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .glyph {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 2.75rem;
    line-height: 1;
  }
  .glyph-chartreuse { color: var(--mv-primary); }
  .glyph-sand       { color: var(--mv-sand); }
  .glyph-ivory      { color: var(--mv-ivory); }

  .codes { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }

  .status {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .status-ready    { color: var(--mv-primary); border-color: rgba(189, 235, 52, 0.25); background: rgba(189, 235, 52, 0.06); }
  .status-wip      { color: var(--mv-orange); border-color: rgba(255, 159, 90, 0.22); background: rgba(255, 159, 90, 0.05); }
  .status-roadmap  { color: rgba(250, 252, 232, 0.45); }

  .name {
    margin: 0;
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.5rem, 2vw, 1.875rem);
    line-height: 1.1;
    color: var(--mv-ivory);
    letter-spacing: -0.02em;
  }
  .name em {
    font-style: italic;
    font-weight: 300;
    color: var(--mv-primary);
    opacity: 0.7;
  }

  .summary {
    font-family: var(--font-sans);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.45;
    color: var(--mv-ivory);
    margin: 0;
  }

  .detail {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 0.95rem;
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.55);
    margin: 0;
    border-left: 2px solid rgba(255, 255, 255, 0.08);
    padding-left: 14px;
    flex-grow: 1;
  }

  .card-action {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .doc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--mv-ivory);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .doc-btn:hover {
    background: var(--mv-primary-dim);
    border-color: var(--mv-primary);
    color: var(--mv-primary);
    box-shadow: var(--shadow-chartreuse-soft);
  }

  .foot {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
  }
</style>
