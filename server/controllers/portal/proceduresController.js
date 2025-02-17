import logger from "../../config/winston.js"
import Procedure from "../../models/procedureModel.js"

// Obtener todos los trámites disponibles
export const getAllProcedures = async (req, res) => {
    try {
        // Consultar todos los trámites de la base de datos
        const procedures = await Procedure.findAll({ attributes: ["id", "nombre", "titulo", "descripcion_corta", "activo"] })
        res.status(200).json({ procedures }) // Enviar la lista de trámites como respuesta
    } catch (error) {
        // Registrar el error en caso de fallo
        logger.error("No se pudo obtener los trámites")
        throw new Error("No se pudo obtener los trámites")
    }
}

// Obtener toda la información de un trámite según su ID
export const getProcedureById = async (req, res) => {
    const { id } = req.params // Extraer el ID del trámite desde los parámetros de la solicitud
    try {
        // Consultar el trámite con el ID específico en la base de datos
        const procedure = await Procedure.findByPk(id)
        res.status(200).json({ procedure }) // Enviar la información del trámite como respuesta
    } catch (error) {
        // Registrar el error si no se puede obtener el trámite
        logger.error("No se pudo obtener el trámite solicitado.")
        throw new Error("No se pudo obtener el trámite solicitado.")
    }
}
