<script lang="ts">
  // Principios canónicos del DNA Brand — Cap I · Fundamento
  const principles = [
    'Criterio sobre velocidad.',
    'Sistema sobre herramienta.',
    'Claridad sobre brillo.',
    'Memoria sobre repetición.',
    'Apertura sobre opacidad.',
    'Humano siempre decide.'
  ];
</script>

<section id="manifiesto" class="ethos">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap I · Principios</span>
      <span class="mv-label-muted">01 / 05</span>
    </div>

    <h2 class="mv-two-beat">
      Antes del código,
      <em>la postura.</em>
    </h2>

    <p class="intro">
      Seis principios sostienen todo lo que el laboratorio publica.
      Si una decisión los rompe, la decisión se cambia. No el principio.
    </p>

    <ol class="principles">
      {#each principles as line, i}
        <li>
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <span class="text">{line}</span>
        </li>
      {/each}
    </ol>

    <p class="closing">
      <em>La IA propone, tú decides.</em>
    </p>

  </div>
</section>

<style>
  .ethos { background: rgba(255, 255, 255, 0.005); }

  :global(.ethos .mv-two-beat) {
    font-size: clamp(2rem, 5vw, 3.75rem);
    max-width: 16ch;
    margin: 0 0 24px;
  }

  .intro {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.25rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.6);
    max-width: 60ch;
    margin: 0 0 64px;
  }

  .principles {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  @media (min-width: 768px)  { .principles { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1280px) { .principles { grid-template-columns: repeat(3, 1fr); } }

  .principles li {
    display: flex;
    align-items: baseline;
    gap: 18px;
    padding: 28px 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transition: background 200ms ease;
  }
  .principles li:hover {
    background: rgba(189, 235, 52, 0.025);
  }

  .num {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.3em;
    color: var(--mv-primary);
    min-width: 28px;
  }

  .text {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.15rem, 1.6vw, 1.5rem);
    line-height: 1.25;
    color: var(--mv-ivory);
    letter-spacing: -0.01em;
  }

  .closing {
    margin-top: 56px;
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--mv-primary);
    opacity: 0.85;
    text-align: center;
  }
</style>
