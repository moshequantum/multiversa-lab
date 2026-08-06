<script lang="ts">
  import BrandLockup from './BrandLockup.svelte';

  // Multiversa signature footer — brand texture, not product architecture.
</script>

<footer class="footer">
  <div class="site stack-lg">

    <BrandLockup size="footer" />

    <p class="line">
      <em>Diseñado y construido por Moisés Vera. Abierto a los curiosos.</em>
    </p>

    <div class="rule"></div>

    <div class="links">
      <a href="https://github.com/moshequantum/multiversa-lab" target="_blank" rel="noopener">GitHub</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversa-lab/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversa-lab/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener">Code of Conduct</a>
      <span class="sep">·</span>
      <a href="mailto:hola@multiversa.group">hola@multiversa.group</a>
    </div>

    <div class="meta">
      <span class="mv-label-muted">© 2026 Multiversa Lab</span>
      <span class="mv-label-muted">Open source · MIT</span>
      <span class="mv-label-muted">lab.multiversa.group</span>
    </div>

  </div>
</footer>

<style>
  .footer {
    background: var(--mv-footer);
    padding: clamp(80px, 12vw, 140px) 0 64px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .stack-lg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
  }

  .line {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    color: rgba(250, 252, 232, 0.5);
    margin: 0;
  }

  .rule {
    width: 80px; height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  .links {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(250, 252, 232, 0.55);
  }
  .links a:hover { color: var(--mv-primary); }
  .sep { color: rgba(250, 252, 232, 0.25); }

  .meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
  }
</style>
