export const id = '001-existing-schema-baseline';

const expectedTables = [
  'campos_formularios',
  'direcciones_municipales',
  'documentos',
  'formularios',
  'funcionario_tramites',
  'funcionarios',
  'historial_estados_solicitudes',
  'logs',
  'pasos_formularios',
  'respuestas',
  'solicitudes',
  'tramites',
  'usuarios',
];

export const up = async ({ queryInterface }) => {
  const existingTables = new Set(await queryInterface.showAllTables());
  const missingTables = expectedTables.filter((table) => !existingTables.has(table));

  if (missingTables.length) {
    throw new Error(
      `No se puede establecer la línea base. Faltan tablas: ${missingTables.join(', ')}`,
    );
  }
};
