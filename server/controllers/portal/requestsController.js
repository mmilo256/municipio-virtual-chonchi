import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import User from "../../models/userModel.js"

export const getAllRequestsByRut = async (req, res) => {
    const { run } = req.query
    try {
        // Obtener todas las solicitudes
        const requests = await User.findOne({
            attributes: ['id', 'run'],
            where: { run },
            include: [
                {
                    model: Request,
                    attributes: ['id', 'estado', 'createdAt'],
                    include: [{
                        model: Procedure,
                        attributes: ['id', 'nombre', 'titulo']
                    }]
                }
            ]
        })
        res.status(200).json(requests)
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