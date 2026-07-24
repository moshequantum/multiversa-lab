<script lang="ts">
	import { entries, dayNumber, tagLabel } from '$lib/bitacora';

	const latest = [...entries]
		.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
		.slice(0, 2);

	const fmt = (iso: string) =>
		new Date(iso + 'T00:00:00').toLocaleDateString('es', { day: 'numeric', month: 'long' });
</script>

<section id="bitacora" class="bitacora">
	<div class="site">
		<div class="mv-chrome-top">
			<span class="mv-label">Bitácora · Construir en público</span>
			<span class="mv-label-muted">en vivo</span>
		</div>

		<h2 class="mv-two-beat">
			Se construye
			<em>a la vista de todos.</em>
		</h2>

		<p class="lead">
			Un sistema en el que vas a confiar tu operación no debería pedirte fe.
			Este es el registro, sin maquillaje, de cómo se construye.
		</p>

		<div class="grid">
			{#each latest as e}
				<a class="mv-card entry" href={`/bitacora#${e.slug}`}>
					<header class="head">
						<span class="day">Día {dayNumber(e.date)}</span>
						<span class="sep" aria-hidden="true">·</span>
						<time datetime={e.date}>{fmt(e.date)}</time>
						<span class="tag tag-{e.tag}">{tagLabel(e.tag)}</span>
					</header>
					<h3 class="title">{e.title}</h3>
					<p class="excerpt">{e.body[0]}</p>
					<span class="more">Leer →</span>
				</a>
			{/each}
		</div>

		<a class="all" href="/bitacora">Ver la bitácora completa →</a>
	</div>
</section>

<style>
	.bitacora { padding-top: 64px; padding-bottom: 64px; }

	:global(.bitacora .mv-two-beat) {
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
		max-width: 58ch;
		margin: 24px 0 48px;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}
	@media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }

	.entry {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 28px 30px;
		text-decoration: none;
		transition: border-color 220ms ease, transform 220ms ease;
	}
	.entry:hover {
		border-color: rgba(189, 235, 52, 0.28);
		transform: translateY(-2px);
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
	.head time { color: rgba(250, 252, 232, 0.5); }
	.tag {
		margin-left: auto;
		padding: 3px 10px;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(250, 252, 232, 0.6);
		letter-spacing: 0.18em;
	}
	.tag-cliente { border-color: rgba(189, 235, 52, 0.3); color: var(--mv-primary); }
	.tag-producto { border-color: rgba(255, 159, 90, 0.3); color: var(--mv-orange); }

	.title {
		margin: 0;
		font-family: var(--font-serif);
		font-weight: 400;
		font-size: clamp(1.375rem, 2.2vw, 1.75rem);
		letter-spacing: -0.03em;
		line-height: 1.08;
		color: var(--mv-ivory);
	}

	.excerpt {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: 300;
		font-size: 0.98rem;
		line-height: 1.55;
		color: rgba(250, 252, 232, 0.66);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.more {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: var(--mv-primary);
		margin-top: 2px;
	}

	.all {
		display: inline-block;
		margin-top: 40px;
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: rgba(250, 252, 232, 0.62);
		transition: color 180ms ease;
	}
	.all:hover { color: var(--mv-primary); }
</style>
