import defineAssociations from './associations.js';
import { sequelize } from './config.js';
import { config } from '../config.js';
import { runMigrations } from './migrations.js';

const initializeDB = async () => {
  // Define las asociaciones entre modelos (relaciones entre tablas)
  await defineAssociations();

  // Comprobar disponibilidad sin modificar el esquema.
  await sequelize.authenticate();

  // Compatibilidad explícita para bases locales desechables. Nunca activar en producción.
  if (config.db.sync) {
    await sequelize.sync({ alter: true });
  }

  await runMigrations(sequelize);
};

export default initializeDB;
