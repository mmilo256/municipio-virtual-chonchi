import { sequelize } from "../config/db/config.js"
import Document from "../models/documentModel.js"
import Procedure from "../models/procedureModel.js"
import Request from "../models/requestModel.js"
import RequestsStatusLog from "../models/RequestsStatusLogModel.js"
import User from "../models/userModel.js"

export const getRequests = async (where = null) => {
    let options = {}
    if (where) {
        options.where = where
    }
    const requests = await Request.findAll(options)
    return requests
}

export const getRequestById = async (id) => {
    const request = await Request.findByPk(id, {
        include: [
            {
                model: Procedure,
                attributes: ["titulo"]
            }
        ]
    })
    return request
}

export const getLogs = async (request_id) => {
    const logs = await RequestsStatusLog.findAll({ where: { solicitud_id: request_id } })
    return logs
}

export const getRequestsByProcedure = async (procedure_id) => {
    const requests = await Request.findAll({
        where: { tramite_id: procedure_id },
        include: {
            model: User,
            attributes: ["nombres", "apellidos", "run"]
        }
    })
    return requests
}

export const getUserRequests = async (user_id) => {
    const requests = await Request.findAll({
        where: { usuario_id: user_id },
        include: {
            model: Procedure,
            attributes: ["titulo"]
        }
    })

    return requests
}

export const uploadDocument = async (file, requestId, status, type, name) => {
    try {
        const doc = {
            ruta: file?.path || null,
            estado: status || null,
            tipo: type || null,
            nombre: name,
            solicitud_id: requestId
        }
        const newDoc = await Document.create(doc)
        return newDoc
    } catch (error) {
        console.log(error)
        throw { status: 500, message: "No se pudo subir el documento" }
    }
}

export const createNewRequest = async (data, files) => {
    const t = await sequelize.transaction() // Iniciar una transacción para asegurar la atomicidad
    const requestData = {
        estado: "pendiente", // Establecer el estado inicial de la solicitud
        documentos: JSON.stringify(files.map(file => ({
            fieldname: file.fieldname,
            filename: file.filename,
            originalname: file.originalname,
            path: file.path // Guardar la información del archivo subido
        }))),
        respuestas: JSON.stringify(data.respuestas),
        tramite_id: data.tramite_id,
        usuario_id: data.usuarioId // Combinar los datos adicionales con los documentos
    }
    try {
        // Crear la solicitud en la base de datos
        const request = await Request.create(requestData, { transaction: t })
        // Registrar el estado inicial de la solicitud en el log de estados
        await RequestsStatusLog.create({ solicitud_id: request.id, estado: 'pendiente' }, { transaction: t })
        await t.commit() // Confirmar la transacción
        return request
    } catch (error) {
        await t.rollback() // Si ocurre un error, revertir la transacción
        throw { status: 500, message: "No se pudo ingresar la solicitud" }
    }
}