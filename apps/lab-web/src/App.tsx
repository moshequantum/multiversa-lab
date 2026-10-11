import { SiteHeader } from "./sections/SiteHeader";
import { ChapterRail } from "./sections/ChapterRail";
import { Hero } from "./sections/Hero";
import { Anatomy } from "./sections/Anatomy";
import { Integrity } from "./sections/Integrity";
import { Governance } from "./sections/Governance";
import { Position } from "./sections/Position";
import { Notebook } from "./sections/Notebook";
import { Logbook } from "./sections/Logbook";
import { GetIt } from "./sections/GetIt";
import { Faq } from "./sections/Faq";
import { SiteFooter } from "./sections/SiteFooter";
import { useActiveChapter, useReveal } from "./ui/useReveal";
import { useScrollChrome } from "./motion/useScrollChrome";
import { useI18n } from "./i18n";

export default function App() {
  useReveal();
  useScrollChrome();
  const active = useActiveChapter();
  const { t } = useI18n();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ivory focus:px-3 focus:py-2 focus:text-canvas">
        {t.common.skipToContent}
      </a>
      <SiteHeader active={active} />
      <ChapterRail active={active} />
      <main id="main">
        <Hero />
        <Anatomy />
        <Integrity />
        <Governance />
        <Position />
        <Notebook />
        <Logbook />
        <GetIt />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
