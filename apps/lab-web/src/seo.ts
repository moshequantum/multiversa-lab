/**
 * Per-language <head> for the prerendered pages (scripts/prerender.mjs). Server-only: it is
 * imported by src/entry-server.tsx, never by the client bundle.
 *
 * Every string comes from src/i18n or src/content, so the head, the JSON-LD and the visible page
 * can't drift apart. In particular the FAQPage is built from t.faq, the same items the visible
 * FAQ section renders.
 */
import { DICTIONARIES, LANGUAGE_PATHS, LANGUAGES, type Language } from "./i18n";
import { CUTOFF, GROUP_URL, REPO_URL } from "./content/passport";

export const SITE_URL = "https://lab.multiversa.group";

interface PageMeta {
  language: Language;
  /** URL path of the page; also its output directory under dist/. */
  path: string;
  /** BCP 47 tag for <html lang> and hreflang. */
  hreflang: string;
  ogLocale: string;
  ogImage: string;
}

export const PAGES: PageMeta[] = [
  { language: "es", path: LANGUAGE_PATHS.es, hreflang: "es", ogLocale: "es_419", ogImage: "/og-image.png" },
  { language: "en", path: LANGUAGE_PATHS.en, hreflang: "en", ogLocale: "en_US", ogImage: "/og-image-en.png" },
];

const pageFor = (language: Language) => PAGES.find((p) => p.language === language)!;
const abs = (path: string) => `${SITE_URL}${path}`;

const SOFTWARE_COPY: Record<Language, { name: string; description: string; status: string }> = {
  es: {
    name: "OpenPassport (prototipo): passport-core, CLI multiversa passport y plantilla",
    description:
      "Prototipo funcional de laboratorio: paquete de contexto en Markdown con manifest, hashes SHA-256 por archivo y perfiles de exposición. OpenPassport no tiene release etiquetada propia; el Contrato V0 está pendiente.",
    status: "Prototipo funcional",
  },
  en: {
    name: "OpenPassport (prototype): passport-core, the multiversa passport CLI and template",
    description:
      "Working lab prototype: a Markdown context package with a manifest, per-file SHA-256 hashes and exposure profiles. OpenPassport has no tagged release of its own; Contract V0 is pending.",
    status: "Working prototype",
  },
};

/** Drops the Rich markers (`code`, *em*) used by the dictionaries. */
export const plainText = (rich: string) => rich.replace(/`([^`]+)`/g, "$1").replace(/\*([^*]+)\*/g, "$1");

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** JSON inside <script>: escape "<" so no string can close the tag. */
const jsonForScript = (value: unknown) => JSON.stringify(value, null, 2).replace(/</g, "\\u003c");

export function structuredData(language: Language) {
  const t = DICTIONARIES[language];
  const page = pageFor(language);
  const url = abs(page.path);
  const software = SOFTWARE_COPY[language];
  const org = `${GROUP_URL}/#organization`;
  const author = `${SITE_URL}/#author`;
  const website = `${SITE_URL}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "Multiversa Group",
        url: GROUP_URL,
        logo: { "@type": "ImageObject", url: abs("/apple-touch-icon.png"), width: 512, height: 512 },
      },
      {
        "@type": "Person",
        "@id": author,
        name: "Moisés David Vera",
        url: "https://www.linkedin.com/in/soymoisesvera",
        sameAs: ["https://www.linkedin.com/in/soymoisesvera", "https://github.com/moshequantum"],
        worksFor: { "@id": org },
      },
      {
        "@type": "WebSite",
        "@id": website,
        url: abs("/"),
        name: "Multiversa Lab",
        inLanguage: LANGUAGES.map((l) => pageFor(l).hreflang),
        publisher: { "@id": org },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: page.hreflang,
        isPartOf: { "@id": website },
        about: { "@id": `${SITE_URL}/#software` },
        author: { "@id": author },
        primaryImageOfPage: { "@type": "ImageObject", url: abs(page.ogImage), width: 1200, height: 630 },
        dateModified: CUTOFF,
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#software`,
        name: software.name,
        description: software.description,
        creativeWorkStatus: software.status,
        inLanguage: page.hreflang,
        codeRepository: REPO_URL,
        programmingLanguage: ["TypeScript", "Go"],
        license: "https://opensource.org/licenses/MIT",
        author: { "@id": author },
        publisher: { "@id": org },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url: `${url}#preguntas`,
        inLanguage: page.hreflang,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
        })),
      },
    ],
  };
}

/** Everything that differs per language inside <head>. */
export function renderHead(language: Language): string {
  const t = DICTIONARIES[language];
  const page = pageFor(language);
  const url = abs(page.path);
  const image = abs(page.ogImage);
  const others = PAGES.filter((p) => p.language !== language);
  const meta = (attr: "name" | "property", key: string, value: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;
  return [
    `<title>${escapeText(t.meta.title)}</title>`,
    meta("name", "description", t.meta.description),
    `<link rel="canonical" href="${url}" />`,
    ...PAGES.map((p) => `<link rel="alternate" hreflang="${p.hreflang}" href="${abs(p.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${abs(LANGUAGE_PATHS.es)}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:url", url),
    meta("property", "og:site_name", "Multiversa Lab"),
    meta("property", "og:title", t.meta.title),
    meta("property", "og:description", t.meta.description),
    meta("property", "og:locale", page.ogLocale),
    ...others.map((p) => meta("property", "og:locale:alternate", p.ogLocale)),
    meta("property", "og:image", image),
    meta("property", "og:image:secure_url", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", t.meta.ogImageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", t.meta.title),
    meta("name", "twitter:description", t.meta.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", t.meta.ogImageAlt),
    meta("name", "twitter:creator", "@moshequantum"),
    meta("name", "twitter:site", "@multiversagroup"),
    `<script type="application/ld+json">\n${jsonForScript(structuredData(language))}\n</script>`,
  ]
    .map((line) => `    ${line}`)
    .join("\n");
}
