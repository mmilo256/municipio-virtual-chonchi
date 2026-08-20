import defineAssociations from '../config/db/associations.js';
import { sequelize } from '../config/db/config.js';
import { runMigrations } from '../config/db/migrations.js';

try {
  await defineAssociations();
  await sequelize.authenticate();
  await runMigrations(sequelize);
  console.log('Migraciones completadas correctamente');
} finally {
  await sequelize.close();
}
