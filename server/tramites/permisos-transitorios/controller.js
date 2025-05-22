
import Document from "../../models/documentModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import { generarDecretoPT } from "../../utils/documents/generarDecretoPT.js"
import { generarDecretoService, obtenerDecretosService } from "./service.js"

// Subir documento firmado
export const subirDecretoFirmado = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    const file = req.file // Obtiene el archivo subido en la solicitud
    console.log(file) // Imprime el archivo para fines de depuración

    // Guarda la información del decreto firmado en la base de datos
    await Document.create({ ruta: file.path, nombre: file.filename, tipo: 'generado', estado: "firmado", solicitud_id: id })
    res.send(file) // Responde con el archivo subido
}

// Obtener documento final del trámite
export const obtenerDecretos = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    try {
        // Busca el documento en la base de datos con el estado indicado
        const decretos = await obtenerDecretosService(id)
        res.status(200).json(decretos) // Devuelve el documento encontrado en la respuesta
    } catch (error) {
        console.log(error) // Imprime el error para fines de depuración
        res.status(500).json({ error: error.message, message: "No se pudo obtener los decretos asociados a esta solicitud" })
    }
}

// Generar decreto para solicitudes de permisos transitorios
export const generarDecreto = async (req, res) => {
    const { id } = req.params
    try {
        const dataDecreto = await generarDecretoService(id, req.body)
        console.log(dataDecreto.dataValues)
        res.status(200).json({ message: "Decreto generado exitosamente", dataDecreto })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "No se pudo generar el decreto de permiso transitorio" })
    }
}