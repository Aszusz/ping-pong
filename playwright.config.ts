import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "e2e/features/**/*.feature",
  steps: "e2e/steps/**/*.ts",
});

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env variable: ${name}`);
  return value;
}

const TEST_DB_URL = requireEnv("TEST_DATABASE_URL");
const TEST_API_PORT = Number(requireEnv("TEST_API_PORT"));
const TEST_WEB_PORT = Number(requireEnv("TEST_WEB_PORT"));
const TEST_HOST = requireEnv("TEST_HOST");

process.env.API_BASE = `${TEST_HOST}:${TEST_API_PORT}`;
const TEST_API_URL = `${TEST_HOST}:${TEST_API_PORT}`;
const TEST_WEB_URL = `${TEST_HOST}:${TEST_WEB_PORT}`;

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
      stdout: "pipe",
      stderr: "pipe",
      env: {
        DATABASE_URL: TEST_DB_URL,
        PORT: String(TEST_API_PORT),
        CORS_ORIGIN: TEST_WEB_URL,
      },
    },
    {
      command: `pnpm --filter @ping-pong/web dev --port ${TEST_WEB_PORT}`,
      port: TEST_WEB_PORT,
      reuseExistingServer: false,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        VITE_API_URL: TEST_API_URL,
      },
    },
  ],
});
