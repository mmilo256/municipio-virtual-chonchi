import { where } from 'sequelize';
import { sequelize } from '../config/db/config.js';
import Documento from '../models/Documento.js';
import Solicitud from '../models/Solicitud.js';
import Tramite from '../models/Tramite.js';
import {
  createNewRequest,
  getLogs,
  getRequests,
  getRequestsByProcedure,
  getUserRequests,
  getRequestById as getRequestByIdService,
  uploadDocument as uploadDocumentService,
  getDocumentsByRequest,
  updateRequestStatusService,
} from '../services/requests.service.js';
import Respuesta from '../models/Respuesta.js';

// Obtener todas las solicitudes realizadas
export const getAllRequests = async (req, res) => {
  try {
    const requests = await getRequests();
    res.json(requests);
  } catch (error) {
    console.log(error);
    res.json({ message: 'No se pudo obtener las solicitudes.', error: error.message });
  }
};

// Obtener una solicitud según su ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await getRequestByIdService(id);
    res.status(200).json(request);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error interno del servidor.', error: e.message });
  }
};

// Obtener todas las solicitudes de un trámite en específico (SOLICITUDES DEL PANEL DE ADMINISTRACIÓN)
export const getAllRequestsByProcedure = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters;
  const search = req.query.search;
  const offset = (page - 1) * pageSize;

  try {
    const requests = await getRequestsByProcedure(id, pageSize, offset, filters, search);
    res.status(200).json(requests);
  } catch (e) {
    res.status(500).json({ error: e.message, message: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes realizadas por un usuario, según el id del usuario (SOLICITUDES DEL PORTAL WEB PÚBLICO)
export const getAllRequestsByUserId = async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  if (!id) {
    return res.status(401).json({ message: 'No se proporcionó un id' });
  }

  try {
    // Buscar el usuario por su RUN e incluir sus solicitudes asociadas
    const requests = await getUserRequests(id, pageSize, offset);
    res.status(200).json(requests); // Devolver todas las solicitudes del usuario
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'No se pudo obtener las solicitudes.' });
  }
};

// Obtener el historial de cambios de estado de una solicitud específica
export const getStatusLog = async (req, res) => {
  const { id } = req.params;
  try {
    // Obtener todos los registros de estado para una solicitud
    const logs = await getLogs(id);
    res.status(200).json(logs); // Enviar el historial de estados como respuesta
  } catch (error) {
    console.log(error);
    res.json({ message: 'No se pudo obtener el log', error: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await updateRequestStatusService(id, status);
    res.status(200).json(request);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.message, message: 'No se pudo actualizar el estado de la solicitud' });
  }
};

// Crear una nueva solicitud para un usuario
export const createRequest = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { tramite: tramiteSlug, canal, respuestas, infoContacto } = req.body;
    const { id: usuarioId, nombres, apellidos, run } = req.user;

    // Validar que exista el trámite
    const tramiteExiste = await Tramite.findOne({
      attributes: ['id', 'titulo'],
      where: { slug: tramiteSlug },
      transaction: t,
    });
    if (!tramiteExiste) {
      await t.rollback();
      return res.status(404).json({ error: true, message: 'No se encontró el trámite.' });
    }

    // Guardar solicitud
    const datosSolicitud = {
      estado: 'pendiente',
      origen: canal,
      tramite_id: tramiteExiste.id,
      usuario_id: usuarioId,
      funcionario_id: null,
      codigo: null,
      email_contacto: infoContacto.email || null,
      telefono_contacto: infoContacto.telefono || null,
      direccion_contacto: infoContacto.direccion || null,
    };

    const nuevaSolicitud = await Solicitud.create(datosSolicitud, { transaction: t });

    // Crear código único de solicitud
    const anoActual = new Date().getFullYear();
    const newId = String(nuevaSolicitud.id).padStart(6, '0');
    const newCodigo = `MVC-${anoActual}-${newId}`;

    await nuevaSolicitud.update({ codigo: newCodigo }, { transaction: t });

    // Guardar respuestas
    const respuestasFormateadas = respuestas.map((respuesta) => ({
      valor: respuesta.valor,
      solicitud_id: nuevaSolicitud.id,
      campo_id: respuesta.campo_id,
    }));

    await Respuesta.bulkCreate(respuestasFormateadas, { transaction: t });

    await t.commit();
    return res.status(201).json({
      data: {
        codigo: newCodigo,
        fechaSolicitud: nuevaSolicitud.createdAt,
        tramite: tramiteExiste,
        solicitante: {
          nombre: `${nombres} ${apellidos}`,
          run,
          email: infoContacto.email,
          telefono: infoContacto.telefono,
        },
      },
      message: 'Solicitud enviada exitosamente',
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return res.status(500).json({ message: 'No se pudo ingresar la solicitud.' });
  }
};

/* Adjuntar documentos de la solicitud */

export const adjuntarDocumento = async (req, res) => {
  const { id } = req.params;
  const { originalname, path } = req.file;
  const { tipoDocumento } = req.body;

  const data = {
    ruta: path,
    originalname,
    nombre: tipoDocumento,
    tipo: 'adjunto',
    solicitud_id: id,
  };

  try {
    await Documento.create(data);
    return res.json({
      body: req.body,
      file: req.file,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'No se pudo ingresar la solicitud.', error: error.message });
  }
};

// Obtener todos los documentos asociados a una solicitud
export const getUploadedDocuments = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    const docs = await getDocumentsByRequest(id, type);
    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: 'No se pudo obtener los documentos asociados a la solicitud',
    });
  }
};

// Subir documentos
export const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files[0];
    const { status, type, name } = req.query;
    const docs = await uploadDocumentService(file, id, status, type, name);
    res.status(200).json({ tramite_id: id, docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
