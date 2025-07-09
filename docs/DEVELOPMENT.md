# Development Guide

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/konfirmed/kanmi-suite-cli.git
   cd kanmi-suite-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Link the CLI globally for testing:
   ```bash
   npm link
   ```

## Development Commands

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run start` - Run the CLI locally

## Testing

The CLI includes comprehensive tests that verify:

- Command parsing and routing
- Help system functionality
- Version information display
- Error handling for invalid commands
- Installation status checking

Run tests with:

```bash
npm test
```

## Code Quality

This project uses:

- **ESLint** for linting JavaScript code
- **Prettier** for code formatting
- **Jest** for testing

All checks run automatically in CI/CD pipeline.

## CLI Architecture

The CLI follows a modular structure:

- `CLI_CONFIG` - Configuration array defining all available tools
- `checkCLI()` - Utility to check if individual CLIs are installed
- `displayXXX()` - Display functions for different output modes
- `routeCommand()` - Command routing logic
- `main()` - Entry point with argument parsing

## Adding New CLI Tools

To add a new tool to the suite:

1. Add configuration to `CLI_CONFIG` array:

   ```javascript
   {
     name: 'new-cli',
     package: 'kanmi-new-cli',
     description: 'New CLI tool description',
     shortCmd: 'new',
     examples: ['new command', 'new --help']
   }
   ```

2. Update tests to include the new tool
3. Update documentation

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a git tag
4. Push to main branch
5. GitHub Actions will automatically publish to npm

## Contributing

Please ensure:

- All tests pass (`npm test`)
- Code follows style guidelines (`npm run lint`)
- Documentation is updated for new features
- Commit messages follow conventional commits format
