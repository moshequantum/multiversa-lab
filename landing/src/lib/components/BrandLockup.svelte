<script lang="ts">
  let {
    size = 'nav',
    class: className = ''
  }: {
    size?: 'nav' | 'footer';
    class?: string;
  } = $props();
</script>

<span class="brand-lockup {size === 'footer' ? 'is-footer' : ''} {className}">
  <img
    src="/assets/multiversa-wordmark-light.svg"
    alt="Multiversa"
    class="wordmark"
  />
  <span class="suffix">Lab</span>
</span>

<style>
  .brand-lockup {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    line-height: 1;
  }

  .wordmark {
    display: block;
    width: auto;
    height: 26px;
  }

  .suffix {
    border-left: 1px solid rgba(189, 235, 52, 0.3);
    padding-left: 8px;
    color: var(--mv-primary);
    font: 500 11px/1 var(--font-mono);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .is-footer .wordmark {
    height: clamp(28px, 4vw, 36px);
  }

  .is-footer .suffix {
    font-size: clamp(10px, 1vw, 12px);
  }

  @media (max-width: 420px) {
    .brand-lockup:not(.is-footer) .suffix { display: none; }
  }
</style>
