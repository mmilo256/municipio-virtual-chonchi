import { sequelize } from "../../config/db/config.js"
import Document from "../../models/documentModel.js"
import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import User from "../../models/userModel.js"
import fs from 'fs/promises'
import path from "path"
// import { verifyToken } from "../../utils/tokens.js"
import jwt from 'jsonwebtoken'

// Borrar documento asociado
export const borrarDocumentoAsociado = async (req, res) => {
    const { docId } = req.params;
    try {
        // Buscar el documento en la base de datos
        const doc = await Document.findByPk(docId);
        // Verificar si el documento existe
        if (!doc) {
            return res.status(404).json({ message: "Documento no encontrado" });
        }
        // Convertir la ruta a absoluta
        const rutaAbsoluta = path.resolve(doc.dataValues.ruta);
        // Intentar borrar el archivo (si falla, se maneja el error pero no bloquea)
        try {
            await fs.unlink(rutaAbsoluta);
        } catch (error) {
            console.warn(`No se pudo borrar el archivo: ${error.message}`);
        }
        // Eliminar el registro de la base de datos
        await doc.destroy();
        // Responder al cliente
        res.status(200).json({ message: "Documento eliminado" });
    } catch (error) {
        // Manejo genérico de errores
        console.error(`Error al eliminar documento: ${error.message}`);
        res.status(500).json({ message: `Error al eliminar el documento: ${error.message}` });
    }
};

// Obtener todos los documentos asociados a una solicitud
export const obtenerDocumentosAsociados = async (req, res) => {
    const { id } = req.params
    try {
        const docs = await Document.findAll({ where: { solicitud_id: id, tipo: 'subido' } })
        res.status(200).json(docs)
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los documentos: ${error.message}` })
    }
}

// Subir documento asociado
export const subirDocumentoAsociado = async (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    const tipo = "subido"
    const file = req.file
    try {
        const doc = await Document.create({ solicitud_id: id, nombre: nombre, ruta: file.path, tipo })
        console.log(doc.dataValues)
        res.status(200).json(doc.dataValues)
    } catch (error) {
        res.status(500).json({ message: `Error al subir el documento: ${error.message}` })
    }
}

// Actualizar el estado de una solicitud
export const updateRequestStatus = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    const { estado } = req.body // Obtiene el nuevo estado desde el cuerpo de la solicitud
    const t = await sequelize.transaction() // Inicia una transacción en la base de datos
    try {
        // Actualiza el estado de la solicitud en la base de datos
        await Request.update({ estado }, { where: { id }, transaction: t })

        // Crea un registro en el historial de estados de la solicitud
        await RequestsStatusLog.create({ solicitud_id: id, estado }, { transaction: t })

        await t.commit() // Confirma la transacción
        res.status(200).json({ message: "Estado de la solicitud actualizado" }) // Responde con éxito
    } catch (error) {
        await t.rollback() // Si ocurre un error, revierte la transacción
        res.status(500).json({ message: `Error al actualizar el estado de la solicitud: ${error.message}` }) // Responde con un error
    }
}

// Obtener solicitud por ID
export const getRequestById = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    try {
        // Busca la solicitud por su ID e incluye la información relacionada con el trámite y el usuario
        const request = await Request.findByPk(id, {
            include: [
                {
                    model: Procedure, // Incluye los datos del procedimiento
                    attributes: ["titulo"] // Solo se selecciona el título del procedimiento
                },
                {
                    model: User, // Incluye los datos del usuario asociado a la solicitud
                    attributes: ["nombres", "apellidos", "run"] // Solo se seleccionan los nombres, apellidos y RUN del usuario
                }
            ]
        })
        res.status(200).json({ request }) // Devuelve la solicitud encontrada en la respuesta
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la solicitud: ${error.message}` }) // Responde con un error
    }
}

// Obtener todas las solicitudes de un trámite
export const getAllRequestsByProcedure = async (req, res) => {
    const { tramiteId } = req.query // Obtiene el ID del trámite desde los parámetros de la consulta
    try {
        // Obtiene todas las solicitudes relacionadas con el trámite indicado
        const requests = await Request.findAll({
            attributes: ["id", "estado", "usuario_id", "createdAt", "tramite_id"], // Selecciona los atributos de la solicitud
            where: { tramite_id: tramiteId }, // Filtra las solicitudes por ID de trámite
            include: [
                {
                    model: Procedure, // Incluye el procedimiento relacionado
                    attributes: ["titulo"] // Solo selecciona el título del procedimiento
                },
                {
                    model: User, // Incluye el usuario asociado a la solicitud
                    attributes: ["nombres", "apellidos"] // Solo selecciona los nombres y apellidos del usuario
                }
            ],
            order: [["createdAt", "DESC"]] // Ordena las solicitudes por fecha de creación en orden descendente
        })
        res.status(200).json({ requests }) // Devuelve las solicitudes encontradas en la respuesta
    } catch (error) {
        res.status(500).json({ message: `Error al obtener las solicitudes: ${error.message}` }) // Responde con un error
    }
}
