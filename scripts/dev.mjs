import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const applications = [
  {
    name: 'server',
    cwd: path.join(root, 'server'),
    entry: path.join(root, 'server', 'index.js'),
    // Sin --watch: en Windows el watcher puede dejar el proceso servidor huérfano.
    args: [],
  },
  {
    name: 'portal',
    cwd: path.join(root, 'portal-web'),
    entry: path.join(root, 'portal-web', 'node_modules', 'vite', 'bin', 'vite.js'),
    args: [],
  },
  {
    name: 'admin',
    cwd: path.join(root, 'panel-administracion'),
    entry: path.join(root, 'panel-administracion', 'node_modules', 'vite', 'bin', 'vite.js'),
    args: [],
  },
];

const missing = applications.filter(({ entry }) => !existsSync(entry));
if (missing.length) {
  console.error(`Faltan dependencias o entradas: ${missing.map(({ name }) => name).join(', ')}.`);
  console.error('Ejecuta primero: npm run install:all');
  process.exit(1);
}

const children = applications.map(({ name, cwd, entry, args }) => {
  const child = spawn(process.execPath, [...args, entry], {
    cwd,
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  const forward = (stream, output) => {
    let pending = '';
    stream.on('data', (chunk) => {
      pending += chunk.toString();
      const lines = pending.split(/\r?\n/);
      pending = lines.pop() ?? '';
      lines.forEach((line) => output.write(`[${name}] ${line}\n`));
    });
  };
  forward(child.stdout, process.stdout);
  forward(child.stderr, process.stderr);
  return child;
});

let stopping = false;
const stop = () => {
  if (stopping) return;
  stopping = true;
  children.forEach((child) => child.kill());
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach((child) =>
  child.on('exit', (code) => {
    if (!stopping && code !== 0) {
      console.error(`Una aplicación terminó inesperadamente (código ${code}).`);
      stop();
      process.exitCode = code || 1;
    }
  }),
);
