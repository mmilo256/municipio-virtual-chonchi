import 'dotenv/config';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { config, validateConfig } from '../config/config.js';

validateConfig();
const [sourceArgument, confirmation] = process.argv.slice(2);
if (!sourceArgument || confirmation !== '--confirm') {
  console.error('Uso: npm run db:restore -- <respaldo.sql> --confirm');
  process.exit(1);
}
const source = path.resolve(sourceArgument);
if (path.extname(source).toLowerCase() !== '.sql' || !fs.statSync(source).isFile()) {
  console.error('El respaldo debe ser un archivo .sql existente');
  process.exit(1);
}

console.log(`Restaurando ${source} en la base ${config.db.name}...`);
const child = spawn(
  'mysql',
  [
    `--host=${config.db.host}`,
    `--port=${config.db.port || 3306}`,
    `--user=${config.db.user}`,
    config.db.name,
  ],
  {
    env: { ...process.env, MYSQL_PWD: config.db.password },
    stdio: [fs.openSync(source, 'r'), 'inherit', 'inherit'],
    shell: false,
  },
);
child.on('error', (error) => {
  console.error(`No se pudo iniciar mysql: ${error.message}`);
  process.exitCode = 1;
});
child.on('close', (code) => {
  if (code !== 0) process.exitCode = code || 1;
  else console.log('Restauración completada correctamente');
});
