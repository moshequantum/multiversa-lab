<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} · Multiversa Lab</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main id="contenido" class="error-page">
  <div class="error-card mv-liquid-glass-pro">
    <span class="mv-label">Error {page.status}</span>
    <h1>Este camino no está disponible.</h1>
    <p>{page.error?.message ?? 'No pudimos completar la solicitud.'}</p>
    {#if page.error && 'incidentId' in page.error}
      <p class="incident">Incidente: {String(page.error.incidentId)}</p>
    {/if}
    <a class="mv-btn mv-btn-primary" href="/">Volver al Lab</a>
  </div>
</main>

<style>
  .error-page {
    min-height: 100svh;
    display: grid;
    place-items: center;
    padding: max(20px, 5%);
  }
  .error-card {
    width: min(680px, 100%);
    border-radius: var(--radius-glass-lg);
    padding: clamp(32px, 7vw, 72px);
  }
  h1 {
    margin: 22px 0;
    font-size: clamp(2.4rem, 7vw, 5rem);
  }
  p { max-width: 52ch; color: rgba(250, 252, 232, 0.7); }
  .incident { font: 0.72rem/1.5 var(--font-mono); color: var(--mv-muted-foreground); }
  a { margin-top: 20px; }
</style>
