/**
 * OpenPassport facts shown on the landing. Every value here is backed by a file in this repo
 * or by docs/passport-context/06-CURRENT-STATE.md (cut-off 2026-10-10). Do not add claims
 * that are not verifiable from those sources.
 *
 * Only data lives here (paths, hashes, ids, flags). User-visible prose is translated in
 * src/i18n/{es,en}.ts, keyed by the ids below.
 */

export const CUTOFF = "2026-10-10";

export const REPO_URL = "https://github.com/moshequantum/multiversa-lab";
export const GROUP_URL = "https://multiversa.group";

export type LayerId = "identity" | "doctrine" | "voice" | "offer" | "governance" | "state" | "evidence";

export interface Layer {
  n: string;
  path: string;
  layer: LayerId;
  /** Real sha256 from templates/open-passport-template/manifest.json */
  sha256: string;
}

export const LAYERS: Layer[] = [
  {
    n: "01",
    path: "01-IDENTITY.md",
    layer: "identity",
    sha256: "8e0f98223171905ac6bdc3da4f35e4fd643d7cc328b7a4c9b1e419e07ca1fca5",
  },
  {
    n: "02",
    path: "02-DOCTRINE.md",
    layer: "doctrine",
    sha256: "a40ac4812c44f95461407585baffaf6f8220b8213e2ef565f95df5169824218f",
  },
  {
    n: "03",
    path: "03-VOICE.md",
    layer: "voice",
    sha256: "b1e0352c856f0b6302bf0405055bd5de8beef9b67b901bf258e2d9d41d37dbb6",
  },
  {
    n: "04",
    path: "04-OFFER.md",
    layer: "offer",
    sha256: "ce6062c371ebd670af1f0283f9b662fc73d74c7da360b6e1fe6418b6c123016f",
  },
  {
    n: "05",
    path: "05-GOVERNANCE.md",
    layer: "governance",
    sha256: "65ce2eda2fdd94188411591ec28b8e35aa9649908265fa77d16bf7dcf506e25c",
  },
  {
    n: "06",
    path: "06-CURRENT-STATE.md",
    layer: "state",
    sha256: "277e0559e71f3e830cd7342b5ebba4ee8f05d87164a6ba9218c6c43e7cdc0e94",
  },
  {
    n: "07",
    path: "07-EVIDENCE.md",
    layer: "evidence",
    sha256: "d53db863986cbb903cbaac3b90ac087e8d6535adda89c43b0c64ee18977aa8dc",
  },
];

export type ExtraPath = "manifest.json" | "MASTER-PROMPT.md" | "runtime/*.json" | "private/founder-private.md";

export interface Extra {
  path: ExtraPath;
  layer: string;
  visibility: string;
}

/** Files outside the seven layers. Runtime and private appear in the Multiversa.Group Passport v0.3.0. */
export const EXTRAS: Extra[] = [
  { path: "manifest.json", layer: "manifest", visibility: "public" },
  { path: "MASTER-PROMPT.md", layer: "interpreter", visibility: "public" },
  { path: "runtime/*.json", layer: "runtime", visibility: "private-operational" },
  { path: "private/founder-private.md", layer: "founder-context", visibility: "founder-private" },
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

export type StatusItemId = "core" | "cli" | "template" | "mcp" | "contract";

export interface StatusItem {
  id: StatusItemId;
  name: string;
  status: Status;
}

export const STATUS_ITEMS: StatusItem[] = [
  { id: "core", name: "passport-core · TypeScript", status: "works" },
  { id: "cli", name: "multiversa passport · Go", status: "works" },
  { id: "template", name: "open-passport-template", status: "works" },
  { id: "mcp", name: "mcp-passport", status: "lab" },
  { id: "contract", name: "Contrato V0", status: "pending" },
];

export const LAB_TASKS = [
  "LAB-001",
  "LAB-002",
  "LAB-003",
  "LAB-004",
  "LAB-005",
  "LAB-006",
  "LAB-007",
  "LAB-008",
  "LAB-009",
  "LAB-010",
] as const;

export type TaskId = (typeof LAB_TASKS)[number];

export const MODELS = ["ChatGPT", "Claude", "Gemini", "Grok", "Qwen", "Mistral"];
