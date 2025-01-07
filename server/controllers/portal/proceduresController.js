import logger from "../../config/winston.js"
import Input from "../../models/inputModel.js"
import Procedure from "../../models/procedureModel.js"

// Obtener todos los trámites disponibles
export const getAllProcedures = async (req, res) => {
    try {
        const procedures = await Procedure.findAll({ attributes: ["id", "nombre", "titulo", "descripcion_corta", "activo"] })
        res.status(200).json({ procedures })
    } catch (error) {
        logger.error("No se pudo obtener los trámites")
        throw new Error("No se pudo obtener los trámites")
    }
}

// Obtener toda la información de un trámite según su ID
export const getProcedureById = async (req, res) => {
    const { id } = req.params
    try {
        const procedure = await Procedure.findByPk(id)
        res.status(200).json({ procedure })
    } catch (error) {
        logger.error("No se pudo obtener el trámite solicitado.")
        throw new Error("No se pudo obtener el trámite solicitado.")
    }
}

// Obtener todos los campos del formulario asociado a un trámite específico
export const getFormInputs = async (req, res) => {
    const { id } = req.params
    try {
        const inputs = await Input.findAll({ where: { tramite_id: id } })
        res.status(200).json({ inputs })
    } catch (error) {
        logger.error("No se pudo obtener los campos del formulario")
        throw new Error("No se pudo obtener los campos del formulario")
    }
}