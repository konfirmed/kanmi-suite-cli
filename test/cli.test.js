const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Path to the CLI script
const CLI_PATH = path.join(__dirname, '..', 'index.js');
const CONFIG_FILE = path.join(os.homedir(), '.kanmi-suite-cli.json');

// Helper function to clean up config file
function cleanupConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.unlinkSync(CONFIG_FILE);
  }
}

describe('KanmiSuite CLI', () => {
  beforeEach(() => {
    cleanupConfig();
  });

  afterEach(() => {
    cleanupConfig();
  });

  test('should display help when no arguments provided', () => {
    const output = execSync(`node ${CLI_PATH}`, { encoding: 'utf8' });
    expect(output).toContain('KanmiSuite CLI - Developer-first tools for Google Analytics');
    expect(output).toContain('Available Tools:');
    expect(output).toContain('Usage Examples:');
  });

  test('should show version information', () => {
    const output = execSync(`node ${CLI_PATH} version`, { encoding: 'utf8' });
    expect(output).toContain('KanmiSuite CLI v');
    expect(output).toContain('Individual CLI versions:');
  });

  test('should show help message', () => {
    const output = execSync(`node ${CLI_PATH} help`, { encoding: 'utf8' });
    expect(output).toContain('Available commands:');
    expect(output).toContain('gsc      - Google Search Console CLI');
    expect(output).toContain('ga4      - Google Analytics 4 CLI');
    expect(output).toContain('looker   - Looker Studio CLI');
  });

  test('should show advanced help', () => {
    const output = execSync(`node ${CLI_PATH} help --advanced`, { encoding: 'utf8' });
    expect(output).toContain('Advanced Usage:');
    expect(output).toContain('Configuration management:');
    expect(output).toContain('Tool management:');
  });

  test('should show status information', () => {
    const output = execSync(`node ${CLI_PATH} status`, { encoding: 'utf8' });
    expect(output).toContain('Available Tools:');
    expect(output).toContain('gsc-cli');
    expect(output).toContain('ga4-cli');
    expect(output).toContain('looker-cli');
  });

  test('should handle unknown commands gracefully', () => {
    try {
      execSync(`node ${CLI_PATH} unknown-command`, { encoding: 'utf8' });
    } catch (error) {
      const output = error.stderr + error.stdout;
      expect(output).toContain('Unknown command: unknown-command');
      expect(output).toContain('Available commands: gsc, ga4, looker');
      expect(output).toContain('Run "kanmi help" for more information');
      expect(error.status).toBe(1);
    }
  });

  test('should handle --help flag', () => {
    const output = execSync(`node ${CLI_PATH} --help`, { encoding: 'utf8' });
    expect(output).toContain('Available commands:');
    expect(output).toContain('Documentation:');
  });

  test('should handle config commands', () => {
    // Test config set
    execSync(`node ${CLI_PATH} config set test-key test-value`, { encoding: 'utf8' });

    // Test config get
    const getValue = execSync(`node ${CLI_PATH} config get test-key`, { encoding: 'utf8' });
    expect(getValue.trim()).toBe('test-value');

    // Test config delete
    execSync(`node ${CLI_PATH} config delete test-key`, { encoding: 'utf8' });

    // Test config reset
    execSync(`node ${CLI_PATH} config reset`, { encoding: 'utf8' });
  });

  test('should discover tools', () => {
    const output = execSync(`node ${CLI_PATH} discover`, { encoding: 'utf8' });
    expect(output).toContain('Discovering available tools...');
  });

  test('should handle install command without arguments', () => {
    // This test assumes npm install might fail in test environment
    // We just check that the command is recognized
    try {
      execSync(`node ${CLI_PATH} install`, { encoding: 'utf8', timeout: 5000 });
    } catch (error) {
      // Expected to fail in test environment
      expect(error.stdout || error.stderr).toContain('Installing all KanmiSuite CLI tools');
    }
  });

  test('should handle uninstall command without arguments', () => {
    const output = execSync(`node ${CLI_PATH} uninstall`, { encoding: 'utf8' });
    expect(output).toContain('Usage: kanmi uninstall <tool>');
    expect(output).toContain('Available tools: gsc, ga4, looker');
  });

  test('should handle update command', () => {
    try {
      execSync(`node ${CLI_PATH} update`, { encoding: 'utf8', timeout: 5000 });
    } catch (error) {
      // Expected to fail in test environment
      expect(error.stdout || error.stderr).toContain('Updating all KanmiSuite CLI tools');
    }
  });

  test('should handle --version flag', () => {
    const output = execSync(`node ${CLI_PATH} --version`, { encoding: 'utf8' });
    expect(output).toContain('KanmiSuite CLI v');
  });
});
