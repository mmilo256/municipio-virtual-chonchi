import jwt from 'jsonwebtoken'
import Procedure from '../../models/procedureModel.js'

export const getAllProceduresByUserPermissions = async (req, res) => {
    const token = jwt.decode(req.cookies['adminAccessToken'])
    try {
        const procedures = await Procedure.findAll({ attributes: ['id', 'nombre', 'titulo', 'descripcion_corta'] })
        res.status(200).json(procedures)
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los procedimientos: ${error.message}` })
    }
}