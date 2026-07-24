<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Ethos from '$lib/components/Ethos.svelte';
  import Pillars from '$lib/components/Pillars.svelte';
  import Attribution from '$lib/components/Attribution.svelte';
  import StatusBoard from '$lib/components/StatusBoard.svelte';
  import PhilosophySplit from '$lib/components/PhilosophySplit.svelte';
  import BitacoraTeaser from '$lib/components/BitacoraTeaser.svelte';
  import WaitlistForm from '$lib/components/WaitlistForm.svelte';
  import FooterSignature from '$lib/components/FooterSignature.svelte';

  let main: HTMLElement;

  onMount(() => {
    let cleanup: (() => void) | undefined;
    // GSAP solo en cliente; el contenido ya es visible sin JS.
    import('$lib/motion').then(({ initLabMotion }) => {
      if (main) cleanup = initLabMotion(main);
    });
    return () => cleanup?.();
  });
</script>

<svelte:head>
  <title>Multiversa Lab · El código abierto de Multiversa</title>
  <meta
    name="description"
    content="El laboratorio open-source de Multiversa. Engram, Graphify, GentleAI, GentlePI, MiroFish e InsForge — herramientas, skills y MCPs para construir cerebros de trabajo con memoria, identidad y criterio."
  />
</svelte:head>

<Nav />
<main bind:this={main}>
  <Hero />
  <Ethos />
  <Pillars />
  <Attribution />
  <StatusBoard />
  <PhilosophySplit />
  <BitacoraTeaser />
  <WaitlistForm />
</main>
<FooterSignature />

<style>
  main { display: block; }
</style>
