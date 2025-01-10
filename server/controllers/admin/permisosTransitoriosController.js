import { generarDecretoPT } from "../../utils/generarDecretoPT.js"
import { formatDate } from "../../utils/utils.js"
import Document from "../../models/documentModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"

// Subir documento firmado
export const uploadSignedDocument = async (req, res) => {
    const { id } = req.params
    const file = req.file
    console.log(file)
    // Guardar decreto en base de datos
    await Document.create({ ruta: file.path, nombre: file.filename, estado: "firmado", solicitud_id: id })
    res.send(file)
}

// Obtener documento final del trámite
export const getFinalDocument = async (req, res) => {
    const { id } = req.params
    const { estado_doc } = req.query
    try {
        const document = await Document.findOne({ where: { solicitud_id: id, estado: estado_doc } })
        res.status(200).json({ document })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

// Generar decreto para solicitudes de permisos transitorios
export const approveRequestPT = async (req, res) => {

    const { id } = req.params

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
        // Generar decreto
        const doc = generarDecretoPT(data)

        // Guardar decreto en base de datos
        await Document.create({ ruta: doc.path, estado: "sin firmar", solicitud_id: id })

        // Cambiar estado de solicitud a aprobada
        await Request.update({ estado: "aprobada" }, { where: { id } })
        await RequestsStatusLog.create({ solicitud_id: id, estado: 'aprobada' })
        res.status(200).json({ message: "Decreto generado exitosamente" })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}