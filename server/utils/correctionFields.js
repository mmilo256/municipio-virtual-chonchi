export const normalizeCorrectionFields = (fields) => {
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) return {};

  return Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => value?.correccion === true && Number.isInteger(Number(value.campo_id)))
      .slice(0, 100)
      .map(([name, value]) => [
        name,
        {
          correccion: true,
          campo_id: Number(value.campo_id),
          respuesta: value.respuesta,
        },
      ]),
  );
};
