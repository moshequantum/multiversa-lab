import { Chapter, Accent } from "../ui/Chapter";
import { Terminal, type TermLine } from "../ui/Terminal";
import { useI18n } from "../i18n";
import { Rich } from "../ui/Rich";

/** Spec ids and their machine-readable contract line (code, not translated). */
const SPECS = [
  { n: "i", mono: "hashByteContract: \"UTF-8, LF line endings\"" },
  { n: "ii", mono: "hashAlgorithm: \"sha256\" · hashEncoding: \"lowercase-hex\"" },
  { n: "iii", mono: "raw-bytes-with-own-sha256-replaced-by-64-zeroes" },
];

// Real output of the Go CLI built from cli/ in this repository (path shortened). The CLI prints
// Spanish, so its output stays verbatim in both languages; only our comment line is translated.
const lines = (note: string): TermLine[] => [
  { kind: "cmd", text: "multiversa passport verify ./open-passport-template" },
  { kind: "out", text: "🔒 Verificando integridad criptográfica en: …/open-passport-template" },
  { kind: "ok", text: "🎉 [100% PASS] Todos los archivos verificados con hashes SHA-256 e integridad LF determinista." },
  { kind: "note", text: note },
  { kind: "cmd", text: "echo tamper >> ./open-passport-template/03-VOICE.md" },
  { kind: "cmd", text: "multiversa passport verify ./open-passport-template" },
  { kind: "out", text: "🔒 Verificando integridad criptográfica en: …/open-passport-template" },
  { kind: "err", text: "💥 Falló la verificación de integridad:" },
  {
    kind: "err",
    text: "  - Hash inválido para 03-VOICE.md: esperado=b1e0352c856f0b6302bf0405055bd5de8beef9b67b901bf258e2d9d41d37dbb6, obtenido=1e0a8150268ac7effe020f671f4b842dacf1ee3bab0fe9c35a5b7d99d1e92198",
  },
  { kind: "note", text: "# exit status 1" },
];

/** Chapter 02 — integrity: byte contract, per-file SHA-256, manifest self-hash, real verify run. */
export function Integrity() {
  const { t } = useI18n();
  const g = t.integrity;
  return (
    <Chapter
      id="integridad"
      n="02"
      label={g.label}
      aside="SHA-256 · UTF-8 · LF"
      title={
        <>
          {g.title} <Accent>{g.accent}</Accent>
        </>
      }
      lede={g.lede}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 border-y hairline md:divide-x divide-white/[0.08]">
        {SPECS.map((s, i) => (
          <article
            key={s.n}
            data-reveal
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            className={`py-8 md:px-7 first:md:pl-0 last:md:pr-0 ${i > 0 ? "border-t md:border-t-0 hairline" : ""}`}
          >
            <p className="font-serif italic text-2xl text-primary">{s.n}.</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-ivory">{g.specs[i].title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Rich text={g.specs[i].body} codeClassName="font-mono text-[13px] text-ivory whitespace-nowrap" />
            </p>
            <p className="mt-5 font-mono text-[11px] text-ivory/70 break-words">{s.mono}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8" data-reveal data-motion="verify-run">
          <Terminal
            title="~/multiversa-lab · multiversa passport verify"
            lines={lines(g.termNote)}
            session
            footer={<Rich text={g.termFooter.replace("{cutoff}", t.common.cutoffLabel)} />}
          />
        </div>
        <div className="lg:col-span-4 space-y-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div>
            <p className="kicker">{g.provesTitle}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Rich text={g.provesBody} />
            </p>
          </div>
          <div>
            <p className="kicker">{g.notYetTitle}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Rich text={g.notYetBody} />
            </p>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
