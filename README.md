# Miktos Desktop

> AI-first creative platform for 3D animation and content generation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?logo=tauri&logoColor=white)](https://tauri.app)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org)

Miktos Desktop is a cross-platform desktop application that provides an intuitive interface for AI-powered creative workflows, real-time collaboration, and seamless integration with the Miktos ecosystem.

## ✨ Features

- **AI-Powered Workflows**: Direct integration with ComfyUI for advanced AI generation
- **Real-time Collaboration**: Share and collaborate on creative projects
- **Cross-Platform**: Native desktop app for Windows, macOS, and Linux
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Workflow Canvas**: Visual workflow builder for complex AI pipelines
- **Live Status Monitoring**: Real-time connection status with AI Bridge
- **Extensible Architecture**: Plugin system for custom integrations

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Rust** 1.70+ (for Tauri)
- **System Dependencies**: See [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

```bash
# Clone the repository
git clone https://github.com/LegnaPetiteTour/miktos-desktop.git
cd miktos-desktop

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

The app will open in a new window. The Miktos AI Bridge must be running on `http://localhost:8000` for full functionality.

---

Built with ❤️ by the Miktos team