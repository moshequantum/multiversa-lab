/**
 * Bitácora del Lab — registro cronológico de cómo trabajamos y con qué herramientas.
 *
 * Para agregar una entrada: añade un objeto al INICIO del arreglo (más reciente primero), con un
 * `id` nuevo, y escribe su texto en src/i18n/es.ts y src/i18n/en.ts (logbook.entries[id]).
 * Una línea, factual, sin cifras que no tengan respaldo. `date` en formato ISO (YYYY-MM-DD).
 * TypeScript falla si un id no tiene texto en ambos idiomas.
 */

export type LogTag = "passport" | "web" | "flujo" | "release" | "contrato";

export const LOGBOOK = [
  { id: "2026-10-10-tools", date: "2026-10-10", tag: "flujo" },
  { id: "2026-10-10-landing", date: "2026-10-10", tag: "web" },
  { id: "2026-10-10-release-model", date: "2026-10-10", tag: "release" },
  { id: "2026-10-10-passport-030", date: "2026-10-10", tag: "passport" },
] as const satisfies readonly { id: string; date: string; tag: LogTag }[];

export type LogId = (typeof LOGBOOK)[number]["id"];

export type CreditId = "claude" | "gentle-suite" | "gentle-shell";

export interface Credit {
  id: CreditId;
  name: string;
  by: string;
  links: { label: string; href: string }[];
}

/**
 * Atribución, no aval. Descripciones parafraseadas de los README oficiales (verificados el 2026-10-10),
 * traducidas en src/i18n (logbook.credits[id]).
 * "Gentle Suite" es la forma en que agrupamos los proyectos de Gentleman Programming que usamos.
 */
export const CREDITS: Credit[] = [
  {
    id: "claude",
    name: "Claude",
    by: "Anthropic",
    links: [
      { label: "anthropic.com/claude", href: "https://www.anthropic.com/claude" },
      { label: "Claude Code", href: "https://claude.com/product/claude-code" },
    ],
  },
  {
    id: "gentle-suite",
    name: "Gentle Suite",
    by: "Alan Buscaglia · Gentleman Programming",
    links: [
      { label: "gentle-ai", href: "https://github.com/Gentleman-Programming/gentle-ai" },
      { label: "engram", href: "https://github.com/Gentleman-Programming/engram" },
    ],
  },
  {
    id: "gentle-shell",
    name: "Gentle Shell",
    by: "Alan Buscaglia · Gentleman Programming",
    links: [{ label: "gentle-shell", href: "https://github.com/Gentleman-Programming/gentle-shell" }],
  },
];

export const GENTLEMAN_LINKS = [
  { label: "gentlemanprogramming.com", href: "https://gentlemanprogramming.com" },
  { label: "github.com/Gentleman-Programming", href: "https://github.com/Gentleman-Programming" },
];
