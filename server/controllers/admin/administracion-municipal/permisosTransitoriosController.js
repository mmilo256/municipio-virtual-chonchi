import { generarDecretoPT } from "../../../utils/generarDecretoPT.js"
import { formatDate } from "../../../utils/utils.js"
import Document from "../../../models/documentModel.js"
import Request from "../../../models/requestModel.js"
import RequestsStatusLog from "../../../models/RequestsStatusLogModel.js"

// Subir documento firmado
export const uploadSignedDocument = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    const file = req.file // Obtiene el archivo subido en la solicitud
    console.log(file) // Imprime el archivo para fines de depuración

    // Guarda la información del decreto firmado en la base de datos
    await Document.create({ ruta: file.path, nombre: file.filename, tipo: 'generado', estado: "firmado", solicitud_id: id })
    res.send(file) // Responde con el archivo subido
}

// Obtener documento final del trámite
export const getFinalDocument = async (req, res) => {
    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL
    const { estado_doc } = req.query // Obtiene el estado del documento desde los parámetros de la consulta
    try {
        // Busca el documento en la base de datos con el estado indicado
        const document = await Document.findOne({ where: { solicitud_id: id, estado: estado_doc } })
        res.status(200).json({ document }) // Devuelve el documento encontrado en la respuesta
    } catch (error) {
        console.log(error) // Imprime el error para fines de depuración
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Lanza un error si algo falla
    }
}

// Generar decreto para solicitudes de permisos transitorios
export const approveRequestPT = async (req, res) => {

    const { id } = req.params // Obtiene el ID de la solicitud desde los parámetros de la URL

    // Prepara los datos necesarios para generar el decreto
    const data = {
        n_dec: req.body.data.n_dec,
        fecha_dec: formatDate(new Date(), 1),
        org_name: req.body.data.org_name.toUpperCase(),
        org_rut: req.body.data.org_rut.toUpperCase(),
        activity_name: req.body.data.activity_name.toUpperCase(),
        owner_name: req.body.data.owner_name.toUpperCase(),
        owner_rut: req.body.data.owner_rut.toUpperCase(),
        start_date: formatDate(req.body.data.start_date, 1),
        place: req.body.data.place.toUpperCase(),
        start_time: req.body.data.start_time,
        end_time: req.body.data.end_time
    }
    try {
        // Genera el decreto utilizando los datos proporcionados
        const doc = generarDecretoPT(data)

        // Guarda el decreto en la base de datos con estado "sin firmar"
        await Document.create({ ruta: doc.path, nombre: doc.filename, estado: "sin firmar", tipo: 'generado', solicitud_id: id })

        // Actualiza el estado de la solicitud a 'por firmar'
        await Request.update({ estado: "por firmar" }, { where: { id } })
        await RequestsStatusLog.create({ solicitud_id: id, estado: 'por firmar' }) // Registra el cambio de estado

        res.status(200).json({ message: "Decreto generado exitosamente", doc }) // Responde con éxito
    } catch (error) {
        console.log(error) // Imprime el error para fines de depuración
        throw new Error(`Ha ocurrido un error: ${error.message}`); // Lanza un error si algo falla
    }
}
