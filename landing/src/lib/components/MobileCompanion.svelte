<script lang="ts">
  import { onMount } from 'svelte';

  type InstallPrompt = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  };

  let installPrompt: InstallPrompt | null = null;
  let isInstalled = false;
  let isIos = false;
  let showIosHelp = false;

  onMount(() => {
    isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const capturePrompt = (event: Event) => {
      event.preventDefault();
      installPrompt = event as InstallPrompt;
    };
    const markInstalled = () => {
      isInstalled = true;
      installPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', capturePrompt);
    window.addEventListener('appinstalled', markInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', capturePrompt);
      window.removeEventListener('appinstalled', markInstalled);
    };
  });

  async function install() {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      return;
    }
    if (isIos) showIosHelp = true;
  }
</script>

<section id="movil" class="mobile">
  <div class="site">
    <div class="mv-chrome-top">
      <span class="mv-label">Cap III · Companion</span>
      <span class="mv-label-muted">móvil · humano al mando</span>
    </div>

    <div class="layout">
      <div>
        <h2 class="mv-two-beat">Tu sistema contigo, <em>sin fingir que el teléfono es el servidor.</em></h2>
        <p class="lead">
          Instala esta superficie para consultar contexto, conversar con tu agente y, progresivamente,
          aprobar misiones. El runtime privado seguirá en tu equipo o en un nodo administrado y se conectará
          mediante emparejamiento explícito.
        </p>

        {#if isInstalled}
          <span class="installed">✓ Lab Companion está instalado</span>
        {:else}
          <button class="mv-btn mv-btn-primary" type="button" onclick={install}>
            Instalar en este dispositivo
          </button>
          {#if isIos && !installPrompt}
            <button class="ios-link" type="button" onclick={() => (showIosHelp = !showIosHelp)}>
              Ver instrucciones para iPhone
            </button>
          {/if}
        {/if}

        {#if showIosHelp}
          <p class="ios-help">En Safari: Compartir → Añadir a pantalla de inicio → Abrir como app web.</p>
        {/if}
      </div>

      <div class="channels">
        <article class="mv-card">
          <span class="mv-label">PWA · superficie principal</span>
          <h3>Perfil, memoria y decisiones.</h3>
          <p>Una interfaz instalable para revisar objetivos, contexto, misiones y aprobaciones. No ejecuta por sí sola los procesos locales.</p>
        </article>
        <article class="mv-card">
          <span class="mv-label">Telegram · canal opcional</span>
          <h3>Captura, aviso y aprobación.</h3>
          <p>Mensajes rápidos y notificaciones conectados al mismo perfil. Telegram no será la memoria ni la fuente de verdad.</p>
        </article>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.mobile .mv-two-beat) { font-size: clamp(2rem, 4.5vw, 3.5rem); max-width: 21ch; margin: 0; }
  .layout { display: grid; gap: 32px; align-items: start; }
  @media (min-width: 900px) { .layout { grid-template-columns: 1.05fr 0.95fr; gap: 48px; } }
  .lead { max-width: 58ch; margin: 24px 0 28px; color: rgba(250,252,232,.68); font: 300 1.05rem/1.65 var(--font-sans); }
  .channels { display: grid; gap: 18px; }
  .channels h3 { color: var(--mv-ivory); font: 400 1.5rem/1.15 var(--font-serif); margin: 18px 0 10px; }
  .channels p { color: rgba(250,252,232,.58); font: 300 .95rem/1.6 var(--font-sans); margin: 0; }
  button { font-family: inherit; }
  .ios-link { display: block; margin-top: 14px; padding: 0; border: 0; background: transparent; color: var(--mv-primary); cursor: pointer; font: 400 .8rem/1.4 var(--font-mono); }
  .ios-help, .installed { display: block; margin-top: 16px; color: rgba(250,252,232,.75); font: 400 .85rem/1.5 var(--font-mono); }
  .installed { color: var(--mv-primary); }
</style>
