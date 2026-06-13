<script lang="ts">
  // Atribución a los autores upstream.
  // Esta sección honra "Crédito donde corresponde." (DNA Brand · Cap I)

  type Upstream = {
    pillar: string;
    glyph: '◎' | '⬡' | '✦';
    glow: 'chartreuse' | 'ivory' | 'sand';
    author: string;
    handle: string;
    authorUrl: string;
    location?: string;
    repoUrl: string;
    repoLabel: string;
    license: 'MIT' | 'AGPL-3.0' | 'Commercial';
    homepage?: string;
  };

  const upstreams: Upstream[] = [
    {
      pillar: 'Engram',
      glyph: '⬡',
      glow: 'sand',
      author: 'Alan Buscaglia',
      handle: 'Gentleman-Programming',
      authorUrl: 'https://github.com/Gentleman-Programming',
      repoUrl: 'https://github.com/Gentleman-Programming/engram',
      repoLabel: 'Gentleman-Programming/engram',
      license: 'MIT'
    },
    {
      pillar: 'GentleAI',
      glyph: '◎',
      glow: 'chartreuse',
      author: 'Alan Buscaglia',
      handle: 'Gentleman-Programming',
      authorUrl: 'https://github.com/Gentleman-Programming',
      repoUrl: 'https://github.com/Gentleman-Programming/gentle-ai',
      repoLabel: 'Gentleman-Programming/gentle-ai',
      license: 'MIT'
    },
    {
      pillar: 'GentlePI',
      glyph: '✦',
      glow: 'ivory',
      author: 'Alan Buscaglia',
      handle: 'Gentleman-Programming',
      authorUrl: 'https://github.com/Gentleman-Programming',
      repoUrl: 'https://github.com/Gentleman-Programming/gentle-pi',
      repoLabel: 'Gentleman-Programming/gentle-pi',
      license: 'MIT'
    },
    {
      pillar: 'MiroFish',
      glyph: '◎',
      glow: 'chartreuse',
      author: 'BaiFu',
      handle: '666ghj',
      authorUrl: 'https://github.com/666ghj',
      location: 'Shanghái',
      repoUrl: 'https://github.com/666ghj/MiroFish',
      repoLabel: '666ghj/MiroFish',
      license: 'AGPL-3.0',
      homepage: 'https://mirofish.homes/'
    },
    {
      pillar: 'Graphify',
      glyph: '✦',
      glow: 'ivory',
      author: 'Safi',
      handle: 'safishamsi',
      authorUrl: 'https://github.com/safishamsi',
      location: 'Londres',
      repoUrl: 'https://github.com/safishamsi/graphify',
      repoLabel: 'safishamsi/graphify',
      license: 'MIT'
    }
  ];
</script>

<section id="atribucion" class="attribution">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap III · Créditos</span>
      <span class="mv-label-muted">03 / 05</span>
    </div>

    <div class="head">
      <h2 class="mv-two-beat">
        Sobre los hombros
        <em>de quienes abrieron su código.</em>
      </h2>
      <p class="lead">
        Cinco de los seis pilares se apoyan en proyectos open-source de
        constructores que abrieron su trabajo. Los nombramos con claridad,
        linkeamos sus repos, respetamos su licencia. <strong>Multiversa Lab
        es el conector: las herramientas viven en sus propios repos, con
        sus propios mantenedores.</strong>
      </p>
    </div>

    <div class="grid">
      {#each upstreams as u}
        <article class="card glow-{u.glow}">
          <div class="head-row">
            <span class="glyph glyph-{u.glow}">{u.glyph}</span>
            <span class="pillar">{u.pillar}</span>
            <span class="license license-{u.license.toLowerCase().replace('.', '-').replace('-3-0', '-3')}">
              {u.license}
            </span>
          </div>

          <p class="author">
            <a href={u.authorUrl} target="_blank" rel="noopener" class="name">
              {u.author}
            </a>
            <span class="handle">
              <a href={u.authorUrl} target="_blank" rel="noopener">@{u.handle}</a>
              {#if u.location}<span class="loc">· {u.location}</span>{/if}
            </span>
          </p>

          <p class="repo">
            <a href={u.repoUrl} target="_blank" rel="noopener">
              {u.repoLabel} ↗
            </a>
            {#if u.homepage}
              <a href={u.homepage} target="_blank" rel="noopener" class="home">
                {u.homepage.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
              </a>
            {/if}
          </p>
        </article>
      {/each}
    </div>

    <p class="closing">
      Si vas a mejorar uno de estos pilares,
      <em>abre un PR en el repositorio original.</em>
      <br />
      Somos usuarios agradecidos que documentan. Ni un fork, ni un wrapper.
    </p>

  </div>
</section>

<style>
  .attribution {
    background:
      radial-gradient(ellipse 50% 60% at 50% 0%, rgba(189, 235, 52, 0.02), transparent 70%),
      transparent;
  }

  :global(.attribution .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 24ch;
  }

  .head { max-width: 880px; margin-bottom: 56px; }
  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.62);
    margin: 24px 0 0;
  }
  .lead strong { color: var(--mv-ivory); font-weight: 400; }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }
  @media (min-width: 768px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1280px) { .grid { grid-template-columns: repeat(3, 1fr); } }

  .card {
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.015);
    border-radius: 20px;
    padding: 26px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: border-color 220ms ease, background 220ms ease, transform 220ms ease;
  }
  .card:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.025);
    transform: translateY(-2px);
  }

  .head-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .glyph {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 2rem;
    line-height: 1;
  }
  .glyph-chartreuse { color: var(--mv-primary); }
  .glyph-sand       { color: var(--mv-sand); }
  .glyph-ivory      { color: var(--mv-ivory); }

  .pillar {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 1.5rem;
    letter-spacing: -0.01em;
    color: var(--mv-ivory);
    flex: 1;
  }

  .license {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .license-mit         { color: var(--mv-primary); border-color: rgba(189, 235, 52, 0.22); background: rgba(189, 235, 52, 0.05); }
  .license-agpl-3      { color: var(--mv-orange); border-color: rgba(255, 159, 90, 0.25); background: rgba(255, 159, 90, 0.05); }
  .license-commercial  { color: rgba(250, 252, 232, 0.5); }

  .author { margin: 0; display: flex; flex-direction: column; gap: 2px; }
  .name {
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 1rem;
    color: var(--mv-ivory);
  }
  .name:hover { color: var(--mv-primary); }
  .handle {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    color: rgba(250, 252, 232, 0.45);
    text-transform: uppercase;
  }
  .handle a:hover { color: var(--mv-primary); }
  .loc { font-style: italic; opacity: 0.7; text-transform: none; letter-spacing: 0.05em; }

  .repo {
    margin: 0;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
  }
  .repo a {
    color: rgba(250, 252, 232, 0.65);
    transition: color 180ms ease;
  }
  .repo a:hover { color: var(--mv-primary); }
  .repo .home { color: rgba(250, 252, 232, 0.45); }

  .closing {
    margin-top: 56px;
    text-align: center;
    font-family: var(--font-sans);
    font-weight: 300;
    color: rgba(250, 252, 232, 0.6);
    font-size: clamp(0.98rem, 1.4vw, 1.125rem);
    line-height: 1.55;
  }
  .closing em {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--mv-primary);
    opacity: 0.85;
  }
</style>
