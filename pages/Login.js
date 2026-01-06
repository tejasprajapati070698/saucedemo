/**
 * Login Page Object Model
 * Contains all methods and interactions for the Login page
 */

const { expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to the login page
     */
    async goto() {
        console.log(`[LoginPage] Navigating to base URL: ${Config.urls.baseUrl}`);
        await this.page.goto(Config.urls.baseUrl);
    }

    /**
     * Fill username field
     * @param {string} username - Username to enter
     */
    async fillUsername(username) {
        console.log(`[LoginPage] Filling username: ${username}`);
        await this.page.fill(Locators.login.username, username);
    }

    /**
     * Fill password field
     * @param {string} password - Password to enter
     */
    async fillPassword(password) {
        console.log(`[LoginPage] Filling password`);
        await this.page.fill(Locators.login.password, password);
    }

    /**
     * Click the login button
     */
    async clickLoginButton() {
        console.log(`[LoginPage] Clicking login button`);
        await this.page.click(Locators.login.loginButton);
    }

    /**
     * Perform complete login action
     * @param {string} username - Username to enter
     * @param {string} password - Password to enter
     */
    async login(username, password) {
        console.log(`[LoginPage] Performing login with user: ${username}`);
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Get the error message element
     * @returns {Locator} Error message locator
     */
    getErrorMessage() {
        return this.page.locator(Locators.login.errorMessage);
    }

    /**
     * Verify error message is visible and has expected text
     * @param {string} expectedText - Expected error message text
     */
    async verifyErrorMessage(expectedText) {
        console.log(`[LoginPage] Verifying error message: ${expectedText}`);
        const errorMessage = this.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText(expectedText);
    }

    /**
     * Verify successful login by checking URL redirect
     * @param {string} expectedUrl - Expected URL after login (default: inventoryUrl)
     */
    async verifySuccessfulLogin(expectedUrl = Config.urls.inventoryUrl) {
        console.log(`[LoginPage] Verifying successful login - expecting URL: ${expectedUrl}`);
        await expect(this.page).toHaveURL(expectedUrl);
    }

    /**
     * Verify login page elements are visible
     * Useful for verifying logout or page load
     */
    async verifyLoginPageElements() {
        console.log(`[LoginPage] Verifying login page elements are visible`);
        await expect(this.page.locator(Locators.login.username)).toBeVisible();
        await expect(this.page.locator(Locators.login.password)).toBeVisible();
        await expect(this.page.locator(Locators.login.loginButton)).toBeVisible();
    }

    /**
     * Attempt login without username (validation test)
     */
    async attemptLoginWithoutUsername() {
        console.log(`[LoginPage] Attempting login without username`);
        await this.clickLoginButton();
    }

    /**
     * Attempt login without password (validation test)
     * @param {string} username - Username to enter
     */
    async attemptLoginWithoutPassword(username) {
        console.log(`[LoginPage] Attempting login without password for user: ${username}`);
        await this.fillUsername(username);
        await this.clickLoginButton();
    }

    /**
     * Attempt login with locked user credentials
     * @param {string} username - Locked username
     * @param {string} password - Password
     */
    async attemptLoginWithLockedUser(username, password) {
        console.log(`[LoginPage] Attempting login with locked user: ${username}`);
        await this.login(username, password);
    }
}

module.exports = LoginPage;

