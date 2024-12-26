import logger from "../../config/winston.js"
import Input from "../../models/inputModel.js"
import Procedure from "../../models/procedureModel.js"
import { generateAct } from "../../utils/generarDecretoPT.js"

// Generar decreto de permiso transitorio
export const generarDecretoPT = (req, res) => {
    const data = {
        n_dec: req.body.data.n_dec,
        fecha_dec: new Date(),
        org_name: req.body.data.org_name,
        org_rut: req.body.data.org_rut,
        activity_name: req.body.data.activity_name,
        owner_name: req.body.data.owner_name,
        owner_rut: req.body.data.owner_rut,
        start_date: req.body.data.start_date,
        place: req.body.data.place,
        start_time: req.body.data.start_time,
        end_time: req.body.data.end_time
    }
    try {
        console.log(req.body)
        generateAct(data)
        res.status(200).json({ message: "Decreto generado exitosamente" })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

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