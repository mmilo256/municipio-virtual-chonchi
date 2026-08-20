import { sequelize } from '../config/db/config.js';
import Documento from '../models/Documento.js';
import Solicitud from '../models/Solicitud.js';
import Tramite from '../models/Tramite.js';
import {
  getLogs,
  getRequests,
  getRequestById as getRequestByIdService,
  getDocumentsByRequest,
} from '../services/requests.service.js';
import Respuesta from '../models/Respuesta.js';
import HistorialEstadosSolicitudes from '../models/HistorialEstadosSolicitudes.js';
import Formulario from '../models/Formulario.js';
import PasoFormulario from '../models/PasoFormulario.js';
import CampoFormulario from '../models/CampoFormulario.js';
import { Op, Sequelize } from 'sequelize';
import Usuario from '../models/Usuario.js';
import Funcionario from '../models/Funcionario.js';
import { templateSolicitudEnviadaSolicitante } from '../email/js/solicitudEnviadaSolicitante.js';
import { formatDate } from '../utils/format.utils.js';
import { templateSolicitudRecibidaFuncionario } from '../email/js/solicitudRecibidaFuncionario.js';
import { plantillaSolicitudAprobadaSolicitante } from '../email/js/solicitudAprobadaSolicitante.js';
import { plantillaSolicitudAprobadaExtras } from '../email/js/solicitudAprobadaExtras.js';
import path from 'path';
import { plantillaSolicitudRechazadaSolicitante } from '../email/js/solicitudRechazadaSolicitante.js';
import { plantillaSolicitudRequiereCorreccionSolicitante } from '../email/js/solicitudRequiereCorreccionSolicitante.js';
import { ACCIONES_SOLICITUD } from '../data/constantes.js';
import { plantillaSolicitudCorregidaFuncionario } from '../email/js/solicitudCorregidaFuncionario.js';
import { sendEmailSafely } from '../services/notifications.service.js';
import { normalizeCorrectionFields } from '../utils/correctionFields.js';

// Subir solicitud física desde el panel de administración
export const agregarSolicitud = async (req, res) => {
  const t = await sequelize.transaction();
  const { tramiteId } = req.body;
  const respuestas = JSON.parse(req.body.respuestas) || [];
  const infoSolicitante = JSON.parse(req.body.infoSolicitante) || [];
  const documentosMeta = JSON.parse(req.body.documentosMeta) || [];
  const { id: funcionarioId } = req.user;

  let newRespuestas = {};
  for (const item of respuestas) {
    newRespuestas = {
      ...newRespuestas,
      [item.slug]: item,
    };
  }

  let newInfoSolicitante = {};
  for (const item of infoSolicitante) {
    newInfoSolicitante = {
      ...newInfoSolicitante,
      [item.slug]: item,
    };
  }

  const { email, telefono, rut, nombreCompleto, direccion } = newInfoSolicitante;

  try {
    // Validar que exista el trámite
    const tramiteExiste = await Tramite.findByPk(tramiteId, {
      attributes: ['id', 'titulo'],
      include: [{ model: Funcionario, attributes: ['nombres', 'apellidos', 'email'] }],
      transaction: t,
    });
    if (!tramiteExiste) {
      await t.rollback();
      return res.status(404).json({ error: true, message: 'No se encontró el trámite.' });
    }

    // Guardar solicitud en base de datos
    const datosSolicitud = {
      estado: 'pendiente',
      origen: 'fisico',
      tramite_id: tramiteExiste.id,
      usuario_id: null,
      funcionario_id: funcionarioId,
      codigo: null,
      email_contacto: email.valor || null,
      telefono_contacto: telefono.valor || null,
      direccion_contacto: direccion.valor || null,
      rut_contacto: rut.valor || null,
      nombre_contacto: nombreCompleto.valor || null,
    };

    const nuevaSolicitud = await Solicitud.create(datosSolicitud, { transaction: t });

    // Crear código único de solicitud
    const anoActual = new Date().getFullYear();
    const newId = String(nuevaSolicitud.id).padStart(6, '0');
    const newCodigo = `MVC-${anoActual}-${newId}`;

    await nuevaSolicitud.update({ codigo: newCodigo }, { transaction: t });

    // Guardar respuestas
    const respuestasFormateadas = respuestas.map((respuesta) => {
      if (respuesta.campo_id)
        return {
          valor: respuesta.valor,
          solicitud_id: nuevaSolicitud.id,
          campo_id: respuesta.campo_id,
        };
    });

    await Respuesta.bulkCreate(respuestasFormateadas, { transaction: t });

    // Guardar Documentos adjuntos
    const newDocumentos = req.files.map((file) => {
      const meta = documentosMeta.find((item) => item.slug === file.fieldname);

      return {
        ruta: `/documents/${file.filename}`,
        solicitud_id: nuevaSolicitud.id,
        campo_id: meta.campo_id,
        nombre_original: file.originalname,
        nombre_guardado: file.filename,
        mime_type: file.mimetype,
        bytes: file.size,
        origen: 'solicitante',
        nombre: file.fieldname,
        estado: 'activo',
        reemplazado_por_id: null,
        fecha_reemplazo: null,
      };
    });

    await Documento.bulkCreate(newDocumentos, { transaction: t });

    // Guardar registro de cambio de estado de la solicitud
    await HistorialEstadosSolicitudes.create(
      {
        estado: 'pendiente',
        accion: ACCIONES_SOLICITUD.SOLICITUD_SUBIDA_POR_FUNCIONARIO,
        solicitud_id: nuevaSolicitud.id,
        mensaje: null,
        metadata: null,
        usuario_id: req.user.id,
        usuario_tipo: 'funcionario',
        visible_para_solicitante: false,
      },
      { transaction: t },
    );

    await t.commit();
    return res.status(200).json({
      data: nuevaSolicitud,
      message: 'Solicitud agregada correctamente',
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'No se pudo agregar la solicitud al sistema' });
  }
};

// Enviar corrección desde el portal WEB
export const enviarCorreccion = async (req, res) => {
  const respuestasNuevas = JSON.parse(req.body.respuestas);
  const documentosMeta = JSON.parse(req.body.documentosMeta);
  const { codigo } = req.params;
  const t = await sequelize.transaction();

  try {
    // Verificar que exista la solicitud
    const solicitudExiste = await Solicitud.findOne({
      where: { codigo },
      include: [
        { model: Usuario, attributes: ['nombres', 'apellidos'] },
        {
          model: Tramite,
          attributes: ['titulo'],
          include: [{ model: Funcionario, attributes: ['email'] }],
        },
      ],
      transaction: t,
    });
    if (!solicitudExiste) {
      await t.rollback();
      return res.status(404).json({ error: true, message: 'La solicitud no existe' });
    }

    // Buscar respuestas de la solicitud y compararlas con las nuevas
    const respuestasActualizadas = [];
    for (const item of Object.values(respuestasNuevas)) {
      const respuestaActual = await Respuesta.findOne({
        where: { campo_id: item.campo_id, solicitud_id: solicitudExiste.id },
        transaction: t,
      });

      if (!respuestaActual) continue;

      const valorAnterior = respuestaActual.valor;
      const valorNuevo = item.valor;

      // Actualizar respuestas
      if (valorAnterior !== valorNuevo) {
        await respuestaActual.update(
          {
            valor: valorNuevo,
          },
          { transaction: t },
        );

        respuestasActualizadas.push({
          campo_id: respuestaActual.campo_id,
          nombre_interno: item.nombre_interno,
          valor_anterior: valorAnterior,
          valor_nuevo: valorNuevo,
        });
      }
    }

    // Formatear documentos adjuntos
    const documentos = req.files.map((file) => {
      const meta = Object.values(documentosMeta).find(
        (item) => item.nombre_interno === file.fieldname,
      );

      return {
        ruta: `/uploads/${file.filename}`,
        solicitud_id: solicitudExiste.id,
        campo_id: meta.campo_id,
        nombre_original: file.originalname,
        nombre_guardado: file.filename,
        mime_type: file.mimetype,
        bytes: file.size,
        nombre: meta.nombre_interno,
        origen: 'solicitante',
        estado: 'activo',
        reemplazado_por_id: null,
        fecha_reemplazo: null,
      };
    });

    const documentosActualizados = [];
    for (const item of documentos) {
      // Buscar el documento anterior
      const documentoAnterior = await Documento.findOne({
        where: {
          solicitud_id: solicitudExiste.id,
          campo_id: item.campo_id,
          estado: 'activo',
        },
        transaction: t,
      });

      // Subir documentos adjuntos nuevos
      const documentoNuevo = await Documento.create(item, { transaction: t });

      if (documentoAnterior) {
        // Actualizar info del documento anterior
        await documentoAnterior.update(
          {
            estado: 'reemplazado',
            reemplazado_por_id: documentoNuevo.id,
            fecha_reemplazo: new Date(),
          },
          { transaction: t },
        );
      }

      const docAnterior = documentoAnterior
        ? {
            id: documentoAnterior.id,
            nombre_original: documentoAnterior.nombre_original,
            mime_type: documentoAnterior.mime_type,
            bytes: documentoAnterior.bytes,
          }
        : null;

      const docNuevo = {
        id: documentoNuevo.id,
        nombre_original: documentoNuevo.nombre_original,
        mime_type: documentoNuevo.mime_type,
        bytes: documentoNuevo.bytes,
      };

      documentosActualizados.push({
        campo_id: item.campo_id,
        nombre_interno: item.nombre_interno,
        etiqueta: item.etiqueta,
        docAnterior,
        docNuevo,
      });
    }

    // Guardar registro de la corrección en historial solicitudes
    await HistorialEstadosSolicitudes.create(
      {
        solicitud_id: solicitudExiste.id,
        estado: 'en revision',
        accion: ACCIONES_SOLICITUD.SOLICITUD_CORREGIDA,
        usuario_id: req.user.id,
        usuario_tipo: 'solicitante',
        metadata: {
          respuestas_actualizadas: respuestasActualizadas,
          documentos_actualizados: documentosActualizados,
        },
        visible_para_solicitante: true,
      },
      { transaction: t },
    );

    // Actualizar solicitud
    await solicitudExiste.update(
      {
        estado: 'en revision',
        requiere_correccion: false,
        campos_correccion: null,
        fecha_respuesta_correccion: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    // Notificar al funcionario que la solicitud fue corregida por el solicitante
    const correosFuncionarios = solicitudExiste.tramite.funcionarios.map((fun) => fun.email);
    const correoData = {
      nombreSolicitante: `${solicitudExiste.usuario.nombres} ${solicitudExiste.usuario.apellidos}`,
      nombreTramite: solicitudExiste.tramite.titulo,
      codigo,
      fechaCorreccion: formatDate(solicitudExiste.fecha_respuesta_correccion, 'DD MMM YYYY, HH:mm'),
      estado: solicitudExiste.estado,
    };
    await sendEmailSafely({
      to: correosFuncionarios,
      subject: `[Municipio Virtual Chonchi] Solicitud corregida - ${codigo}`,
      html: plantillaSolicitudCorregidaFuncionario(correoData),
      context: `aviso de corrección a funcionarios ${codigo}`,
    });

    return res.status(200).json({
      documentosMeta,
      documentos,
      documentosActualizados,
      message: 'Corrección de la solicitud enviada correctamente',
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'No se pudo enviar la corrección de la solicitud' });
  }
};

// Solicitar corrección de la solicitud
export const solicitarCorreccion = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { codigo } = req.params;
    const { observaciones, camposSeleccionados } = req.body;
    const camposCorreccion = normalizeCorrectionFields(camposSeleccionados);

    if (typeof observaciones !== 'string' || !observaciones.trim() || observaciones.length > 2000) {
      await t.rollback();
      return res.status(400).json({ message: 'La observación es obligatoria y debe ser válida' });
    }
    if (Object.keys(camposCorreccion).length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Selecciona al menos un campo para corregir' });
    }

    // Validar que exista la solicitud
    const solicitudExiste = await Solicitud.findOne({
      where: { codigo },
      include: [
        { model: Usuario, attributes: ['nombres', 'apellidos'] },
        { model: Tramite, attributes: ['titulo'] },
      ],
      transaction: t,
    });

    if (!solicitudExiste) {
      await t.rollback();
      return res.status(404).json({ error: true, message: 'La solicitud no existe' });
    }

    // Poner solicitud en modo "requiere correccion"
    const data = {
      campos_correccion: camposCorreccion,
      estado: 'requiere correccion',
      fecha_solicitud_correccion: new Date(),
      observacion: observaciones.trim(),
      requiere_correccion: true,
    };

    await solicitudExiste.update(data, { transaction: t });

    // Guardar historial de cambio de estado para seguimiento
    await HistorialEstadosSolicitudes.create(
      {
        estado: 'requiere correccion',
        solicitud_id: solicitudExiste.id,
        usuario_id: req.user.id,
        usuario_tipo: 'funcionario',
        accion: ACCIONES_SOLICITUD.CORRECCION_SOLICITADA,
        mensaje: observaciones,
        metadata: null,
        visible_para_solicitante: true,
      },
      { transaction: t },
    );

    const correoData = {
      nombreSolicitante: `${solicitudExiste.usuario.nombres} ${solicitudExiste.usuario.apellidos}`,
      nombreTramite: solicitudExiste.tramite.titulo,
      observacion: observaciones,
      codigo,
      fechaSolicitud: formatDate(solicitudExiste.createdAt, 'DD MMM YYYY, HH:mm'),
      estado: solicitudExiste.estado,
    };

    await t.commit();

    // Notificar después de confirmar el cambio de estado.
    await sendEmailSafely({
      to: solicitudExiste.email_contacto,
      subject: `[Municipio Virtual Chonchi] Su solicitud requiere corrección - ${solicitudExiste.codigo}`,
      html: plantillaSolicitudRequiereCorreccionSolicitante(correoData),
      context: `solicitud de corrección ${solicitudExiste.codigo}`,
    });
    return res.status(200).json({
      message: 'Solicitud de corrección realizada correctamente',
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: 'No se pudo solicitar la corrección de la solicitud',
    });
  }
};

// Rechazar solicitud
export const rechazarSolicitud = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { codigo, motivo } = req.body;

    // Validar que exista la solicitud
    const solicitudExiste = await Solicitud.findOne({
      where: { codigo },
      include: [{ model: Tramite }],
      transaction,
    });
    if (!solicitudExiste) {
      await transaction.rollback();
      return res.status(404).json({ error: true, message: 'No existe la solicitud' });
    }

    // Cambiar estado de la solicitud
    await solicitudExiste.update({ estado: 'rechazada', observacion: motivo });
    await HistorialEstadosSolicitudes.create(
      {
        estado: 'rechazada',
        solicitud_id: solicitudExiste.id,
        accion: ACCIONES_SOLICITUD.SOLICITUD_RECHAZADA,
        usuario_id: req.user.id,
        mensaje: motivo,
        usuario_tipo: 'funcionario',
        metadata: null,
        visible_para_solicitante: true,
      },
      { transaction },
    );

    // Enviar correo electrónico notificando al usuario
    const data = {
      nombreUsuario: solicitudExiste.nombre_contacto,
      correoUsuario: solicitudExiste.email_contacto,
      telefonoUsuario: solicitudExiste.telefono_contacto,
      domicilioUsuario: solicitudExiste.direccion_contacto,
      nombreTramite: solicitudExiste.tramite.titulo,
      motivoRechazo: motivo,
      codigo,
      fechaSolicitud: formatDate(solicitudExiste.createdAt, 'DD MMM YYYY, HH:mm'),
      estado: solicitudExiste.estado,
    };

    await transaction.commit();

    await sendEmailSafely({
      to: solicitudExiste.email_contacto,
      subject: `[Municipio Virtual Chonchi] Solicitud rechazada - ${solicitudExiste.codigo}`,
      html: plantillaSolicitudRechazadaSolicitante(data),
      context: `rechazo de solicitud ${solicitudExiste.codigo}`,
    });
    return res.status(200).json({ data: data, message: 'Solicitud rechazada correctamente' });
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
    console.log(error);
    return res
      .status(200)
      .json({ error: error.message, message: 'No se pudo rechazar la solicitud' });
  }
};

// Aprobar solicitud
export const aprobarSolicitud = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { codigo } = req.body;
    const destinatarios = JSON.parse(req.body.destinatarios) ?? null;
    const documentos = req.files;

    // Validar que existe la solicitud
    const solicitudExiste = await Solicitud.findOne({
      where: { codigo },
      include: [{ model: Tramite }],
      transaction: t,
    });

    if (!solicitudExiste) {
      await t.rollback();
      return res.status(404).json({ error: true, message: 'No existe la solicitud' });
    }

    // Obtener parámetros de configuración del trámite
    const config = JSON.parse(solicitudExiste.tramite.config);
    if (config?.archivos?.activo) {
      if (documentos.length === 0) {
        await t.rollback();
        return res.status(404).json({ error: true, message: 'No hay documentos adjuntos' });
      }
    }

    // Cambiar estado de la solicitud a aprobada
    await solicitudExiste.update({ estado: 'aprobada' }, { transaction: t });

    // Guardar registro de cambio de estado de la solicitud
    await HistorialEstadosSolicitudes.create(
      {
        estado: 'aprobada',
        solicitud_id: solicitudExiste.id,
        accion: ACCIONES_SOLICITUD.SOLICITUD_APROBADA,
        usuario_id: req.user.id,
        usuario_tipo: 'funcionario',
        mensaje: null,
        metadata: null,
        visible_para_solicitante: true,
      },
      { transaction: t },
    );

    // Guardar documentos adjuntos en BD
    const docsAdjuntos = req.files.map((file) => {
      return {
        ruta: `/documents/${file.filename}`,
        solicitud_id: solicitudExiste.id,
        nombre_original: file.originalname,
        nombre_guardado: file.filename,
        mime_type: file.mimetype,
        bytes: file.size,
        origen: 'sistema',
        nombre: file.fieldname,
        estado: 'activo',
        reemplazado_por_id: null,
        fecha_reemplazo: null,
      };
    });

    await Documento.bulkCreate(docsAdjuntos, { transaction: t });

    // Enviar correo de notificación
    const data = {
      nombreUsuario: solicitudExiste.nombre_contacto,
      nombreTramite: solicitudExiste.tramite.titulo,
      codigo: solicitudExiste.codigo,
      fechaSolicitud: formatDate(solicitudExiste.createdAt, 'DD MMM YYYY, HH:mm'),
      estado: solicitudExiste.estado,
      correoUsuario: solicitudExiste.email_contacto,
      telefonoUsuario: solicitudExiste.telefono_contacto,
      domicilioUsuario: solicitudExiste.direccion_contacto,
    };

    // Formatear documentos adjuntos
    const documentosAdjuntos = documentos.map((doc) => ({
      filename: `${data.codigo}-${doc.fieldname}`,
      path: path.join(process.cwd(), doc.path),
      contentType: doc.mimetype,
    }));

    await t.commit();

    await Promise.all([
      sendEmailSafely({
        to: data.correoUsuario,
        subject: `[Municipio Virtual Chonchi] Solicitud aprobada - ${data.codigo}`,
        html: plantillaSolicitudAprobadaSolicitante(data),
        attachments: documentosAdjuntos,
        context: `aprobación al solicitante ${data.codigo}`,
      }),
      sendEmailSafely({
        to: destinatarios,
        subject: `[Municipio Virtual Chonchi] Remite antecedentes de solicitud - ${data.codigo}`,
        html: plantillaSolicitudAprobadaExtras(data),
        attachments: documentosAdjuntos,
        context: `aprobación a destinatarios adicionales ${data.codigo}`,
      }),
    ]);
    return res
      .status(200)
      .json({ data: documentosAdjuntos, message: 'Solicitud aprobada correctamente' });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.log(error);
    return res.status(500).json({ error, message: 'No se pudo aprobar la solicitud' });
  }
};

// Subir documentos
export const subirDocumento = async (req, res) => {
  try {
    const { codigo } = req.params;
    const documento = req.files[0];

    const solicitudExiste = await Solicitud.findOne({ where: { codigo } });

    if (!solicitudExiste) {
      return res.status(404).json({ error: true, message: 'No existe la solicitud' });
    }

    const documentoData = {
      ruta: `/documents/${documento.filename}`,
      solicitud_id: solicitudExiste.id,
      campo_id: null,
      nombre_original: documento.originalname,
      nombre_guardado: documento.filename,
      mime_type: documento.mimetype,
      bytes: documento.size,
      origen: 'funcionario',
      nombre: documento.fieldname,
      estado: 'activo',
      reemplazado_por_id: null,
      fecha_reemplazo: null,
      funcionario_id: req.user.id,
    };

    const responseDocumentos = await Documento.create(documentoData);
    res.status(200).json({ data: responseDocumentos, message: 'Documento subido correctamente' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

// Crear una nueva solicitud para un usuario
export const crearSolicitud = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { tramite: tramiteSlug, canal } = req.body;
    const respuestas = JSON.parse(req.body.respuestas || '[]');
    const infoContacto = JSON.parse(req.body.infoContacto || '{}');
    const {
      id: usuarioId,
      nombres: usuarioNombres,
      apellidos: usuarioApellidos,
      run: usuarioRun,
    } = req.user;

    const archivosMeta = JSON.parse(req.body.archivosMeta || '[]');

    // Validar que exista el trámite
    const tramiteExiste = await Tramite.findOne({
      attributes: ['id', 'titulo'],
      where: { slug: tramiteSlug },
      include: [{ model: Funcionario, attributes: ['nombres', 'apellidos', 'email'] }],
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
      rut_contacto: usuarioRun || null,
      nombre_contacto: `${usuarioNombres} ${usuarioApellidos}`,
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

    // Guardar Documentos adjuntos
    const documentos = req.files.map((file) => {
      const meta = archivosMeta.find((item) => item.slug === file.fieldname);

      return {
        ruta: `/uploads/${file.filename}`,
        solicitud_id: nuevaSolicitud.id,
        campo_id: meta.campo_id,
        nombre_original: file.originalname,
        nombre_guardado: file.filename,
        mime_type: file.mimetype,
        bytes: file.size,
        origen: 'solicitante',
        nombre: file.fieldname,
        estado: 'activo',
        reemplazado_por_id: null,
        fecha_reemplazo: null,
      };
    });

    const responseDocumentos = await Documento.bulkCreate(documentos, { transaction: t });

    // Guardar registro de cambio de estado de la solicitud
    await HistorialEstadosSolicitudes.create(
      {
        estado: 'pendiente',
        accion: ACCIONES_SOLICITUD.SOLICITUD_ENVIADA,
        solicitud_id: nuevaSolicitud.id,
        mensaje: null,
        metadata: null,
        usuario_id: req.user.id,
        usuario_tipo: 'solicitante',
        visible_para_solicitante: true,
      },
      { transaction: t },
    );
    // Confirmar primero todos los datos de la solicitud.
    await t.commit();

    // Las notificaciones son posteriores al commit: una falla SMTP no elimina la solicitud.
    const correosFuncionarios = tramiteExiste?.funcionarios?.map(
      (funcionario) => funcionario.email,
    );
    await Promise.all([
      sendEmailSafely({
        to: infoContacto.email,
        subject: `[Municipio Virtual Chonchi] Comprobante de solicitud - ${newCodigo}`,
        html: templateSolicitudEnviadaSolicitante(
          infoContacto.nombreCompleto,
          tramiteExiste.titulo,
          newCodigo,
          formatDate(nuevaSolicitud.createdAt, 'DD MMM YYYY, HH:mm'),
        ),
        context: `comprobante al solicitante ${newCodigo}`,
      }),
      sendEmailSafely({
        to: correosFuncionarios,
        subject: `[Municipio Virtual Chonchi] Nueva solicitud recibida - ${newCodigo}`,
        html: templateSolicitudRecibidaFuncionario(
          tramiteExiste.titulo,
          newCodigo,
          formatDate(nuevaSolicitud.createdAt, 'DD MMM YYYY, HH:mm'),
          infoContacto.nombreCompleto,
          infoContacto.rut,
          infoContacto.email,
          infoContacto.telefono,
          infoContacto.direccion,
        ),
        context: `aviso a funcionarios ${newCodigo}`,
      }),
    ]);
    return res.status(201).json({
      data: {
        codigo: newCodigo,
        documentos: responseDocumentos,
        fechaSolicitud: nuevaSolicitud.createdAt,
        tramite: tramiteExiste,
        solicitante: {
          nombre: `${usuarioNombres} ${usuarioApellidos}`,
          run: usuarioRun,
          email: infoContacto.email,
          telefono: infoContacto.telefono,
        },
      },
      message: 'Solicitud enviada exitosamente',
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error(error);
    return res.status(500).json({ error, message: 'No se pudo ingresar la solicitud.' });
  }
};

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

    await HistorialEstadosSolicitudes.create({
      estado,
      accion: ACCIONES_SOLICITUD.SOLICITUD_EN_REVISION,
      solicitud_id: solicitud.id,
      mensaje: null,
      metadata: null,
      usuario_id: req.user.id,
      usuario_tipo: 'funcionario',
      visible_para_solicitante: true,
    });
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

    const solicitud = await Solicitud.findOne({
      where: { codigo },

      attributes: [
        'id',
        'codigo',
        'origen',
        'createdAt',
        'estado',
        'nombre_contacto',
        'rut_contacto',
        'email_contacto',
        'telefono_contacto',
        'direccion_contacto',
        'observacion',
        'requiere_correccion',
        'campos_correccion',
        'fecha_solicitud_correccion',
        'fecha_respuesta_correccion',
      ],

      include: [
        {
          model: Usuario,
        },
        {
          model: Documento,
          where: { estado: 'activo' },
          required: false,
          include: [{ model: Funcionario, required: false }],
        },
        {
          model: Respuesta,
          attributes: ['campo_id', 'valor'],
        },
        {
          model: Tramite,
          attributes: ['id', 'slug', 'titulo', 'config'],
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
                      attributes: [
                        'id',
                        'etiqueta',
                        'tipo',
                        'nombre_interno',
                        'placeholder',
                        'opciones',
                        'obligatorio',
                        'texto_ayuda',
                        'config',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      order: [[Tramite, Formulario, PasoFormulario, 'orden', 'ASC']],
    });

    if (!solicitud) {
      return res.status(404).json({
        error: true,
        message: 'No se encontró la solicitud',
      });
    }

    const historialEstados = await HistorialEstadosSolicitudes.findAll({
      where: {
        solicitud_id: solicitud.id,
      },
      order: [['createdAt', 'ASC']],
      raw: true,
    });

    const completeInfo = await Promise.all(
      historialEstados.map(async (item) => {
        let usuarioNombre = 'Sistema';

        if (item.usuario_id && item.usuario_tipo === 'funcionario') {
          const funcionario = await Funcionario.findByPk(item.usuario_id, {
            attributes: ['nombres', 'apellidos'],
            raw: true,
          });

          if (funcionario) {
            usuarioNombre = [funcionario.nombres, funcionario.apellidos].filter(Boolean).join(' ');
          }
        }

        if (item.usuario_id && item.usuario_tipo === 'solicitante') {
          const usuario = await Usuario.findByPk(item.usuario_id, {
            attributes: ['nombres', 'apellidos'],
            raw: true,
          });

          if (usuario) {
            usuarioNombre = [usuario.nombres, usuario.apellidos].filter(Boolean).join(' ');
          }
        }

        return {
          ...item,
          usuarioNombre,
        };
      }),
    );

    return res.status(200).json({
      error: false,
      data: {
        solicitud,
        completeInfo,
      },
      message: 'Solicitud obtenida correctamente',
    });
  } catch (error) {
    console.error('Error al obtener la solicitud:', error);

    return res.status(500).json({
      error: true,
      message: 'No se pudo obtener la solicitud',
    });
  }
};

export const obtenerSolicitudesPermisosTransitorios = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const filters = req.query.filters;
  const search = req.query.search;
  const offset = (page - 1) * pageSize;

  const tramite = await Tramite.findOne({
    where: { slug: 'permisos-transitorios' },
  });

  if (!tramite) {
    return res.status(404).json({ message: 'No se encontró el trámite' });
  }

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

    const searchTerm = search?.trim();

    if (searchTerm) {
      whereClause[Op.or] = [
        {
          codigo: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        Sequelize.literal(`EXISTS (
      SELECT 1
      FROM respuestas r
      INNER JOIN campos_formularios c ON c.id = r.campo_id
      WHERE r.solicitud_id = solicitudes.id
      AND c.nombre_interno = 'rut-organizacion_d47facbd'
      AND r.valor LIKE '%${searchTerm}%'
    )`),
      ];
    }

    const { rows, count } = await Solicitud.findAndCountAll({
      limit: pageSize,
      offset,
      where: whereClause,
      include: [
        {
          model: Usuario,
          attributes: ['nombres', 'apellidos', 'run'],
        },
        {
          model: Respuesta,
          required: false,
          attributes: ['campo_id', 'id', 'valor'],
          include: [
            {
              model: CampoFormulario,
              attributes: ['id', 'nombre_interno'],
              required: true,
              where: {
                nombre_interno: {
                  [Op.in]: ['rut-organizacion_d47facbd', 'razon-social_53f3b138'],
                },
              },
            },
          ],
        },
      ],
      distinct: true,
    });

    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    return res.status(200).json({ rows, totalPages, tramite });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message, mensaje: 'Error interno del servidor' });
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

  if (!tramite) {
    return res.status(404).json({ message: 'No se encontró el trámite' });
  }

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

    return res.status(200).json({ rows, totalPages, tramite });
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
