# Contributing to Miktos Desktop

Thank you for your interest in contributing to Miktos! This document provides guidelines for contributing to the desktop application.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/miktos-desktop.git`
3. Install dependencies: `npm install`
4. Start development: `npm run tauri dev`

## Development Workflow

### Prerequisites

- Node.js 18+ and npm
- Rust 1.70+
- System dependencies for Tauri (see [Tauri docs](https://tauri.app/v1/guides/getting-started/prerequisites))

### Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run tauri dev

# Build for production
npm run tauri build
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (ESLint configuration)
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all components are properly typed

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Submitting Changes

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Update documentation if needed
6. Commit with clear messages (see [Conventional Commits](https://conventionalcommits.org/))
7. Push to your fork
8. Create a Pull Request

### Commit Messages

Use [Conventional Commits](https://conventionalcommits.org/) format:

```text
type(scope): description

feat(ui): add new workflow canvas component
fix(api): resolve connection timeout issue
docs(readme): update installation instructions
```

### PR Requirements

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated for changes
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] All CI checks pass

## Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues first
2. Use the issue templates
3. Provide detailed reproduction steps
4. Include system information (OS, Node.js version, etc.)
5. Add relevant logs or screenshots

## Development Guidelines

### Architecture

- Follow the existing component structure
- Keep components small and focused
- Use proper TypeScript interfaces
- Implement proper error handling
- Follow React best practices

### UI/UX

- Maintain consistency with the existing design system
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on different screen sizes
- Follow the color scheme and typography guidelines

### Performance

- Optimize bundle size
- Lazy load components when appropriate
- Minimize re-renders
- Use proper memoization

## Questions?

Feel free to:

- Open a discussion on GitHub
- Reach out to maintainers
- Check the documentation

Thank you for contributing to Miktos!
