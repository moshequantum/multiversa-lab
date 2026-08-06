<script lang="ts">
  import '$lib/styles/multiversa-tokens.css';
  import '$lib/styles/global.css';
  // KB support chatbot widget — scaffold, additive only.
  // PUBLIC_KB_CHAT_ENDPOINT is unset by default, so this is a no-op
  // until a human deploys multiversa-kb-chatbot and sets the env var.
  import { env } from '$env/dynamic/public';
  let { children } = $props();

  function trustedKbEndpoint(value: string | undefined): string | null {
    if (!value) return null;
    try {
      const url = new URL(value);
      return url.origin === 'https://cerebro.multiversa.group' ? url.origin : null;
    } catch {
      return null;
    }
  }

  const kbEndpoint = trustedKbEndpoint(env.PUBLIC_KB_CHAT_ENDPOINT);
</script>

<svelte:head>
  <link rel="canonical" href="https://lab.multiversa.group/" />
  <meta name="robots" content="index, follow" />
  {#if kbEndpoint}
    <script type="module" src={`${kbEndpoint}/widget.js`}></script>
  {/if}
</svelte:head>

<a class="skip-link" href="#contenido">Saltar al contenido</a>
{@render children()}

{#if kbEndpoint}
  <mv-kb-chat site="lab"></mv-kb-chat>
{/if}

<style>
  .skip-link {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1000;
    transform: translateY(-160%);
    border-radius: 999px;
    background: var(--mv-primary);
    color: #050505;
    padding: 12px 18px;
    font: 700 0.9rem/1 var(--font-sans);
    transition: transform 180ms ease;
  }
  .skip-link:focus { transform: translateY(0); }
</style>
