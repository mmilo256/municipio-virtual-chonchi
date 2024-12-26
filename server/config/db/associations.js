import Employee from "../../models/employeeModel.js"
import Input from "../../models/inputModel.js"
import Log from "../../models/logModel.js"
import Request from "../../models/requestModel.js"
import Procedure from "../../models/procedureModel.js"
import User from "../../models/userModel.js"
import Document from "../../models/documentModel.js"

const defineAssociations = async () => {
    // Campo - Trámite
    Input.belongsTo(Procedure, { foreignKey: 'tramite_id' })
    Procedure.hasMany(Input, { foreignKey: 'tramite_id' })
    // Solicitud - Trámite
    Request.belongsTo(Procedure, { foreignKey: 'tramite_id' })
    Procedure.hasMany(Request, { foreignKey: 'tramite_id' })
    // Solicitud - Usuario
    Request.belongsTo(User, { foreignKey: 'usuario_id' })
    User.hasMany(Request, { foreignKey: 'usuario_id' })
    // Solicitud - Log
    Log.belongsTo(Request, { foreignKey: 'solicitud_id' })
    Request.hasMany(Log, { foreignKey: 'solicitud_id' })
    // Employee - Log
    Log.belongsTo(Employee, { foreignKey: 'funcionario_id' })
    Employee.hasMany(Log, { foreignKey: 'funcionario_id' })
    // Solicitud - Documento
    Document.belongsTo(Request, { foreignKey: 'solicitud_id' })
    Request.hasMany(Document, { foreignKey: 'solicitud_id', as: 'documentosAsociados' })

}

export default defineAssociations