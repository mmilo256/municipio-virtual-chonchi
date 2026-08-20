import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCorrectionFields } from '../utils/correctionFields.js';

test('elimina campos que fueron desmarcados', () => {
  const result = normalizeCorrectionFields({
    nombre: { correccion: true, campo_id: 1, respuesta: 'Ana' },
    direccion: { correccion: false, campo_id: 2, respuesta: 'Chonchi' },
  });

  assert.deepEqual(result, {
    nombre: { correccion: true, campo_id: 1, respuesta: 'Ana' },
  });
});

test('descarta selecciones mal formadas', () => {
  assert.deepEqual(
    normalizeCorrectionFields({ campo: { correccion: true, campo_id: 'invalido' } }),
    {},
  );
});
