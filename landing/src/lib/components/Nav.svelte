<script lang="ts">
  // chrome-top style mini-nav inspired by the DNA Brand deck
  // Logo: new italic "multiversa" wordmark + "Lab" mono suffix (chartreuse)
</script>

<header class="nav">
  <div class="site row">
    <a href="/" class="left" aria-label="Multiversa Lab — inicio">
      <img
        src="/assets/multiversa-wordmark-light.svg"
        alt="Multiversa"
        height="28"
        class="wordmark"
      />
      <span class="lab-suffix">Lab</span>
    </a>
    <div class="right">
      <a class="nav-link" href="/#manifiesto">Manifiesto</a>
      <a class="nav-link" href="/#arquitectura">Pilares</a>
      <a class="nav-link" href="/#estado">Estado</a>
      <a class="nav-link" href="/bitacora">Bitácora</a>
      <a class="nav-link nav-link-accent" href="https://github.com/moshequantum/multiversa-lab" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>
</header>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(10, 10, 15, 0.78);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .nav-link {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: rgba(250, 252, 232, 0.62);
    transition: color 180ms ease;
  }
  .nav-link:hover { color: var(--mv-primary); }
  .nav-link-accent { color: var(--mv-primary); }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .left {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    text-decoration: none;
    transition: opacity 200ms ease;
  }
  .left:hover { opacity: 0.85; }

  .wordmark {
    height: 22px;
    width: auto;
    display: block;
    transform: translateY(2px);
  }
  @media (min-width: 768px) {
    .wordmark { height: 26px; }
  }

  .lab-suffix {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--mv-primary);
    padding-left: 4px;
    border-left: 1px solid rgba(189, 235, 52, 0.3);
  }

  @media (max-width: 640px) {
    .right { display: none; }
  }
</style>
