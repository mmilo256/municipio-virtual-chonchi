import { QueryTypes } from 'sequelize';
import { migrations } from '../../migrations/index.js';
import logger from '../winston.js';

const MIGRATIONS_TABLE = 'schema_migrations';
const MIGRATION_LOCK = 'municipio_virtual_schema_migrations';

const ensureMigrationsTable = async (sequelize) => {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      applied_at DATETIME NOT NULL
    ) ENGINE=InnoDB
  `);
};

export const runMigrations = async (sequelize) => {
  const [lock] = await sequelize.query('SELECT GET_LOCK(:lockName, 10) AS acquired', {
    replacements: { lockName: MIGRATION_LOCK },
    type: QueryTypes.SELECT,
  });

  if (lock.acquired !== 1) {
    throw new Error('No se pudo obtener el bloqueo para ejecutar migraciones');
  }

  try {
    await ensureMigrationsTable(sequelize);
    const appliedRows = await sequelize.query(`SELECT id FROM ${MIGRATIONS_TABLE}`, {
      type: QueryTypes.SELECT,
    });
    const applied = new Set(appliedRows.map(({ id }) => id));

    for (const migration of migrations) {
      if (applied.has(migration.id)) continue;

      logger.info(`Aplicando migración ${migration.id}...`);
      await sequelize.transaction(async (transaction) => {
        await migration.up({
          sequelize,
          queryInterface: sequelize.getQueryInterface(),
          transaction,
        });
        await sequelize.query(
          `INSERT INTO ${MIGRATIONS_TABLE} (id, applied_at) VALUES (:id, :appliedAt)`,
          {
            replacements: { id: migration.id, appliedAt: new Date() },
            transaction,
          },
        );
      });
      logger.info(`Migración ${migration.id} aplicada correctamente`);
    }
  } finally {
    await sequelize.query('SELECT RELEASE_LOCK(:lockName)', {
      replacements: { lockName: MIGRATION_LOCK },
    });
  }
};
