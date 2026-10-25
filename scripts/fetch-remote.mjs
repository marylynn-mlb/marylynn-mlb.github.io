// Pulls PROJECT.md (and the images it points to) from each public repo that carries
// the topic "brightlight-project". Output goes to .cache/remote/<repo>/ and is picked up by build.mjs.
// Failures never stop the build: the local copy in content/projects/ is used instead.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OWNER = process.env.OWNER || 'marylynn-mlb';
const TOPIC = 'brightlight-project';
const OUT = path.join(ROOT, '.cache/remote');
const headers = { 'User-Agent': 'site-build', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

async function get(url, opts = {}) {
  const res = await fetch(url, { headers, ...opts });
  return res;
}

try {
  const res = await get(`https://api.github.com/users/${OWNER}/repos?per_page=100&type=owner`);
  if (!res.ok) throw new Error(`repo list failed: ${res.status}`);
  const repos = (await res.json()).filter((r) => !r.private && !r.fork && (r.topics || []).includes(TOPIC));
  console.log(`${repos.length} repos tagged ${TOPIC}`);
  for (const r of repos) {
    const raw = (p) => `https://raw.githubusercontent.com/${OWNER}/${r.name}/${r.default_branch}/${p}`;
    const pm = await get(raw('PROJECT.md'));
    if (!pm.ok) {
      console.warn(`${r.name}: no PROJECT.md on ${r.default_branch} (${pm.status}), skipping`);
      continue;
    }
    const text = await pm.text();
    const dir = path.join(OUT, r.name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'PROJECT.md'), text);
    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ repoUrl: r.html_url, homepage: r.homepage || '' }));
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = m ? YAML.parse(m[1]) || {} : {};
    const files = [data.thumbnail, ...(data.screenshots || []).map((s) => s?.file)].filter(Boolean);
    for (const f of files) {
      if (/^https?:/.test(f) || f.includes('..')) continue;
      const img = await get(raw(f));
      if (!img.ok) {
        console.warn(`${r.name}: could not fetch ${f} (${img.status})`);
        continue;
      }
      const dest = path.join(dir, f);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, Buffer.from(await img.arrayBuffer()));
    }
    console.log(`${r.name}: PROJECT.md fetched`);
  }
} catch (e) {
  console.warn(`fetch-remote: ${e.message}. Building from local content only.`);
}
