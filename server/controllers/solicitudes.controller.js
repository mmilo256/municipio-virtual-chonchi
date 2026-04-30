import { sequelize } from '../config/db/config.js';
import Documento from '../models/Documento.js';
import Solicitud from '../models/Solicitud.js';
import Tramite from '../models/Tramite.js';
import {
  getLogs,
  getRequests,
  getRequestById as getRequestByIdService,
  uploadDocument as uploadDocumentService,
  getDocumentsByRequest,
} from '../services/requests.service.js';
import Respuesta from '../models/Respuesta.js';
import HistorialEstadosSolicitudes from '../models/HistorialEstadosSolicitudes.js';
import Formulario from '../models/Formulario.js';
import PasoFormulario from '../models/PasoFormulario.js';
import CampoFormulario from '../models/CampoFormulario.js';
import { Op } from 'sequelize';
import Usuario from '../models/Usuario.js';

export const actualizarEstadoSolicitud = async (req, res) => {
  const { codigo } = req.params;
  const { estado } = req.body;
  try {
    const solicitud = await Solicitud.findOne({ where: { codigo } });

    if (!solicitud) {
      return res
        .status(404)
        .json({ error: true, message: 'No existe solicitud asociada a este código' });
    }

    await solicitud.update({ estado });

    const historialEstado = {
      estado,
      solicitud_id: solicitud.id,
    };

    await HistorialEstadosSolicitudes.create(historialEstado);
    return res.status(200).json({
      data: { codigo, estado, solicitud },
      message: 'Estado de la solicitud actualizado correctamente',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'No se pudo actualizar el estado de la solicitud' });
  }
};

export const obtenerSolicitudPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nombres, apellidos, run } = req.user;
    const solicitud = await Solicitud.findOne({
      attributes: [
        'id',
        'codigo',
        'createdAt',
        'estado',
        'email_contacto',
        'telefono_contacto',
        'direccion_contacto',
      ],
      where: { codigo },
      include: [
        {
          model: Respuesta,
          attributes: ['campo_id', 'valor'],
        },
        {
          model: Tramite,
          attributes: ['id', 'titulo'],
          include: [
            {
              model: Formulario,
              attributes: ['id', 'titulo', 'descripcion'],
              include: [
                {
                  model: PasoFormulario,
                  attributes: ['titulo', 'descripcion'],
                  include: [
                    {
                      model: CampoFormulario,
                      attributes: ['id', 'etiqueta'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const historialEstados = await HistorialEstadosSolicitudes.findAll({
      where: {
        solicitud_id: solicitud.id,
      },
    });

    return res.status(200).json({
      data: { solicitud, historialEstados, contacto: { nombres, apellidos, run } },
      message: 'Historial obtenido correctamente',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: 'No se pudo obtener el historial de estados de la solicitud' });
  }
};

// Obtener todas las solicitudes de un trámite en específico (SOLICITUDES DEL PANEL DE ADMINISTRACIÓN)
export const obtenerSolicitudesPorTramite = async (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters;
  const search = req.query.search;
  const offset = (page - 1) * pageSize;

  if (!slug) {
    return res.status(404).json({ error: true, message: 'No existe este trámite' });
  }

  const tramite = await Tramite.findOne({ where: { slug } });

  try {
    const whereClause = {
      tramite_id: tramite.id,
    };

    // Filtro por estado
    if (filters) {
      const statusArray = filters
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (statusArray.length) {
        whereClause.estado = {
          [Op.in]: statusArray,
        };
      }
    }

    // Search por orgName u orgRut
    if (search && search.trim() !== '') {
      const s = search.trim();

      whereClause[Op.or] = [
        { orgName: { [Op.like]: `%${s}%` } },
        { orgRut: { [Op.like]: `%${s}%` } },
      ];
    }

    const { rows, count } = await Solicitud.findAndCountAll({
      limit: pageSize,
      offset,
      where: whereClause,
      include: {
        model: Usuario,
        attributes: ['nombres', 'apellidos', 'run'],
      },
      distinct: true, // importante con include + paginación
    });

    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    return res.status(200).json({ rows, totalPages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message, mensaje: 'Error interno del servidor' });
  }
};

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
    const { rows, count } = await Solicitud.findAndCountAll({
      limit: pageSize,
      offset,
      where: { usuario_id: id },
      order: [['createdAt', 'DESC']],
      include: {
        model: Tramite,
        attributes: ['titulo', 'slug'],
      },
    });

    const totalPages = Math.ceil(count / pageSize) === 0 ? 1 : Math.ceil(count / pageSize);

    const data = {
      totalPages,
      solicitudes: rows,
    };

    /* const requests = await Solicitud.findAll({ where: { usuario_id: id } }); */
    res.status(200).json({ data, message: 'Solicitudes obtenidas correctamente' }); // Devolver todas las solicitudes del usuario
  } catch (error) {
    console.error(error);
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

    // Guardar registro de cambio de estado de la solicitud
    const logData = {
      estado: 'pendiente',
      solicitud_id: nuevaSolicitud.id,
    };
    await HistorialEstadosSolicitudes.create(logData, { transaction: t });

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
