import 'dotenv/config';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config, validateConfig } from '../config/config.js';

validateConfig();
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const backupDirectory = path.resolve(serverRoot, process.env.BACKUP_DIR || 'backups');
fs.mkdirSync(backupDirectory, { recursive: true });
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const destination = path.join(backupDirectory, `${config.db.name}-${timestamp}.sql`);
const output = fs.createWriteStream(destination, { flags: 'wx' });

const args = [
  `--host=${config.db.host}`,
  `--port=${config.db.port || 3306}`,
  `--user=${config.db.user}`,
  '--single-transaction',
  '--routines',
  '--triggers',
  '--events',
  '--set-gtid-purged=OFF',
  config.db.name,
];
const child = spawn('mysqldump', args, {
  env: { ...process.env, MYSQL_PWD: config.db.password },
  stdio: ['ignore', 'pipe', 'inherit'],
  shell: false,
});
child.stdout.pipe(output);
child.on('error', (error) => {
  output.destroy();
  console.error(`No se pudo iniciar mysqldump: ${error.message}`);
  process.exitCode = 1;
});
child.on('close', (code) => {
  output.end();
  if (code !== 0) {
    fs.rmSync(destination, { force: true });
    process.exitCode = code || 1;
    return;
  }
  console.log(`Respaldo creado: ${destination}`);
});
