import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from '../utils/encryption.utils.js';
import { validatePassword } from '../utils/passwordPolicy.js';

test('crea y verifica hashes de contraseña con el formato actual', () => {
  const hash = hashPassword('Una-clave-segura-2026', 'salt-de-prueba');
  assert.match(hash, /^pbkdf2-sha512\$310000\$/);
  assert.deepEqual(verifyPassword('Una-clave-segura-2026', 'salt-de-prueba', hash), {
    valid: true,
    needsUpgrade: false,
  });
});

test('reconoce hashes antiguos para actualizarlos al iniciar sesión', async () => {
  const crypto = await import('node:crypto');
  const legacy = crypto.pbkdf2Sync('Una-clave-segura-2026', 'salt', 1000, 64, 'sha512').toString('hex');
  assert.deepEqual(verifyPassword('Una-clave-segura-2026', 'salt', legacy), {
    valid: true,
    needsUpgrade: true,
  });
});

test('rechaza contraseñas demasiado cortas', () => {
  assert.throws(() => validatePassword('corta'), /entre 12 y 128/);
});
