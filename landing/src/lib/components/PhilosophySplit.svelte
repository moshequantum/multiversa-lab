<script lang="ts">
  // Lab vs Group — separación canónica del DNA Brand Cap III · Arquitectura
</script>

<section id="filosofia" class="split">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap V · Filosofía</span>
      <span class="mv-label-muted">05 / 05</span>
    </div>

    <h2 class="mv-two-beat">
      Código abierto y criterio aplicado,
      <em>sin dependencia obligatoria.</em>
    </h2>

    <p class="lead">
      El Lab publica el código, los contratos y la hoja de ruta. Multiversa.Group
      aplica criterio, diagnóstico y experiencia en proyectos reales. Puedes usar,
      estudiar o integrar el Lab sin contratar a Group ni compartir tus datos.
    </p>

    <div class="grid">

      <article class="mv-card body lab">
        <header>
          <span class="mv-pill">Estás aquí</span>
          <span class="mv-label-muted">lab.multiversa.group</span>
        </header>
        <h3 class="body-title">
          Multiversa <em>Lab.</em>
        </h3>
        <p class="body-lead">
          El laboratorio de código abierto. Aquí viven el Pack, la CLI, el MCP,
          los receipts, la documentación y las pruebas que puedes auditar.
        </p>
        <ul class="bullets">
          <li>Código abierto · MIT</li>
          <li>Roadmap, contratos y fallos conocidos visibles</li>
          <li>Integrable sin comprar una licencia ni contratar consultoría</li>
          <li>Contexto portable; secretos siempre fuera del Pack</li>
        </ul>
      </article>

      <article class="mv-card body group">
        <header>
          <span class="mv-label-muted">Criterio aplicado</span>
          <span class="mv-label-muted">servicio opcional</span>
        </header>
        <h3 class="body-title body-title-muted">
          Multiversa <em>Group.</em>
        </h3>
        <p class="body-lead">
          La consultoría que diseña y aplica soluciones con IA en contextos reales.
          Quien contrata paga por diagnóstico, diseño, implementación y acompañamiento;
          nunca por permiso para usar el Lab.
        </p>
        <ul class="bullets bullets-muted">
          <li>Criterio y experiencia aplicada</li>
          <li>Datos y contratos privados por diseño</li>
          <li>Sin lock-in hacia una plataforma o modelo</li>
          <li>Lo aprendido vuelve al Lab solo de forma general y segura</li>
        </ul>
      </article>

    </div>

    <p class="closing">
      <em>El código se abre. El criterio se demuestra aplicándolo.</em>
    </p>

  </div>
</section>

<style>
  :global(.split .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 22ch;
    margin: 0;
  }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.6);
    max-width: 60ch;
    margin: 24px 0 56px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: stretch;
  }
  @media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }

  .body { display: flex; flex-direction: column; gap: 18px; height: 100%; padding: clamp(28px, 4vw, 40px); }

  .body.lab    { border-color: rgba(189, 235, 52, 0.22); background: rgba(189, 235, 52, 0.02); }
  .body.group  { opacity: 0.78; }

  .body header {
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px; flex-wrap: wrap;
  }

  .body-title {
    margin: 0;
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.03em;
    line-height: 0.95;
    color: var(--mv-ivory);
  }
  .body-title em {
    font-style: italic; font-weight: 300; color: var(--mv-primary);
  }
  .body-title-muted em { color: rgba(250, 252, 232, 0.55); }

  .body-lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.125rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.72);
    margin: 0;
  }

  .bullets {
    list-style: none; padding: 0;
    margin: 8px 0 0;
    display: flex; flex-direction: column; gap: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 18px;
    margin-top: auto;
  }
  .bullets li {
    display: flex; align-items: baseline; gap: 12px;
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(250, 252, 232, 0.78);
  }
  .bullets li::before {
    content: '';
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--mv-primary);
    flex-shrink: 0; transform: translateY(-2px);
  }
  .bullets-muted li { color: rgba(250, 252, 232, 0.55); }
  .bullets-muted li::before { background: rgba(250, 252, 232, 0.35); }

  .closing {
    margin-top: 56px;
    text-align: center;
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--mv-primary);
    opacity: 0.85;
    font-size: clamp(1.25rem, 2.4vw, 2rem);
  }
</style>
