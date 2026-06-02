<script lang="ts">
  // Hero — canonical copy from DNA Brand slide 35 (MultiversaLab banner)
</script>

<section class="hero">
  <div class="site stack">

    <div class="meta">
      <span class="mv-pill">Open · Live</span>
      <span class="mv-label-muted">Cap III · Arquitectura · 02 / 04</span>
    </div>

    <h1 class="mv-two-beat">
      El código abierto
      <em>de Multiversa.</em>
    </h1>

    <p class="lead">
      Herramientas, skills y MCPs para crear software responsable.
      <strong>Auditable. Documentado. Compartido.</strong>
    </p>

    <div class="ctas">
      <a class="mv-btn mv-btn-primary"
         href="https://github.com/moshequantum/multiversalab"
         target="_blank" rel="noopener">
        ⤴ &nbsp; Star on GitHub
      </a>
      <a class="mv-btn mv-btn-ghost" href="#manifiesto">
        Leer el manifesto ↓
      </a>
    </div>

    <div class="chips">
      <span class="mv-label-muted">Engram</span>
      <span class="mv-label-muted">Graphify</span>
      <span class="mv-label-muted">MiroFish</span>
      <span class="mv-label-muted">GentleAI</span>
      <span class="mv-label-muted">GentlePI</span>
      <span class="mv-label-muted">InsForge</span>
      <span class="mv-label-muted" style="color: var(--mv-primary);">lab.multiversa.group →</span>
    </div>
  </div>

  <!-- aurora layer (chartreuse drift) -->
  <div class="aurora" aria-hidden="true"></div>
  <div class="grid-pattern" aria-hidden="true"></div>
</section>

<style>
  .hero {
    min-height: 88vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: clamp(80px, 12vh, 140px);
    padding-bottom: clamp(80px, 12vh, 140px);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 36px;
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
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    max-width: 18ch;
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

  /* aurora chartreuse drift inspired by the DNA Brand deck */
  @keyframes aurora-drift {
    0%   { transform: translate3d(-6%, -4%, 0) scale(1);    opacity: 0.6; }
    50%  { transform: translate3d( 6%,  3%, 0) scale(1.12); opacity: 0.85; }
    100% { transform: translate3d(-6%, -4%, 0) scale(1);    opacity: 0.6; }
  }
  .aurora {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 40% 55% at 15% 110%, rgba(189, 235, 52, 0.22), transparent 65%),
      radial-gradient(ellipse 42% 50% at 100% -10%, rgba(189, 235, 52, 0.10), transparent 70%);
    filter: blur(60px);
    animation: aurora-drift 28s ease-in-out infinite;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
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
    z-index: 1;
    pointer-events: none;
  }
</style>
