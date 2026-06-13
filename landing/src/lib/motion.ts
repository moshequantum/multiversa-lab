// Motion editorial del Lab — GSAP + ScrollTrigger.
// Regla de la casa: el contenido es visible por defecto (SSR / sin JS);
// el motion solo se aplica cuando el usuario NO prefiere movimiento reducido.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLabMotion(root: HTMLElement): () => void {
	const mm = gsap.matchMedia();

	mm.add('(prefers-reduced-motion: no-preference)', () => {
		// ── Hero: entrada editorial en un solo timeline ──────────
		const hero = root.querySelector('.hero');
		if (hero) {
			const beats = hero.querySelectorAll(':scope .meta, :scope h1, :scope .lead, :scope .ctas, :scope .chips');
			gsap
				.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
				.from(beats, { autoAlpha: 0, y: 22, stagger: 0.09 });

			// Parallax sutil del aurora al salir del hero
			const aurora = hero.querySelector(':scope .aurora');
			if (aurora) {
				gsap.to(aurora, {
					yPercent: 14,
					ease: 'none',
					scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 }
				});
			}
		}

		// ── Capítulos: header + intro revelan al entrar ──────────
		root.querySelectorAll('section:not(.hero)').forEach((section) => {
			const bits = section.querySelectorAll(
				':scope .mv-chrome-top, :scope h2, :scope .lead, :scope .intro'
			);
			if (bits.length) {
				gsap.from(bits, {
					autoAlpha: 0,
					y: 18,
					duration: 0.55,
					ease: 'power3.out',
					stagger: 0.08,
					scrollTrigger: { trigger: section, start: 'top 72%', once: true }
				});
			}
		});

		// ── Cards y principios: batch con stagger corto ──────────
		ScrollTrigger.batch('.mv-card, .principles li', {
			start: 'top 88%',
			once: true,
			onEnter: (els) =>
				gsap.from(els, {
					autoAlpha: 0,
					y: 24,
					duration: 0.55,
					ease: 'power3.out',
					stagger: 0.07,
					overwrite: true
				})
		});

		// Las fuentes cambian la altura del layout: recalcular triggers.
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => ScrollTrigger.refresh());
		}
	});

	return () => mm.revert();
}
