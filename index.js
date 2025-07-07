#!/usr/bin/env node

const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

console.log('🚀 KanmiSuite CLI - Developer-first tools for Google Analytics');
console.log('');

// Check if individual CLIs are installed
const clis = [
  { name: 'gsc-cli', package: 'kanmi-gsc-cli', description: 'Google Search Console CLI' },
  { name: 'ga4-cli', package: 'kanmi-ga4-cli', description: 'Google Analytics 4 CLI' },
  { name: 'looker-cli', package: 'kanmi-looker-cli', description: 'Looker Studio CLI' }
];

function checkCLI(cli) {
  try {
    execSync(`which ${cli.name}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

console.log('📦 Available Tools:');
console.log('');

let allInstalled = true;
clis.forEach(cli => {
  const installed = checkCLI(cli);
  const status = installed ? '✅' : '❌';
  console.log(`${status} ${cli.name.padEnd(12)} - ${cli.description}`);
  if (!installed) allInstalled = false;
});

console.log('');

if (!allInstalled) {
  console.log('💡 To install missing tools:');
  console.log('   npm install -g kanmi-gsc-cli kanmi-ga4-cli kanmi-looker-cli');
  console.log('');
}

console.log('🔧 Usage Examples:');
console.log('   gsc-cli sites                    # List Search Console sites');
console.log('   ga4-cli report -p 123456         # Generate GA4 report');
console.log('   looker-cli list                  # List Looker reports');
console.log('');
console.log('📚 Documentation: https://github.com/knfrmd/kanmi-suite-cli');
console.log('');

// If arguments are provided, try to route to appropriate CLI
const args = process.argv.slice(2);
if (args.length > 0) {
  const command = args[0];
  const cliMap = {
    'gsc': 'gsc-cli',
    'ga4': 'ga4-cli',
    'looker': 'looker-cli'
  };
  
  if (cliMap[command]) {
    const targetCli = cliMap[command];
    const remainingArgs = args.slice(1);
    
    if (checkCLI({ name: targetCli })) {
      try {
        execSync(`${targetCli} ${remainingArgs.join(' ')}`, { stdio: 'inherit' });
      } catch (error) {
        process.exit(error.status || 1);
      }
    } else {
      console.log(`❌ ${targetCli} is not installed.`);
      console.log(`   Run: npm install -g ${cliMap[command] === 'gsc-cli' ? 'kanmi-gsc-cli' : cliMap[command] === 'ga4-cli' ? 'kanmi-ga4-cli' : 'kanmi-looker-cli'}`);
      process.exit(1);
    }
  } else {
    console.log(`❌ Unknown command: ${command}`);
    console.log('   Available commands: gsc, ga4, looker');
    process.exit(1);
  }
}
