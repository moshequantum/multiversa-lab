<script lang="ts">
	import { onMount } from 'svelte';

	let bar: HTMLSpanElement;

	onMount(() => {
		let frame = 0;
		const render = () => {
			frame = 0;
			const distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			const progress = Math.min(1, Math.max(0, window.scrollY / distance));
			bar.style.transform = `scaleX(${progress})`;
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(render);
		};

		render();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	});
</script>

<div class="scroll-progress" aria-hidden="true"><span bind:this={bar}></span></div>

<style>
	.scroll-progress {
		position: fixed;
		inset: 0 0 auto;
		z-index: 80;
		height: 2px;
		pointer-events: none;
		background: color-mix(in srgb, var(--mv-ivory) 4%, transparent);
	}
	.scroll-progress span {
		display: block;
		width: 100%;
		height: 100%;
		transform: scaleX(0);
		transform-origin: left center;
		background: linear-gradient(
			to right,
			color-mix(in srgb, var(--mv-primary) 44%, transparent),
			var(--mv-primary)
		);
		box-shadow: 0 0 14px color-mix(in srgb, var(--mv-primary) 46%, transparent);
	}
	@media (prefers-reduced-motion: reduce) {
		.scroll-progress { display: none; }
	}
</style>
