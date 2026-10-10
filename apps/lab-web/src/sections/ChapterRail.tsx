import { CHAPTERS } from "./SiteHeader";

/** Fixed vertical index on wide screens. Motion hook: data-motion="chapter-rail", [data-active]. */
export function ChapterRail({ active }: { active: string }) {
  return (
    <nav
      aria-hidden="true"
      data-motion="chapter-rail"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:flex flex-col gap-3 font-mono text-[10px]"
    >
      {[{ n: "00", id: "top" }, ...CHAPTERS].map((c) => (
        <a
          key={c.n}
          href={`#${c.id}`}
          tabIndex={-1}
          data-active={active === c.n ? "true" : undefined}
          className={`flex items-center gap-2 transition-colors ${active === c.n ? "text-primary" : "text-muted/50 hover:text-muted"}`}
        >
          <span className={`h-px transition-all ${active === c.n ? "w-6 bg-primary" : "w-3 bg-current"}`} />
          {c.n}
        </a>
      ))}
    </nav>
  );
}
