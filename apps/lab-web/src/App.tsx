import { useState } from "react";
import {
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Copy,
  ExternalLink,
  Code2,
  Lock,
  GitBranch,
  FileCheck,
  ChevronRight,
} from "lucide-react";

interface LayerDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  invariable: string;
  snippet: string;
}

const LAYERS: LayerDetail[] = [
  {
    id: "01",
    name: "01-IDENTITY.md",
    category: "Capa Fundacional",
    description: "Identidad canónica innegociable, quién es el titular, propósito del sistema y límites de lo que NO es.",
    invariable: "Invariante de Identidad: No muta por sesión ni por deriva de conversación.",
    snippet: `# 01 · IDENTIDAD (IDENTITY)\n\n> Definición formal del titular, visión fundacional y delimitación cerrada.\n> Todo agente debe verificar esta capa antes de asumir cualquier rol.`,
  },
  {
    id: "02",
    name: "02-DOCTRINE.md",
    category: "Capa Filosófica",
    description: "Axiomas innegociables, principios rectores y militancia implacable contra el slop y la condescendencia.",
    invariable: "Prueba del Intercambio: Si el texto podría llevar la firma de un coach genérico, es inválido.",
    snippet: `# 02 · DOCTRINA Y AXIOMAS INNEGOCIABLES\n\n1. Conceptos antes que código.\n2. Cero complacencia espiritual ni clichés artificiales de IA.\n3. La tecnología permanece en el core; la experiencia se presenta en lenguaje humano.`,
  },
  {
    id: "03",
    name: "03-VOICE.md",
    category: "Capa Expresiva",
    description: "Matriz de contraste (Qué NO decir vs Qué decir siempre), whitelist de conceptos de autor y diccionario tabú.",
    invariable: "Invariante de Tono: Regula cómo se habla, no deforma el código técnico.",
    snippet: `# 03 · VOZ Y SALVAGUARDAS DE LENGUAJE\n\n- Palabras Tabú: "brilla con luz propia", "un tapiz de", "es crucial recordar".\n- Whitelist de Autor: Conceptos técnicos precisos y lenguaje de trinchera.`,
  },
  {
    id: "04",
    name: "04-OFFER.md",
    category: "Capa Comercial",
    description: "Catálogo cerrado de entregables con alcances específicos, excluyendo promesas no pactadas.",
    invariable: "Alcance Cerrado: El agente jamás inventa servicios fuera de este catálogo.",
    snippet: `# 04 · OFERTA Y ALCANCE CERRADO\n\n- Slot Puntual: Diagnóstico e ingesta de orden.\n- Slot Continuo: Modernización y acompañamiento por fases (Ordenar, Controlar, Automatizar).`,
  },
  {
    id: "05",
    name: "05-GOVERNANCE.md",
    category: "Capa Legal y Autoridad",
    description: "Reparto de autoridad (Titular vs Founding Engineer), salvaguardas legales, cero diagnósticos y privacidad estricta.",
    invariable: "Invariante de Soberanía: Exclusión absoluta de retención de datos ajenos.",
    snippet: `# 05 · GOBERNANZA Y AUTORIDAD (ADR-001)\n\n- Reparto de Autoridad: Titular Fundador / Founding AI Product Engineer.\n- Deslinde Legal: Ningún agente emite diagnósticos médicos ni compromisos fiduciarios.`,
  },
  {
    id: "06",
    name: "06-CURRENT-STATE.md",
    category: "Capa Temporal",
    description: "Invariante temporal con fecha de corte estricta (asOf: YYYY-MM-DD). La verdad operativa observable hoy.",
    invariable: "Invariante Temporal: Ningún hecho posterior a la fecha asOf puede asumirse sin actualización.",
    snippet: `# 06 · ESTADO TEMPORAL Y ENTORNO ACTIVO\n\n**Fecha de corte (asOf):** 2026-09-29\n**Naturaleza:** Temporal; fotografía verificada de infraestructura e hitos reales.`,
  },
  {
    id: "07",
    name: "07-EVIDENCE.md",
    category: "Capa Epistemológica",
    description: "Clasificación rigurosa en 5 niveles de certeza para evitar alucinaciones y falsas promesas.",
    invariable: "Escala Epistémica: [1] Confirmado > [2] Declarado > [3] Histórico > [4] Hipótesis > [5] Propuesta.",
    snippet: `# 07 · EVIDENCIA EPISTEMOLÓGICA\n\n- [Nivel 1 - Confirmado]: Datos en producción auditados.\n- [Nivel 2 - Declarado]: Afirmaciones del titular.\n- [Nivel 4 - Hipótesis]: En validación activa.`,
  },
];

export default function App() {
  const [selectedLayer, setSelectedLayer] = useState<LayerDetail>(LAYERS[0]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-ivory flex flex-col font-sans selection:bg-primary/20 selection:text-gold">
      
      {/* Top Header */}
      <header className="border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between sticky top-0 bg-canvas/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono font-bold text-sm">
            M
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
              <span>Multiversa.Lab</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                Research Preview
              </span>
            </div>
            <div className="text-[11px] font-mono text-muted">lab.multiversa.group</div>
          </div>
        </div>

        <nav className="flex items-center gap-4 text-xs font-mono">
          <a
            href="https://multiversa.group"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-white transition-colors hidden sm:flex items-center gap-1"
          >
            <span>Multiversa.Group</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/moshequantum/multiversa-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-surface border border-white/10 hover:border-primary/40 text-white transition-all flex items-center gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5 text-primary" />
            <span>GitHub (MIT)</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-24">
        
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-white/10 text-xs font-mono text-sand">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Research Preview · Estándar Canónico Validado en 8 Proyectos Reales</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif italic text-white tracking-tight leading-[1.1]">
            Memoria y contexto determinista para la era agéntica.
          </h1>

          <p className="text-base sm:text-lg text-copy/85 font-light leading-relaxed max-w-3xl">
            Cuando cambias de modelo, agente o ventana de chat, el contexto se corrompe.
            <strong> OpenPassport v1.0</strong> es la arquitectura de 7 capas, CLI nativo en Go y servidor MCP
            para Claude, Cursor y Gemini que convierte identidad, doctrina y negocio en un proceso portable y matemáticamente verificable.
          </p>

          {/* Quickstart Command Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/10 flex items-center justify-between gap-4 font-mono text-xs text-sand flex-1 shadow-2xl">
              <div className="flex items-center gap-2.5 overflow-x-auto">
                <Terminal className="w-4 h-4 text-primary shrink-0" />
                <span className="text-copy select-all">curl -fsSL https://lab.multiversa.group/install.sh | bash</span>
              </div>
              <button
                onClick={() => copyToClipboard("curl -fsSL https://lab.multiversa.group/install.sh | bash", "curl")}
                className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors shrink-0"
                title="Copiar comando"
              >
                {copiedCmd === "curl" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/10 flex items-center justify-between gap-4 font-mono text-xs text-sand shadow-2xl">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-copy select-all">pnpm dlx @multiversa/mcp-passport</span>
              </div>
              <button
                onClick={() => copyToClipboard("pnpm dlx @multiversa/mcp-passport", "pnpm")}
                className="p-1.5 rounded-lg hover:bg-white/5 text-muted hover:text-white transition-colors shrink-0"
                title="Copiar comando"
              >
                {copiedCmd === "pnpm" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mathematical Precedence Engine Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-card border border-white/10 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Fórmula Matemática de Precedencia (Invariante Dura)</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-canvas border border-white/5 font-mono text-xs sm:text-sm text-white overflow-x-auto whitespace-nowrap leading-relaxed">
            <span className="text-gold font-bold">Instrucción Titular</span> &gt;{" "}
            <span className="text-amber-300">Gobernanza (05)</span> &gt;{" "}
            <span className="text-sand">Identidad/Doctrina (01,02)</span> &gt;{" "}
            <span className="text-copy">Oferta (04)</span> &gt;{" "}
            <span className="text-muted">Voz (03)</span> &gt;{" "}
            <span className="text-emerald-400">Evidencia (07)</span> &gt;{" "}
            <span className="text-indigo-400">Estado Temporal (06)</span> &gt;{" "}
            <span className="text-muted/60">Conocimiento General</span>
          </div>

          <p className="text-xs text-muted font-light leading-relaxed">
            Ningún sesgo complaciente del modelo fundacional puede anular un límite de gobernanza ni alterar un axioma doctrinario.
            El motor de precedencia se inyecta en <code className="text-sand">MASTER-PROMPT.md</code> y gobierna cada interacción agéntica.
          </p>
        </section>

        {/* 7 Layers Interactive Inspector */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-semibold">
              <Layers className="w-4 h-4 text-primary" />
              <span>Arquitectura Modular de 7 Capas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
              Inspección del Estándar Canónico
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Layer Selection Buttons */}
            <div className="lg:col-span-4 space-y-2">
              {LAYERS.map((layer) => {
                const isActive = layer.id === selectedLayer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-surface border-primary/50 text-white shadow-lg"
                        : "bg-surface/40 border-white/5 text-muted hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono font-medium flex items-center gap-2">
                        <span className={isActive ? "text-primary" : "text-muted"}>{layer.id}</span>
                        <span>{layer.name}</span>
                      </div>
                      <div className="text-[11px] font-sans text-muted/80">{layer.category}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-primary translate-x-1" : "text-muted/40"}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Card */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 space-y-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-primary font-semibold">{selectedLayer.category}</span>
                  <h3 className="text-xl font-medium text-white mt-0.5">{selectedLayer.name}</h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CAPA DETERMINISTA</span>
                </div>
              </div>

              <p className="text-sm text-copy/90 font-light leading-relaxed">
                {selectedLayer.description}
              </p>

              <div className="p-3.5 rounded-xl bg-card border border-white/5 text-xs font-mono text-sand">
                <strong className="text-primary font-semibold">Garantía Innegociable:</strong> {selectedLayer.invariable}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-muted flex items-center justify-between">
                  <span>Estructura de Referencia</span>
                  <span className="text-[10px]">UTF-8 · LF</span>
                </div>
                <pre className="p-4 rounded-2xl bg-canvas border border-white/5 text-xs font-mono text-copy overflow-x-auto whitespace-pre leading-relaxed">
                  {selectedLayer.snippet}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Trench Engineering */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-surface/70 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">Normalización LF & CRLF</h3>
            <p className="text-xs text-copy/80 font-light leading-relaxed">
              Inyección mandatoria de <code className="text-sand font-mono">.gitattributes</code> en cada pasaporte.
              Evita que Windows corrompa los hashes SHA-256 al subir o clonar desde Git, Terabox o Drive.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-surface/70 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">manifestSelfHash (64 Ceros)</h3>
            <p className="text-xs text-copy/80 font-light leading-relaxed">
              Algoritmo matemático que rompe la circularidad criptográfica: sustituye el propio hash del manifiesto
              por 64 ceros antes de calcular la suma, garantizando verificación reproducible en cualquier lenguaje.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-surface/70 border border-white/10 space-y-4 shadow-xl">
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-medium text-white">Cero Retención de Datos</h3>
            <p className="text-xs text-copy/80 font-light leading-relaxed">
              El pasaporte es propiedad soberana del usuario. No se aloja en nubes de terceros ni envía telemetría.
              Se versiona localmente y viaja en contenedores seguros.
            </p>
          </div>
        </section>

        {/* Tooling Suite */}
        <section className="p-8 sm:p-10 rounded-3xl bg-card border border-white/10 space-y-8 shadow-2xl">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Ecosistema de Herramientas Multiversa.Lab
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
              Herramientas de Terminal, Core & Protocolos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-white/5 space-y-3">
              <div className="text-xs font-mono text-primary font-medium">Plano de Control en Terminal</div>
              <h4 className="text-base font-semibold text-white">multiversa CLI (Go)</h4>
              <p className="text-xs text-copy/80 font-light leading-relaxed">
                Binario único de 15 MB compilado en Go sin dependencias externas. Comandos: <code className="text-sand font-mono">init</code>, <code className="text-sand font-mono">lint</code>, <code className="text-sand font-mono">build</code>, <code className="text-sand font-mono">verify</code> y <code className="text-sand font-mono">export</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-white/5 space-y-3">
              <div className="text-xs font-mono text-secondary font-medium">Model Context Protocol</div>
              <h4 className="text-base font-semibold text-white">@multiversa/mcp-passport</h4>
              <p className="text-xs text-copy/80 font-light leading-relaxed">
                Servidor MCP sobre stdio compatible con Claude Desktop, Cursor y Gemini. Expone recursos y resuelve contexto bajo la fórmula de precedencia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-white/5 space-y-3">
              <div className="text-xs font-mono text-emerald-400 font-medium">Motor Agnóstico TypeScript</div>
              <h4 className="text-base font-semibold text-white">@multiversa/passport-core</h4>
              <p className="text-xs text-copy/80 font-light leading-relaxed">
                Paquete zero-dependency con validación estricta de esquemas, normalizador LF, generador de receipts y cálculo determinista de sumas SHA-256.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 sm:px-12 py-8 mt-12 bg-canvas">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">Multiversa.Lab</span>
            <span>·</span>
            <span>Estándar OpenPassport v1.0</span>
            <span>·</span>
            <span className="text-sand">Licencia MIT</span>
          </div>
          <div>
            Diseñado & Construido por <strong className="text-white font-medium">Moisés David Vera</strong> (Founding AI Product Engineer)
          </div>
        </div>
      </footer>

    </div>
  );
}
