# Miktos Desktop - Blender AI Bridge

> Intelligent bridge between you and Blender for professional 3D content creation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?logo=tauri&logoColor=white)](https://tauri.app)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org)

Miktos Desktop is a specialized desktop application that hosts the Miktos Agent, enabling artists to create professional 3D content in Blender through natural language commands. Transform your Blender workflow with intelligent automation and expert-level 3D content generation.

## ✨ Features

- **Natural Language Blender Commands**: Direct Blender operations through conversational interface
- **Professional 3D Content Creation**: Expert-level output quality in seconds, not hours
- **Local Processing**: User owns compute, minimal ongoing costs
- **Specialized Blender Workflows**: Advanced 3D techniques through simple prompts
- **Real-time Texture Generation**: AI-powered texture creation with automatic material application
- **Cross-Platform**: Native desktop app for Windows, macOS, and Linux
- **Live Status Monitoring**: Real-time connection status with Miktos Agent

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Rust** 1.70+ (for Tauri)
- **System Dependencies**: See [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

```bash
# Clone the repository
git clone https://github.com/Miktos-Universe/miktos-desktop.git
cd miktos-desktop

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

### Building for Production

```bash
# Build for current platform
npm run tauri build

# The built application will be in src-tauri/target/release/
```

## 🛠️ Development

### Project Structure

```text
miktos-desktop/
├── src/                    # React frontend source
│   ├── components/         # Reusable UI components
│   │   ├── AICommandBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatusBar.tsx
│   │   └── WorkflowCanvas.tsx
│   ├── services/          # API and service integrations
│   ├── store/             # State management
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── src-tauri/             # Tauri backend (Rust)
│   ├── src/               # Rust source code
│   ├── icons/             # Application icons
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── public/                # Static assets
└── package.json           # Node.js dependencies
```

### Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server
npm run tauri dev        # Start Tauri development

# Building
npm run build            # Build frontend
npm run tauri build      # Build complete application

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
```

### Environment Setup

Create a `.env` file for local development:

```bash
# AI Bridge Configuration
VITE_AI_BRIDGE_URL=http://localhost:8000
VITE_AI_BRIDGE_WS_URL=ws://localhost:8000

# Development settings
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
```

## 🏗️ Architecture

### Frontend Stack

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### Backend Integration

- **Tauri**: Rust-based backend for native performance and security
- **AI Bridge Communication**: RESTful API integration with the Python AI Bridge
- **Real-time Updates**: WebSocket connections for live status monitoring
- **System Integration**: Native OS features and file system access

### Key Components

- **App.tsx**: Main application container with routing and state management
- **AICommandBar**: Natural language interface for AI commands
- **WorkflowCanvas**: Visual workflow builder and editor
- **StatusBar**: Real-time system and AI Bridge status display
- **Sidebar**: Navigation and project management

## 🔌 API Integration

### AI Bridge Connection

The desktop app communicates with the Miktos AI Bridge through:

```typescript
// Status monitoring
GET /api/v1/status

// Command execution
POST /api/v1/execute-command

// Task monitoring
GET /api/v1/task/{taskId}

// Workflow management
GET /api/v1/workflows
POST /api/v1/workflows/{id}/execute
```

### Real-time Features

- **Connection Status**: Automatic detection and reconnection
- **Progress Monitoring**: Live updates for long-running AI tasks
- **Error Handling**: Graceful degradation when AI Bridge is unavailable

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## 📦 Distribution

### Building for Release

```bash
# Build for all platforms (requires setup)
npm run tauri build

# Build for specific platform
npm run tauri build -- --target x86_64-pc-windows-msvc  # Windows
npm run tauri build -- --target x86_64-apple-darwin     # macOS Intel
npm run tauri build -- --target aarch64-apple-darwin    # macOS Apple Silicon
npm run tauri build -- --target x86_64-unknown-linux-gnu # Linux
```

### Code Signing

For production releases, configure code signing:

1. **macOS**: Configure Apple Developer certificate
2. **Windows**: Configure Authenticode certificate
3. **Linux**: Configure GPG signing (optional)

See [Tauri documentation](https://tauri.app/v1/guides/distribution/sign-intro) for detailed setup.

## 🔧 Configuration

### Tauri Configuration

Edit `src-tauri/tauri.conf.json` for:

- Window properties and behavior
- Security settings and CSP
- System permissions
- Build configuration
- App metadata

### Vite Configuration

Edit `vite.config.ts` for:

- Build optimization
- Plugin configuration
- Development server settings
- Asset handling

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 🐛 Issues & Support

- **Bug Reports**: Use our [issue template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature Requests**: Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Documentation**: Check our [docs repository](https://github.com/Miktos-Universe/miktos-docs)
- **Discussions**: Join our [GitHub Discussions](https://github.com/Miktos-Universe/miktos-desktop/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **[Miktos AI Bridge](https://github.com/Miktos-Universe/miktos-ai-bridge)**: Python FastAPI backend for AI operations
- **[Miktos Workflows](https://github.com/Miktos-Universe/miktos-workflows)**: Pre-built workflow templates
- **[Miktos Docs](https://github.com/Miktos-Universe/miktos-docs)**: Comprehensive documentation

## 🙏 Acknowledgments

- [Tauri](https://tauri.app) for the amazing desktop app framework
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI) for AI workflow capabilities
- [React](https://reactjs.org) and [TypeScript](https://typescriptlang.org) communities
- All our contributors and the open-source community

---

Built with ❤️ by the Miktos team

[Organization](https://github.com/Miktos-Universe) • [Website](https://miktos.com) • [Twitter](https://twitter.com/MiktosAI)
