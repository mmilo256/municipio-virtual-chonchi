import logger from "../config/winstonConfig.js"
import Input from "../Models/inputModel.js"
import Procedure from "../Models/procedureModel.js"
import { generateAct } from "../utils/generarDecretoPT.js"

// Generar decreto de permiso transitorio
export const generarDecretoPT = async (req, res) => {
    const { org_name, org_rut, activity_name, owner_name, owner_rut, start_date, place, start_time, end_time } = req.body
    const formattedData = {
        n_dec: 3,
        fecha_dec: new Date(),
        org_name: org_name.toUpperCase(),
        org_rut: org_rut.toUpperCase(),
        activity_name: activity_name.toUpperCase(),
        owner_name: owner_name.toUpperCase(),
        owner_rut: owner_rut.toUpperCase(),
        start_date: start_date,
        place: place.toUpperCase(),
        start_time,
        end_time
    }
    try {
        generateAct(formattedData)
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