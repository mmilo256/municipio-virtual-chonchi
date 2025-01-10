import { sequelize } from "../../config/db/config.js"
import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import User from "../../models/userModel.js"

export const getStatusLog = async (req, res) => {
    const { id } = req.params
    try {
        const logs = await RequestsStatusLog.findAll({ where: { solicitud_id: id } })
        res.status(200).json(logs)
    } catch (error) {
        console.log(error)
        throw new Error(error.message);

    }
}

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
                    order: [['createdAt', 'DESC']],
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
    const t = await sequelize.transaction()
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
    try {
        const request = await Request.create(requestData, { transaction: t })
        await RequestsStatusLog.create({ solicitud_id: request.id, estado: 'pendiente' }, { transaction: t })
        await t.commit()
        res.send("Solicitud enviada exitosamente")
    } catch (error) {
        await t.rollback()
        console.log(error)
        throw new Error(`Hubo un error: ${error.message}`);
    }
}