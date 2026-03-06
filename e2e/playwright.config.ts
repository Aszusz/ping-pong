import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "features/",
  steps: "steps/*.ts",
  outputDir: ".features-gen/",
});

export default defineConfig({
  testDir,
  workers: 1,
  use: {
    baseURL: "http://localhost:5174",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "VITE_PORT=5174 VITE_API_URL=http://localhost:3001 pnpm web:dev",
    url: "http://localhost:5174",
    reuseExistingServer: !process.env.CI,
  },
});
