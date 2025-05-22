import { formatDate } from "../../utils/format.utils.js"
import { generarDocumento } from "../../utils/document.utils.js"
import Document from "../../models/documentModel.js"

export const obtenerDecretosService = async (requestId) => {
    try {
        const decretos = await Document.findAll({ where: { solicitud_id: requestId, tipo: "generado" } })
        return decretos
    } catch (error) {
        console.log(error)
        throw { error: error.message, message: "No se pudo obtener los decretos asociados a esta solicitud" }
    }
}

export const generarDecretoService = async (requestId, data) => {
    const { numDecreto, actividad, ubicacion, organizacion, rutOrganizacion, presidente, rutPresidente, fechaInicio, horaInicio, fechaTermino, horaTermino } = data

    const dateFormatString = "DD [de] MMMM [de] YYYY"
    const nombrePlantilla = "decreto_permisoTransitorio.docx"
    const nombreDocumento = "decreto_permisoTransitorio.docx"

    const formattedData = {
        numDecreto: Number(numDecreto),
        fechaDecreto: formatDate(new Date(), dateFormatString),
        actividad: actividad.toUpperCase(),
        ubicacion: ubicacion.toUpperCase(),
        organizacion: organizacion.toUpperCase(),
        rutOrganizacion,
        presidente: presidente.toUpperCase(),
        rutPresidente,
        fechaInicio: formatDate(fechaInicio, dateFormatString),
        horaInicio,
        fechaTermino: formatDate(fechaTermino, dateFormatString),
        horaTermino
    }

    const { filename, path } = generarDocumento(nombrePlantilla, formattedData, nombreDocumento)

    const dataDecreto = {
        estado: "sin firmar",
        tipo: "generado",
        nombre: filename,
        ruta: path,
        solicitud_id: Number(requestId),
        originalname: filename
    }

    const nuevoDecreto = await Document.create(dataDecreto)

    return nuevoDecreto

}