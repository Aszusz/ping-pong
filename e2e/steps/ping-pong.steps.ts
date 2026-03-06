import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Given("I open the app", async ({ page }) => {
  await page.goto("/");
});

Given("I clear all pongs", async ({ page }) => {
  const deleteResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/pongs") &&
      res.request().method() === "DELETE" &&
      res.ok(),
  );
  const refetchResponse = page.waitForResponse(
    (res) =>
      res.url().includes("/pongs") &&
      res.request().method() === "GET" &&
      res.ok(),
  );
  await page.getByTestId("clear-button").click();
  await deleteResponse;
  await refetchResponse;
  await expect(page.getByTestId("empty-state")).toBeVisible();
});

When("I click the Ping button", async ({ page }) => {
  await page.getByTestId("ping-button").click();
  await page.waitForResponse((res) => res.url().includes("/pongs") && res.ok());
});

When("I click the Refresh button", async ({ page }) => {
  await page.getByTestId("refresh-button").click();
  await page.waitForResponse((res) => res.url().includes("/pongs") && res.ok());
});

When("I click the Clear button", async ({ page }) => {
  await page.getByTestId("clear-button").click();
  await page.waitForResponse((res) => res.url().includes("/pongs") && res.ok());
});

Then("I should see the heading {string}", async ({ page }, heading: string) => {
  await expect(page.getByTestId("heading")).toHaveText(heading);
});

Then("I should see the empty state message", async ({ page }) => {
  await expect(page.getByTestId("empty-state")).toBeVisible();
});

Then(
  "I should see {int} pong(s) in the list",
  async ({ page }, count: number) => {
    await expect(page.getByTestId("pong-item")).toHaveCount(count);
  },
);
