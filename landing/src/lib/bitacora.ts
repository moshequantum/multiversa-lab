// Bitácora — Construir en público.
// Cada entrada es una nota corta y fechada del proceso de construir Multiversa.
// Regla HILPS: nada se publica solo. Dispatch redacta borradores → Moshe aprueba
// desde el celular ("dale B1") → la entrada se agrega aquí y el sitio se reconstruye.
// El campo `video` es progresivo: se pega el embed cuando la toma exista.

export type BitacoraTag = 'reflexión' | 'sistema' | 'producto' | 'construir';

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
	sistema: 'Sistema',
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
			'Construyo en público y comparto el proceso: lo que pruebo, lo que rompo y lo que aprendo. Las decisiones privadas, los datos y las credenciales no salen del Lab. La IA propone; las personas deciden.',
			'El Lab no vende promesas ni expone operaciones ajenas. Publica el código, la documentación y los aprendizajes que permiten revisar cómo se construye Multiversa.',
			'Quien use el proyecto conserva su criterio, su contexto y sus secretos.'
		]
	},
	{
		slug: 'por-que-en-publico',
		date: '2026-07-23',
		title: 'Por qué construyo esto en público',
		tag: 'reflexión',
		body: [
			'El problema no es solo usar IA: es perder las decisiones y el contexto que ya costó construir.',
			'Multiversa Lab construye una CLI y un Cerebro que preservan contexto, proponen rutas y mantienen a la persona al mando.',
			'Lo hacemos a la vista de todos porque una herramienta que pide confianza debe dejar ver cómo se construye.'
		]
	},
	{
		slug: 'dos-project-os-en-configuracion',
		date: '2026-07-23',
		title: 'Dos Project OS, una misma regla',
		tag: 'sistema',
		body: [
			'Dos contextos distintos sirven para probar la misma regla: el sistema debe recordar sin convertir a la persona en una espectadora.',
			'La CLI separa el perfil global, el manifiesto del tenant y su vault. El contexto ayuda a construir; los secretos no se comparten.',
			'Lo publicable es el aprendizaje técnico. Cada proyecto y sus decisiones siguen bajo el control de quien los opera.'
		]
	},
	{
		slug: 'el-motor-es-abierto',
		date: '2026-07-23',
		title: 'El motor es abierto',
		tag: 'producto',
		body: [
			'El código público nace en este laboratorio: CLI, documentación, pruebas y futuras integraciones curadas. Se piensa, se prueba y se libera acá.',
			'La regla es simple: lo roto se arregla, no se esconde. Las dependencias se consultan con sus releases y la configuración queda explícita.',
			'El Lab es una base abierta para que cada Project OS pueda seguir funcionando con decisiones trazables.'
		],
		link: { label: 'GitHub ↗', href: 'https://github.com/moshequantum/multiversa-lab' }
	}
];
