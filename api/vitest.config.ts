import { defineConfig } from 'vitest/config';


export default defineConfig({
  test: {
    include: ['src/tests/*.test.ts'],
    setupFiles: ['./src/tests/setupTests'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/services/**/*.ts'], 
      exclude: ['node_modules/**', 'src/tests/**'], 
    }
  },
});