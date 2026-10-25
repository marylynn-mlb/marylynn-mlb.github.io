// Builds the whole site into dist/.
// Inputs:
//   content/projects/*.md        project files (PROJECT.md schema), used when a project has no repo copy
//   .cache/remote/<repo>/        PROJECT.md files pulled from project repos by fetch-remote.mjs (these win)
//   content/pages/*.md           long-form pages (POV, sabbatical, AI Use)
// Output: plain HTML/CSS/JS ready for GitHub Pages.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://marylynn-mlb.github.io';
const LINKEDIN = 'https://www.linkedin.com/in/marylynn/';
const EMAIL = 'mlb@getbrightlight.com';

const COLORS = { gold: '#CCA300', red: '#ED4319', grey: '#8B8D92' };
const STATUS = { idea: 'Idea', 'in-development': 'In development', live: 'Live', retired: 'Retired' };
const TYPE = { tool: 'Tool', writing: 'Writing' };

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (rel, text) => {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
};
const copy = (from, rel) => {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.cpSync(from, out, { recursive: true });
};

function parseFile(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  return { data: YAML.parse(m[1]) || {}, body: m[2].trim() };
}

function fmtDate(s) {
  if (!s) return '';
  const d = new Date(`${String(s).slice(0, 10)}T00:00:00Z`);
  if (isNaN(d)) return String(s);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// ---------- Load projects ----------
const projects = new Map();

function addProject({ data, body, baseDir, meta = {} }) {
  const slug = String(data.slug || meta.repoName || '').trim();
  if (!slug) throw new Error('A project is missing its slug');
  if (!data.title) throw new Error(`Project "${slug}" is missing a title`);
  const type = data.type === 'writing' ? 'writing' : 'tool';
  const status = STATUS[data.status] ? data.status : 'in-development';
  const p = {
    ...data,
    slug,
    type,
    status,
    body,
    baseDir,
    repo: data.repo || meta.repoUrl || '',
    demo: data.demo || meta.homepage || '',
    word: String(data.word || String(data.title).split(/[\s/]+/)[0]).toUpperCase().slice(0, 9),
    color: COLORS[data.color] || COLORS.gold,
    order: Number.isFinite(data.order) ? data.order : 999
  };
  projects.set(slug, p);
}

for (const f of fs.readdirSync(path.join(ROOT, 'content/projects')).filter((f) => f.endsWith('.md'))) {
  const { data, body } = parseFile(read(path.join(ROOT, 'content/projects', f)));
  // Images for a local project live in content/projects/<slug>/ next to its .md file.
  const slugDir = path.join(ROOT, 'content/projects', String(data.slug || f.replace(/\.md$/, '')));
  addProject({ data, body, baseDir: fs.existsSync(slugDir) ? slugDir : path.join(ROOT, 'content/projects') });
}

const remoteDir = path.join(ROOT, '.cache/remote');
if (fs.existsSync(remoteDir)) {
  for (const repoName of fs.readdirSync(remoteDir)) {
    const dir = path.join(remoteDir, repoName);
    const file = path.join(dir, 'PROJECT.md');
    if (!fs.existsSync(file)) continue;
    const metaFile = path.join(dir, 'meta.json');
    const meta = fs.existsSync(metaFile) ? JSON.parse(read(metaFile)) : {};
    const { data, body } = parseFile(read(file));
    const slug = data.slug || repoName;
    const local = projects.get(slug);
    // Fields the repo's PROJECT.md leaves out fall back to the local file (e.g. card word, color, order).
    addProject({ data: { ...(local || {}), ...data, slug }, body: body || local?.body || '', baseDir: dir, meta: { ...meta, repoName } });
    console.log(`remote PROJECT.md used for ${slug}`);
  }
}

const list = [...projects.values()].sort((a, b) => a.order - b.order || String(b.updated || '').localeCompare(String(a.updated || '')));
for (const p of list) {
  p.hasPage = Boolean(p.body && p.body.trim());
  p.href = p.hasPage ? `/projects/${p.slug}/` : p.demo || p.repo || '';
  p.external = !p.hasPage && Boolean(p.href);
}

// ---------- Layout ----------
const NAV = [
  ['Home', '/'],
  ['Projects', '/projects/'],
  ['POV', '/pov-learning-products/']
];

function layout({ title, description, body, current = '', logo = true, canonical = '/' }) {
  const nav = NAV.map(([label, href]) => {
    const on = current === href || (href !== '/' && current.startsWith(href));
    return `<a href="${href}"${on ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('\n      ');
  const fullTitle = title === 'Mary-Lynn Bragg' ? title : `${title} | Mary-Lynn Bragg`;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${canonical}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE}${canonical}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=Work+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@500;700&family=Permanent+Marker&display=swap">
<link rel="stylesheet" href="/css/site.css">
<script>document.documentElement.classList.remove('no-js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  ${logo ? '<a class="logo" href="/" aria-label="MLB, home"><img src="/assets/mlb.png" alt="MLB" width="70" height="48"></a>' : '<span></span>'}
  <nav class="nav" aria-label="Main">
      ${nav}
  </nav>
</header>
${body}
</body>
</html>
`;
}

const aiLink = '<a href="/ai-use-disclosure/">AI Use</a>';
const footerGrey = `<footer class="site-footer"><span>© 2026 by Mary-Lynn Bragg. All rights reserved.</span>${aiLink}</footer>`;
const footerTeal = `<footer class="site-footer site-footer--teal"><span>© 2026 by Mary-Lynn Bragg. All rights reserved.</span>${aiLink}</footer>`;

// ---------- Home ----------
function homePage() {
  const body = `<main id="main">
<section class="hero">
  <h1 class="display">Hi, I’m <span class="nw">Mary-Lynn</span></h1>
  <div class="hero-row">
    <div class="hero-text">
      <h2 class="display">My friends call me</h2>
      <p>I help ambitious organizations figure out where and how to grow next: new markets, business models, products, channels, or partnerships. Especially when the opportunity is promising but the path forward <span class="nw">isn’t obvious.</span></p>
    </div>
    <div class="hero-stage">
      <div class="block" aria-hidden="true"></div>
      <img class="mlb" src="/assets/mlb.png" alt="MLB" width="354" height="242">
      <img class="me" src="/assets/headshot-web.webp" alt="Mary-Lynn smiling, with silver hair and clear-framed glasses" width="1400" height="1674" fetchpriority="high">
    </div>
  </div>
</section>

<section class="band-grey" aria-label="Projects">
  <div class="copy">
    <div class="label">Projects</div>
    <h3 class="display">Looking for my projects?</h3>
    <p>In-flight experiments built with AI, shared as they are. Start with Network Atlas, a tool that turns your LinkedIn export into a picture of your network.</p>
  </div>
  <a class="btn" href="/projects/">See all projects →</a>
</section>

<section class="bets">
  <img class="bulb" src="/assets/bulb.webp" alt="" aria-hidden="true" width="541" height="880">
  <div class="inner">
    <h3 class="display">Every growth plan is a set of bets. The work is answering where to double down.</h3>
    <div class="cols">
      <p>Most growth plans are written as if the answer is already known, and you’re starting off all-in. In reality each one is a set of bets about customers, markets, and timing, and the market never stops telling you which ones are wrong. You can’t grow what you don’t understand, and you never finish understanding it.</p>
      <p>I’m the person who calls the bets, works out what would have to be true for each one to pay off, and designs the cheapest way to find out. Customer insight, market intelligence, and AI-accelerated research feed that loop. Then I own it: judgment to execution.</p>
    </div>
  </div>
</section>

<section class="moves" aria-label="Three moves">
  <span>See Patterns</span><span class="sep" aria-hidden="true">&gt;&gt;</span><span>Connect Ideas</span><span class="sep" aria-hidden="true">&gt;&gt;</span><span>Clear a Path</span>
</section>

<section class="experience">
  <div class="exp-top">
    <h3 class="display">My Experience</h3>
    <div class="body">
      <p><strong>My sweet spot:</strong> The messy space between recognizing an opportunity and making it work: understanding the market, designing the commercial approach, aligning the organization, and building the foundation for execution.</p>
      <p>I’ve most often played a role that isn’t tied to a department or job title. I connect ideas across teams, see patterns others miss, and help people turn complexity into a clear path forward. I work comfortably across strategy, partnerships, product, operations, and technology because the most interesting problems rarely stay within organizational boundaries.</p>
      <p><a class="link li-link" href="${LINKEDIN}">See more of my background &amp; connect with me on LinkedIn</a></p>
    </div>
  </div>
  <div class="exp-grid">
    <div class="exp-card">
      <div class="label">2019 – 2026</div>
      <h4>Chegg</h4>
      <ul><li>Market &amp; Growth Strategy, Skills</li><li>Sales Team Leader</li><li>Strategic Partnerships</li><li>Customer Success</li></ul>
    </div>
    <div class="exp-card">
      <div class="label">2015 – 2019</div>
      <h4>Ex Libris / ProQuest</h4>
      <ul><li>Global Campus Engagement</li><li>Client Services &amp; Success</li></ul>
    </div>
    <div class="exp-card">
      <div class="label">Senior management roles in</div>
      <ul><li>Product Management &amp; Product Design</li><li>Product Marketing</li><li>Program &amp; Project Management</li><li>Inside Sales &amp; Marketing</li><li>Strategic Development Research</li></ul>
    </div>
  </div>
</section>

<section class="cta">
  <h3 class="display">Think we should be friends? Let’s talk</h3>
  <a class="btn" href="mailto:${EMAIL}?subject=Friends%3F">${EMAIL}</a>
</section>
</main>
${footerGrey}`;
  return layout({
    title: 'Mary-Lynn Bragg',
    description: 'Mary-Lynn Bragg helps ambitious organizations figure out where and how to grow next. Strategy, partnerships, and AI-built experiments.',
    body,
    current: '/',
    logo: false,
    canonical: '/'
  });
}

// ---------- Projects index ----------
// Long words get a smaller marker size so they stay inside the card.
const wordSize = (w, base = 76) => (w.length <= 6 ? base : w.length === 7 ? Math.round(base * 0.78) : Math.round(base * 0.68));

function cardHtml(p) {
  const thumbImg = p.thumbnail ? `<img class="shot" src="/projects/${p.slug}/${p.thumbnail}" alt="">` : '';
  const teaserShot = p.teaser === false || p.thumbnail ? null : (p.screenshots || []).find((s) => s && s.file && fs.existsSync(path.join(p.baseDir, s.file)));
  const teaserImg = teaserShot ? `<img class="teaser" src="/projects/${p.slug}/${esc(teaserShot.file)}" alt="" loading="lazy"${p.teaser_position || p.teaser_opacity ? ` style="${p.teaser_position ? `object-position:${esc(p.teaser_position)};` : ''}${p.teaser_opacity ? `opacity:${Number(p.teaser_opacity)}` : ''}"` : ''}>` : '';
  const inner = `<div class="thumb" style="background:${p.color}">
      ${thumbImg || teaserImg || '<div class="sheet" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'}
      ${thumbImg ? '' : `<div class="word" aria-hidden="true" style="font-size:${wordSize(p.word)}px">${esc(p.word)}</div>`}
    </div>
    <div class="card-body">
      <div class="card-meta"><span class="kind">${TYPE[p.type]}</span><span class="badge ${p.status === 'live' ? 'live' : p.status === 'in-development' ? 'dev' : p.status}">${STATUS[p.status]}</span></div>
      <h2 class="display">${esc(p.title)}</h2>
      <p>${esc(p.summary || '')}</p>
    </div>`;
  const attrs = `data-type="${p.type}" data-status="${p.status}"`;
  if (!p.href) return `<div class="card" ${attrs}>${inner}</div>`;
  const ext = p.external ? ' rel="noopener"' : '';
  return `<a class="card" ${attrs} href="${esc(p.href)}"${ext}>${inner}</a>`;
}

function indexPage() {
  const count = (t) => list.filter((p) => t === 'all' || p.type === t).length;
  const body = `<main id="main">
<section class="index-hero">
  <div class="title">
    <h1 class="display">Projects</h1>
    <p class="note">I struggle with perfectionism, and hate sharing things in progress. I need to get over it, so here we are: in-flight projects, shared as they are. Feedback welcome.</p>
  </div>
  <div class="intro">
    <p class="lead">I’m exploring and experimenting. My attention is drawn to many things, but held by very few.</p>
    <p>Most of these projects are me testing the capabilities and limits of AI. It has let me take ideas that have lived in my head for years and turn them into something tangible I can test and use.</p>
  </div>
</section>

<section class="filters" aria-label="Filters">
  <div class="group" role="group" aria-label="Filter by type">
    <span class="label">Type</span>
    <button type="button" class="chip" data-filter="type" data-value="all" aria-pressed="true">All <span class="count">${count('all')}</span></button>
    <button type="button" class="chip" data-filter="type" data-value="tool" aria-pressed="false">Tools <span class="count">${count('tool')}</span></button>
    <button type="button" class="chip" data-filter="type" data-value="writing" aria-pressed="false">Writing <span class="count">${count('writing')}</span></button>
  </div>
  <div class="group" role="group" aria-label="Filter by status">
    <span class="label">Status</span>
    <button type="button" class="chip" data-filter="status" data-value="all" aria-pressed="true">Any</button>
    <button type="button" class="chip" data-filter="status" data-value="live" aria-pressed="false">Live</button>
    <button type="button" class="chip" data-filter="status" data-value="in-development" aria-pressed="false">In development</button>
  </div>
</section>

<section class="grid-wrap" aria-label="Projects">
  <p class="empty" id="empty" hidden>Nothing matches that combination yet.</p>
  <div class="grid" id="grid">
  ${list.map(cardHtml).join('\n  ')}
  </div>
</section>
</main>
${footerTeal}
<script src="/js/projects.js" defer></script>`;
  return layout({
    title: 'Projects',
    description: 'In-flight experiments built with AI: tools, writing, and ideas, shared as they are.',
    body,
    current: '/projects/',
    canonical: '/projects/'
  });
}

// ---------- Project page ----------
marked.setOptions({ gfm: true, breaks: false });

function renderMd(md) {
  return marked.parse(md).replace(/<p><strong>/g, '<p class="lead"><strong>');
}

function sectionsFor(body) {
  // Split on "## " into sections, then on "### " into subsections.
  const parts = body.split(/^## +/m).filter((s) => s.trim());
  return parts.map((chunk) => {
    const nl = chunk.indexOf('\n');
    const heading = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
    const rest = nl === -1 ? '' : chunk.slice(nl + 1);
    const subs = rest.split(/^### +/m);
    const intro = subs.shift().trim();
    return {
      heading,
      intro,
      subs: subs.map((s) => {
        const i = s.indexOf('\n');
        return { heading: (i === -1 ? s : s.slice(0, i)).trim(), text: i === -1 ? '' : s.slice(i + 1).trim() };
      })
    };
  });
}

function rowHtml(heading, sub, md) {
  const paras = (md.match(/\n\s*\n/g) || []).length + 1;
  return `<div class="row">
  <h2 class="display">${esc(heading)}${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</h2>
  <div class="prose${paras >= 3 ? ' loose' : ''}">
${renderMd(md)}
  </div>
</div>`;
}

function projectPage(p) {
  const rows = [];
  for (const s of sectionsFor(p.body)) {
    if (s.intro) rows.push(rowHtml(s.heading, '', s.intro));
    s.subs.forEach((sub) => rows.push(rowHtml(s.heading, sub.heading, sub.text)));
  }
  const facts = [
    ['Started', fmtDate(p.started)],
    ['Type', p.format || TYPE[p.type]],
    ['Built with', p.built_with],
    ['Status', p.status_note || STATUS[p.status] + (p.repo && p.status === 'live' ? ', open source' : '')],
    ['License', p.license]
  ].filter(([, v]) => v);
  // Only list screenshots whose image file exists, so a page never shows a broken picture.
  const shots = (p.screenshots || []).filter((s) => {
    if (!s || !s.file) return false;
    const ok = fs.existsSync(path.join(p.baseDir, s.file));
    if (!ok) console.warn(`note: ${p.slug} screenshot ${s.file} not added yet`);
    return ok;
  });
  const idx = list.filter((x) => x.hasPage);
  const next = idx[(idx.findIndex((x) => x.slug === p.slug) + 1) % idx.length];
  const showNext = idx.length > 1 && next && next.slug !== p.slug;
  // Buttons: an explicit `links` list wins; otherwise "Try it" (demo) and "See the code" (repo).
  const actions = Array.isArray(p.links) && p.links.length
    ? p.links.filter((l) => l && l.url && l.label)
    : [p.demo && { label: 'Try it →', url: p.demo }, p.repo && { label: 'See the code', url: p.repo }].filter(Boolean);
  const tagline = p.tagline ? esc(p.tagline).replace(/\n/g, '<br>') : '';
  const visual = p.thumbnail
    ? `<div class="p-visual" style="background:${p.color}"><img class="shot" src="/projects/${p.slug}/${esc(p.thumbnail)}" alt=""></div>`
    : `<div class="p-visual" aria-hidden="true" style="background:${p.color}"><div class="sheet"><i></i><i></i><i></i><i></i><i></i></div><div class="word" style="font-size:${wordSize(p.word, 108)}px">${esc(p.word)}</div></div>`;
  const body = `<main id="main">
<div class="crumb"><a class="link" href="/projects/">← All projects</a></div>
<section class="p-hero">
  <div class="info">
    <div class="pills"><span class="pill">${TYPE[p.type]}</span><span class="badge ${p.status === 'live' ? 'live' : p.status === 'in-development' ? 'dev' : p.status}">${STATUS[p.status]}</span></div>
    <h1 class="display">${esc(p.title)}</h1>
    ${tagline ? `<p class="tagline">${tagline}</p>` : ''}
    ${p.summary ? `<p class="summary">${esc(p.summary)}</p>` : ''}
    ${actions.length ? `<div class="actions">${actions.map((a, i) => `<a class="btn${i ? ' btn-outline' : ''}" href="${esc(a.url)}">${esc(a.label)}</a>`).join('')}</div>` : ''}
  </div>
  ${visual}
</section>
${facts.length ? `<section class="facts" aria-label="Project facts">${facts.map(([k, v]) => `<div class="fact"><div class="label">${k}</div><div class="v">${esc(v)}</div></div>`).join('')}</section>` : ''}
<article class="story">
${rows.join('\n')}
</article>
${shots.length ? `<section class="shots" aria-label="Screenshots"><h2 class="display">Screenshots</h2><div class="shot-grid">${shots.map((s) => {
  const src = `/projects/${p.slug}/${esc(s.file)}`;
  const alt = esc(s.alt || s.caption || '');
  const cap = esc(s.caption || '');
  return `<figure><button type="button" class="zoom" data-src="${src}" data-alt="${alt}" data-caption="${cap}" aria-label="Enlarge screenshot${cap ? ': ' + cap : ''}"><img src="${src}" alt="${alt}" loading="lazy"></button><figcaption>${cap}</figcaption></figure>`;
}).join('')}</div></section><script src="/js/lightbox.js" defer></script>` : '<div class="spacer"></div>'}
<nav class="pager" aria-label="Project navigation">
  <a href="/projects/">← All projects</a>
  ${showNext ? `<a href="/projects/${next.slug}/">Next: ${esc(next.title)} →</a>` : ''}
</nav>
</main>
<footer class="site-footer site-footer--teal"><span>© 2026 by Mary-Lynn Bragg. All rights reserved.</span>${p.updated ? `<span>Last updated ${fmtDate(p.updated)}</span>` : ''}${aiLink}</footer>`;
  return layout({
    title: p.title,
    description: p.summary || p.tagline || p.title,
    body,
    current: '/projects/',
    canonical: `/projects/${p.slug}/`
  });
}

// ---------- Long-form pages ----------
function longPage(slug, data, md) {
  const body = `<main id="main" class="long">
<div class="wrap">
  <div class="head"><h1 class="display">${esc(data.title)}</h1>${data.when ? `<p class="when">${esc(data.when)}</p>` : ''}</div>
  <article class="article">
${marked.parse(md)}
  </article>
</div>
</main>
${footerGrey}`;
  return layout({
    title: data.title,
    description: data.description || data.title,
    body,
    current: `/${slug}/`,
    canonical: `/${slug}/`
  });
}

// ---------- Build ----------
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copy(path.join(ROOT, 'assets'), 'assets');
copy(path.join(ROOT, 'css'), 'css');
copy(path.join(ROOT, 'js'), 'js');

write('index.html', homePage());
write('projects/index.html', indexPage());

const urls = ['/', '/projects/'];
for (const p of list) {
  if (!p.hasPage) continue;
  write(`projects/${p.slug}/index.html`, projectPage(p));
  urls.push(`/projects/${p.slug}/`);
  // Copy files the page references (screenshots, thumbnail) next to it.
  const refs = [p.thumbnail, ...(p.screenshots || []).map((s) => s?.file)].filter(Boolean);
  for (const rel of refs) {
    const src = path.join(p.baseDir, rel);
    if (fs.existsSync(src)) copy(src, `projects/${p.slug}/${rel}`);
  }
}
// Cards that use a thumbnail but have no page still need the file.
for (const p of list) {
  if (p.hasPage || !p.thumbnail) continue;
  const src = path.join(p.baseDir, p.thumbnail);
  if (fs.existsSync(src)) copy(src, `projects/${p.slug}/${p.thumbnail}`);
}

const pagesDir = path.join(ROOT, 'content/pages');
for (const f of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'))) {
  const { data, body } = parseFile(read(path.join(pagesDir, f)));
  const slug = data.slug || f.replace(/\.md$/, '');
  write(`${slug}/index.html`, longPage(slug, data, body));
  urls.push(`/${slug}/`);
}

write('404.html', layout({
  title: 'Not found',
  description: 'Page not found.',
  current: '',
  canonical: '/404.html',
  body: `<main id="main" class="long"><div class="wrap"><div class="head"><h1 class="display">Not found</h1></div><article class="article"><p>That page isn’t here. Try the <a href="/">home page</a> or the <a href="/projects/">projects</a>.</p></article></div></main>${footerGrey}`
}));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);

console.log(`Built ${urls.length} pages, ${list.length} project cards -> dist/`);
