import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRecipients, sendEmailSafely } from '../services/notifications.service.js';

test('normaliza, elimina vacíos y evita destinatarios duplicados', () => {
  assert.deepEqual(normalizeRecipients([' persona@example.com ', '', null, 'persona@example.com']), [
    'persona@example.com',
  ]);
});

test('omite el envío cuando no hay destinatarios', async () => {
  let called = false;
  const result = await sendEmailSafely({ to: [], subject: 'Prueba', html: '' }, async () => {
    called = true;
  });

  assert.equal(called, false);
  assert.deepEqual(result, { status: 'skipped', reason: 'no-recipients' });
});

test('captura una falla SMTP sin propagarla', async () => {
  const result = await sendEmailSafely(
    { to: 'persona@example.com', subject: 'Prueba', html: '' },
    async () => {
      throw new Error('SMTP no disponible');
    },
  );

  assert.deepEqual(result, { status: 'failed', reason: 'SMTP no disponible' });
});
