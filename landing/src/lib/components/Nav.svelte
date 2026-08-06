<script lang="ts">
  import BrandLockup from './BrandLockup.svelte';

  let menuOpen = $state(false);
  let scrolled = $state(false);

  const links = [
    { href: '/#manifiesto', label: 'Manifiesto' },
    { href: '/#arquitectura', label: 'Pilares' },
    { href: '/#movil', label: 'Instalar' },
    { href: '/#estado', label: 'Estado' },
    { href: '/bitacora', label: 'Bitácora' }
  ];

  function handleScroll() {
    scrolled = window.scrollY > 36;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') menuOpen = false;
  }
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<header class:scrolled class="nav">
  <div class="site row">
    <a href="/" class="left" aria-label="Multiversa Lab — inicio">
      <BrandLockup />
    </a>
    <nav class="right" aria-label="Navegación principal">
      {#each links as link}
        <a class="nav-link" href={link.href}>{link.label}</a>
      {/each}
      <a class="nav-link nav-link-accent" href="https://github.com/moshequantum/multiversa-lab" target="_blank" rel="noopener">GitHub ↗</a>
    </nav>

    <button
      class="menu-toggle"
      type="button"
      aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
      aria-controls="menu-movil"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span></span><span></span>
    </button>
  </div>

  {#if menuOpen}
    <nav id="menu-movil" class="mobile-menu" aria-label="Navegación móvil">
      {#each links as link}
        <a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
      {/each}
      <a href="https://github.com/moshequantum/multiversa-lab" target="_blank" rel="noopener">GitHub ↗</a>
    </nav>
  {/if}
</header>

<style>
  .nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 50;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: background var(--duration-med) ease, border-color var(--duration-med) ease, backdrop-filter var(--duration-med) ease;
  }
  .nav.scrolled,
  .nav:has(.mobile-menu) {
    backdrop-filter: blur(25px) saturate(1.4);
    -webkit-backdrop-filter: blur(25px) saturate(1.4);
    background: rgba(5, 5, 5, 0.86);
    border-color: rgba(255, 255, 255, 0.06);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 22px;
  }
  .nav-link {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: rgba(250, 252, 232, 0.62);
    transition: color 180ms ease;
  }
  .nav-link:hover { color: var(--mv-primary); }
  .nav-link-accent { color: var(--mv-primary); }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 72px;
    transition: min-height var(--duration-med) ease;
  }
  .scrolled .row { min-height: 58px; }
  .left {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 200ms ease;
  }
  .left:hover { opacity: 0.85; }

  .menu-toggle {
    display: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    place-items: center;
    align-content: center;
    gap: 6px;
    color: var(--mv-ivory);
  }
  .menu-toggle span {
    display: block;
    width: 18px;
    height: 1px;
    background: currentColor;
    transition: transform var(--duration-fast) ease;
  }
  .menu-toggle[aria-expanded='true'] span:first-child { transform: translateY(3.5px) rotate(45deg); }
  .menu-toggle[aria-expanded='true'] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }

  .mobile-menu {
    display: grid;
    gap: 0;
    padding: 8px var(--site-gutter) 24px;
    background: rgba(5, 5, 5, 0.96);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }
  .mobile-menu a {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font: 500 11px/1 var(--font-mono);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(250, 252, 232, 0.75);
  }

  @media (max-width: 900px) {
    .right { display: none; }
    .menu-toggle { display: grid; }
  }

</style>
