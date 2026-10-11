import { Accent } from "../ui/Chapter";
import { Rich } from "../ui/Rich";
import { useI18n } from "../i18n";

/**
 * Compact FAQ, after chapter 07 and before the footer. Unnumbered on purpose: it restates what the
 * chapters already say. It is also the only source of the FAQPage JSON-LD (src/seo.ts), so the
 * structured data can never claim something the page doesn't show.
 */
export function Faq() {
  const { t } = useI18n();
  const f = t.faq;
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="relative scroll-mt-20 px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32">
      <div className="max-w-page mx-auto">
        <div className="border-t hairline pt-5" data-reveal="fade">
          <p className="kicker">
            <span className="text-primary">?</span>
            <span className="mx-2 text-muted/60">—</span>
            {f.label}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10">
          <h2 id="preguntas-title" className="lg:col-span-4 headline font-sans font-semibold text-[1.9rem] sm:text-4xl text-ivory">
            {f.title} <Accent>{f.accent}</Accent>
          </h2>
          <dl className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {f.items.map((item, i) => (
              <div key={i} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 60}ms` }} className="border-t hairline pt-4">
                <dt className="text-[15px] font-semibold tracking-tight text-ivory">{item.q}</dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-muted [overflow-wrap:anywhere]">
                  <Rich text={item.a} codeClassName="font-mono text-[12.5px] text-ivory" />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
