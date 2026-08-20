import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const allowedRoots = [path.join(serverRoot, 'uploads'), path.join(serverRoot, 'documents')];

export const resolveStorageDirectory = (directory) => {
  const fullPath = path.resolve(serverRoot, directory.replace(/^[/\\]+/, ''));
  const isAllowed = allowedRoots.some(
    (root) => fullPath === root || fullPath.startsWith(`${root}${path.sep}`),
  );
  if (!isAllowed) throw new Error('Directorio fuera del almacenamiento permitido');
  return fullPath;
};

export const resolveStoredFile = (storedPath) => {
  if (!storedPath || typeof storedPath !== 'string') throw new Error('Ruta de archivo inválida');

  const relativePath = storedPath.replace(/^[/\\]+/, '');
  const fullPath = path.resolve(serverRoot, relativePath);
  const isAllowed = allowedRoots.some(
    (root) => fullPath === root || fullPath.startsWith(`${root}${path.sep}`),
  );

  if (!isAllowed) throw new Error('Ruta de archivo fuera del almacenamiento permitido');
  return fullPath;
};
