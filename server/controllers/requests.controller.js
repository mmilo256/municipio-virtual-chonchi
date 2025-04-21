import { sequelize } from "../config/db/config.js"
import Procedure from "../models/procedureModel.js"
import Request from "../models/requestModel.js"
import RequestsStatusLog from "../models/RequestsStatusLogModel.js"

// Obtener todas las solicitudes realizadas
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll()
        res.json(requests)
    } catch (error) {
        console.log(error)
        res.json({ message: "No se pudo obtener las solicitudes.", error: error.message })
    }
}

// Obtener el historial de cambios de estado de una solicitud específica
export const getStatusLog = async (req, res) => {
    const { id } = req.params
    try {
        // Obtener todos los registros de estado para una solicitud
        const logs = await RequestsStatusLog.findAll({ where: { solicitud_id: id } })
        res.status(200).json(logs) // Enviar el historial de estados como respuesta
    } catch (error) {
        console.log(error)
        res.json({ message: "No se pudo obtener el log", error: error.message })
    }
}

// Obtener todas las solicitudes realizadas por un usuario, según el id del usuario
export const getAllRequestsByUserId = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(401).json({ message: "No se proporcionó un id" })
    }
    try {
        // Buscar el usuario por su RUN e incluir sus solicitudes asociadas
        const requests = await Request.findAll({
            where: { usuario_id: id },
            include: {
                model: Procedure,
                attributes: ["titulo"]
            }
        })
        res.status(200).json(requests) // Devolver todas las solicitudes del usuario
    } catch (error) {
        res.status(500).json({ error: error.message, message: "No se pudo obtener las solicitudes." })
    }
}

// Crear una nueva solicitud para un usuario
export const createRequest = async (req, res) => {
    const t = await sequelize.transaction() // Iniciar una transacción para asegurar la atomicidad
    const data = req.body // Obtener los datos del cuerpo de la solicitud
    const files = req.files // Obtener los archivos subidos con la solicitud
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
        res.send("Solicitud enviada exitosamente") // Enviar una respuesta exitosa
    } catch (error) {
        await t.rollback() // Si ocurre un error, revertir la transacción
        console.log(error)
        res.json({ message: "No se pudo ingresar la solicitud.", error: error.message })
    }
}
