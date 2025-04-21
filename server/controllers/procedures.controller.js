import Procedure from "../models/procedureModel.js"

// Obtener todos los trámites disponibles
export const getAllProcedures = async (req, res) => {
    try {
        // Consultar todos los trámites de la base de datos
        const procedures = await Procedure.findAll()
        res.status(200).json(procedures) // Enviar la lista de trámites como respuesta
    } catch (error) {
        // Registrar el error en caso de fallo
        res.status(500).json({ message: "No se pudo obtener los trámites" })
    }
}

export const getProcedureById = async (req, res) => {
    const { id } = req.params
    try {
        const procedure = await Procedure.findByPk(id)
        res.json(procedure)
    } catch (error) {
        res.json({ message: "No se pudo encontrar el trámite", error: error.message })
    }
}

export const createProcedure = async (req, res) => {
    const {
        nombre,
        titulo,
        descripcion,
        descripcion_corta,
        requisitos,
        costo,
        modalidad_pago,
        direccion,
        horario_atencion,
        email,
        telefono
    } = req.body
    const data = {
        nombre,
        titulo,
        descripcion,
        descripcion_corta,
        requisitos,
        costo,
        modalidad_pago,
        direccion,
        horario_atencion,
        email,
        telefono
    }
    try {
        const newProcedure = await Procedure.create(data)
        res.json({ message: "Trámite creado correctamente", procedure: newProcedure })
    } catch (error) {
        console.log(error)
        res.json({ message: "No se pudo crear el trámite", error: error.message })
    }
}