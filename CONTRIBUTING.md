# Contributing to KanmiSuite CLI

We welcome contributions to the KanmiSuite CLI! This document provides guidelines for contributing to this meta-package and the individual CLI tools.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub Issues tab to report bugs or request features
- Provide detailed information about the issue
- Include steps to reproduce the problem
- Specify which CLI tool(s) are affected

### Suggesting Enhancements
- Open an issue with the "enhancement" label
- Describe the feature you'd like to see
- Explain why it would be useful
- Consider contributing the implementation

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
5. **Commit your changes**
   ```bash
   git commit -m "Add: Description of your changes"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Setup

```bash
# Clone the repository
git clone https://github.com/knfrmd/kanmi-suite-cli.git
cd kanmi-suite-cli

# Install dependencies
npm install

# Test the CLI locally
node index.js
```

## 🧪 Testing

Before submitting a pull request:

1. Test the unified CLI functionality
2. Verify all documentation is up to date
3. Check that examples in README work correctly
4. Test with individual CLI tools installed and uninstalled

## 📝 Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow Node.js best practices
- Keep functions focused and single-purpose

## 📖 Documentation

- Update README.md for new features
- Add examples for new functionality
- Update CHANGELOG.md following Keep a Changelog format
- Ensure all links work correctly

## 🔧 Individual CLI Tools

To contribute to the individual CLI tools:

- **GSC CLI**: Visit [kanmi-gsc-cli repository](https://github.com/knfrmd/kanmi-gsc-cli)
- **GA4 CLI**: Visit [kanmi-ga4-cli repository](https://github.com/knfrmd/kanmi-ga4-cli)
- **Looker CLI**: Visit [kanmi-looker-cli repository](https://github.com/knfrmd/kanmi-looker-cli)

## 🎯 Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests for new functionality
- Update documentation as needed
- Follow the existing code style
- Write clear commit messages

## 📞 Questions?

If you have questions about contributing:
- Open an issue for discussion
- Check existing issues and PRs
- Contact the maintainer: [Kanmi Obasa](https://github.com/knfrmd)

## 📄 License

By contributing to KanmiSuite CLI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to KanmiSuite CLI! 🚀
