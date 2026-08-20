import {
  deleteDocumentService,
  downloadDocumentService,
  getDocumentService,
} from '../services/documents.service.js';
import Documento from '../models/Documento.js';
import fs from 'fs';
import mime from 'mime';
import { resolveStoredFile } from '../utils/storagePaths.js';

// Borrar un documento
export const borrarDocumento = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await deleteDocumentService(id);
    res.status(200).json({ message: 'Documento borrado exitosamente', document });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, message: 'No se pudo borrar el documento' });
  }
};

// Descargar documento
export const getDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = req.document || (await getDocumentService(id));
    const fullPath = resolveStoredFile(doc.ruta);
    res.setHeader('Content-Type', doc.mime_type || mime.getType(fullPath) || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, no-store');
    fs.createReadStream(fullPath).on('error', () => res.destroy()).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, message: 'No se pudo descargar el documento' });
  }
};

export const viewDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = req.document || (await Documento.findByPk(id));
    if (!doc) return res.status(404).json({ message: 'No encontrado' });

    const fullPath = resolveStoredFile(doc.ruta);
    const contentType = doc.mime_type || mime.getType(fullPath) || 'application/octet-stream';

    // Mostrar en el navegador (PDF/imagen) en vez de descargar
    res.setHeader('Content-Type', contentType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURIComponent(doc.nombre_original)}"`,
    );
    res.setHeader('Cache-Control', 'no-store');

    res.sendFile(fullPath, (err) => {
      if (err && !res.headersSent) {
        console.error(err);
        res.status(404).json({ message: 'No se pudo abrir el archivo' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
};

// Descargar documento
export const downloadDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const { path, name } = await downloadDocumentService(id);
    res.download(path, name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, message: 'No se pudo descargar el documento' });
  }
};
