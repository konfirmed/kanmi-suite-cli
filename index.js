#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Constants
const CONFIG_FILE = path.join(os.homedir(), '.kanmi-suite-cli.json');
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Configuration
const CLI_CONFIG = [
  {
    name: 'gsc-cli',
    package: 'kanmi-gsc-cli',
    description: 'Google Search Console CLI',
    shortCmd: 'gsc',
    examples: ['gsc sites', 'gsc query https://example.com', 'gsc sitemaps https://example.com'],
    category: 'SEO',
  },
  {
    name: 'ga4-cli',
    package: 'kanmi-ga4-cli',
    description: 'Google Analytics 4 CLI',
    shortCmd: 'ga4',
    examples: ['ga4 report -p 123456', 'ga4 events -p 123456', 'ga4 compare -p 123456'],
    category: 'Analytics',
  },
  {
    name: 'looker-cli',
    package: 'kanmi-looker-cli',
    description: 'Looker Studio CLI',
    shortCmd: 'looker',
    examples: ['looker list', 'looker export -i report_id', 'looker clone -i report_id'],
    category: 'Reporting',
  },
];

// Utility functions
function colorize(text, color) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function logError(message) {
  console.error(colorize(`❌ ${message}`, 'red'));
}

function logSuccess(message) {
  console.log(colorize(`✅ ${message}`, 'green'));
}

function logInfo(message) {
  console.log(colorize(`ℹ️  ${message}`, 'blue'));
}

function logWarning(message) {
  console.warn(colorize(`⚠️  ${message}`, 'yellow'));
}

// Configuration management
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      return config;
    }
  } catch (error) {
    logWarning('Could not load config file');
  }
  return {};
}

function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    logWarning('Could not save config file');
  }
}

function checkCLI(cliName) {
  try {
    execSync(`which ${cliName}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function checkCLIVersion(cliName) {
  if (!checkCLI(cliName)) {
    return null;
  }

  try {
    const version = execSync(`${cliName} --version`, { encoding: 'utf8' }).trim();
    return version;
  } catch {
    return 'unknown';
  }
}

function displayHeader() {
  console.log(colorize('🚀 KanmiSuite CLI - Developer-first tools for Google Analytics', 'cyan'));
  console.log('');
}

function displayAvailableTools() {
  logInfo('Available Tools:');
  console.log('');

  let allInstalled = true;
  const groupedTools = {};

  CLI_CONFIG.forEach((cli) => {
    if (!groupedTools[cli.category]) {
      groupedTools[cli.category] = [];
    }
    groupedTools[cli.category].push(cli);
  });

  Object.keys(groupedTools).forEach((category) => {
    console.log(colorize(`  ${category}:`, 'magenta'));
    groupedTools[category].forEach((cli) => {
      const installed = checkCLI(cli.name);
      const status = installed ? colorize('✅', 'green') : colorize('❌', 'red');
      const version = installed ? checkCLIVersion(cli.name) : 'not installed';
      console.log(`    ${status} ${cli.name.padEnd(12)} - ${cli.description}`);
      console.log(`      ${colorize(`Version: ${version}`, 'dim')}`);
      if (!installed) allInstalled = false;
    });
    console.log('');
  });

  return allInstalled;
}

function displayInstallationHelp() {
  logInfo('Installation Options:');
  console.log('');

  console.log('  Individual packages:');
  CLI_CONFIG.forEach((cli) => {
    console.log(`    npm install -g ${cli.package}`);
  });

  console.log('');
  console.log('  All packages at once:');
  const packages = CLI_CONFIG.map((cli) => cli.package).join(' ');
  console.log(`    npm install -g ${packages}`);
  console.log('');
  console.log('  Or use the installer:');
  console.log('    kanmi install');
  console.log('');
}

function displayUsageExamples() {
  logInfo('Usage Examples:');
  console.log('');

  Object.keys(
    CLI_CONFIG.reduce((acc, cli) => {
      acc[cli.category] = acc[cli.category] || [];
      acc[cli.category].push(cli);
      return acc;
    }, {})
  ).forEach((category) => {
    console.log(colorize(`  ${category}:`, 'magenta'));
    CLI_CONFIG.filter((cli) => cli.category === category).forEach((cli) => {
      console.log(`    ${cli.examples[0]}`);
    });
    console.log('');
  });
}

function displayHelp() {
  console.log('📖 Help:');
  console.log('   kanmi <command> [options]');
  console.log('');
  console.log('Available commands:');
  CLI_CONFIG.forEach((cli) => {
    console.log(`   ${cli.shortCmd.padEnd(8)} - ${cli.description}`);
  });
  console.log('   help      - Show this help message');
  console.log('   version   - Show version information');
  console.log('   status    - Check installation status');
  console.log('   install   - Install all CLI tools');
  console.log('');
  console.log('Examples:');
  CLI_CONFIG.forEach((cli) => {
    cli.examples.forEach((example) => {
      console.log(`   ${example}`);
    });
  });
  console.log('');
}

function displayVersion() {
  try {
    const packageJson = require('./package.json');
    console.log(`KanmiSuite CLI v${packageJson.version}`);
    console.log('');
    console.log('Individual CLI versions:');
    CLI_CONFIG.forEach((cli) => {
      if (checkCLI(cli.name)) {
        try {
          const version = execSync(`${cli.name} --version`, { encoding: 'utf8' }).trim();
          console.log(`   ${cli.name}: ${version}`);
        } catch {
          console.log(`   ${cli.name}: installed (version unknown)`);
        }
      } else {
        console.log(`   ${cli.name}: not installed`);
      }
    });
  } catch (error) {
    console.log('Version information unavailable');
  }
  console.log('');
}

function getPackageNameFromShortCmd(shortCmd) {
  const config = CLI_CONFIG.find((cli) => cli.shortCmd === shortCmd);
  return config ? config.package : null;
}

function installAllTools() {
  logInfo('Installing all KanmiSuite CLI tools...');
  console.log('');

  const packages = CLI_CONFIG.map((cli) => cli.package).join(' ');
  const command = `npm install -g ${packages}`;

  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    console.log('');
    logSuccess('Installation complete!');
    console.log('');
    displayAvailableTools();
  } catch (error) {
    logError('Installation failed.');
    console.error('Please check your npm permissions and try again.');
    console.error('You may need to run with sudo or configure npm properly.');
    process.exit(1);
  }
}

function installSingleTool(toolName) {
  const config = CLI_CONFIG.find((cli) => cli.shortCmd === toolName || cli.name === toolName);
  if (!config) {
    logError(`Unknown tool: ${toolName}`);
    return;
  }

  logInfo(`Installing ${config.name}...`);
  const command = `npm install -g ${config.package}`;

  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${config.name} installed successfully!`);
  } catch (error) {
    logError(`Failed to install ${config.name}`);
    console.error('Please check your npm permissions and try again.');
  }
}

function uninstallTool(toolName) {
  const config = CLI_CONFIG.find((cli) => cli.shortCmd === toolName || cli.name === toolName);
  if (!config) {
    logError(`Unknown tool: ${toolName}`);
    return;
  }

  logInfo(`Uninstalling ${config.name}...`);
  const command = `npm uninstall -g ${config.package}`;

  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${config.name} uninstalled successfully!`);
  } catch (error) {
    logError(`Failed to uninstall ${config.name}`);
    console.error('Please check your npm permissions and try again.');
  }
}

// Configuration command handler
function handleConfigCommand(args) {
  const config = loadConfig();

  if (args.length === 0) {
    logInfo('Current configuration:');
    console.log(JSON.stringify(config, null, 2));
    return;
  }

  const [action, key, value] = args;

  switch (action) {
    case 'set':
      if (!key || !value) {
        logError('Usage: kanmi config set <key> <value>');
        return;
      }
      config[key] = value;
      saveConfig(config);
      logSuccess(`Configuration updated: ${key} = ${value}`);
      break;

    case 'get': {
      if (!key) {
        logError('Usage: kanmi config get <key>');
        return;
      }
      const val = config[key];
      if (val !== undefined) {
        console.log(val);
      } else {
        logWarning(`Configuration key '${key}' not found`);
      }
      break;
    }

    case 'delete':
    case 'remove':
      if (!key) {
        logError('Usage: kanmi config delete <key>');
        return;
      }
      if (config[key] !== undefined) {
        delete config[key];
        saveConfig(config);
        logSuccess(`Configuration key '${key}' deleted`);
      } else {
        logWarning(`Configuration key '${key}' not found`);
      }
      break;

    case 'reset':
      saveConfig({});
      logSuccess('Configuration reset to defaults');
      break;

    case 'defaults':
      if (!key) {
        // Show all saved defaults
        const defaults = Object.keys(config).filter((k) => k.endsWith('-defaults'));
        if (defaults.length === 0) {
          logInfo('No saved defaults found');
        } else {
          logInfo('Saved command defaults:');
          defaults.forEach((defaultKey) => {
            const command = defaultKey.replace('-defaults', '');
            console.log(`  ${command}: ${config[defaultKey]}`);
          });
        }
      } else {
        // Show specific default
        const defaultKey = `${key}-defaults`;
        if (config[defaultKey]) {
          console.log(config[defaultKey]);
        } else {
          logWarning(`No saved defaults found for '${key}'`);
        }
      }
      break;
    default:
      logError('Unknown config action. Available actions: set, get, delete, defaults, reset');
      break;
  }
}

// Tool discovery function
function discoverTools() {
  logInfo('Discovering available tools...');
  console.log('');

  const discoveries = CLI_CONFIG.map((cli) => {
    const installed = checkCLI(cli.name);
    const version = installed ? checkCLIVersion(cli.name) : null;

    return {
      ...cli,
      installed,
      version,
    };
  });

  const installedCount = discoveries.filter((d) => d.installed).length;

  if (installedCount === CLI_CONFIG.length) {
    logSuccess('All tools are installed and ready to use!');
  } else if (installedCount === 0) {
    logWarning('No tools are currently installed.');
  } else {
    logInfo(`${installedCount} of ${CLI_CONFIG.length} tools are installed.`);
  }

  console.log('');
  return discoveries;
}

// Enhanced help function
function displayAdvancedHelp() {
  displayHeader();
  console.log(colorize('Advanced Usage:', 'bright'));
  console.log('');

  console.log('Configuration management:');
  console.log('  kanmi config                     - Show current configuration');
  console.log('  kanmi config set <key> <value>   - Set a configuration value');
  console.log('  kanmi config get <key>           - Get a configuration value');
  console.log('  kanmi config delete <key>        - Delete a configuration key');
  console.log('  kanmi config defaults            - Show all saved command defaults');
  console.log('  kanmi config defaults <cmd>      - Show defaults for specific command');
  console.log('  kanmi config reset               - Reset all configuration');
  console.log('');

  console.log('Tool management:');
  console.log('  kanmi install                    - Install all tools');
  console.log('  kanmi install <tool>             - Install specific tool');
  console.log('  kanmi uninstall <tool>           - Uninstall specific tool');
  console.log('  kanmi update                     - Update all tools');
  console.log('  kanmi status                     - Check installation status');
  console.log('  kanmi discover                   - Discover available tools');
  console.log('');

  console.log('Information:');
  console.log('  kanmi help                       - Show basic help');
  console.log('  kanmi help --advanced            - Show this advanced help');
  console.log('  kanmi version                    - Show version information');
  console.log('');

  console.log(colorize('Examples:', 'bright'));
  console.log('  kanmi config set default-project 123456789');
  console.log('  kanmi install gsc');
  console.log('  kanmi ga4 report --help');
  console.log('  kanmi gsc sites --format json');
  console.log('  kanmi gsc query sc-domain:example.com --save-defaults');
  console.log('  kanmi config defaults gsc');
  console.log('');
}

// Enhanced command routing with configuration support
function routeCommandWithConfig(command, remainingArgs) {
  // Create command mapping
  const cliMap = {};
  CLI_CONFIG.forEach((cli) => {
    cliMap[cli.shortCmd] = cli.name;
  });

  if (cliMap[command]) {
    const targetCli = cliMap[command];

    if (checkCLI(targetCli)) {
      try {
        // Check for --save-defaults flag
        const saveDefaultsIndex = remainingArgs.indexOf('--save-defaults');
        let argsToUse = remainingArgs;

        if (saveDefaultsIndex !== -1) {
          // Remove --save-defaults from arguments
          argsToUse = [...remainingArgs];
          argsToUse.splice(saveDefaultsIndex, 1);

          // Save the command and arguments as defaults
          const config = loadConfig();
          const defaultsKey = `${command}-defaults`;
          config[defaultsKey] = argsToUse.join(' ');
          saveConfig(config);

          logSuccess(`Default parameters saved for ${command}`);
          console.log(`  Command: ${command} ${argsToUse.join(' ')}`);
        } else {
          // Check if we have saved defaults for this command
          const config = loadConfig();
          const defaultsKey = `${command}-defaults`;

          if (config[defaultsKey] && argsToUse.length === 0) {
            logInfo(`Using saved defaults for ${command}`);
            argsToUse = config[defaultsKey].split(' ');
          }
        }

        const fullCommand = `${targetCli} ${argsToUse.join(' ')}`;
        console.log(`Running: ${fullCommand}`);
        execSync(fullCommand, { stdio: 'inherit' });
      } catch (error) {
        logError(`Command failed: ${targetCli}`);
        process.exit(error.status || 1);
      }
    } else {
      const packageName = getPackageNameFromShortCmd(command);
      logError(`${targetCli} is not installed.`);
      console.log(`   Run: npm install -g ${packageName}`);
      console.log('   Or: kanmi install');
      process.exit(1);
    }
  } else {
    logError(`Unknown command: ${command}`);
    console.log('   Available commands: ' + Object.keys(cliMap).join(', '));
    console.log('   Run "kanmi help" for more information');
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);

  // Handle special commands first
  if (args.length > 0) {
    const command = args[0];
    const remainingArgs = args.slice(1);

    switch (command) {
      case 'help':
      case '--help':
      case '-h':
        if (remainingArgs.includes('--advanced')) {
          displayAdvancedHelp();
        } else {
          displayHeader();
          displayHelp();
          console.log('📚 Documentation: https://github.com/konfirmed/kanmi-suite-cli');
          console.log('💡 Run "kanmi help --advanced" for more commands');
        }
        return;

      case 'version':
      case '--version':
      case '-v':
        displayVersion();
        return;

      case 'status':
        displayHeader();
        displayAvailableTools();
        return;

      case 'install':
        if (remainingArgs.length > 0) {
          installSingleTool(remainingArgs[0]);
        } else {
          installAllTools();
        }
        return;

      case 'uninstall':
        if (remainingArgs.length > 0) {
          uninstallTool(remainingArgs[0]);
        } else {
          logError('Please specify a tool to uninstall');
          logInfo('Usage: kanmi uninstall <tool>');
          logInfo('Available tools: ' + CLI_CONFIG.map((cli) => cli.shortCmd).join(', '));
        }
        return;

      case 'update': {
        logInfo('Updating all KanmiSuite CLI tools...');
        const packages = CLI_CONFIG.map((cli) => cli.package).join(' ');
        try {
          execSync(`npm update -g ${packages}`, { stdio: 'inherit' });
          logSuccess('Update complete!');
        } catch (error) {
          logError('Update failed');
        }
        return;
      }

      case 'config':
        handleConfigCommand(remainingArgs);
        return;

      case 'discover':
        discoverTools();
        return;

      case '--advanced-help':
      case 'help-advanced':
        displayAdvancedHelp();
        return;

      default:
        // Try to route to CLI
        routeCommandWithConfig(command, remainingArgs);
        return;
    }
  }

  // Default behavior - show status and help
  displayHeader();
  const allInstalled = displayAvailableTools();

  if (!allInstalled) {
    displayInstallationHelp();
  }

  displayUsageExamples();
  console.log('📚 Documentation: https://github.com/konfirmed/kanmi-suite-cli');
  console.log('💡 Run "kanmi help" for more commands');
  console.log('');
}

// Run the CLI
main();
