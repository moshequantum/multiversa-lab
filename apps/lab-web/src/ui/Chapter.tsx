import { Children, Fragment, isValidElement, type ReactNode } from "react";

/**
 * Splits the plain-text parts of a headline into word spans (.hw) for the mask-rise entrance.
 * Elements (the serif <Accent>) are kept whole: they arrive last, on their own cue.
 */
function splitWords(node: ReactNode, counter: { i: number }): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part) =>
      part === "" || /^\s+$/.test(part) ? (
        part
      ) : (
        <span key={`w${counter.i}`} className="hw" style={{ ["--i" as string]: counter.i++ }}>
          {part}
        </span>
      )
    );
  }
  if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) {
    return splitWords(node.props.children, counter);
  }
  if (Array.isArray(node)) {
    return Children.toArray(node).map((n) => splitWords(n, counter));
  }
  return node;
}

interface ChapterProps {
  id: string;
  n: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Editorial chapter shell: hairline, mono kicker ("01 — ANATOMÍA"), large headline and an
 * offset lede. Motion hooks: data-chapter on the section, data-reveal on header pieces; the
 * headline's words rise in sequence and the serif accent resolves last (motion.css).
 */
export function Chapter({ id, n, label, title, lede, aside, children, className = "" }: ChapterProps) {
  const counter = { i: 0 };
  const words = splitWords(title, counter);
  return (
    <section
      id={id}
      data-chapter={n}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-20 px-5 sm:px-8 lg:px-12 py-24 sm:py-32 ${className}`}
    >
      <div className="max-w-page mx-auto">
        <div className="relative flex items-baseline justify-between gap-6 border-t hairline pt-5" data-reveal="fade">
          <span aria-hidden="true" className="chapter-sweep" />
          <p className="kicker" data-motion="kicker">
            <span className="text-primary">{n}</span>
            <span className="mx-2 text-muted/60">—</span>
            {label}
          </p>
          {aside && <div className="kicker hidden sm:block text-right">{aside}</div>}
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-10">
          <h2
            id={`${id}-title`}
            data-reveal
            data-motion="headline"
            style={{ ["--words" as string]: counter.i }}
            className="lg:col-span-9 headline font-sans font-semibold text-[2.15rem] sm:text-5xl lg:text-[4.1rem] text-ivory"
          >
            {words}
          </h2>
          {lede && (
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "260ms" }}
              className="lg:col-start-5 lg:col-span-7 lede text-base sm:text-lg text-muted font-light"
            >
              {lede}
            </p>
          )}
        </div>

        <div className="mt-14 sm:mt-20">{children}</div>
      </div>
    </section>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent-serif text-primary">{children}</span>;
}
