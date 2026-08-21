// Bitácora — una serie editorial con evidencia, no un contador artificial.
// Cada entrada puede usar una fecha de publicación real, pero la interfaz no finge
// que la historia del producto comenzó ese día. Nunca se publican datos privados.

export type BitacoraTag = 'reflexión' | 'sistema' | 'producto' | 'construir';

export interface BitacoraEntry {
	slug: string;
	/** Fecha real de publicación cuando exista. No se usa para afirmar el inicio del producto. */
	date: string;
	series: string;
	title: string;
	/** Párrafos cortos, verificables y sin datos de terceros. */
	body: string[];
	tag: BitacoraTag;
	/** URL de video (YouTube/Vimeo). Opcional, solo después de aprobar la toma. */
	video?: string;
	/** Evidencia pública: sistema, lanzamiento o documento. Opcional. */
	link?: { label: string; href: string };
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

// Orden editorial: la bitácora comienza por el marco que hace verificable lo que sigue.
export const entries: BitacoraEntry[] = [
	{
		slug: 'realinear-la-estructura-en-publico',
		date: '2026-08-21',
		series: 'Serie 05 · realineamiento',
		title: 'Realinear la estructura también es construir en público',
		tag: 'construir',
		body: [
			'La primera narrativa del Lab mezcló motores de origen, interfaces y adaptadores opcionales como si todos fueran capas obligatorias y estuvieran igualmente listos. La auditoría mostró que no era así.',
			'La nueva dirección es más pequeña: un Pack portable, una CLI como plano de control, un MCP como puerta y receipts que demuestren cada cambio. Los motores y los hosts se conectan como upstreams o adaptadores; Multiversa no intenta reemplazarlos.',
			'Publicamos el realineamiento antes de terminarlo. El roadmap es una invitación a revisar, cuestionar e integrar, no una promesa de madurez que todavía no podemos probar.'
		],
		link: { label: 'Leer el roadmap público ↗', href: 'https://github.com/moshequantum/multiversa-lab/blob/main/ROADMAP.md' }
	},
	{
		slug: 'tres-meses-para-volverlo-funcional',
		date: '2026-07-23',
		series: 'Serie 01 · estado real',
		title: 'Tres meses para volverlo funcional',
		tag: 'construir',
		body: [
			'Multiversa real lleva tres meses de construcción. Lo anterior es legado: aporta antecedentes, pero no se presenta como la versión funcional que existe hoy.',
			'El Lab ya puede revisarse como código, documentación y prototipos. La integración completa todavía no está lista; lo que sigue en obra se nombra como tal, sin adelantar capacidades ni prometer resultados.',
			'La regla para esta bitácora es simple: cada avance necesita contexto, evidencia pública y una decisión humana detrás.'
		]
	},
	{
		slug: 'el-origen-sin-la-leyenda',
		date: '2026-07-23',
		series: 'Serie 02 · origen',
		title: 'El origen, sin convertirlo en leyenda',
		tag: 'reflexión',
		body: [
			'Construir en público no significa convertir cada detalle en contenido. Significa mostrar el criterio: qué problema se intenta resolver, qué se prueba y qué se decide conservar.',
			'La trayectoria aparece con sus decisiones útiles para quien construye. Los datos personales, acuerdos y operaciones de terceros permanecen fuera del Lab.',
			'La IA propone; las personas deciden. Esa relación no es una consigna: es un límite de diseño.'
		]
	},
	{
		slug: 'hoja-de-ruta-publica-limites-claros',
		date: '2026-07-23',
		series: 'Serie 03 · hoja de ruta',
		title: 'Una hoja de ruta pública con límites claros',
		tag: 'producto',
		body: [
			'La hoja de ruta muestra dirección, no una promesa cerrada. Publicamos lo que cambia para que puedas entender prioridades, dependencias y estado de cada capa.',
			'No se publican secretos, configuraciones de clientes ni decisiones que expongan a otra persona. La transparencia tiene que ser responsable para ser útil.',
			'La documentación, el código y las pruebas visibles son la referencia; el discurso nunca reemplaza la evidencia.'
		],
		link: { label: 'Ver el repositorio ↗', href: 'https://github.com/moshequantum/multiversa-lab' }
	},
	{
		slug: 'el-lab-como-prueba',
		date: '2026-07-23',
		series: 'Serie 04 · construcción',
		title: 'El Lab como prueba, no como promesa',
		tag: 'sistema',
		body: [
			'El código público vive aquí: Multiversa CLI, documentación, pruebas e integraciones curadas. Se diseña, se revisa y se libera con atribución a sus proyectos de origen.',
			'Cuando algo no funciona, se corrige y se documenta. Cuando aún no está listo, se marca como trabajo en curso.',
			'La intención es que puedas revisar cómo se construye un sistema con memoria, límites y trazabilidad, sin depender de una historia inflada.'
		]
	}
];
