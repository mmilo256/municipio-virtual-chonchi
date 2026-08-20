import crypto from 'node:crypto';

const LEGACY_ITERATIONS = 1000;
const CURRENT_ITERATIONS = 310000;

const derivePassword = (password, salt, iterations) => {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
};

export const hashPassword = (password, salt) => {
  return `pbkdf2-sha512$${CURRENT_ITERATIONS}$${derivePassword(password, salt, CURRENT_ITERATIONS)}`;
};

export const verifyPassword = (password, salt, storedHash) => {
  const parts = storedHash.split('$');
  const versioned = parts.length === 3 && parts[0] === 'pbkdf2-sha512';
  const iterations = versioned ? Number(parts[1]) : LEGACY_ITERATIONS;
  const expected = versioned ? parts[2] : storedHash;
  const actual = derivePassword(password, salt, iterations);

  if (actual.length !== expected.length) return { valid: false, needsUpgrade: false };
  const valid = crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
  return { valid, needsUpgrade: valid && !versioned };
};
