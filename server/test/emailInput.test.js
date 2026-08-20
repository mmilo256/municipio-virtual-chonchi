import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEmailRequest } from '../utils/emailInput.js';

test('normaliza destinatarios y elimina saltos de línea del asunto', () => {
  const result = normalizeEmailRequest({
    to: ['persona@example.com', 'persona@example.com'],
    subject: 'Aviso\r\nmalicioso',
    html: '<p>Contenido</p>',
  });
  assert.deepEqual(result.to, ['persona@example.com']);
  assert.equal(result.subject, 'Aviso  malicioso');
});

test('rechaza correos sin destinatarios', () => {
  assert.throws(
    () => normalizeEmailRequest({ to: [], subject: 'Aviso', html: '<p>Contenido</p>' }),
    /Destinatarios inválidos/,
  );
});

test('rechaza adjuntos fuera del almacenamiento del servidor', () => {
  assert.throws(
    () =>
      normalizeEmailRequest({
        to: 'persona@example.com',
        subject: 'Aviso',
        html: '<p>Contenido</p>',
        attachments: { path: '../../secreto.txt' },
      }),
    /fuera del almacenamiento permitido/,
  );
});
