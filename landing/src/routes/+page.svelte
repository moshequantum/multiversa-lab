<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';
  import ScrollProgress from '$lib/components/ScrollProgress.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Ethos from '$lib/components/Ethos.svelte';
  import Pillars from '$lib/components/Pillars.svelte';
  import Attribution from '$lib/components/Attribution.svelte';
  import MobileCompanion from '$lib/components/MobileCompanion.svelte';
  import StatusBoard from '$lib/components/StatusBoard.svelte';
  import PhilosophySplit from '$lib/components/PhilosophySplit.svelte';
  import BitacoraTeaser from '$lib/components/BitacoraTeaser.svelte';
  import LabActions from '$lib/components/LabActions.svelte';
  import FooterSignature from '$lib/components/FooterSignature.svelte';

  let main: HTMLElement;

  onMount(() => {
    let cleanup: (() => void) | undefined;
    let disposed = false;
    let started = false;
    const signals: (keyof WindowEventMap)[] = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'];
    const removeSignals = () => signals.forEach((signal) => window.removeEventListener(signal, start));
    const start = () => {
      if (started || disposed) return;
      started = true;
      removeSignals();
      void import('$lib/motion').then(({ initLabMotion }) => {
        if (!disposed && main) cleanup = initLabMotion(main);
      });
    };
    signals.forEach((signal) => window.addEventListener(signal, start, { passive: true }));
    return () => {
      disposed = true;
      removeSignals();
      cleanup?.();
    };
  });
</script>

<svelte:head>
  <title>Multiversa Lab · El código abierto de Multiversa</title>
  <meta
    name="description"
    content="Multiversa Lab publica Multiversa CLI y Cerebro: código abierto para configurar Sistemas Operativos de Proyecto con memoria, conocimiento y proveedores aislados."
  />
</svelte:head>

<ScrollProgress />
<Nav />
<main id="contenido" tabindex="-1" bind:this={main}>
  <Hero />
  <Ethos />
  <Pillars />
  <Attribution />
  <MobileCompanion />
  <StatusBoard />
  <PhilosophySplit />
  <BitacoraTeaser />
  <LabActions />
</main>
<FooterSignature />

<style>
  main { display: block; }
</style>
