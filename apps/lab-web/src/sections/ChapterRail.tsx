import { CHAPTERS } from "./SiteHeader";

/**
 * Fixed vertical index on wide screens. Motion hooks: data-motion="chapter-rail", [data-active].
 * A hairline track on the left fills with reading progress (scroll timeline, motion.css); the
 * active tick extends with a transform, so the indicator glides between chapters.
 */
export function ChapterRail({ active }: { active: string }) {
  return (
    <nav
      aria-hidden="true"
      data-motion="chapter-rail"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex flex-col gap-3 font-mono text-[10px]"
    >
      <span className="absolute -left-2.5 -top-1 -bottom-1 w-px bg-white/[0.08]">
        <span className="rail-fill block h-full w-full origin-top bg-primary/70" />
      </span>
      {[{ n: "00", id: "top" }, ...CHAPTERS].map((c) => {
        const on = active === c.n;
        return (
          <a
            key={c.n}
            href={`#${c.id}`}
            tabIndex={-1}
            data-active={on ? "true" : undefined}
            className={`flex items-center gap-2 transition-colors duration-500 ${on ? "text-primary" : "text-muted/50 hover:text-muted"}`}
          >
            <span
              className={`h-px w-6 origin-left transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] ${
                on ? "scale-x-100 bg-primary" : "scale-x-50 bg-current"
              }`}
            />
            <span className={`transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] ${on ? "translate-x-0" : "-translate-x-3"}`}>
              {c.n}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
