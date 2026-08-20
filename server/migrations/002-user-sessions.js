export const id = '002-user-sessions';

export const up = async ({ sequelize, transaction }) => {
  await sequelize.query(
    `CREATE TABLE IF NOT EXISTS user_sessions (
      session_id VARCHAR(128) NOT NULL PRIMARY KEY,
      expires INT UNSIGNED NOT NULL,
      data MEDIUMTEXT,
      INDEX user_sessions_expires (expires)
    ) ENGINE=InnoDB`,
    { transaction },
  );
};
