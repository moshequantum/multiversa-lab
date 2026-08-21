export type VisualDefinition = {
	id: string;
	surface: 'lab';
	primitive: string;
	seed: string;
	intent: string;
	signal: 'chartreuse';
	behavior: string;
	reducedMotion: 'static-final-state' | 'static-poster';
	maxFps: 0 | 24 | 30;
	dprCap: 1 | 1.5 | 2;
};

export const labVisuals = {
	openSignal: {
		id: 'lab-open-signal',
		surface: 'lab',
		primitive: 'open-signal-field',
		seed: 'mv-lab-open-v1',
		intent: 'Mostrar que bajo la superficie pública existe una estructura computacional legible, abierta y en movimiento.',
		signal: 'chartreuse',
		behavior: 'Un campo dither respira lentamente, responde con baja amplitud al puntero y se funde con Carbon bajo la columna editorial.',
		reducedMotion: 'static-poster',
		maxFps: 30,
		dprCap: 1.5
	} satisfies VisualDefinition
} as const;
