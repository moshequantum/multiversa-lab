<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Ethos from '$lib/components/Ethos.svelte';
  import Pillars from '$lib/components/Pillars.svelte';
  import Attribution from '$lib/components/Attribution.svelte';
  import StatusBoard from '$lib/components/StatusBoard.svelte';
  import PhilosophySplit from '$lib/components/PhilosophySplit.svelte';
  import WaitlistForm from '$lib/components/WaitlistForm.svelte';
  import FooterSignature from '$lib/components/FooterSignature.svelte';
</script>

<svelte:head>
  <title>Multiversa Lab · Construye cerebros de trabajo</title>
  <meta
    name="description"
    content="El laboratorio open-source de Multiversa. Engram, Graphify, GentleAI, GentlePI, MiroFish e InsForge — herramientas, skills y MCPs para construir cerebros de trabajo con memoria, identidad y criterio."
  />
</svelte:head>

<Nav />
<main>
  <Hero />
  <Ethos />
  <Pillars />
  <Attribution />
  <StatusBoard />
  <PhilosophySplit />
  <WaitlistForm />
</main>
<FooterSignature />

<style>
  main { display: block; }
</style>
