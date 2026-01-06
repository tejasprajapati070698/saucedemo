const { test, expect } = require("@playwright/test");
const { env } = require("node:process");

test.describe("End-to-End Flow", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the application's main page before each test
        await page.goto("https://www.saucedemo.com");
    });
    test("User can complete the end-to-end flow", async ({ page }) => {
        // Step 1: User logs in
        await page.fill('[data-test="username"]', "standard_user");
        await page.fill('[data-test="password"]', "secret_sauce");
        await page.click('[data-test="login-button"]');
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        // Step 2: User navigates to the profile page
        // await page.click("#profile-link");
        // await expect(page).toHaveURL("http://localhost:3000/profile");
    });
});