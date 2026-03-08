import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

if (!process.env.API_BASE)
  throw new Error("Missing required env variable: API_BASE");

const API_BASE = process.env.API_BASE;

const { Given, When, Then } = createBdd();

Given("I open the Ping Pong app", async ({ page }) => {
  await fetch(`${API_BASE}/pongs`, { method: "DELETE" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

When("I click the {string} button", async ({ page }, name: string) => {
  await page.getByRole("button", { name }).click();
});

When("I refresh the pongs list", async ({ page }) => {
  await page.getByRole("button", { name: "Refresh" }).click();
  await page.waitForLoadState("networkidle");
});

Then("I should see the empty state message", async ({ page }) => {
  await expect(page.getByText("No pongs yet. Click Ping!")).toBeVisible();
});

Then(
  "I should see {int} pongs in the list",
  async ({ page }, count: number) => {
    if (count === 0) {
      await expect(page.locator("ul > li")).toHaveCount(0);
    } else {
      await expect(page.locator("ul > li")).toHaveCount(count);
    }
  },
);

Given("{int} pongs exist in the database", async ({}, count: number) => {
  for (let i = 0; i < count; i++) {
    await fetch(`${API_BASE}/pongs`, { method: "POST" });
  }
});

Given("a pong exists in the database", async ({}) => {
  await fetch(`${API_BASE}/pongs`, { method: "POST" });
});
