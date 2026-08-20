import * as existingSchemaBaseline from './001-existing-schema-baseline.js';
import * as userSessions from './002-user-sessions.js';

export const migrations = [existingSchemaBaseline, userSessions];
