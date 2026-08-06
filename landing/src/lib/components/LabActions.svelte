<section class="actions" aria-labelledby="acciones-titulo">
  <div class="site">
    <div class="panel mv-card">
      <div class="copy">
        <span class="mv-label">Acceso abierto</span>
        <h2 id="acciones-titulo">Empieza por lo que <em>puedes revisar.</em></h2>
        <p>
          Descarga o prueba Multiversa CLI, revisa la documentación y sigue la bitácora.
          No necesitas dejar tus datos para conocer cómo funciona el Lab.
        </p>
      </div>

      <div class="links" aria-label="Siguientes pasos">
        <a class="mv-btn mv-btn-primary" href="/install.sh">Descargar instalador ↓</a>
        <a class="mv-btn mv-btn-ghost" href="https://github.com/moshequantum/multiversa-lab/tree/main/docs" target="_blank" rel="noopener">Ver documentación ↗</a>
        <a class="text-link" href="/bitacora">Seguir la bitácora →</a>
      </div>
    </div>
  </div>
</section>

<style>
  .actions { padding-top: 32px; padding-bottom: var(--section-y); }
  .panel {
    display: grid;
    align-items: center;
    gap: 32px;
    padding: clamp(28px, 5vw, 56px);
    border-color: rgba(189, 235, 52, 0.18);
    background: linear-gradient(125deg, rgba(189, 235, 52, 0.075), rgba(255, 255, 255, 0.025) 42%, rgba(255, 255, 255, 0.018));
  }
  @media (min-width: 960px) { .panel { grid-template-columns: minmax(0, 1.1fr) auto; } }
  .copy { display: grid; gap: 16px; max-width: 62ch; }
  h2 { margin: 0; font: 400 clamp(2rem, 4vw, 3.25rem)/0.98 var(--font-serif); letter-spacing: -0.04em; color: var(--mv-ivory); }
  h2 em { font-style: italic; font-weight: 300; color: var(--mv-primary); }
  p { margin: 0; color: rgba(250, 252, 232, 0.7); font: 300 clamp(1rem, 1.3vw, 1.125rem)/1.6 var(--font-sans); }
  .links { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .text-link { width: 100%; color: var(--mv-primary); font: 500 0.75rem/1.4 var(--font-mono); letter-spacing: 0.15em; text-transform: uppercase; text-align: center; }
  .text-link:hover { color: var(--mv-ivory); }
  @media (max-width: 640px) { .links { display: grid; } }
</style>
