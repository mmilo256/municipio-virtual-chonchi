import { sequelize } from "../../config/db/config.js"
import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import User from "../../models/userModel.js"

// Obtener el historial de cambios de estado de una solicitud específica
export const getStatusLog = async (req, res) => {
    const { id } = req.params
    try {
        // Obtener todos los registros de estado para una solicitud
        const logs = await RequestsStatusLog.findAll({ where: { solicitud_id: id } })
        res.status(200).json(logs) // Enviar el historial de estados como respuesta
    } catch (error) {
        console.log(error)
        throw new Error(error.message); // Captura el error y lo lanza
    }
}

// Obtener todas las solicitudes de un usuario identificado por su RUN
export const getAllRequestsByRut = async (req, res) => {
    const { run } = req.query
    try {
        // Buscar el usuario por su RUN e incluir sus solicitudes asociadas
        const requests = await User.findOne({
            attributes: ['id', 'run'], // Seleccionar solo ciertos campos del usuario
            where: { run }, // Filtrar por el RUN proporcionado
            include: [
                {
                    model: Request, // Incluir las solicitudes del usuario
                    attributes: ['id', 'estado', 'createdAt'], // Campos de la solicitud
                    include: [{
                        model: Procedure, // Incluir el trámite asociado a la solicitud
                        attributes: ['id', 'nombre', 'titulo'] // Campos del trámite
                    }]
                }
            ]
        })
        res.status(200).json(requests) // Devolver todas las solicitudes del usuario
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Captura el error y lo lanza
    }
}

// Crear una nueva solicitud para un usuario
export const createRequest = async (req, res) => {
    const t = await sequelize.transaction() // Iniciar una transacción para asegurar la atomicidad
    const data = req.body // Obtener los datos del cuerpo de la solicitud
    const files = req.files // Obtener los archivos subidos con la solicitud
    const requestData = {
        estado: "pendiente", // Establecer el estado inicial de la solicitud
        documentos: files.map(file => ({
            fieldname: file.fieldname,
            filename: file.filename,
            originalname: file.originalname,
            path: file.path // Guardar la información del archivo subido
        })),
        ...data // Combinar los datos adicionales con los documentos
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
        throw new Error(`Hubo un error: ${error.message}`); // Captura el error y lo lanza
    }
}
