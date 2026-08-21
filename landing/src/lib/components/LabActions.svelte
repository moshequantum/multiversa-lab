<script lang="ts">
  const installCommand =
    'curl -sSL https://raw.githubusercontent.com/moshequantum/multiversa-cli/main/installers/shell-curl/install.sh | sh';

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(installCommand);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 2000);
    } catch {
      copied = false;
    }
  }
</script>

<section class="actions" aria-labelledby="acciones-titulo">
  <div class="site">
    <div class="panel mv-card">
      <div class="intro">
        <span class="mv-label">Acceso abierto · sin registro</span>
        <h2 id="acciones-titulo">Lee, cuestiona, <em>integra.</em></h2>
        <p>
          No necesitas pagar ni dejar tus datos para estudiar el sistema. Revisa
          el roadmap, abre una contradicción o construye un adaptador. La crítica
          técnica también es una forma de contribuir.
        </p>
      </div>

      <div class="install" aria-label="Instalar Multiversa CLI">
        <span class="install-label">Ruta experimental · macOS y Linux</span>
        <p class="preview-warning">
          Research Preview: el instalador y la CLI pueden cambiar. Lee el script,
          fija una versión y utiliza un entorno de prueba antes de tocar un equipo de producción.
        </p>
        <div class="cmd">
          <code>{installCommand}</code>
          <button
            type="button"
            class="cmd-copy"
            onclick={copyCommand}
            aria-label="Copiar el comando de instalación"
          >
            {copied ? 'Copiado ✓' : 'Copiar'}
          </button>
        </div>
        <p class="install-hint">
          Este comando es visible para permitir revisión temprana, no para declarar
          estabilidad. Detectar un host tampoco significa que su adaptador esté soportado.
        </p>
      </div>

      <div class="links" aria-label="Siguientes pasos">
        <a class="mv-btn mv-btn-primary" href="https://github.com/moshequantum/multiversa-lab/blob/main/ROADMAP.md" target="_blank" rel="noopener">Leer roadmap ↗</a>
        <a class="mv-btn mv-btn-ghost" href="https://github.com/moshequantum/multiversa-lab" target="_blank" rel="noopener">Revisar código ↗</a>
        <a class="text-link" href="https://github.com/moshequantum/multiversa-lab/issues/new" target="_blank" rel="noopener">Reportar un hallazgo ↗</a>
      </div>
    </div>
  </div>
</section>

<style>
  .actions { padding-top: 32px; padding-bottom: var(--section-y); }
  .panel {
    display: grid;
    gap: 28px;
    padding: clamp(28px, 5vw, 56px);
    border-color: rgba(189, 235, 52, 0.18);
    background: linear-gradient(125deg, rgba(189, 235, 52, 0.075), rgba(255, 255, 255, 0.025) 42%, rgba(255, 255, 255, 0.018));
  }
  .intro { display: grid; gap: 16px; max-width: 64ch; }
  h2 { margin: 0; font: 400 clamp(2rem, 4vw, 3.25rem)/0.98 var(--font-serif); letter-spacing: -0.04em; color: var(--mv-ivory); }
  h2 em { font-style: italic; font-weight: 300; color: var(--mv-primary); }
  p { margin: 0; color: rgba(250, 252, 232, 0.7); font: 300 clamp(1rem, 1.3vw, 1.125rem)/1.6 var(--font-sans); }

  .install { display: grid; gap: 12px; }
  .install-label { font: 500 0.7rem/1 var(--font-mono); letter-spacing: 0.18em; text-transform: uppercase; color: var(--mv-primary); }
  .preview-warning {
    max-width: 72ch;
    padding: 12px 14px;
    border-left: 2px solid var(--mv-orange);
    background: rgba(255, 159, 90, 0.045);
    color: rgba(250, 252, 232, 0.72);
    font-size: 0.9rem;
  }
  .cmd {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid rgba(189, 235, 52, 0.22);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.28);
  }
  .cmd code {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    white-space: nowrap;
    font: 400 0.82rem/1.5 var(--font-mono);
    color: var(--mv-ivory);
  }
  .cmd-copy {
    flex-shrink: 0;
    cursor: pointer;
    border: 1px solid rgba(189, 235, 52, 0.35);
    border-radius: 7px;
    background: transparent;
    padding: 6px 12px;
    font: 500 0.7rem/1 var(--font-mono);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mv-primary);
    transition: background 0.2s ease, color 0.2s ease;
  }
  .cmd-copy:hover { background: var(--mv-primary); color: #0b0b0b; }
  .install-hint { margin: 0; max-width: 68ch; color: rgba(250, 252, 232, 0.6); font: 300 0.9rem/1.55 var(--font-sans); }

  .links { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding-top: 4px; }
  .text-link { color: var(--mv-primary); font: 500 0.75rem/1.4 var(--font-mono); letter-spacing: 0.15em; text-transform: uppercase; }
  .text-link:hover { color: var(--mv-ivory); }
  @media (max-width: 640px) {
    .links { display: grid; }
    .cmd { flex-direction: column; align-items: stretch; }
    .cmd-copy { width: 100%; }
  }
</style>
