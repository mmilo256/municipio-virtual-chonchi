import { sequelize } from "../../config/db/config.js"
import Procedure from "../../models/procedureModel.js"
import Request from "../../models/requestModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import User from "../../models/userModel.js"


export const updateRequestStatus = async (req, res) => {
    const { id } = req.params
    const { estado } = req.body
    const t = await sequelize.transaction()
    try {
        await Request.update({ estado }, { where: { id }, transaction: t })
        await RequestsStatusLog.create({ solicitud_id: id, estado }, { transaction: t })
        await t.commit()
        res.status(200).json({ message: "Estado de la solicitud actualizado" })
    } catch (error) {
        await t.rollback()
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}

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
            ],
            order: [["createdAt", "DESC"]]
        })
        res.status(200).json({ requests })
    } catch (error) {
        console.log(error)
        throw new Error(`Ha ocurrido un error: ${error.message}`);

    }
}