# Configuration Files

This directory contains environment-specific configuration files for the test suite.

## How It Works

The config loader automatically loads the appropriate configuration file based on the `ENV_CONFIG` environment variable. If not specified, it defaults to `local`.

## Available Configurations

- **local.config.js** - Local development environment
- **stg.config.js** - Staging environment

## Usage

### Running tests with local config (default)
```bash
npm test
# or explicitly
ENV_CONFIG=local npm test
```

### Running tests with staging config

**Linux/Mac:**
```bash
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

**Using npm scripts:**
```bash
# For local (default)
npm run test:local

# For staging (set ENV_CONFIG first)
# PowerShell: $env:ENV_CONFIG="stg"; npm run test:stg
# CMD: set ENV_CONFIG=stg && npm run test:stg
# Linux/Mac: ENV_CONFIG=stg npm run test:stg
```

## Adding New Environments

1. Create a new config file: `config/[environment].config.js`
2. Follow the same structure as existing config files
3. Use it by setting `ENV_CONFIG=[environment]` when running tests

## Config Structure

Each config file should export an object with:
- `environment` - Environment name
- `urls` - All application URLs
- `testData` - Test data (users, products, etc.)
- `timeouts` - Timeout configurations

