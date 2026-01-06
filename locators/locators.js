/**
 * Centralized locators for SauceDemo application
 * All selectors and locators should be defined here for better maintainability
 */

const Locators = {
    // Login Page Locators
    login: {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        profileLink: '#profile-link'
    },

    // Example/General Locators (from example.spec.js)
    example: {
        getStartedLink: { role: 'link', name: 'Get started' },
        installationHeading: { role: 'heading', name: 'Installation' }
    }
};

module.exports = Locators;

