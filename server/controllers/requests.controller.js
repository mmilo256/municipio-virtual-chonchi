import { createNewRequest, getLogs, getRequests, getRequestsByProcedure, getUserRequests, getRequestById as getRequestByIdService, uploadDocument as uploadDocumentService } from "../services/requests.service.js"

// Obtener todas las solicitudes realizadas
export const getAllRequests = async (req, res) => {
    try {
        const requests = await getRequests()
        res.json(requests)
    } catch (error) {
        console.log(error)
        res.json({ message: "No se pudo obtener las solicitudes.", error: error.message })
    }
}

// Obtener una solicitud según su ID
export const getRequestById = async (req, res) => {
    try {
        const { id } = req.params
        const request = await getRequestByIdService(id)
        res.status(200).json(request)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Error interno del servidor.", error: e.message })
    }
}

// Obtener todas las solicitudes de un trámite en específico
export const getAllRequestsByProcedure = async (req, res) => {
    const { procedure_id } = req.params
    try {
        const requests = await getRequestsByProcedure(procedure_id)
        res.status(200).json(requests)
    } catch (e) {
        res.status(500).json({ error: e.message, message: "Error interno del servidor" })
    }
}

// Obtener el historial de cambios de estado de una solicitud específica
export const getStatusLog = async (req, res) => {
    const { id } = req.params
    try {
        // Obtener todos los registros de estado para una solicitud
        const logs = await getLogs(id)
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
        const requests = await getUserRequests(id)
        res.status(200).json(requests) // Devolver todas las solicitudes del usuario
    } catch (error) {
        res.status(500).json({ error: error.message, message: "No se pudo obtener las solicitudes." })
    }
}

// Crear una nueva solicitud para un usuario
export const createRequest = async (req, res) => {
    try {
        const request = await createNewRequest(req.body, req.files)
        res.json({ message: "Solicitud enviada exitosamente", request }) // Enviar una respuesta exitosa
    } catch (error) {
        await t.rollback() // Si ocurre un error, revertir la transacción
        console.log(error)
        res.json({ message: "No se pudo ingresar la solicitud.", error: error.message })
    }
}

// Subir documentos
export const uploadDocument = async (req, res) => {
    try {
        const { id } = req.params
        const file = req.files[0]
        // console.log({ archivo: file })
        const { status, type, name } = req.body
        console.log(req.body)
        const docs = await uploadDocumentService(file, id, status, type, name)
        res.status(200).json({ tramite_id: id, docs })
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}