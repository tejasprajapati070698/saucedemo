const { test, expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

test.describe("End-to-End Flow", () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the application's main page before each test
        await page.goto(Config.urls.baseUrl);
    });
    
    test("User can complete the end-to-end flow", async ({ page }) => {
        // Step 1: User logs in
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.fill(Locators.login.password, Config.testData.users.standard.password);
        await page.click(Locators.login.loginButton);
        await expect(page).toHaveURL(Config.urls.inventoryUrl);
    });
});