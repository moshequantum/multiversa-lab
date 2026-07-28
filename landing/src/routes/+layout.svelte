<script lang="ts">
  import '$lib/styles/multiversa-tokens.css';
  import '$lib/styles/global.css';
  // KB support chatbot widget — scaffold, additive only.
  // PUBLIC_KB_CHAT_ENDPOINT is unset by default, so this is a no-op
  // until a human deploys multiversa-kb-chatbot and sets the env var.
  import { env } from '$env/dynamic/public';
  let { children } = $props();
</script>

<svelte:head>
  {#if env.PUBLIC_KB_CHAT_ENDPOINT}
    <script type="module" src={`${env.PUBLIC_KB_CHAT_ENDPOINT}/widget.js`}></script>
  {/if}
</svelte:head>

{@render children()}

{#if env.PUBLIC_KB_CHAT_ENDPOINT}
  <mv-kb-chat site="lab"></mv-kb-chat>
{/if}
