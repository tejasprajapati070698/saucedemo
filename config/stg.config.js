/**
 * Staging Environment Configuration
 * Test data and URLs for staging environment
 */

module.exports = {
    environment: 'staging',
    
    // Application URLs
    urls: {
        baseUrl: 'https://staging.saucedemo.com',
        inventoryUrl: 'https://staging.saucedemo.com/inventory.html',
        cartUrl: 'https://staging.saucedemo.com/cart.html',
        checkoutUrl: 'https://staging.saucedemo.com/checkout-step-one.html'
    },

    // Test Data
    testData: {
        users: {
            standard: {
                username: 'stg_standard_user',
                password: 'stg_secret_sauce'
            },
            locked: {
                username: 'stg_locked_out_user',
                password: 'stg_secret_sauce'
            },
            problem: {
                username: 'stg_problem_user',
                password: 'stg_secret_sauce'
            },
            performance: {
                username: 'stg_performance_glitch_user',
                password: 'stg_secret_sauce'
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

