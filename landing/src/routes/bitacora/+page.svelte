<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import FooterSignature from '$lib/components/FooterSignature.svelte';
	import { entries, tagLabel } from '$lib/bitacora';

	// Más reciente primero; a igual fecha, respeta el orden del arreglo.
	const feed = [...entries].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

</script>

<svelte:head>
	<title>Bitácora · Multiversa Lab en público</title>
	<meta
		name="description"
		content="El registro público de Multiversa Lab: CLI, Cerebro, decisiones técnicas y aprendizajes. Con límites claros para los datos privados."
	/>
</svelte:head>

<Nav />

<main id="contenido" tabindex="-1">
	<section class="intro">
		<div class="site">
			<div class="mv-chrome-top">
				<span class="mv-label">Bitácora · Construir en público</span>
				<span class="mv-label-muted">en vivo</span>
			</div>
			<h1 class="mv-two-beat">
				Un sistema que se explica
				<em>sin exponer lo que debe quedar privado.</em>
			</h1>
			<p class="lead">
				Multiversa real lleva tres meses en construcción y ya es funcional. Lo previo es legado:
				sirve para entender el origen, no para vender una versión incompleta. Esta serie reúne origen,
				trayectoria y hoja de ruta pública con límites explícitos de privacidad.
			</p>
		</div>
	</section>

	<section class="feed">
		<div class="site">
			{#if feed.length === 0}
				<p class="empty">Las próximas entradas se publicarán cuando tengan evidencia y contexto suficiente.</p>
			{:else}
				<ol class="timeline">
					{#each feed as e (e.slug)}
						<li class="entry" id={e.slug}>
							<div class="marker" aria-hidden="true"></div>
							<article class="mv-card body">
								<header class="head">
									<span class="day">{e.series}</span>
									<span class="tag tag-{e.tag}">{tagLabel(e.tag)}</span>
								</header>

								<h2 class="title">{e.title}</h2>

								{#each e.body as p}
									<p class="para">{p}</p>
								{/each}

								{#if e.video}
									<div class="video">
										<iframe
											src={e.video}
											title={e.title}
											loading="lazy"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen
										></iframe>
									</div>
								{/if}

								{#if e.link}
									<a class="proof" href={e.link.href} target="_blank" rel="noopener">
										{e.link.label}
										<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10" /></svg>
									</a>
								{/if}
							</article>
						</li>
					{/each}
				</ol>
			{/if}
		</div>
	</section>
</main>

<FooterSignature />

<style>
	main { display: block; }

	.intro { padding-top: 96px; padding-bottom: 24px; }
	:global(.intro .mv-two-beat) {
		font-size: clamp(2rem, 4.5vw, 3.5rem);
		max-width: 18ch;
		margin: 0;
	}
	.lead {
		font-family: var(--font-sans);
		font-weight: 300;
		font-size: clamp(1rem, 1.4vw, 1.2rem);
		line-height: 1.55;
		color: rgba(250, 252, 232, 0.6);
		max-width: 62ch;
		margin: 24px 0 0;
	}

	.feed { padding-top: 48px; padding-bottom: 96px; }

	.empty {
		font-family: var(--font-serif);
		font-style: italic;
		color: rgba(250, 252, 232, 0.5);
		font-size: 1.25rem;
	}

	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
	}
	/* Línea vertical del timeline */
	.timeline::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 8px;
		bottom: 8px;
		width: 1px;
		background: linear-gradient(
			to bottom,
			rgba(189, 235, 52, 0.35),
			rgba(255, 255, 255, 0.06) 30%,
			rgba(255, 255, 255, 0.04)
		);
	}

	.entry {
		position: relative;
		padding-left: 32px;
		margin-bottom: 28px;
	}
	.marker {
		position: absolute;
		left: 0;
		top: 30px;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--mv-primary);
		box-shadow: 0 0 0 4px rgba(189, 235, 52, 0.12);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 28px 30px;
	}

	.head {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}
	.day { color: var(--mv-primary); }
	.sep { color: rgba(250, 252, 232, 0.25); }
	.tag {
		margin-left: auto;
		padding: 3px 10px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(250, 252, 232, 0.6);
		letter-spacing: 0.18em;
	}
	.tag-sistema { border-color: rgba(189, 235, 52, 0.3); color: var(--mv-primary); }
	.tag-producto { border-color: rgba(255, 159, 90, 0.3); color: var(--mv-orange); }

	.title {
		margin: 0;
		font-family: var(--font-serif);
		font-weight: 400;
		font-size: clamp(1.5rem, 2.6vw, 2.125rem);
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--mv-ivory);
	}

	.para {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 300;
		font-size: clamp(1rem, 1.3vw, 1.1rem);
		line-height: 1.6;
		color: rgba(250, 252, 232, 0.74);
		max-width: 64ch;
	}

	.video {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		margin-top: 4px;
	}
	.video iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.proof {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 4px;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		color: var(--mv-primary);
		transition: opacity 180ms ease;
	}
	.proof:hover { opacity: 0.7; }
</style>
