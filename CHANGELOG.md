# Changelog

All notable changes to the KanmiSuite CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-07-09

### Added

- **Configuration Management**: Persistent configuration system with JSON storage in home directory
- **Colorized Output**: Beautiful, color-coded terminal output with grouped tool display
- **Advanced Command Routing**: Support for `--save-defaults` flag and auto-application of saved defaults
- **Enhanced Help System**: Comprehensive help and advanced help with usage examples
- **Tool Management Commands**: `install`, `uninstall`, `update`, and `discover` commands
- **Improved Error Handling**: Better error messages and user guidance for missing tools
- **Code Quality**: ESLint, Prettier, and Jest configurations for development
- **CI/CD Pipeline**: GitHub Actions workflow for automated testing and validation
- **Comprehensive Test Suite**: Full test coverage for all CLI features

### Changed

- **Breaking**: Refactored CLI architecture to use config-driven approach
- **Breaking**: Updated command structure and routing system
- Enhanced status display with grouped tool categories
- Improved installation guidance and error messages
- Updated documentation with new features and examples

### Fixed

- npm global install issues and PATH detection
- Command routing and tool detection reliability
- Error handling for missing tools and unknown commands

## [1.0.0] - 2025-07-06

### Added

- Initial release of KanmiSuite CLI meta-package
- Unified documentation for all three CLI tools
- Status checking for installed CLI tools
- Command routing for simplified usage
- Comprehensive README with usage examples
- License and contribution guidelines

### CLI Tools Included

- kanmi-gsc-cli@1.1.0 - Google Search Console CLI
- kanmi-ga4-cli@1.0.1 - Google Analytics 4 CLI
- kanmi-looker-cli@1.0.1 - Looker Studio CLI

### Features

- Check installation status of all CLI tools
- Quick access to documentation and examples
- Unified command routing (e.g., `kanmi gsc sites`)
- Installation guidance for missing tools
