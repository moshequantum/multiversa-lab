/**
 * Bitácora del Lab — registro cronológico de cómo trabajamos y con qué herramientas.
 *
 * Para agregar una entrada: añade un objeto al INICIO del arreglo (más reciente primero).
 * Una línea, factual, sin cifras que no tengan respaldo. `date` en formato ISO (YYYY-MM-DD).
 */

export interface LogEntry {
  date: string;
  tag: "passport" | "web" | "flujo" | "release" | "contrato";
  text: string;
}

export const LOGBOOK: LogEntry[] = [
  {
    date: "2026-10-10",
    tag: "flujo",
    text: "Herramientas del flujo de trabajo: Claude (interfaz de Claude y Claude Code), Gentle Suite y Gentle Shell de Gentleman Programming.",
  },
  {
    date: "2026-10-10",
    tag: "web",
    text: "Landing del Lab alineada al ADN visual de Multiversa: mismos tokens Cosmic Night y tipografía que Multiversa.Group.",
  },
  {
    date: "2026-10-10",
    tag: "release",
    text: "Modelo de publicación: el repositorio es el laboratorio; la versión estable será una release etiquetada. Todavía no hay etiquetas.",
  },
  {
    date: "2026-10-10",
    tag: "passport",
    text: "Passport 0.3.0/0.3.1: verdad única entre web, CV y Passport; hashes verificados con la CLI `multiversa passport verify`.",
  },
];

export interface Credit {
  name: string;
  by: string;
  body: string;
  links: { label: string; href: string }[];
  license?: string;
}

/**
 * Atribución, no aval. Descripciones parafraseadas de los README oficiales (verificados el 2026-10-10).
 * "Gentle Suite" es la forma en que agrupamos los proyectos de Gentleman Programming que usamos.
 */
export const CREDITS: Credit[] = [
  {
    name: "Claude",
    by: "Anthropic",
    body: "La interfaz de Claude y Claude Code: investigación, escritura y construcción asistida. La IA propone; nosotros decidimos.",
    links: [
      { label: "anthropic.com/claude", href: "https://www.anthropic.com/claude" },
      { label: "Claude Code", href: "https://claude.com/product/claude-code" },
    ],
  },
  {
    name: "Gentle Suite",
    by: "Alan Buscaglia · Gentleman Programming",
    body: "Gentle AI configura los agentes de programación que ya usas (Claude Code, Cursor, OpenCode, Codex, Pi…). Engram es memoria persistente para agentes: binario en Go con SQLite + FTS5 y servidor MCP.",
    license: "Código abierto · MIT",
    links: [
      { label: "gentle-ai", href: "https://github.com/Gentleman-Programming/gentle-ai" },
      { label: "engram", href: "https://github.com/Gentleman-Programming/engram" },
    ],
  },
  {
    name: "Gentle Shell",
    by: "Alan Buscaglia · Gentleman Programming",
    body: "Arnés de agente de programación nativo de Pi para desarrollo controlado (antes gentle-pi).",
    license: "Código abierto · MIT",
    links: [{ label: "gentle-shell", href: "https://github.com/Gentleman-Programming/gentle-shell" }],
  },
];

export const GENTLEMAN_LINKS = [
  { label: "gentlemanprogramming.com", href: "https://gentlemanprogramming.com" },
  { label: "github.com/Gentleman-Programming", href: "https://github.com/Gentleman-Programming" },
];
