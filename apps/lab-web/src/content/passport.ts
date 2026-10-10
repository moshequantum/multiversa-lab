/**
 * OpenPassport facts shown on the landing. Every value here is backed by a file in this repo
 * or by docs/passport-context/06-CURRENT-STATE.md (cut-off 2026-10-10). Do not add claims
 * that are not verifiable from those sources.
 */

export const CUTOFF = "2026-10-10";
export const CUTOFF_LABEL = "10 oct 2026";

export const REPO_URL = "https://github.com/moshequantum/multiversa-lab";
export const GROUP_URL = "https://multiversa.group";

export interface Layer {
  n: string;
  path: string;
  layer: string;
  title: string;
  body: string;
  /** Real sha256 from templates/open-passport-template/manifest.json */
  sha256: string;
}

export const LAYERS: Layer[] = [
  {
    n: "01",
    path: "01-IDENTITY.md",
    layer: "identity",
    title: "Identidad",
    body: "Quién origina el Passport, para qué existe y qué no es. Se lee primero y no cambia por sesión.",
    sha256: "8e0f98223171905ac6bdc3da4f35e4fd643d7cc328b7a4c9b1e419e07ca1fca5",
  },
  {
    n: "02",
    path: "02-DOCTRINE.md",
    layer: "doctrine",
    title: "Doctrina",
    body: "Principios que no se negocian. Lo que ningún modelo puede reinterpretar a conveniencia de la conversación.",
    sha256: "a40ac4812c44f95461407585baffaf6f8220b8213e2ef565f95df5169824218f",
  },
  {
    n: "03",
    path: "03-VOICE.md",
    layer: "voice",
    title: "Voz",
    body: "Registro, léxico y palabras vetadas. Regula cómo se habla, no deforma términos técnicos.",
    sha256: "b1e0352c856f0b6302bf0405055bd5de8beef9b67b901bf258e2d9d41d37dbb6",
  },
  {
    n: "04",
    path: "04-OFFER.md",
    layer: "offer",
    title: "Oferta",
    body: "Qué se ofrece y con qué alcance. El modelo no inventa servicios fuera de esta capa.",
    sha256: "ce6062c371ebd670af1f0283f9b662fc73d74c7da360b6e1fe6418b6c123016f",
  },
  {
    n: "05",
    path: "05-GOVERNANCE.md",
    layer: "governance",
    title: "Gobernanza",
    body: "Quién tiene autoridad, qué exige aprobación humana y qué no se hace nunca.",
    sha256: "65ce2eda2fdd94188411591ec28b8e35aa9649908265fa77d16bf7dcf506e25c",
  },
  {
    n: "06",
    path: "06-CURRENT-STATE.md",
    layer: "state",
    title: "Estado actual",
    body: "La verdad operativa con fecha de corte (asOf). Nada posterior a esa fecha se asume.",
    sha256: "277e0559e71f3e830cd7342b5ebba4ee8f05d87164a6ba9218c6c43e7cdc0e94",
  },
  {
    n: "07",
    path: "07-EVIDENCE.md",
    layer: "evidence",
    title: "Evidencia",
    body: "Qué está confirmado, qué está declarado y qué es hipótesis. Cada afirmación con su nivel.",
    sha256: "d53db863986cbb903cbaac3b90ac087e8d6535adda89c43b0c64ee18977aa8dc",
  },
];

export interface Extra {
  path: string;
  layer: string;
  visibility: string;
  body: string;
}

/** Files outside the seven layers. Runtime and private appear in the Multiversa.Group Passport v0.3.0. */
export const EXTRAS: Extra[] = [
  { path: "manifest.json", layer: "manifest", visibility: "public", body: "Contrato del paquete: archivos, capas, hashes, perfiles y orden de carga." },
  { path: "MASTER-PROMPT.md", layer: "interpreter", visibility: "public", body: "Primer contexto que lee el modelo: cómo interpretar el resto." },
  { path: "runtime/*.json", layer: "runtime", visibility: "private-operational", body: "Qué está conectado hoy. Opcional en la plantilla." },
  { path: "private/founder-private.md", layer: "founder-context", visibility: "founder-private", body: "Contexto del originador. Nunca sale en un perfil público." },
];

export const PROFILES = ["core-public", "commercial-public", "operational-private", "founder-private"] as const;

/** Profile matrix from the Multiversa.Group Passport v0.3.0 manifest.json. */
export const PROFILE_ROWS: { file: string; in: boolean[] }[] = [
  { file: "01-IDENTITY.md", in: [true, true, true, true] },
  { file: "02-DOCTRINE.md", in: [true, true, true, true] },
  { file: "03-VOICE.md", in: [true, true, true, true] },
  { file: "04-OFFER.md", in: [false, true, true, true] },
  { file: "05-GOVERNANCE.md", in: [true, true, true, true] },
  { file: "06-CURRENT-STATE.md", in: [false, true, true, true] },
  { file: "07-EVIDENCE.md", in: [false, true, true, true] },
  { file: "runtime/adapters.json", in: [false, false, true, true] },
  { file: "runtime/runtime-state.json", in: [false, false, true, true] },
  { file: "private/founder-private.md", in: [false, false, false, true] },
];

export type Status = "works" | "lab" | "pending";

export interface StatusItem {
  name: string;
  status: Status;
  note: string;
}

export const STATUS_ITEMS: StatusItem[] = [
  { name: "passport-core · TypeScript", status: "works", note: "3 de 3 tests pasan. No publicado en npm." },
  { name: "multiversa passport · Go", status: "works", note: "Compila. verify: 100 % PASS sobre el Passport de Multiversa.Group v0.3.0. Sin tests propios." },
  { name: "open-passport-template", status: "works", note: "Existe en el repositorio. verify: PASS." },
  { name: "mcp-passport", status: "lab", note: "El código existe. No verificado en uso. Un perfil desconocido hoy no falla cerrado." },
  { name: "Contrato V0", status: "pending", note: "Esquema versionado, fixtures, paridad TS/Go, MCP fail-closed y release. 10 tareas abiertas." },
];

export const LAB_TASKS: { id: string; title: string }[] = [
  { id: "LAB-001", title: "Congelar vocabulario y política de versiones" },
  { id: "LAB-002", title: "Publicar JSON Schema y fixtures canónicos" },
  { id: "LAB-003", title: "Migración de 7 capas a 10 dominios" },
  { id: "LAB-004", title: "Alinear semántica de perfiles y visibilidad" },
  { id: "LAB-005", title: "TypeScript core como comportamiento canónico" },
  { id: "LAB-006", title: "Paridad de la CLI en Go y export contenido" },
  { id: "LAB-007", title: "Acceso por perfil fail-closed en MCP" },
  { id: "LAB-008", title: "Verificación de integridad honesta en CI" },
  { id: "LAB-009", title: "Reproducibilidad con Docker" },
  { id: "LAB-010", title: "Empaquetar y documentar una release versionada" },
];

export const MODELS = ["ChatGPT", "Claude", "Gemini", "Grok", "Qwen", "Mistral"];
