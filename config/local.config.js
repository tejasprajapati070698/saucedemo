/**
 * Local Environment Configuration
 * Test data and URLs for local development environment
 */

module.exports = {
    environment: 'local',
    
    // Application URLs
    urls: {
        baseUrl: 'https://www.saucedemo.com',
        inventoryUrl: 'https://www.saucedemo.com/inventory.html',
        cartUrl: 'https://www.saucedemo.com/cart.html',
        checkoutUrl: 'https://www.saucedemo.com/checkout-step-one.html'
    },

    // Test Data
    testData: {
        users: {
            standard: {
                username: 'standard_user',
                password: 'secret_sauce'
            },
            locked: {
                username: 'locked_out_user',
                password: 'secret_sauce'
            },
            problem: {
                username: 'problem_user',
                password: 'secret_sauce'
            },
            performance: {
                username: 'performance_glitch_user',
                password: 'secret_sauce'
            }
        },
        products: {
            // Add product-related test data here
        }
    },

    // Timeouts and waits
    timeouts: {
        defaultTimeout: 30000,
        navigationTimeout: 60000
    }
};

