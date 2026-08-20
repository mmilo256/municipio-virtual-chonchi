import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extensions = ['.js', '.jsx', '.mjs', '.cjs'];
const applications = [
  {
    name: 'portal-web',
    directory: path.join(root, 'portal-web'),
    entries: ['src/main.jsx'],
  },
  {
    name: 'panel-administracion',
    directory: path.join(root, 'panel-administracion'),
    entries: ['src/main.jsx'],
  },
  {
    name: 'server',
    directory: path.join(root, 'server'),
    entries: [
      'index.js',
      'loader.cjs',
      'scripts/migrate.js',
      'scripts/backup.js',
      'scripts/restore.js',
      'migrations/index.js',
    ],
  },
];

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['node_modules', 'dist', 'coverage'].includes(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

const resolveImport = (fromFile, specifier) => {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    ...extensions.map((extension) => `${base}${extension}`),
    ...extensions.map((extension) => path.join(base, `index${extension}`)),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
};

const importPattern = /(?:import|export)\s+(?:[^'"()]*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;

for (const application of applications) {
  const allFiles = walk(application.directory).filter((file) => {
    if (!extensions.includes(path.extname(file))) return false;
    const relative = path.relative(application.directory, file).replaceAll('\\', '/');
    if (application.name === 'server') return !relative.startsWith('test/');
    return relative.startsWith('src/');
  });
  const reachable = new Set();
  const pending = application.entries.map((entry) => path.join(application.directory, entry));

  while (pending.length) {
    const file = pending.pop();
    if (!file || reachable.has(file) || !fs.existsSync(file)) continue;
    reachable.add(file);
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(importPattern)) {
      const resolved = resolveImport(file, match[1] || match[2]);
      if (resolved && !reachable.has(resolved)) pending.push(resolved);
    }
  }

  const unused = allFiles
    .filter((file) => !reachable.has(file))
    .map((file) => path.relative(application.directory, file).replaceAll('\\', '/'))
    .sort();

  console.log(`\n${application.name}: ${unused.length} archivos JavaScript sin referencias`);
  unused.forEach((file) => console.log(`  ${file}`));
}
