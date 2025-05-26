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

export const updateRequestStatusService = async (id, status) => {
    try {
        await Request.update({ estado: status }, { where: { id } })
        await RequestsStatusLog.create({ estado: status, solicitud_id: id })
        return { message: "Estado actualizado exitosamente", status, requestId: id }
    } catch (error) {
        throw { error, message: "No se pudo actualizar el estado de la solicitud" }
    }
}

export const getDocumentsByRequest = async (requestId, type) => {
    try {
        const docs = await Document.findAll({ where: { solicitud_id: requestId, tipo: type } })
        return docs
    } catch (error) {
        console.log(error)
        return null
    }
}

export const uploadDocument = async (file, requestId, status, type, name) => {
    try {
        const doc = {
            ruta: file?.path || null,
            originalname: file?.originalname,
            estado: status || null,
            tipo: type || null,
            nombre: name || "sin nombre",
            solicitud_id: requestId
        }
        console.log(doc)
        const newDoc = await Document.create(doc)
        return newDoc
    } catch (error) {
        console.log(error)
        throw { status: 500, message: "No se pudo subir el documento" }
    }
}

export const createNewRequest = async (data, files) => {

    const t = await sequelize.transaction()

    const requestData = {
        estado: "pendiente", // Establecer el estado inicial de la solicitud
        respuestas: JSON.stringify(data.respuestas),
        tramite_id: data.tramite_id,
        usuario_id: data.usuarioId // Combinar los datos adicionales con los documentos
    }
    try {

        // Crear la solicitud en la base de datos
        const request = await Request.create(requestData, { transaction: t })

        const documents = files.map(file => {
            const str = file.fieldname
            const match = str.match(/\[(.*?)\]/)
            if (match) {
                return ({
                    ruta: file.path,
                    originalname: file.originalname,
                    nombre: match[1],
                    tipo: "adjunto",
                    solicitud_id: request.id
                })
            }
        })


        // Guardar documentos adjuntos en base de datos
        await Document.bulkCreate(documents, { transaction: t })

        // Registrar el estado inicial de la solicitud en el log de estados
        await RequestsStatusLog.create({ solicitud_id: request.id, estado: 'pendiente' }, { transaction: t })
        await t.commit() // Confirmar la transacción
        return request
    } catch (error) {
        await t.rollback() // Si ocurre un error, revertir la transacción
        throw { status: 500, message: "No se pudo ingresar la solicitud" }
    }
}


