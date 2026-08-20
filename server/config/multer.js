import multer from 'multer';
import { config } from './config.js';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import { resolveStorageDirectory } from '../utils/storagePaths.js';

// Configuración de multer para el manejo de archivos subidos
export const setUpload = (dest = 'uploads/') => {
  const destinationPath = resolveStorageDirectory(dest);
  // Configura el almacenamiento de archivos utilizando multer
  const storage = multer.diskStorage({
    // Define la carpeta de destino donde se almacenarán los archivos subidos
    destination: (req, file, cb) => {
      if (!req.uploadCleanupRegistered) {
        req.uploadCleanupRegistered = true;
        req.res.once('finish', () => {
          if (req.res.statusCode < 400) return;
          const files = req.files || (req.file ? [req.file] : []);
          Promise.allSettled(files.map((uploadedFile) => fs.unlink(uploadedFile.path)));
        });
      }
      cb(null, destinationPath);
    },
    // Define el nombre del archivo, que será único al agregar la fecha actual al nombre original
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '');
      cb(null, `${randomUUID()}${extension}`);
    },
  });
  // Retorna una instancia de multer configurada con el almacenamiento especificado
  return multer({
    storage,
    limits: {
      fileSize: config.maxUploadSize,
      files: config.maxUploadFiles,
      fields: 200,
      fieldNameSize: 100,
      fieldSize: config.maxUploadFieldSize,
    },
    fileFilter: (_req, file, cb) => {
      const mimeType = file.mimetype.toLowerCase();
      if (!config.allowedUploadMimeTypes.has(mimeType)) {
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
      }
      cb(null, true);
    },
  });
};
