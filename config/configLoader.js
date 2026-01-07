/**
 * Config Loader Utility
 * Loads environment-specific configuration files based on ENV_CONFIG environment variable
 * Defaults to 'local' if not specified
 * 
 * Usage:
 *   ENV_CONFIG=local npm test    - loads local.config.js
 *   ENV_CONFIG=stg npm test      - loads stg.config.js
 */

const fs = require('fs');
const path = require('path');

class ConfigLoader {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    loadConfig() {
        // Get the environment from process.env, default to 'local'
        const env = process.env.ENV_CONFIG || 'local';
        const configFileName = `${env}.config.js`;
        const configPath = path.join(__dirname, configFileName);

        // Check if config file exists
        if (!fs.existsSync(configPath)) {
            throw new Error(
                `Configuration file not found: ${configPath}\n` +
                `Please create ${configFileName} in the config directory.\n` +
                `Available configs: ${this.getAvailableConfigs().join(', ')}`
            );
        }

        // Load and return the config
        try {
            this.config = require(configPath);
            console.log(`✓ Loaded configuration: ${configFileName}`);
            return this.config;
        } catch (error) {
            throw new Error(`Error loading configuration file ${configFileName}: ${error.message}`);
        }
    }

    getAvailableConfigs() {
        const configDir = __dirname;
        const files = fs.readdirSync(configDir);
        return files
            .filter(file => file.endsWith('.config.js'))
            .map(file => file.replace('.config.js', ''));
    }

    getConfig() {
        if (!this.config) {
            this.loadConfig();
        }
        return this.config;
    }
}

// Export singleton instance
const configLoader = new ConfigLoader();
module.exports = configLoader.getConfig();