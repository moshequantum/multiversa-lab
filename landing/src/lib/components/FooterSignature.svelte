<script lang="ts">
  // Multiversa signature footer — brand texture, not product architecture.
</script>

<footer class="footer">
  <div class="site stack-lg">

    <div class="brand-group">
      <img
        src="/assets/multiversa-wordmark-light.svg"
        alt="Multiversa"
        class="wordmark-img"
      />
      <span class="lab-suffix">Lab</span>
    </div>

    <p class="line">
      <em>Architected by Moshe. Open to the curious.</em>
    </p>

    <div class="rule"></div>

    <div class="links">
      <a href="https://github.com/moshequantum/multiversalab" target="_blank" rel="noopener">GitHub</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversalab/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversalab/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener">Code of Conduct</a>
      <span class="sep">·</span>
      <a href="mailto:soymoisesweb@gmail.com">soymoisesweb@gmail.com</a>
    </div>

    <div class="meta">
      <span class="mv-label-muted">© 2026 Multiversa Group LLC</span>
      <span class="mv-label-muted">v 0.4 · open-source · MIT</span>
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

  .brand-group {
    display: inline-flex;
    align-items: baseline;
    gap: 12px;
    justify-content: center;
  }

  .wordmark-img {
    height: clamp(40px, 7vw, 80px);
    width: auto;
    display: block;
    opacity: 0.95;
  }

  .lab-suffix {
    font-family: var(--font-mono);
    font-size: clamp(11px, 1.2vw, 14px);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--mv-primary);
    padding-left: 12px;
    border-left: 1px solid rgba(189, 235, 52, 0.3);
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
