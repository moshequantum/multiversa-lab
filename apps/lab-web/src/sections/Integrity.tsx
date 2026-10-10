import type React from "react";
import { Chapter, Accent } from "../ui/Chapter";
import { Terminal, type TermLine } from "../ui/Terminal";
import { CUTOFF_LABEL } from "../content/passport";

const SPECS: { n: string; title: string; body: React.ReactNode; mono: string }[] = [
  {
    n: "i",
    title: "Contrato de bytes",
    body: <>UTF-8 y finales de línea LF. Un .gitattributes impide que Git en Windows convierta a CRLF y rompa los hashes; <span className="font-mono text-[13px] text-ivory whitespace-nowrap">build --fix-crlf</span> normaliza antes de sellar.</>,
    mono: "hashByteContract: \"UTF-8, LF line endings\"",
  },
  {
    n: "ii",
    title: "SHA-256 por archivo",
    body: "Cada archivo declarado lleva el hash de sus bytes exactos, en hex minúscula. Cambiar una coma cambia el hash.",
    mono: "hashAlgorithm: \"sha256\" · hashEncoding: \"lowercase-hex\"",
  },
  {
    n: "iii",
    title: "manifestSelfHash",
    body: "El manifest se hashea a sí mismo: su propia entrada se reemplaza por 64 ceros, se serializa con 2 espacios y LF, y se calcula el SHA-256. Mismo resultado en TypeScript y en Go.",
    mono: "raw-bytes-with-own-sha256-replaced-by-64-zeroes",
  },
];

// Real output of the Go CLI built from cli/ in this repository (path shortened).
const LINES: TermLine[] = [
  { kind: "cmd", text: "multiversa passport verify ./open-passport-template" },
  { kind: "out", text: "🔒 Verificando integridad criptográfica en: …/open-passport-template" },
  { kind: "ok", text: "🎉 [100% PASS] Todos los archivos verificados con hashes SHA-256 e integridad LF determinista." },
  { kind: "note", text: "# ahora alteramos un byte de la capa de voz" },
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
  return (
    <Chapter
      id="integridad"
      n="02"
      label="Integridad"
      aside="SHA-256 · UTF-8 · LF"
      title={
        <>
          Si cambia un byte, el Passport <Accent>lo dice.</Accent>
        </>
      }
      lede="La portabilidad sin verificación es solo otra copia que diverge. Por eso el formato fija un contrato de bytes y cada archivo viaja con su hash."
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
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-ivory">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            <p className="mt-5 font-mono text-[11px] text-ivory/70 break-words">{s.mono}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8" data-reveal data-motion="verify-run">
          <Terminal
            title="~/multiversa-lab · multiversa passport verify"
            lines={LINES}
            footer={<>Salida real de la CLI compilada desde <span className="text-ivory">cli/</span> · {CUTOFF_LABEL} · ruta abreviada</>}
          />
        </div>
        <div className="lg:col-span-4 space-y-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <div>
            <p className="kicker">Lo que prueba</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Que los bytes que lees son los que se sellaron. Si alguien edita una capa sin reconstruir el manifest, <span className="text-ivory">verify</span> falla y dice qué archivo y qué hash.
            </p>
          </div>
          <div>
            <p className="kicker">Lo que todavía no prueba</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Quién lo selló: no hay firma de autor todavía. La CLI en Go no tiene tests propios, y el fallback de CI puede declarar integridad completa tras revisar solo el manifest. Corregirlo es <span className="font-mono text-ivory text-[13px]">LAB-008</span>.
            </p>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
