import type { TranslationSchema } from "./types";

/** Español (idioma por defecto; es también el del shell estático en index.html). */
export const esTranslations: TranslationSchema = {
  meta: {
    title: "Multiversa Lab — OpenPassport: contexto portable, versionado y verificable",
    description:
      "Cuaderno abierto de OpenPassport: Markdown versionado, manifest con SHA-256 y perfiles de exposición para que la verdad de un negocio viaje entre modelos. Prototipo funcional; Contrato V0 pendiente.",
  },
  common: {
    cutoffLabel: "10 oct 2026",
    skipToContent: "Saltar al contenido",
    copyCommand: "Copiar comando",
    copied: "Copiado",
    replayRun: "Repetir la ejecución",
    replay: "Repetir",
  },
  header: {
    homeLabel: "Multiversa Lab, inicio",
    lab: "Lab",
    researchPreview: "Research preview",
    chaptersNav: "Capítulos",
    code: "Código · MIT",
    codeLabel: "Código en GitHub, licencia MIT",
    languageGroup: "Idioma",
    languages: { es: "Español", en: "English" },
    chapters: {
      "01": "Anatomía",
      "02": "Integridad",
      "03": "Gobernanza",
      "04": "Posición",
      "05": "Cuaderno",
      "06": "Bitácora",
      "07": "Úsalo",
    },
  },
  status: {
    works: "Prototipo funcional",
    lab: "En laboratorio",
    pending: "Pendiente: Contrato V0",
  },
  hero: {
    kicker: "Cuaderno abierto de OpenPassport",
    title: "Cada modelo empieza de cero. La verdad de tu negocio se",
    accent: "diluye.",
    lede: "Cambias de ChatGPT a Claude, de Claude a Gemini, de una persona a otra, y el contexto se reconstruye a mano. Cada copia diverge. OpenPassport es nuestro experimento para fijar esa verdad: Markdown versionado, un manifest con hashes SHA-256 y perfiles de exposición. Lo carga cualquier modelo; lo verifica cualquier persona; le pertenece a quien lo origina.",
    meta: {
      formatLabel: "Formato",
      formatValue: "Markdown + manifest",
      integrityLabel: "Integridad",
      integrityValue: "SHA-256 · UTF-8 · LF",
      stateLabel: "Estado",
      stateValue: "Prototipo funcional",
    },
    ctaRead: "Leer el cuaderno",
    ctaRepo: "Ver el repositorio",
    figLabel: "Fig. 0",
    figCaption: "La misma empresa, tres verdades",
    fragments: [
      { model: "ChatGPT", claim: "oferta: la del PDF de marzo", tag: "desactualizado" },
      { model: "Claude", claim: "tono: el del último chat", tag: "deriva" },
      { model: "Gemini", claim: "estado actual: —", tag: "sin contexto" },
    ],
    converge: "un Passport, cargado en los tres",
    passportSummary: "7 capas · sha256 por archivo · perfiles",
    verify: "verify → 100% PASS",
  },
  anatomy: {
    label: "Anatomía",
    title: "Un Passport es una carpeta. Su contrato es el",
    accent: "manifest.",
    lede: "Siete capas en Markdown, numeradas en el orden en que un modelo debe leerlas. Un manifest.json declara cada archivo: capa, tipo, visibilidad y hash. Lo que no está en el manifest no forma parte del Passport.",
    layersLabel: "Las siete capas",
    layers: {
      identity: {
        title: "Identidad",
        body: "Quién origina el Passport, para qué existe y qué no es. Se lee primero y no cambia por sesión.",
      },
      doctrine: {
        title: "Doctrina",
        body: "Principios que no se negocian. Lo que ningún modelo puede reinterpretar a conveniencia de la conversación.",
      },
      voice: {
        title: "Voz",
        body: "Registro, léxico y palabras vetadas. Regula cómo se habla, no deforma términos técnicos.",
      },
      offer: {
        title: "Oferta",
        body: "Qué se ofrece y con qué alcance. El modelo no inventa servicios fuera de esta capa.",
      },
      governance: {
        title: "Gobernanza",
        body: "Quién tiene autoridad, qué exige aprobación humana y qué no se hace nunca.",
      },
      state: {
        title: "Estado actual",
        body: "La verdad operativa con fecha de corte (asOf). Nada posterior a esa fecha se asume.",
      },
      evidence: {
        title: "Evidencia",
        body: "Qué está confirmado, qué está declarado y qué es hipótesis. Cada afirmación con su nivel.",
      },
    },
    entryCaption: "manifest.json → files[{n}]",
    entryReal: "real",
    loadOrder: "Orden de carga · loadContract",
    loadOrderListed: "en el orden listado",
    outsideTitle: "Fuera de las siete",
    outsideBody:
      "Archivos que el manifest también declara. Runtime y capa privada existen en el Passport de Multiversa.Group v0.3.0; en la plantilla son opcionales.",
    extras: {
      "manifest.json": "Contrato del paquete: archivos, capas, hashes, perfiles y orden de carga.",
      "MASTER-PROMPT.md": "Primer contexto que lee el modelo: cómo interpretar el resto.",
      "runtime/*.json": "Qué está conectado hoy. Opcional en la plantilla.",
      "private/founder-private.md": "Contexto del originador. Nunca sale en un perfil público.",
    },
    labNoteLabel: "Nota de laboratorio · ",
    labNote:
      "Las siete capas son lo que funciona hoy. El Contrato V0 propone diez dominios (Identity, Business, Brand & Voice, Offer, Customers, Operations, Knowledge, Governance, Evidence, Current State) y una migración determinista desde las siete capas que reporta lo que no pudo mapear (LAB-001, LAB-003). Mientras no exista, no lo anunciamos como estándar.",
  },
  integrity: {
    label: "Integridad",
    title: "Si cambia un byte, el Passport",
    accent: "lo dice.",
    lede: "La portabilidad sin verificación es solo otra copia que diverge. Por eso el formato fija un contrato de bytes y cada archivo viaja con su hash.",
    specs: [
      {
        title: "Contrato de bytes",
        body: "UTF-8 y finales de línea LF. Un .gitattributes impide que Git en Windows convierta a CRLF y rompa los hashes; `build --fix-crlf` normaliza antes de sellar.",
      },
      {
        title: "SHA-256 por archivo",
        body: "Cada archivo declarado lleva el hash de sus bytes exactos, en hex minúscula. Cambiar una coma cambia el hash.",
      },
      {
        title: "manifestSelfHash",
        body: "El manifest se hashea a sí mismo: su propia entrada se reemplaza por 64 ceros, se serializa con 2 espacios y LF, y se calcula el SHA-256. Mismo resultado en TypeScript y en Go.",
      },
    ],
    termNote: "# ahora alteramos un byte de la capa de voz",
    termFooter: "Salida real de la CLI compilada desde *cli/* · {cutoff} · ruta abreviada",
    provesTitle: "Lo que prueba",
    provesBody:
      "Que los bytes que lees son los que se sellaron. Si alguien edita una capa sin reconstruir el manifest, *verify* falla y dice qué archivo y qué hash.",
    notYetTitle: "Lo que todavía no prueba",
    notYetBody:
      "Quién lo selló: no hay firma de autor todavía. La CLI en Go no tiene tests propios, y el fallback de CI puede declarar integridad completa tras revisar solo el manifest. Corregirlo es `LAB-008`.",
  },
  governance: {
    label: "Gobernanza",
    title: "El modelo propone. Quien origina el Passport",
    accent: "decide.",
    lede: "Un perfil define qué archivos ve cada consumidor. El mismo Passport alimenta un chat público y un asistente interno sin mezclar lo que cada uno puede leer.",
    fileColumn: "Archivo",
    tableCaption: "Archivos incluidos por perfil",
    included: "incluido",
    excluded: "excluido",
    priv: "priv",
    pub: "pub",
    figCaption: "Fig. 3 — Perfiles reales del Passport de Multiversa.Group v0.3.0 (manifest.json).",
    failClosedTitle: "Fail-closed",
    failClosedTag: "Parcial",
    failClosedBody:
      "Un perfil desconocido es un error, nunca acceso total. La CLI ya lo cumple al exportar: `perfil 'nope' no encontrado en manifest.json`. El servidor MCP todavía no: si no encuentra el perfil, no filtra. Corregirlo es `LAB-007`.",
    authorityTitle: "El paquete no concede autoridad",
    authorityBody:
      "Cargar un Passport no le da a ningún agente permiso para actuar ni crea memoria implícita. Las decisiones sensibles pasan por una persona.",
    vocabularyTitle: "Un vocabulario, no dos",
    vocabularyBody:
      "Hoy la plantilla identifica perfiles con `id` y el Passport de Group con `name`. Dos consumidores pueden leer distinto el mismo archivo. Unificarlo es `LAB-001` y `LAB-004`.",
    quoteA: "“La IA propone;",
    quoteB: "el humano decide.",
  },
  position: {
    label: "Posición",
    aside: "memoria ≠ verdad canónica",
    title: "La memoria recuerda. El Passport",
    accent: "establece.",
    lede: "No compiten. La memoria de trabajo guarda lo que pasó; el Passport fija lo que es cierto, con versión y hash. Uno vive debajo del otro, y el modelo consulta ambos.",
    canonicalLayer: "Capa canónica",
    canonicalTraits: "versionado · hasheado · gobernado · del originador",
    loadsInto: "↓ se carga en",
    modelsAndAgents: "Modelos y agentes",
    queries: "↓ consultan",
    workingMemory: "Memoria de trabajo",
    memoryExamples: "pgvector · memoria del proveedor · Engram",
    figCaption: "Fig. 4 — Dónde se ubica el Passport.",
    rows: [
      { k: "Qué guarda", mem: "Lo que ocurrió: observaciones, decisiones y resúmenes de sesiones.", pp: "Lo que es verdad para el negocio: identidad, oferta, gobierno, estado." },
      { k: "Quién escribe", mem: "El agente, de forma automática o semiautomática.", pp: "El originador, con revisión humana." },
      { k: "Cómo cambia", mem: "Continuamente, en cada sesión.", pp: "Por versión: packageVersion y fecha de corte asOf." },
      { k: "Verificación", mem: "La que ofrezca cada motor.", pp: "SHA-256 por archivo y manifestSelfHash." },
      { k: "Portabilidad", mem: "Vive en su motor: base vectorial, proveedor o binario local.", pp: "Carpeta de texto plano; se carga en cualquier modelo." },
      { k: "Propiedad", mem: "Según la herramienta o el proveedor.", pp: "originator-owned, declarado en el manifest." },
    ],
    engramNote:
      "Engram es memoria persistente de código abierto para agentes de programación, de Gentleman Programming. En el Lab es un upstream recomendado, no un rival: recuerda el trabajo; el Passport fija el criterio.",
  },
  notebook: {
    label: "Cuaderno de laboratorio",
    cutoff: "corte",
    title: "Lo que funciona, lo que falta y lo que",
    accent: "no prometemos.",
    lede: "Esto es un laboratorio, no un producto empaquetado. Publicamos el estado verificado con fecha de corte, y lo corregimos en público cuando nos equivocamos.",
    status: {
      core: "3 de 3 tests pasan. No publicado en npm.",
      cli: "Compila. verify: 100 % PASS sobre el Passport de Multiversa.Group v0.3.0. Sin tests propios.",
      template: "Existe en el repositorio. verify: PASS.",
      mcp: "El código existe. No verificado en uso. Un perfil desconocido hoy no falla cerrado.",
      contract: "Esquema versionado, fixtures, paridad TS/Go, MCP fail-closed y release. 10 tareas abiertas.",
    },
    contractTitle: "Contrato V0",
    contractProgress: "· 0 de 10",
    tasks: {
      "LAB-001": "Congelar vocabulario y política de versiones",
      "LAB-002": "Publicar JSON Schema y fixtures canónicos",
      "LAB-003": "Migración de 7 capas a 10 dominios",
      "LAB-004": "Alinear semántica de perfiles y visibilidad",
      "LAB-005": "TypeScript core como comportamiento canónico",
      "LAB-006": "Paridad de la CLI en Go y export contenido",
      "LAB-007": "Acceso por perfil fail-closed en MCP",
      "LAB-008": "Verificación de integridad honesta en CI",
      "LAB-009": "Reproducibilidad con Docker",
      "LAB-010": "Empaquetar y documentar una release versionada",
    },
    releaseTitle: "Canal de release",
    release: [
      { k: "Repositorio", v: "Laboratorio abierto. main se mueve." },
      { k: "Versión estable", v: "La release etiquetada que controla el fundador." },
      { k: "Etiquetas publicadas", v: "Ninguna." },
      { k: "Primera etiqueta", v: "v0.1.0 · pendiente" },
    ],
    errataTitle: "Erratas",
    errataIntro: "Retiramos dos afirmaciones de versiones anteriores de esta página:",
    errata: [
      { claim: "OpenPassport v1.0 como estándar emitido.", correction: "El código existe; la release, no." },
      { claim: "Validado en 8 proyectos reales.", correction: "No había evidencia que lo respaldara." },
    ],
  },
  logbook: {
    label: "Bitácora",
    title: "Qué hicimos, cuándo y",
    accent: "con qué.",
    lede: "Un registro fechado de cómo trabaja el Lab y qué herramientas usa. Una línea por entrada; lo más reciente arriba.",
    tags: { passport: "passport", web: "web", flujo: "flujo", release: "release", contrato: "contrato" },
    entries: {
      "2026-10-10-tools":
        "Herramientas del flujo de trabajo: Claude (interfaz de Claude y Claude Code), Gentle Suite y Gentle Shell de Gentleman Programming.",
      "2026-10-10-landing":
        "Landing del Lab alineada al ADN visual de Multiversa: mismos tokens Cosmic Night y tipografía que Multiversa.Group.",
      "2026-10-10-release-model":
        "Modelo de publicación: el repositorio es el laboratorio; la versión estable será una release etiquetada. Todavía no hay etiquetas.",
      "2026-10-10-passport-030":
        "Passport 0.3.0/0.3.1: verdad única entre web, CV y Passport; hashes verificados con la CLI `multiversa passport verify`.",
    },
    creditsTitle: "Herramientas",
    creditsAccent: "y créditos",
    creditsBody:
      "Crédito donde corresponde. Estas herramientas son parte de nuestro flujo de trabajo. Es atribución, no aval: ninguno de sus autores patrocina ni respalda a Multiversa, y sus nombres y marcas pertenecen a ellos.",
    credits: {
      claude: {
        body: "La interfaz de Claude y Claude Code: investigación, escritura y construcción asistida. La IA propone; nosotros decidimos.",
      },
      "gentle-suite": {
        body: "Gentle AI configura los agentes de programación que ya usas (Claude Code, Cursor, OpenCode, Codex, Pi…). Engram es memoria persistente para agentes: binario en Go con SQLite + FTS5 y servidor MCP.",
        license: "Código abierto · MIT",
      },
      "gentle-shell": {
        body: "Arnés de agente de programación nativo de Pi para desarrollo controlado (antes gentle-pi).",
        license: "Código abierto · MIT",
      },
    },
  },
  getIt: {
    label: "Úsalo",
    aside: "MIT · código abierto",
    title: "Clona. Verifica.",
    accent: "Decide tú.",
    lede: "Todo lo de esta página está en el repositorio, con licencia MIT. Estos comandos se ejecutaron tal cual antes de publicarlos.",
    steps: [
      { title: "Clona el laboratorio", out: "" },
      { title: "Core en TypeScript", out: "# tests 3 · pass 3 · fail 0" },
      { title: "CLI en Go", out: "go 1.23+ · binario local" },
      { title: "Verifica la plantilla", out: "[100% PASS]" },
      { title: "Crea el tuyo", out: "escribe las 7 capas, .gitattributes y MASTER-PROMPT.md" },
      { title: "Edita las capas y séllalo", out: "hashes + manifestSelfHash + generation.receipt.json · luego: export --profile core-public" },
    ],
    ownerKicker: "Para quien dirige un negocio",
    ownerTitle: "¿Prefieres no abrir una terminal?",
    ownerBody:
      "Multiversa.Group construye el Passport contigo, en lenguaje de negocio. El Lab no vende nada: aquí está el código; allá, el acompañamiento.",
  },
  footer: {
    quote: "Un cuaderno abierto: lo que intentamos, lo que pasó y",
    quoteAccent: "lo que falta.",
    license: "Multiversa.Lab · licencia MIT",
    cutoff: "corte",
    builtBy: "Construido en público por Moisés David Vera.",
    linksLabel: "Enlaces",
    repo: "Repositorio",
    roadmap: "Roadmap",
    credits: "Créditos",
  },
};
