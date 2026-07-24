// Bitácora — Construir en público.
// Cada entrada es una nota corta y fechada del proceso de construir Multiversa.
// Regla HILPS: nada se publica solo. Dispatch redacta borradores → Moshe aprueba
// desde el celular ("dale B1") → la entrada se agrega aquí y el sitio se reconstruye.
// El campo `video` es progresivo: se pega el embed cuando la toma exista.

export type BitacoraTag = 'reflexión' | 'cliente' | 'producto' | 'construir';

export interface BitacoraEntry {
	slug: string;
	/** Fecha real de la entrada, ISO YYYY-MM-DD. Nunca inventar. */
	date: string;
	title: string;
	/** Párrafos cortos. Texto plano, sin relleno. */
	body: string[];
	tag: BitacoraTag;
	/** URL de embed (YouTube/Vimeo). Opcional — cuando haya video. */
	video?: string;
	/** Prueba en vivo: un sistema, una release, un caso. Opcional. */
	link?: { label: string; href: string };
}

// Ancla del "Día N": primer día público del build-in-public.
// Moshe: si tu día 1 real es otro, cambia solo esta fecha.
export const START_DATE = '2026-07-23';

/** Día N relativo al START_DATE. Día 1 = START_DATE. */
export function dayNumber(date: string, start: string = START_DATE): number {
	const ms = Date.parse(date) - Date.parse(start);
	return Math.floor(ms / 86_400_000) + 1;
}

const TAG_LABEL: Record<BitacoraTag, string> = {
	reflexión: 'Reflexión',
	cliente: 'Cliente',
	producto: 'Producto',
	construir: 'Construir'
};

export function tagLabel(tag: BitacoraTag): string {
	return TAG_LABEL[tag];
}

// Orden canónico: más reciente primero. (Se ordena en render por fecha.)
export const entries: BitacoraEntry[] = [
	{
		slug: 'no-tienes-que-aprender-a-programar',
		date: '2026-07-23',
		title: 'No tienes que aprender a programar',
		tag: 'reflexión',
		body: [
			'Construyo en público y comparto el proceso: lo que pruebo, lo que rompo, lo que aprendo. Lo que pasa entre mis clientes y yo — sus decisiones, sus datos — se queda en privado. La IA propone; nosotros disponemos.',
			'Mi trabajo no es enseñarte a programar. Es curar el caos de herramientas y repositorios sueltos, unificarlo, y entregártelo para que lo uses a tu conveniencia — sin esa presión.',
			'Tú pones el criterio y el negocio. Yo pongo la infraestructura. Y la hacemos crecer juntos.'
		]
	},
	{
		slug: 'por-que-en-publico',
		date: '2026-07-23',
		title: 'Por qué construyo esto en público',
		tag: 'reflexión',
		body: [
			'La mayoría de los negocios no tiene un problema de IA. Tiene un problema de memoria: se olvida de lo que ya decidió, y lo llama estar ocupado.',
			'Estoy construyendo el sistema que resuelve eso. No un chatbot más — una arquitectura que recuerda, propone y ejecuta bajo el criterio de quien la usa.',
			'Lo hago a la vista de todos porque un sistema en el que vas a confiar tu operación no debería pedirte fe. Debería mostrarte cómo se construye.'
		]
	},
	{
		slug: 'primeros-dos-sistemas-vivos',
		date: '2026-07-23',
		title: 'Los primeros dos sistemas ya están vivos',
		tag: 'cliente',
		body: [
			'Dos negocios distintos, un mismo problema: se olvidaban de sí mismos. Una operación de lanzamiento que vivía en mensajes sueltos. Una marca personal que empezaba de cero en cada canal.',
			'No les vendí herramientas. Les construí un sistema que captura, recuerda y da seguimiento solo — con el humano decidiendo, no la máquina.',
			'Son mis primeros casos de estudio. Están en producción, no en una demo.'
		],
		link: { label: 'sistemaagora.com', href: 'https://sistemaagora.com' }
	},
	{
		slug: 'el-motor-es-abierto',
		date: '2026-07-23',
		title: 'El motor es abierto',
		tag: 'producto',
		body: [
			'Lo que uso con clientes sale del mismo laboratorio open-source que estás viendo. Se piensa, se prueba y se libera acá.',
			'La regla es simple: lo roto se arregla, no se esconde. Y si un día desaparezco, lo que construiste conmigo tiene que seguir funcionando.',
			'Esa es la prueba de que no es un alquiler con tu nombre adentro. Es tuyo.'
		],
		link: { label: 'GitHub ↗', href: 'https://github.com/moshequantum/multiversa-lab' }
	}
];
