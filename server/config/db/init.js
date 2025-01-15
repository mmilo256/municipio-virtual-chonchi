import Input from "../../models/inputModel.js";
import Procedure from "../../models/procedureModel.js";
import logger from "../winston.js";
import defineAssociations from "./associations.js";
import { sequelize } from "./config.js";
import { permisosTransitoriosInputs } from "./data/inputs.js";
import { permisosTransitorios } from "./data/procedures.js"

const initializeDB = async () => {
    // Define las asociaciones entre modelos (relaciones entre tablas)
    await defineAssociations()

    // Sincroniza los modelos con la base de datos, creando tablas si es necesario
    await sequelize.sync()

    // Inicia una transacción para asegurar que las operaciones de inserción se realicen de manera atómica
    const t = await sequelize.transaction()

    try {
        // Verifica cuántos registros existen en la tabla de procedimientos
        const count = await Procedure.count({ transaction: t })

        // Si no existen procedimientos, insertamos los datos iniciales
        if (count === 0) {
            // Crea un nuevo procedimiento con los datos de 'permisosTransitorios'
            const { dataValues } = await Procedure.create(permisosTransitorios, { transaction: t })

            // Mapea los campos de formulario de los datos iniciales y los asocia con el ID del procedimiento creado
            const camposFormulario = permisosTransitoriosInputs.map(campo => ({
                ...campo,
                tramite_id: dataValues.id
            }))

            // Inserta los campos del formulario en la base de datos de manera masiva
            await Input.bulkCreate(camposFormulario, { transaction: t })
        }

        // Si todo va bien, confirma la transacción
        await t.commit()

        // Registra un mensaje de éxito
        logger.info("Se ha inicializado la base de datos")
    } catch (error) {
        // Si ocurre un error, revierte la transacción
        await t.rollback()

        // Lanza un error con el mensaje correspondiente
        throw new Error(`No se pudo inicializar la base de datos. ${error.message}`)
    }
}

export default initializeDB
