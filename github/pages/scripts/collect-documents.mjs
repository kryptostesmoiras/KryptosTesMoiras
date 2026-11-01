import { execFileSync } from 'node:child_process';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repository = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: frontend, encoding: 'utf8' }).trim();
const paths = execFileSync('git', ['ls-files', '-z'], { cwd: repository, encoding: 'utf8' }).split('\0')
  .filter(name => /\.(md|markdown)$/i.test(name) || name === 'License').sort();
const documents = await Promise.all(paths.map(async name => {
  const markdown = await readFile(path.join(repository, name), 'utf8');
  return { path: name, title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || path.basename(name), markdown, kind: name === 'License' ? 'text' : 'markdown' };
}));
const destination = path.join(frontend, 'public', 'KryptosTesMoiras');
await mkdir(destination, { recursive: true });
await writeFile(path.join(destination, 'documents.json'), JSON.stringify({ repository: 'kryptostesmoiras/KryptosTesMoiras', documents }));
console.log(`Collected ${documents.length} tracked reference documents.`);

try { await access(path.join(destination, "discussions.json")); } catch {
  await writeFile(path.join(destination, "discussions.json"), JSON.stringify({ enabled: false, url: "https://github.com/kryptostesmoiras/kryptostesmoiras.github.io/discussions", items: [], checkedAt: null }));
}
