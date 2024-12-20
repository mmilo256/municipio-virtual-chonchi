import Procedure from "../Models/procedureModel.js"
import Request from "../Models/requestModel.js"
import User from "../Models/userModel.js"

export const getRequestById = async (req, res) => {
    const { id } = req.params
    try {
        const request = await Request.findByPk(id, {
            include: [
                {
                    model: Procedure,
                    attributes: ["titulo"]
                },
                {
                    model: User,
                    attributes: ["nombres", "apellidos", "run"]
                }
            ]
        })
        res.status(200).json({ request })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

export const getAllRequestsByProcedure = async (req, res) => {
    const { tramiteId } = req.query
    try {
        // Obtener todas las solicitudes
        const requests = await Request.findAll({
            attributes: ["id", "estado", "usuario_id", "createdAt", "tramite_id"],
            where: { tramite_id: tramiteId },
            include: [
                {
                    model: Procedure,
                    attributes: ["titulo"]
                },
                {
                    model: User,
                    attributes: ["nombres", "apellidos"]
                }
            ]
        })
        res.status(200).json({ requests })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}

export const createRequest = async (req, res) => {
    try {
        const data = req.body
        const files = req.files
        const requestData = {
            estado: "pendiente",
            documentos: files.map(file => ({
                fieldname: file.fieldname,
                filename: file.filename,
                originalname: file.originalname,
                path: file.path
            })),
            ...data
        }
        await Request.create(requestData)
        res.send("Solicitud enviada exitosamente")
    } catch (error) {
        console.log(error)
        throw new Error(`Hubo un error: ${error.message}`);
    }
}