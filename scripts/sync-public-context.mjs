import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const sourcePath = resolve(root, 'docs/ecosystem.public.json');
// The landing moved from landing/ to apps/lab-web; Vite copies public/ into the build.
const staticDir = resolve(root, 'apps/lab-web/public');
const checkOnly = process.argv.includes('--check');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, '\n');

for (const key of ['schema_version', 'updated', 'site', 'surfaces', 'components', 'boundaries', 'agent_policy', 'crawl']) {
  if (source[key] == null) throw new Error(`ecosystem.public.json: falta ${key}`);
}
if (!source.site.url.startsWith('https://')) throw new Error('site.url debe usar HTTPS');
if (source.site.visibility !== 'public') throw new Error('El contexto web generado sólo admite datos públicos');
if (!/^\d{4}-\d{2}-\d{2}$/.test(source.updated)) throw new Error('updated debe usar YYYY-MM-DD');
if (new Set(source.surfaces.map(({ name }) => name)).size !== source.surfaces.length) throw new Error('Las superficies deben tener nombres únicos');
if (source.crawl.disallow.some((path) => !path.startsWith('/'))) throw new Error('Cada ruta Disallow debe comenzar con /');
const languages = source.site.languages ?? [];
const siteRoot = `${source.site.url}/`;
for (const lang of languages) {
  if (!lang.hreflang || !lang.url?.startsWith(siteRoot)) throw new Error(`site.languages: idioma inválido ${JSON.stringify(lang)}`);
}
if (languages.length && languages.filter((lang) => lang.default).length !== 1) throw new Error('site.languages: debe haber exactamente un idioma por defecto');
for (const surface of source.surfaces) {
  for (const [hreflang, url] of Object.entries(surface.alternates ?? {})) {
    if (!url.startsWith('https://')) throw new Error(`${surface.name}: alternate ${hreflang} debe usar HTTPS`);
  }
}
const aiAgents = source.crawl.ai_agents ?? [];
if (aiAgents.some((agent) => !/^[A-Za-z0-9-]+$/.test(agent))) throw new Error('crawl.ai_agents: nombres de user-agent inválidos');
const releases = source.releases?.items ?? [];

const forbiddenKeys = /^(api_?key|secret|password|access_?token|tenant_?id|client_?name|contract)$/i;
const inspectKeys = (value, path = '$') => {
  if (Array.isArray(value)) return value.forEach((item, index) => inspectKeys(item, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.test(key)) throw new Error(`Campo privado no permitido en contexto público: ${path}.${key}`);
    inspectKeys(child, `${path}.${key}`);
  }
};
inspectKeys(source);

const lines = (items, render) => items.map(render).join('\n');
const llms = `# ${source.site.name}

> ${source.site.summary}

${source.positioning.statement} ${source.positioning.ethic}

## Superficies

${lines(source.surfaces, (item) => `- [${item.name}](${item.url}): ${item.description} Estado: ${item.status}.`)}

## Componentes curados

${lines(source.components, (item) => `- [${item.name}](${item.upstream}): ${item.role}. Licencia upstream: ${item.license}.`)}

${languages.length ? `## Idiomas

${lines(languages, (lang) => `- [${lang.code}${lang.default ? ', por defecto' : ''}](${lang.url})`)}

` : ''}${releases.length ? `## Estado de releases (${source.releases.as_of})

${source.releases.note}

${lines(releases, (item) => `- [${item.name}](${item.repository}): ${item.status}. ${item.detail}`)}

` : ''}## Documentación

${lines(source.public_documents, (item) => `- [${item.title}](${item.url}): ${item.description}`)}

## Límites

${lines(source.boundaries, (item) => `- ${item}`)}

## Uso recomendado

- Idioma por defecto: ${source.positioning.default_locale}
- No asumir hechos que no aparezcan en este archivo o en las fuentes enlazadas.
- Verificar estado y versiones en los repositorios antes de afirmar que algo está publicado.
- Contexto expandido: [llms-full.txt](${source.site.url}/llms-full.txt)
- Política para agentes: [agents.txt](${source.site.url}/agents.txt)
`;

const llmsFull = `${llms}
## Contrato público completo

\`\`\`json
${JSON.stringify(source, null, 2)}
\`\`\`
`;

const agents = `# ${source.site.name} — agents.txt
# Generado desde docs/ecosystem.public.json. No editar manualmente.

Project: ${source.site.name}
Repository: ${source.site.repository}
Language: ${source.site.language}
Visibility: ${source.site.visibility}
Ethic: ${source.positioning.ethic}

# ALLOWED
${lines(source.agent_policy.allow, (item) => `Allow: ${item}`)}

# RESTRICTED
${lines(source.agent_policy.disallow, (item) => `Disallow: ${item}`)}

# CONTEXT
Context: ${source.site.url}/llms.txt
Full-Context: ${source.site.url}/llms-full.txt
Machine-Context: ${source.site.url}/ecosystem.json
`;

const crawlRules = `Allow: /
${lines(source.crawl.disallow, (path) => `Disallow: ${path}`)}`;
const robots = `# ${source.site.name} — generado desde docs/ecosystem.public.json
User-agent: *
${crawlRules}
${aiAgents.length ? `
# Crawlers de IA: el Lab quiere ser leído por modelos. Se listan para que su política sea
# explícita; un grupo propio reemplaza al de *, por eso repite las mismas reglas.
${lines(aiAgents, (agent) => `User-agent: ${agent}`)}
${crawlRules}
` : ''}
Sitemap: ${source.site.url}/sitemap.xml

# Contexto para modelos y agentes (informativo; robots.txt no es autorización)
${lines(source.crawl.context_paths, (path) => `# ${source.site.url}${path}`)}
`;

// Each sitemap surface contributes its URL and, if it has hreflang alternates, one <url> per
// language; every entry lists all alternates (itself included), as the hreflang spec requires.
const sitemapEntries = source.surfaces
  .filter((item) => item.sitemap)
  .flatMap((item) => {
    const alternates = Object.entries(item.alternates ?? {});
    const locs = alternates.length ? [...new Set(alternates.filter(([lang]) => lang !== 'x-default').map(([, url]) => url))] : [item.url];
    return locs.map((loc) => ({ loc, alternates }));
  });
const sitemapEntry = ({ loc, alternates }) => alternates.length
  ? `  <url>
    <loc>${loc}</loc>
    <lastmod>${source.updated}</lastmod>
${lines(alternates, ([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`)}
  </url>`
  : `  <url><loc>${loc}</loc><lastmod>${source.updated}</lastmod></url>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${lines(sitemapEntries, sitemapEntry)}
</urlset>
`;

const machine = `${JSON.stringify({ ...source, generated_by: 'scripts/sync-public-context.mjs' }, null, 2)}\n`;
const generatedDoc = `# Contexto público del ecosistema

Este archivo es generado. La fuente canónica es [ecosystem.public.json](./ecosystem.public.json).

El loop documental produce y valida:

- \`apps/lab-web/public/robots.txt\`
- \`apps/lab-web/public/llms.txt\`
- \`apps/lab-web/public/llms-full.txt\`
- \`apps/lab-web/public/agents.txt\`
- \`apps/lab-web/public/ecosystem.json\`
- \`apps/lab-web/public/sitemap.xml\`

Ejecutar \`pnpm context:sync\` después de cambiar la fuente y \`pnpm context:check\` para detectar deriva.
`;

const outputs = new Map([
  [resolve(staticDir, 'robots.txt'), robots],
  [resolve(staticDir, 'llms.txt'), llms],
  [resolve(staticDir, 'llms-full.txt'), llmsFull],
  [resolve(staticDir, 'agents.txt'), agents],
  [resolve(staticDir, 'ecosystem.json'), machine],
  [resolve(staticDir, 'sitemap.xml'), sitemap],
  [resolve(root, 'docs/PUBLIC-CONTEXT.md'), generatedDoc]
]);

const drift = [];
for (const [path, content] of outputs) {
  let current = null;
  try { current = await readFile(path, 'utf8'); } catch {}
  // Git may materialize tracked text as CRLF on Windows. The generated
  // document is semantically identical, so compare normalized bytes while
  // continuing to write canonical LF output when synchronization is needed.
  if (current != null && normalizeLineEndings(current) === content) continue;
  if (checkOnly) drift.push(path.replace(`${root}/`, ''));
  else {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content, 'utf8');
    process.stdout.write(`updated ${path.replace(`${root}/`, '')}\n`);
  }
}

if (drift.length) {
  process.stderr.write(`Contexto público fuera de sincronía:\n- ${drift.join('\n- ')}\nEjecuta: pnpm context:sync\n`);
  process.exitCode = 1;
} else if (checkOnly) {
  process.stdout.write('Contexto público sincronizado.\n');
}
