import Documento from '../models/Documento.js';
import fs from 'fs/promises';
import { resolveStoredFile } from '../utils/storagePaths.js';

// Borrar un documento asociado a una solicitud
export const deleteDocumentService = async (id) => {
  try {
    const document = await Documento.findByPk(id);
    if (!document) {
      throw new Error('No se encontró el documento');
    }

    // Obtener ruta absoluta del documento
    const documentPath = resolveStoredFile(document.ruta);

    // Borrar documento del servidor
    await fs.unlink(documentPath);

    // Borrar registro de la base de datos
    await Documento.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo borrar el documento');
  }
};

export const getDocumentService = async (id) => {
  const document = await Documento.findByPk(id);
  if (!document) {
    return { message: 'No se encontró el documentus' };
  }
  return document;
};

export const downloadDocumentService = async (id) => {
  try {
    const document = await Documento.findByPk(id);
    if (!document) {
      throw new Error('No se encontró el documento');
    }
    // Obtener ruta absoluta del documento
    const documentPath = resolveStoredFile(document.ruta);
    return { path: documentPath, name: document.nombre_original || document.nombre || 'documento' };
  } catch (error) {
    console.log(error);
    throw new Error('Error al descargar el documento');
  }
};
