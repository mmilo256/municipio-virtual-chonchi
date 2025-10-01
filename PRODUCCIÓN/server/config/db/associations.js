import Employee from "../../models/employeeModel.js"
import Log from "../../models/logModel.js"
import Request from "../../models/requestModel.js"
import Procedure from "../../models/procedureModel.js"
import User from "../../models/userModel.js"
import Document from "../../models/documentModel.js"
import RequestsStatusLog from "../../models/RequestsStatusLogModel.js"
import Direccion from "../../models/DireccionModel.js"

const defineAssociations = async () => {
    // Solicitud - Trámite
    Request.belongsTo(Procedure, { foreignKey: 'tramite_id' })
    Procedure.hasMany(Request, { foreignKey: 'tramite_id' })
    // Direccion - Trámite
    Procedure.belongsTo(Direccion, { foreignKey: 'direccion_id' })
    Direccion.hasMany(Procedure, { foreignKey: 'direccion_id' })
    // Solicitud - Usuario
    Request.belongsTo(User, { foreignKey: 'usuario_id' })
    User.hasMany(Request, { foreignKey: 'usuario_id' })
    // Solicitud - Logs
    RequestsStatusLog.belongsTo(Request, { foreignKey: 'solicitud_id' })
    Request.hasMany(RequestsStatusLog, { foreignKey: 'solicitud_id' })
    // Employee - Log
    Log.belongsTo(Employee, { foreignKey: 'funcionario_id' })
    Employee.hasMany(Log, { foreignKey: 'funcionario_id' })
    // Solicitud - Documento
    Document.belongsTo(Request, { foreignKey: 'solicitud_id' })
    Request.hasMany(Document, { foreignKey: 'solicitud_id', as: 'documentosAsociados' })
}

export default defineAssociations