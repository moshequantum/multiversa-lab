<script lang="ts">
  // Hero — canonical public copy for Multiversa.Lab.
  import AmbientSound from './AmbientSound.svelte';
</script>

<section class="hero">
  <div class="site stack">

    <div class="meta">
      <span class="mv-pill">Laboratorio público · En obra</span>
    </div>

    <h1 class="mv-two-beat">
      El código abierto
      <em>de Multiversa.</em>
    </h1>

    <p class="lead">
      Herramientas abiertas para configurar sistemas de agentes reproducibles:
      <strong>Multiversa CLI, Cerebro y contexto bajo control humano.</strong>
    </p>

    <div class="ctas">
      <a class="mv-btn mv-btn-primary"
         href="https://github.com/moshequantum/multiversa-lab"
         target="_blank" rel="noopener">
        Ver código en GitHub ↗
      </a>
      <a class="mv-btn mv-btn-ghost" href="#manifiesto">
        Leer el manifiesto ↓
      </a>
    </div>

    <AmbientSound initialVolume={6} />

    <div class="chips">
      <span class="mv-label-muted">Engram</span>
      <span class="mv-label-muted">Graphify</span>
      <span class="mv-label-muted">MiroFish</span>
      <span class="mv-label-muted">GentleAI</span>
      <span class="mv-label-muted">GentlePI</span>
      <span class="mv-label-muted">InsForge</span>
      <span class="mv-label-muted lab-address">lab.multiversa.group →</span>
    </div>
  </div>

  <aside class="editorial-rail" aria-label="Frontera pública del Lab">
    <span>Público</span>
    <span>Auditable</span>
    <span>Humano al mando</span>
  </aside>

  <div class="horizon" aria-hidden="true"></div>
  <div class="horizon-line" aria-hidden="true"></div>
  <div class="grid-pattern" aria-hidden="true"></div>
</section>

<style>
  .hero {
    min-height: 100svh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: clamp(112px, 14vh, 168px);
    padding-bottom: clamp(96px, 12vh, 144px);
    background:
      radial-gradient(circle at 14% 18%, rgba(255, 255, 255, 0.025), transparent 28%),
      var(--mv-background);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 28px;
    position: relative;
    z-index: 2;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  :global(.hero .mv-two-beat) {
    font-size: clamp(3rem, 7.4vw, 7rem);
    max-width: 13ch;
    margin: 0;
  }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.6vw, 1.375rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.72);
    max-width: 56ch;
    margin: 0;
  }
  .lead strong {
    color: var(--mv-ivory);
    font-weight: 400;
  }

  .ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .chips {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .lab-address { color: var(--mv-primary); }

  .editorial-rail {
    display: none;
    position: absolute;
    right: 5%;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    padding-left: 22px;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    font: 500 9px/1.2 var(--font-mono);
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--mv-muted-foreground);
  }
  .editorial-rail span { display: block; margin-block: 12px; }

  @media (min-width: 1180px) {
    .stack { padding-right: 230px; }
    .editorial-rail { display: block; }
  }

  .horizon {
    position: absolute;
    left: 50%;
    bottom: -54%;
    width: 150%;
    height: 88%;
    transform: translateX(-50%);
    background: radial-gradient(
      ellipse 50% 50% at 50% 50%,
      rgba(189, 235, 52, 0.30) 0%,
      rgba(189, 235, 52, 0.21) 16%,
      rgba(189, 235, 52, 0.125) 32%,
      rgba(189, 235, 52, 0.065) 48%,
      rgba(189, 235, 52, 0.029) 64%,
      rgba(189, 235, 52, 0.010) 80%,
      transparent 100%
    );
    filter: blur(64px);
    mask-image: linear-gradient(to bottom, black 0%, black 22%, transparent 88%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 22%, transparent 88%);
    z-index: 1;
    pointer-events: none;
  }

  .horizon-line {
    position: absolute;
    left: 50%;
    bottom: 10%;
    z-index: 2;
    width: min(760px, 86%);
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, rgba(189, 235, 52, 0.55), transparent);
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(189, 235, 52, 0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(189, 235, 52, 0.025) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 30%, transparent 75%);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    .hero { min-height: auto; }
    .stack { gap: 24px; }
    .ctas { width: 100%; }
    .chips { gap: 18px; }
  }
</style>
