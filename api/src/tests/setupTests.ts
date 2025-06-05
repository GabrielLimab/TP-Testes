import dotenv from 'dotenv';

dotenv.config();

import { expect, test } from 'vitest';

test('Environment variables', () => {
  expect(process.env.TMDB_BASE_URL).toBeDefined();
  expect(process.env.TMDB_API_KEY).toBeDefined();
});