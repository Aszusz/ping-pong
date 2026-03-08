import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "e2e/features/**/*.feature",
  steps: "e2e/steps/**/*.ts",
});

process.env.API_BASE = `http://localhost:3001`;

const TEST_DB_URL =
  "postgresql://postgres:postgres@localhost:5433/pingpong_test";
const TEST_API_PORT = 3001;
const TEST_WEB_PORT = 5174;
const TEST_API_URL = `http://localhost:${TEST_API_PORT}`;
const TEST_WEB_URL = `http://localhost:${TEST_WEB_PORT}`;

export default defineConfig({
  testDir,
  reporter: "html",
  use: {
    baseURL: TEST_WEB_URL,
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command: `pnpm --filter @ping-pong/api dev`,
      port: TEST_API_PORT,
      reuseExistingServer: false,
      env: {
        DATABASE_URL: TEST_DB_URL,
        PORT: String(TEST_API_PORT),
        CORS_ORIGIN: TEST_WEB_URL,
      },
    },
    {
      command: `pnpm --filter @ping-pong/web dev -- --port ${TEST_WEB_PORT}`,
      port: TEST_WEB_PORT,
      reuseExistingServer: false,
      env: {
        VITE_API_URL: TEST_API_URL,
      },
    },
  ],
});
