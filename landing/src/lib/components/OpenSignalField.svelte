<script lang="ts">
	import { onMount } from 'svelte';
	import { labVisuals } from '$lib/visuals/manifest';
	import { createSeededRandom } from '$lib/visuals/seeded';

	type FieldPoint = {
		x: number;
		y: number;
		normalizedX: number;
		normalizedY: number;
		column: number;
		row: number;
		phase: number;
		size: number;
		safeTextFade: number;
		edgeFade: number;
		threshold: number;
	};

	const definition = labVisuals.openSignal;
	const bayer4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((value) => value / 16);

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	function smoothstep(edgeA: number, edgeB: number, value: number) {
		const normalized = Math.min(1, Math.max(0, (value - edgeA) / (edgeB - edgeA)));
		return normalized * normalized * (3 - 2 * normalized);
	}

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;
		const ctx: CanvasRenderingContext2D = context;
		const baseCanvas = document.createElement('canvas');
		const baseContext = baseCanvas.getContext('2d');
		if (!baseContext) return;
		const baseCtx: CanvasRenderingContext2D = baseContext;

		const styles = getComputedStyle(host);
		const chartreuse = styles.getPropertyValue('--mv-primary').trim();
		const ivory = styles.getPropertyValue('--mv-ivory').trim();
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const pointerTarget = { x: 0.77, y: 0.48 };
		const pointer = { x: 0.77, y: 0.48 };
		let points: FieldPoint[] = [];
		let activePoints: FieldPoint[] = [];
		let width = 1;
		let height = 1;
		let dpr = 1;
		let raf = 0;
		let running = false;
		let inViewport = true;
		let lastFrame = 0;
		let startTime = performance.now();

		function measureField(point: FieldPoint, seconds: number, pointerX: number, pointerY: number) {
			const dx = point.normalizedX - pointerX;
			const dy = point.normalizedY - pointerY;
			const pointerInfluence = Math.exp(-(dx * dx + dy * dy) * 24);
			const foldedWave =
				Math.sin(point.normalizedX * 12.5 + seconds * 0.34 + Math.sin(point.normalizedY * 7.2 - seconds * 0.19)) * 0.34 +
				Math.cos(point.normalizedY * 15.8 - seconds * 0.28 + point.phase * 0.18) * 0.25 +
				Math.sin((point.normalizedX + point.normalizedY) * 9.4 + seconds * 0.13) * 0.18;
			const aperture = Math.exp(-Math.abs(foldedWave - (point.normalizedY - 0.48) * 0.52) * 3.4);
			return {
				dx,
				dy,
				pointerInfluence,
				field: Math.max(0, aperture * point.safeTextFade * point.edgeFade + pointerInfluence * 0.32)
			};
		}

		function renderBase() {
			baseCtx.clearRect(0, 0, width, height);
			const ivoryFaint = new Path2D();
			const ivoryStrong = new Path2D();
			const signal = new Path2D();

			for (const point of points) {
				const { dx, dy, pointerInfluence, field } = measureField(point, 4.2, 0.77, 0.48);
				if (field <= point.threshold * 0.82 + 0.08) continue;
				const displacement = pointerInfluence * 7;
				const angle = Math.atan2(dy, dx);
				const drawX = point.x + Math.cos(angle) * displacement;
				const drawY = point.y + Math.sin(angle) * displacement;
				const radius = Math.min(2.55, point.size + field * 1.2);
				const isSignal = field > 0.76 && ((point.column + point.row) % 3 === 0 || pointerInfluence > 0.52);
				const target = isSignal ? signal : field > 0.48 ? ivoryStrong : ivoryFaint;
				target.moveTo(drawX + radius, drawY);
				target.arc(drawX, drawY, radius, 0, Math.PI * 2);
			}

			baseCtx.fillStyle = ivory;
			baseCtx.globalAlpha = 0.13;
			baseCtx.fill(ivoryFaint);
			baseCtx.globalAlpha = 0.34;
			baseCtx.fill(ivoryStrong);
			baseCtx.fillStyle = chartreuse;
			baseCtx.globalAlpha = 0.84;
			baseCtx.fill(signal);
			baseCtx.globalAlpha = 1;
		}

		function buildField() {
			const nextWidth = Math.max(1, host.clientWidth);
			const nextHeight = Math.max(1, host.clientHeight);
			const nextDpr = Math.min(window.devicePixelRatio || 1, definition.dprCap);
			if (points.length && nextWidth === width && nextHeight === height && nextDpr === dpr) return false;
			width = nextWidth;
			height = nextHeight;
			dpr = nextDpr;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			baseCanvas.width = canvas.width;
			baseCanvas.height = canvas.height;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const spacing = width < 720 ? 13 : 9;
			const columns = Math.ceil(width / spacing) + 2;
			const rows = Math.ceil(height / spacing) + 2;
			const random = createSeededRandom(`${definition.seed}:${columns}x${rows}`);
			points = [];

			for (let row = 0; row < rows; row += 1) {
				for (let column = 0; column < columns; column += 1) {
					const x = column * spacing + (random() - 0.5) * 2.2;
					const y = row * spacing + (random() - 0.5) * 2.2;
					const normalizedX = x / width;
					const normalizedY = y / height;
					points.push({
						x,
						y,
						normalizedX,
						normalizedY,
						column,
						row,
						phase: random() * Math.PI * 2,
						size: 0.7 + random() * 0.85,
						safeTextFade: smoothstep(0.18, 0.58, normalizedX),
						edgeFade: 1 - smoothstep(0.86, 1.02, Math.hypot(normalizedX - 0.68, normalizedY - 0.53)),
						threshold: bayer4[(row % 4) * 4 + (column % 4)]
					});
				}
			}
			activePoints = points.filter((point) => (point.column + point.row * 3) % 7 === 0 && point.safeTextFade > 0.08);
			renderBase();
			return true;
		}

		function draw(timestamp: number, force = false) {
			if (!force && timestamp - lastFrame < 1000 / definition.maxFps) {
				raf = requestAnimationFrame(draw);
				return;
			}

			lastFrame = timestamp;
			const seconds = motionPreference.matches ? 4.2 : (timestamp - startTime) / 1000;
			pointer.x += (pointerTarget.x - pointer.x) * 0.065;
			pointer.y += (pointerTarget.y - pointer.y) * 0.065;
			ctx.clearRect(0, 0, width, height);

			ctx.drawImage(baseCanvas, 0, 0, baseCanvas.width, baseCanvas.height, 0, 0, width, height);
			if (force) return;

			const liveSignal = new Path2D();
			for (const point of activePoints) {
				const { dx, dy, pointerInfluence, field } = measureField(point, seconds, pointer.x, pointer.y);
				const pulse = 0.5 + Math.sin(seconds * 0.72 + point.phase) * 0.5;
				if (field + pulse * 0.08 <= point.threshold * 0.82 + 0.12 && pointerInfluence < 0.14) continue;
				const displacement = pointerInfluence * 8;
				const angle = Math.atan2(dy, dx);
				const drawX = point.x + Math.cos(angle) * displacement;
				const drawY = point.y + Math.sin(angle) * displacement;
				const radius = Math.min(2.75, point.size + field + pulse * 0.5);
				liveSignal.moveTo(drawX + radius, drawY);
				liveSignal.arc(drawX, drawY, radius, 0, Math.PI * 2);
			}
			ctx.fillStyle = chartreuse;
			ctx.globalAlpha = 0.32;
			ctx.fill(liveSignal);
			ctx.globalAlpha = 1;

			if (!force) raf = requestAnimationFrame(draw);
		}

		function stop() {
			if (!running) return;
			running = false;
			cancelAnimationFrame(raf);
		}

		function applyRunState() {
			if (motionPreference.matches) {
				stop();
				draw(performance.now(), true);
				return;
			}

			const shouldRun = inViewport && document.visibilityState === 'visible';
			if (shouldRun && !running) {
				running = true;
				startTime = performance.now();
				raf = requestAnimationFrame(draw);
			} else if (!shouldRun) {
				stop();
			}
		}

		function handlePointer(event: PointerEvent) {
			const rect = host.getBoundingClientRect();
			pointerTarget.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
			pointerTarget.y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
		}

		function handleMotionPreference() {
			applyRunState();
		}

		const interactionSurface = host.parentElement ?? host;
		const resizeObserver = new ResizeObserver(() => {
			if (!buildField()) return;
			if (motionPreference.matches || !running) draw(performance.now(), true);
		});
		const visibilityObserver = new IntersectionObserver(
			(entries) => {
				inViewport = entries.some((entry) => entry.isIntersecting);
				applyRunState();
			},
			{ threshold: 0 }
		);

		buildField();
		resizeObserver.observe(host);
		visibilityObserver.observe(host);
		interactionSurface.addEventListener('pointermove', handlePointer, { passive: true });
		document.addEventListener('visibilitychange', applyRunState);
		motionPreference.addEventListener('change', handleMotionPreference);
		applyRunState();

		return () => {
			stop();
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			interactionSurface.removeEventListener('pointermove', handlePointer);
			document.removeEventListener('visibilitychange', applyRunState);
			motionPreference.removeEventListener('change', handleMotionPreference);
		};
	});
</script>

<div bind:this={host} class="open-signal-field" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
	<div class="signal-axis"></div>
	<div class="signal-readout">
		<span><i></i>OPEN SIGNAL</span>
		<span>{definition.primitive}</span>
		<span>SEED · {definition.seed}</span>
	</div>
</div>

<style>
	.open-signal-field {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
		contain: strict;
	}

	/* El campo sigue atravesando todo el hero, pero se funde con Carbon antes
	   de tocar la columna editorial. La estructura continúa visible detrás del
	   copy sin competir con los trazos finos de Playfair y Sora. */
	.open-signal-field::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		background:
			linear-gradient(
				to right,
				var(--mv-background) 0%,
				color-mix(in srgb, var(--mv-background) 98%, transparent) 24%,
				color-mix(in srgb, var(--mv-background) 88%, transparent) 43%,
				color-mix(in srgb, var(--mv-background) 48%, transparent) 58%,
				transparent 72%
			),
			linear-gradient(
				to bottom,
				color-mix(in srgb, var(--mv-background) 36%, transparent),
				transparent 32%,
				transparent 74%,
				color-mix(in srgb, var(--mv-background) 54%, transparent)
			);
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
		opacity: 0.9;
		mask-image: linear-gradient(to right, transparent 2%, transparent 17%, black 53%, black 100%);
		-webkit-mask-image: linear-gradient(to right, transparent 2%, transparent 17%, black 53%, black 100%);
	}

	.signal-axis {
		position: absolute;
		z-index: 3;
		top: 20%;
		right: 9.5%;
		bottom: 19%;
		width: 1px;
		background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mv-primary) 35%, transparent), transparent);
		opacity: 0.5;
	}

	.signal-readout {
		position: absolute;
		z-index: 3;
		right: calc(9.5% + 15px);
		bottom: 18%;
		display: grid;
		justify-items: end;
		gap: 7px;
		font: 500 8px/1.35 var(--font-mono);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 10px 12px;
		border-right: 1px solid color-mix(in srgb, var(--mv-primary) 28%, transparent);
		background: color-mix(in srgb, var(--mv-background) 78%, transparent);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		color: color-mix(in srgb, var(--mv-ivory) 62%, transparent);
	}

	.signal-readout span:first-child {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: color-mix(in srgb, var(--mv-primary) 92%, transparent);
	}

	.signal-readout i {
		display: block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--mv-primary);
		box-shadow: 0 0 10px color-mix(in srgb, var(--mv-primary) 68%, transparent);
	}

	@media (max-width: 760px) {
		.open-signal-field::after {
			background: linear-gradient(
				to bottom,
				var(--mv-background) 0%,
				color-mix(in srgb, var(--mv-background) 96%, transparent) 38%,
				color-mix(in srgb, var(--mv-background) 70%, transparent) 58%,
				transparent 82%
			);
		}

		canvas {
			opacity: 0.62;
			mask-image: linear-gradient(to bottom, transparent 18%, black 58%, black 100%);
			-webkit-mask-image: linear-gradient(to bottom, transparent 18%, black 58%, black 100%);
		}
		.signal-axis,
		.signal-readout { display: none; }
	}
</style>
