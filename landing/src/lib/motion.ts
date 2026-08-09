// Motion editorial del Lab — GSAP + ScrollTrigger.
// El contenido es visible por defecto; el motion se activa solo en cliente y
// queda completamente fuera cuando el usuario prefiere movimiento reducido.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;

function addListener<K extends keyof HTMLElementEventMap>(
	node: HTMLElement,
	type: K,
	listener: (event: HTMLElementEventMap[K]) => void,
	cleanups: Cleanup[]
) {
	node.addEventListener(type, listener as EventListener);
	cleanups.push(() => node.removeEventListener(type, listener as EventListener));
}

export function initLabMotion(root: HTMLElement): Cleanup {
	const cleanups: Cleanup[] = [];
	const context = gsap.context(() => {
		const media = gsap.matchMedia();

		media.add('(prefers-reduced-motion: no-preference)', () => {
			const motionCleanups: Cleanup[] = [];
			const hero = root.querySelector<HTMLElement>('.hero');
			if (hero) {
				const stack = hero.querySelector<HTMLElement>('.stack');
				const signal = hero.querySelector<HTMLElement>('.open-signal-field');
				const horizon = hero.querySelector<HTMLElement>('.horizon');
				if (stack) {
					gsap.to(stack, {
						y: -22,
						ease: 'none',
						scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.7 }
					});
				}
				if (signal) {
					gsap.to(signal, {
						y: 30,
						ease: 'none',
						scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 }
					});
				}
				if (horizon) {
					gsap.to(horizon, {
						yPercent: 14,
						ease: 'none',
						scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.7 }
					});
				}
			}

			const sections = Array.from(root.querySelectorAll<HTMLElement>('section:not(.hero)'));
			sections.forEach((section) => {
				section.classList.add('motion-section');
				const marker = document.createElement('span');
				marker.className = 'motion-chapter-signal';
				marker.setAttribute('aria-hidden', 'true');
				section.append(marker);
				motionCleanups.push(() => marker.remove());

				ScrollTrigger.create({
					trigger: section,
					start: 'top 78%',
					end: 'bottom 22%',
					onToggle: ({ isActive }) => section.classList.toggle('motion-section-active', isActive)
				});

				const headerBits = section.querySelectorAll<HTMLElement>(
					':scope .mv-chrome-top, :scope h2, :scope .lead, :scope .intro'
				);
				if (headerBits.length) {
					gsap.fromTo(
						headerBits,
						{ autoAlpha: 0, y: 28 },
						{
							autoAlpha: 1,
							y: 0,
							duration: 0.72,
							ease: 'power3.out',
							stagger: 0.075,
							clearProps: 'transform,opacity,visibility',
							scrollTrigger: { trigger: section, start: 'top 78%', once: true }
						}
					);
				}
			});

			const cards = Array.from(
				root.querySelectorAll<HTMLElement>('.mv-card, .principles li, .attribution .card')
			);
			cards.forEach((card) => {
				card.classList.add('motion-card');
				const spotlight = document.createElement('span');
				spotlight.className = 'motion-card-spotlight';
				spotlight.setAttribute('aria-hidden', 'true');
				card.append(spotlight);
				motionCleanups.push(() => spotlight.remove());
			});

			ScrollTrigger.batch(cards, {
				start: 'top 88%',
				once: true,
				onEnter: (elements) =>
					gsap.fromTo(
						elements,
						{ autoAlpha: 0, y: 34, scale: 0.982, rotationX: 2, transformPerspective: 900 },
						{
							autoAlpha: 1,
							y: 0,
							scale: 1,
							rotationX: 0,
							duration: 0.76,
							stagger: 0.065,
							ease: 'power3.out',
							overwrite: true,
							clearProps: 'transform,opacity,visibility'
						}
					)
			});

			const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
			if (finePointer.matches) {
				cards.forEach((card) => {
					addListener(card, 'pointermove', (event) => {
						const rect = card.getBoundingClientRect();
						card.style.setProperty('--motion-x', `${event.clientX - rect.left}px`);
						card.style.setProperty('--motion-y', `${event.clientY - rect.top}px`);
					}, motionCleanups);
					addListener(card, 'pointerenter', () => {
						gsap.to(card, { y: -6, scale: 1.006, duration: 0.2, ease: 'power3.out', overwrite: 'auto' });
					}, motionCleanups);
					addListener(card, 'pointerleave', () => {
						gsap.to(card, { y: 0, scale: 1, duration: 0.42, ease: 'power3.out', overwrite: 'auto', clearProps: 'transform' });
					}, motionCleanups);
				});

				const magnetic = Array.from(
					root.querySelectorAll<HTMLElement>('.hero .mv-btn-primary, .actions .mv-btn-primary')
				);
				magnetic.forEach((button) => {
					button.classList.add('motion-magnetic');
					addListener(button, 'pointermove', (event) => {
						const rect = button.getBoundingClientRect();
						const x = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
						const y = (event.clientY - (rect.top + rect.height / 2)) * 0.1;
						gsap.to(button, { x, y, duration: 0.18, ease: 'power3.out', overwrite: 'auto' });
					}, motionCleanups);
					addListener(button, 'pointerleave', () => {
						gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto', clearProps: 'transform' });
					}, motionCleanups);
				});
			}

			if (document.fonts?.ready) {
				void document.fonts.ready.then(() => ScrollTrigger.refresh());
			}

			return () => {
				motionCleanups.splice(0).forEach((cleanup) => cleanup());
				sections.forEach((section) => section.classList.remove('motion-section', 'motion-section-active'));
				cards.forEach((card) => card.classList.remove('motion-card'));
			};
		});

		cleanups.push(() => media.revert());
	}, root);

	return () => {
		cleanups.splice(0).forEach((cleanup) => cleanup());
		context.revert();
	};
}
