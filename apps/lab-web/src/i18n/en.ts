import type { TranslationSchema } from "./types";

/**
 * English. Written in the Lab's own voice (a research notebook: what we tried, what happened,
 * what's missing), not as a literal translation. It must not claim anything the Spanish doesn't.
 * Real CLI output stays as printed (in Spanish); commands, hashes and paths are untouched.
 */
export const enTranslations: TranslationSchema = {
  meta: {
    title: "Multiversa Lab — OpenPassport: portable, versioned, verifiable context",
    description:
      "OpenPassport's open notebook: versioned Markdown, a SHA-256 manifest and exposure profiles so a business's truth can travel between models. Working prototype; Contract V0 pending.",
  },
  common: {
    cutoffLabel: "Oct 10, 2026",
    skipToContent: "Skip to content",
    copyCommand: "Copy command",
    copied: "Copied",
    replayRun: "Replay the run",
    replay: "Replay",
  },
  header: {
    homeLabel: "Multiversa Lab, home",
    lab: "Lab",
    researchPreview: "Research preview",
    chaptersNav: "Chapters",
    code: "Code · MIT",
    codeLabel: "Code on GitHub, MIT license",
    languageGroup: "Language",
    languages: { es: "Español", en: "English" },
    chapters: {
      "01": "Anatomy",
      "02": "Integrity",
      "03": "Governance",
      "04": "Position",
      "05": "Notebook",
      "06": "Logbook",
      "07": "Use it",
    },
  },
  status: {
    works: "Working prototype",
    lab: "In the lab",
    pending: "Pending: Contract V0",
  },
  hero: {
    kicker: "OpenPassport's open notebook",
    title: "Every model starts from zero. Your business's truth gets",
    accent: "diluted.",
    lede: "You move from ChatGPT to Claude, from Claude to Gemini, from one person to the next, and the context gets rebuilt by hand. Every copy drifts. OpenPassport is our experiment to pin that truth down: versioned Markdown, a manifest with SHA-256 hashes, and exposure profiles. Any model can load it; anyone can verify it; it belongs to whoever originates it.",
    meta: {
      formatLabel: "Format",
      formatValue: "Markdown + manifest",
      integrityLabel: "Integrity",
      integrityValue: "SHA-256 · UTF-8 · LF",
      stateLabel: "Status",
      stateValue: "Working prototype",
    },
    ctaRead: "Read the notebook",
    ctaRepo: "View the repository",
    figLabel: "Fig. 0",
    figCaption: "Same company, three truths",
    fragments: [
      { model: "ChatGPT", claim: "offer: the one in March's PDF", tag: "outdated" },
      { model: "Claude", claim: "tone: whatever the last chat used", tag: "drift" },
      { model: "Gemini", claim: "current state: —", tag: "no context" },
    ],
    converge: "one Passport, loaded into all three",
    passportSummary: "7 layers · sha256 per file · profiles",
    verify: "verify → 100% PASS",
  },
  anatomy: {
    label: "Anatomy",
    title: "A Passport is a folder. Its contract is the",
    accent: "manifest.",
    lede: "Seven Markdown layers, numbered in the order a model should read them. A manifest.json declares every file: layer, type, visibility and hash. If it isn't in the manifest, it isn't part of the Passport.",
    layersLabel: "The seven layers",
    layers: {
      identity: {
        title: "Identity",
        body: "Who originates the Passport, what it exists for and what it isn't. Read first; it doesn't change from session to session.",
      },
      doctrine: {
        title: "Doctrine",
        body: "Non-negotiable principles. What no model gets to reinterpret to suit the conversation.",
      },
      voice: {
        title: "Voice",
        body: "Register, vocabulary and banned words. It shapes how things are said without bending technical terms.",
      },
      offer: {
        title: "Offer",
        body: "What is offered and how far it goes. The model doesn't invent services outside this layer.",
      },
      governance: {
        title: "Governance",
        body: "Who holds authority, what needs human approval and what never happens.",
      },
      state: {
        title: "Current state",
        body: "Operational truth with a cut-off date (asOf). Nothing after that date is assumed.",
      },
      evidence: {
        title: "Evidence",
        body: "What is confirmed, what is declared and what is a hypothesis. Every claim carries its level.",
      },
    },
    entryCaption: "manifest.json → files[{n}]",
    entryReal: "real",
    loadOrder: "Load order · loadContract",
    loadOrderListed: "in listed order",
    outsideTitle: "Outside the seven",
    outsideBody:
      "Files the manifest declares as well. Runtime and the private layer exist in the Multiversa.Group Passport v0.3.0; in the template they're optional.",
    extras: {
      "manifest.json": "The package contract: files, layers, hashes, profiles and load order.",
      "MASTER-PROMPT.md": "The first context the model reads: how to interpret everything else.",
      "runtime/*.json": "What is connected today. Optional in the template.",
      "private/founder-private.md": "The originator's context. Never ships in a public profile.",
    },
    labNoteLabel: "Lab note · ",
    labNote:
      "The seven layers are what works today. Contract V0 proposes ten domains (Identity, Business, Brand & Voice, Offer, Customers, Operations, Knowledge, Governance, Evidence, Current State) and a deterministic migration from the seven layers that reports whatever it couldn't map (LAB-001, LAB-003). Until it exists, we don't call it a standard.",
  },
  integrity: {
    label: "Integrity",
    title: "Change one byte and the Passport",
    accent: "says so.",
    lede: "Portability without verification is just another copy waiting to drift. So the format pins a byte contract, and every file travels with its hash.",
    specs: [
      {
        title: "Byte contract",
        body: "UTF-8 and LF line endings. A .gitattributes file keeps Git on Windows from converting to CRLF and breaking the hashes; `build --fix-crlf` normalizes before sealing.",
      },
      {
        title: "SHA-256 per file",
        body: "Every declared file carries the hash of its exact bytes, in lowercase hex. Change a comma and the hash changes.",
      },
      {
        title: "manifestSelfHash",
        body: "The manifest hashes itself: its own entry is replaced with 64 zeros, it's serialized with 2-space indentation and LF, and the SHA-256 is computed. Same result in TypeScript and in Go.",
      },
    ],
    termNote: "# now we alter one byte in the voice layer",
    termFooter: "Real output of the CLI built from *cli/* · {cutoff} · path shortened",
    provesTitle: "What it proves",
    provesBody:
      "That the bytes you're reading are the ones that were sealed. If someone edits a layer without rebuilding the manifest, *verify* fails and tells you which file and which hash.",
    notYetTitle: "What it doesn't prove yet",
    notYetBody:
      "Who sealed it: there's no author signature yet. The Go CLI has no tests of its own, and the CI fallback can report full integrity after checking only the manifest. Fixing that is `LAB-008`.",
  },
  governance: {
    label: "Governance",
    title: "The model proposes. Whoever originates the Passport",
    accent: "decides.",
    lede: "A profile defines which files each consumer sees. The same Passport can feed a public chat and an internal assistant without mixing what each one is allowed to read.",
    fileColumn: "File",
    tableCaption: "Files included per profile",
    included: "included",
    excluded: "excluded",
    priv: "priv",
    pub: "pub",
    figCaption: "Fig. 3 — Real profiles from the Multiversa.Group Passport v0.3.0 (manifest.json).",
    failClosedTitle: "Fail-closed",
    failClosedTag: "Partial",
    failClosedBody:
      "An unknown profile is an error, never full access. The CLI already does this on export: `perfil 'nope' no encontrado en manifest.json`. The MCP server doesn't yet: if it can't find the profile, it doesn't filter. Fixing that is `LAB-007`.",
    authorityTitle: "The package grants no authority",
    authorityBody:
      "Loading a Passport doesn't give any agent permission to act, and it doesn't create implicit memory. Sensitive decisions go through a person.",
    vocabularyTitle: "One vocabulary, not two",
    vocabularyBody:
      "Today the template identifies profiles by `id` and the Group Passport by `name`. Two consumers can read the same file differently. Unifying them is `LAB-001` and `LAB-004`.",
    quoteA: "“AI proposes;",
    quoteB: "the human decides.",
  },
  position: {
    label: "Position",
    aside: "memory ≠ canonical truth",
    title: "Memory remembers. The Passport",
    accent: "establishes.",
    lede: "They don't compete. Working memory keeps what happened; the Passport pins down what's true, with a version and a hash. One sits beneath the other, and the model consults both.",
    canonicalLayer: "Canonical layer",
    canonicalTraits: "versioned · hashed · governed · originator-owned",
    loadsInto: "↓ loaded into",
    modelsAndAgents: "Models and agents",
    queries: "↓ query",
    workingMemory: "Working memory",
    memoryExamples: "pgvector · provider memory · Engram",
    figCaption: "Fig. 4 — Where the Passport sits.",
    rows: [
      { k: "What it keeps", mem: "What happened: observations, decisions and session summaries.", pp: "What is true for the business: identity, offer, governance, state." },
      { k: "Who writes", mem: "The agent, automatically or semi-automatically.", pp: "The originator, with human review." },
      { k: "How it changes", mem: "Continuously, every session.", pp: "By version: packageVersion and an asOf cut-off date." },
      { k: "Verification", mem: "Whatever each engine offers.", pp: "SHA-256 per file and manifestSelfHash." },
      { k: "Portability", mem: "Lives in its engine: vector database, provider or local binary.", pp: "A folder of plain text; loads into any model." },
      { k: "Ownership", mem: "Depends on the tool or the provider.", pp: "originator-owned, declared in the manifest." },
    ],
    engramNote:
      "Engram is open-source persistent memory for coding agents, by Gentleman Programming. In the Lab it's a recommended upstream, not a rival: it remembers the work; the Passport pins the judgment.",
  },
  notebook: {
    label: "Lab notebook",
    cutoff: "cut-off",
    title: "What works, what's missing and what we",
    accent: "don't promise.",
    lede: "This is a lab, not a packaged product. We publish the verified state with a cut-off date, and we correct it in public when we get something wrong.",
    status: {
      core: "3 of 3 tests pass. Not published on npm.",
      cli: "Builds. verify: 100% PASS on the Multiversa.Group Passport v0.3.0. No tests of its own.",
      template: "Lives in the repository. verify: PASS.",
      mcp: "The code exists. Not verified in use. An unknown profile doesn't fail closed today.",
      contract: "Versioned schema, fixtures, TS/Go parity, fail-closed MCP and a release. 10 open tasks.",
    },
    contractTitle: "Contract V0",
    contractProgress: "· 0 of 10",
    tasks: {
      "LAB-001": "Freeze the vocabulary and versioning policy",
      "LAB-002": "Publish the JSON Schema and canonical fixtures",
      "LAB-003": "Migration from 7 layers to 10 domains",
      "LAB-004": "Align profile and visibility semantics",
      "LAB-005": "TypeScript core as the canonical behavior",
      "LAB-006": "Go CLI parity and content export",
      "LAB-007": "Fail-closed per-profile access in MCP",
      "LAB-008": "Honest integrity verification in CI",
      "LAB-009": "Reproducibility with Docker",
      "LAB-010": "Package and document a versioned release",
    },
    releaseTitle: "Release channel",
    release: [
      { k: "Repository", v: "Open lab. main moves." },
      { k: "Stable version", v: "The tagged release the founder controls." },
      { k: "Published tags", v: "None." },
      { k: "First tag", v: "v0.1.0 · pending" },
    ],
    errataTitle: "Errata",
    errataIntro: "We've withdrawn two claims made by earlier versions of this page:",
    errata: [
      { claim: "OpenPassport v1.0 as an issued standard.", correction: "The code exists; the release doesn't." },
      { claim: "Validated on 8 real projects.", correction: "There was no evidence to back it." },
    ],
  },
  logbook: {
    label: "Logbook",
    title: "What we did, when, and",
    accent: "with what.",
    lede: "A dated record of how the Lab works and which tools it uses. One line per entry; newest first.",
    tags: { passport: "passport", web: "web", flujo: "workflow", release: "release", contrato: "contract" },
    entries: {
      "2026-10-10-tools":
        "Workflow tools: Claude (the Claude app and Claude Code), plus Gentle Suite and Gentle Shell by Gentleman Programming.",
      "2026-10-10-landing":
        "Lab landing aligned with Multiversa's visual DNA: the same Cosmic Night tokens and typography as Multiversa.Group.",
      "2026-10-10-release-model":
        "Publishing model: the repository is the lab; the stable version will be a tagged release. No tags yet.",
      "2026-10-10-passport-030":
        "Passport 0.3.0/0.3.1: a single truth across the website, CV and Passport; hashes verified with the CLI `multiversa passport verify`.",
    },
    creditsTitle: "Tools",
    creditsAccent: "and credits",
    creditsBody:
      "Credit where it's due. These tools are part of how we work. This is attribution, not endorsement: none of their authors sponsors or backs Multiversa, and their names and marks belong to them.",
    credits: {
      claude: {
        body: "The Claude app and Claude Code: research, writing and assisted building. AI proposes; we decide.",
      },
      "gentle-suite": {
        body: "Gentle AI configures the coding agents you already use (Claude Code, Cursor, OpenCode, Codex, Pi…). Engram is persistent memory for agents: a Go binary with SQLite + FTS5 and an MCP server.",
        license: "Open source · MIT",
      },
      "gentle-shell": {
        body: "A Pi-native coding-agent harness for controlled development (formerly gentle-pi).",
        license: "Open source · MIT",
      },
    },
  },
  getIt: {
    label: "Use it",
    aside: "MIT · open source",
    title: "Clone. Verify.",
    accent: "You decide.",
    lede: "Everything on this page is in the repository, under the MIT license. These commands were run exactly as shown before we published them.",
    steps: [
      { title: "Clone the lab", out: "" },
      { title: "TypeScript core", out: "# tests 3 · pass 3 · fail 0" },
      { title: "Go CLI", out: "go 1.23+ · local binary" },
      { title: "Verify the template", out: "[100% PASS]" },
      { title: "Create your own", out: "writes the 7 layers, .gitattributes and MASTER-PROMPT.md" },
      { title: "Edit the layers and seal it", out: "hashes + manifestSelfHash + generation.receipt.json · then: export --profile core-public" },
    ],
    ownerKicker: "If you run a business",
    ownerTitle: "Rather not open a terminal?",
    ownerBody:
      "Multiversa.Group builds the Passport with you, in business language. The Lab sells nothing: the code is here; the hands-on support is over there.",
  },
  footer: {
    quote: "An open notebook: what we tried, what happened and",
    quoteAccent: "what's missing.",
    license: "Multiversa.Lab · MIT license",
    cutoff: "cut-off",
    builtBy: "Built in public by Moisés David Vera.",
    linksLabel: "Links",
    repo: "Repository",
    roadmap: "Roadmap",
    credits: "Credits",
  },
};
