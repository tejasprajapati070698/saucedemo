# SauceDemo Test Automation Framework

This is a comprehensive end-to-end test automation framework for the SauceDemo application using Playwright. The framework is designed with a modular architecture that supports multiple environments and maintains clean separation of concerns.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Viewing Test Reports](#viewing-test-reports)
- [Test Cases](#test-cases)
- [Best Practices](#best-practices)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

You can verify your installations by running:
```bash
node --version
npm --version
```

## 📦 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd saucedemo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including:
   - `@playwright/test` - Playwright testing framework
   - `@types/node` - TypeScript definitions for Node.js

3. **Install Playwright browsers** (if not already installed):
   ```bash
   npx playwright install
   ```

   This installs the browser binaries needed for testing (Chromium, Firefox, WebKit).

## 📁 Project Structure

```
saucedemo/
├── config/                 # Configuration files
│   ├── configLoader.js    # Config loader utility
│   ├── local.config.js    # Local environment config
│   ├── stg.config.js      # Staging environment config
│   └── README.md          # Config documentation
├── locators/              # Page object locators
│   └── locators.js        # Centralized locators
├── pages/                 # Page object models (for future use)
├── tests/                 # Test files
│   └── endtoendFlow.spec.js
├── utilities/             # Utility functions
├── playwright.config.js   # Playwright configuration
├── package.json          # Project dependencies
└── README.md             # This file
```

## ⚙️ Configuration

The framework supports multiple environments through configuration files. Each environment has its own config file in the `config/` directory.

### Available Configurations

- **local.config.js** - Local/development environment (default)
- **stg.config.js** - Staging environment

### Config File Structure

Each config file contains:
- **URLs**: Base URL and page-specific URLs
- **Test Data**: User credentials, product information, checkout data
- **Timeouts**: Configuration for test timeouts

To add a new environment, create a new config file following the same structure. See `config/README.md` for detailed instructions.

## 🚀 Running Tests

### Basic Test Execution

Run all tests with default configuration (local):
```bash
npm test
```

### Running Tests with Specific Environment

**Linux/Mac:**
```bash
ENV_CONFIG=local npm test
ENV_CONFIG=stg npm test
```

**Windows PowerShell:**
```powershell
$env:ENV_CONFIG="stg"; npm test
```

**Windows CMD:**
```cmd
set ENV_CONFIG=stg && npm test
```

### Running Specific Test Files

Run a specific test file:
```bash
npx playwright test tests/endtoendFlow.spec.js
```

### Running Tests in Different Browsers

The framework is configured to run tests on multiple browsers (Chromium, Firefox, WebKit). By default, all browsers are tested. To run on a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Running Tests in Headless Mode

To run tests in headless mode (browser not visible), modify `playwright.config.js`:
```javascript
use: {
  headless: true,  // Change from false to true
}
```

Or run with command line flag:
```bash
npx playwright test --headed=false
```

### Running Tests in Debug Mode

To debug tests step by step:
```bash
npx playwright test --debug
```

This opens Playwright Inspector where you can:
- Step through tests
- View DOM snapshots
- Inspect network requests
- See console logs

## 📊 Viewing Test Reports

### HTML Report (Default)

After running tests, Playwright generates an HTML report automatically. To view it:

```bash
npx playwright show-report
```

This command:
1. Opens the HTML report in your default browser
2. Shows test results, execution time, screenshots, and traces
3. Displays pass/fail status for each test
4. Provides detailed error messages and stack traces

The report is stored in the `playwright-report/` directory.

### Viewing Last Report

If you've already run tests, you can view the last generated report:
```bash
npx playwright show-report playwright-report
```

### Report Features

The HTML report includes:
- ✅ **Test Summary**: Total tests, passed, failed, skipped
- 📸 **Screenshots**: Automatic screenshots on failure
- 🎬 **Video Recordings**: Video of test execution (if enabled)
- 📝 **Traces**: Detailed execution traces for debugging
- 🔍 **Error Details**: Full error messages and stack traces
- ⏱️ **Timing Information**: Execution time for each test

### Other Report Formats

You can also generate reports in different formats by modifying `playwright.config.js`:

```javascript
reporter: [
  ['html'],
  ['json', { outputFile: 'test-results.json' }],
  ['junit', { outputFile: 'test-results.xml' }]
]
```

## 🧪 Test Cases

The framework includes the following test cases in `tests/endtoendFlow.spec.js`:

1. **Validate username is required** - Tests login validation when username is missing
2. **Validate password is required** - Tests login validation when password is missing
3. **Verify User Login Is Successful** - Tests successful login flow
4. **Add all Products to Cart and Verify Checkout Page** - End-to-end test for adding products and navigating to checkout
5. **Validate Product Details for Each Product** - Validates product information (name, price, description, image) for all products

### Test Data

Test data is stored in configuration files and includes:
- User credentials (standard, locked, problem, performance users)
- Product information (names, prices, descriptions)
- Checkout information (first name, last name, postal code)

## 🤔 Test Automation Strategy

### 2. What did you choose to automate, and why?

I chose to automate the following critical user journeys and validations:

**Login Functionality:**
- **Login validation tests** (username required, password required) - These are fundamental security and UX validations that catch regressions early
- **Locked user scenario** - Ensures proper error handling and security measures are working
- **Successful login flow** - Validates the core authentication mechanism that gates all other functionality

**Shopping Cart & Checkout Flow:**
- **Add products to cart** - Core e-commerce functionality that directly impacts revenue
- **Cart badge verification** - Validates UI state management and user feedback
- **Checkout page navigation and form validation** - Critical conversion path that must work flawlessly
- **Product details validation** - Ensures product information accuracy, which affects customer trust and purchasing decisions
**User Session Management:**
- **Logout functionality** - Validates proper session termination and security

**Why these areas?**
1. **High Business Impact**: These flows represent the critical path from login to checkout, directly affecting user experience and revenue
2. **Regression Risk**: These are core functionalities that, if broken, would severely impact the application
3. **User-Facing Features**: Focused on end-to-end user journeys rather than isolated unit tests

### 3. What did you intentionally not automate, and why?

I intentionally did not automate the following areas:

**Complete Checkout Flow:**
- **Order submission and payment processing** - The demo application doesn't have real payment integration, and testing payment gateways requires special test environments and credentials. In a real scenario, this would be tested separately with payment provider test modes.

**Advanced Product Interactions:**
- **Product sorting and filtering** - While important, these are secondary features that don't block core user journeys. They can be tested manually or added later as the test suite matures.
- **Individual product detail pages** - The current tests validate product information on the listing page, which covers the essential data. Deep-diving into product pages would add complexity without proportional value for an initial test suite.

**Edge Cases and Error Scenarios:**
- **Checkout form validation errors** - Basic validation is covered, but exhaustive edge cases (invalid postal codes, special characters, etc.) would require extensive test data and maintenance overhead
- **Network failure scenarios** - These are better handled through API-level testing or specialized tools
- **Browser-specific edge cases** - Playwright runs on multiple browsers, but deep browser compatibility testing is better suited for dedicated compatibility testing tools

**Additional User Types:**
- **Problem user and performance glitch user scenarios** - While these users exist in the test data, automating their specific behaviors would require understanding their unique characteristics, which may be better suited for exploratory testing or specialized test scenarios


**Why not automate these?**
**Incremental Approach**: Start with critical paths, then expand based on actual needs and priorities

### 4. If this were a production application, what would you change or add next?

For a production application, I would prioritize the following enhancements:

**1. Test Infrastructure & CI/CD Integration:**
- **CI/CD Pipeline Integration**: Automate test execution on every commit/PR using GitHub Actions, Jenkins, or GitLab CI
- **Test Reporting Dashboard**: Integrate with tools like Allure, TestRail, or custom dashboards for better visibility
- **Parallel Execution Optimization**: Configure test sharding and parallel execution across multiple workers/machines
- **Test Retry Logic**: Implement intelligent retry mechanisms for flaky tests with proper failure analysis

**2. Enhanced Test Coverage:**
- **Complete Checkout Flow**: Add tests for order submission, order confirmation, and order history
- **API Testing**: Implement API-level tests using Playwright's API testing capabilities or tools like REST Assured
- **Database Validation**: Add database assertions to verify data persistence and integrity
- **Cross-browser Testing**: Expand browser coverage and add mobile browser testing

**3. Test Data Management:**
- **Dynamic Test Data Generation**: Use Faker.js or similar libraries to generate test data dynamically
- **Test Data Cleanup**: Implement proper test data cleanup and isolation between test runs
- **Test Environment Management**: Set up dedicated test environments with proper data seeding

**4. Test Maintenance & Quality:**
- **Test Tagging & Categorization**: Implement test tags (smoke, regression, critical) for selective test execution
- **Test Documentation**: Enhance test documentation with clear descriptions and business context
- **Code Review Process**: Establish code review practices for test code
- **Test Metrics & Analytics**: Track test execution metrics, failure rates, and flakiness

**5. Integration & Collaboration:**
- **Test Management Tool Integration**: Integrate with Jira, TestRail, or similar tools for test case management


These enhancements would transform the test suite from a functional validation tool into a comprehensive quality assurance system that supports continuous delivery and provides confidence in production deployments.

## 🏗️ Best Practices

### 1. Locators

All locators are centralized in `locators/locators.js`. When adding new locators:
- Use `data-test` attributes when available
- Keep locators organized by page/feature
- Use descriptive names

### 2. Configuration

- Always use config files for URLs and test data
- Never hardcode values in test files
- Use environment variables to switch between configs

### 3. Test Organization

- Keep tests focused and independent
- Use descriptive test names
- Group related tests in the same describe block
- Clean up after tests if needed

### 4. Reporting

- Review HTML reports after each test run
- Use screenshots and traces for debugging
- Keep test execution logs for reference

## 🐛 Troubleshooting

### Tests are failing

1. **Check browser installation**:
   ```bash
   npx playwright install
   ```

2. **Verify configuration**:
   - Ensure the correct config file exists
   - Check that URLs are accessible
   - Verify test data is correct

3. **Check network connectivity**:
   - Ensure you can access the application URL
   - Check firewall/proxy settings

### Tests are slow

- Reduce the number of browsers tested
- Run tests in parallel (already configured)
- Use headless mode for faster execution

### Configuration not loading

- Verify `ENV_CONFIG` environment variable is set correctly
- Check that the config file exists in the `config/` directory
- Ensure config file follows the correct structure

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Configuration Documentation](./config/README.md)

## 🤝 Contributing

When adding new tests or features:
1. Follow the existing project structure
2. Add locators to `locators/locators.js`
3. Add test data to config files
4. Update this README if needed

## 📝 License

ISC

---

**Happy Testing! 🎉**

For questions or issues, please refer to the Playwright documentation or check the project's issue tracker.

