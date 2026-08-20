import test from 'node:test';
import assert from 'node:assert/strict';
import { haveSameAssociationIds, normalizeAssociationIds } from '../utils/associationIds.js';

test('acepta una lista vacía para eliminar todas las asociaciones', () => {
  assert.deepEqual(normalizeAssociationIds([], [4]), []);
});

test('conserva las asociaciones existentes si el campo fue omitido', () => {
  assert.deepEqual(normalizeAssociationIds(undefined, [4, 2]), [2, 4]);
});

test('normaliza IDs y compara sin depender del orden', () => {
  assert.deepEqual(normalizeAssociationIds(['3', 1, 3, 'invalido']), [1, 3]);
  assert.equal(haveSameAssociationIds([3, 1], [1, 3]), true);
});
