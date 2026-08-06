<div align="center">

# ✨ Luxelle - Premium Beauty & Wellness

<p align="center">
  <b>A modern, high-performance full-stack beauty & wellness booking web application built with Angular 18, Tailwind CSS, and .NET 8 Web API.</b>
</p>

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![CI Build & Lint](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/Mostafa-SAID7/luxelle-landing/actions)

---

</div>

## 📖 Overview

**Luxelle** is an enterprise-grade, luxury salon and wellness service platform. Designed with aesthetic perfection, smooth micro-interactions, responsive design, and robust security, it provides clients with an effortless online booking experience and instant payment integrations via Stripe.

The solution features a decoupled monorepo architecture:
- 🎨 **Frontend**: Angular 18 (Standalone Components, RxJS, Tailwind CSS, Lucide Icons, Modern UI/UX)
- ⚙️ **Backend**: ASP.NET Core 8 Web API (Clean Architecture, Entity Framework Core, Stripe Payments, SQLite/SQL Server)
- 🚀 **DevOps**: Fully automated CI/CD pipelines targeting Vercel (Frontend) and MonsterASP (Backend) via GitHub Actions.

---

## 🌟 Key Features

### 🎨 Frontend Experience
- **Elegant Luxury UI**: Modern glassmorphism design system tailored for high-end spa & beauty services.
- **Interactive Booking Flow**: Multi-step booking process with service selection, pricing tier calculations, and schedule management.
- **Responsive Layout**: Pixel-perfect presentation optimized for desktop, tablet, and mobile browsers.
- **Dynamic Content & Pricing**: Real-time rendering of active packages, pricing plans, client reviews, and service portfolios.
- **Accessibility & Performance**: Built with standalone components and optimized bundling for fast initial loading times.

### ⚙️ Backend & API Capabilities
- **Clean Architecture Principles**: Strict separation between Domain, Application, Infrastructure, and API layers.
- **Stripe Payment Gateway**: Secure payment intent generation and webhook processing for real-time payment validation.
- **Automated Data Seeding**: Initial seeders for services, pricing tiers, and runtime system settings.
- **Strict Linting & Formatting**: Enforced `.editorconfig`, `global.json`, and `.gitattributes` to maintain codebase quality.

---

## 🛠️ Architecture & Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend Framework** | `Angular 18` | Standalone components, Reactive Forms, Services & Directives |
| **Styling & UI** | `Tailwind CSS` + `Lucide Angular` | Customized design system, utility-first CSS, modern iconography |
| **Backend Framework** | `ASP.NET Core 8` | Web API endpoints built with Clean Architecture |
| **Database & ORM** | `EF Core 8` | SQLite for local development, SQL Server ready for production |
| **Payment Processor** | `Stripe API` | Payment Intents, Customer Management, Webhook Handling |
| **Hosting & CI/CD** | `Vercel` + `GitHub Actions` | Automated builds, linting, testing, and production deployments |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v22.x` (or `v20.x`+)
- **npm**: `v10.x`+
- **.NET SDK**: `8.0.x`

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mostafa-SAID7/luxelle-landing.git
cd luxelle-landing
```

---

### 2️⃣ Run Frontend (Angular)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (use legacy peer deps flag if required)
npm install --legacy-peer-deps

# Start development server
npm start
```
> 🌐 Frontend app will be running live at: `http://localhost:4200/`

---

### 3️⃣ Run Backend (.NET Web API)
```bash
# Open a new terminal from repository root
cd backend/src/Luxelle.API

# Restore dependencies & run backend
dotnet restore
dotnet run
```
> ⚡ Backend API will be available at `http://localhost:5000` / `https://localhost:5001` with Swagger UI enabled at `/swagger`.

---

## 📚 Project Documentation

Detailed technical documentation and guides are organized under the [`docs/`](docs/) directory:

- 🏗️ **[Architecture Overview](docs/architecture.md)** — Architectural patterns, project structure, and technology choices.
- 💻 **[Development Setup](docs/development.md)** — Local development environment setup, dependencies, and execution scripts.
- 🌿 **[Git & Branching Workflow](docs/git-workflow.md)** — Complete GitFlow branching strategy, conventional commit rules, and release guidelines.
- ⚡ **[Quick Git Guide](docs/GIT_WORKFLOW_QUICK_START.md)** — Quick reference card for developer workflows and release management.
- 🎨 **[UI & Design Guidelines](docs/ui-guidelines.md)** — Color palettes, typography standards, and Tailwind CSS design tokens.
- 🚀 **[Deployment Guide](docs/deployment.md)** — Detailed CI/CD setup, Vercel deployments, and workflow configurations.

---

## ⚙️ Automated CI/CD Workflows

This project utilizes GitHub Actions to ensure code quality, automated test enforcement, and seamless deployments:

| Workflow Name | Trigger | Action Performed |
|---|---|---|
| 🧪 **Frontend & Backend Tests** | Push / PR (`main`, `develop`) | Runs Angular unit tests & .NET solution unit tests |
| 🧹 **Linting & Code Style** | Push / PR (`main`, `develop`) | Validates ESLint rules & .NET `dotnet format` compliance |
| 🚀 **Deploy to Production** | Push (`main`), Manual | Deploys frontend to Vercel and backend API via FTP |
| 🏷️ **Release Automation** | Tag push (`v*`), Manual | Generates automated GitHub Releases & updates changelogs |

---

## 🤝 Community & Guidelines

We welcome contributions! Please review our community guidelines before opening pull requests or issues:

- 📝 **[Contributing Guidelines](CONTRIBUTING.md)**
- 🔒 **[Security Policy](.github/SECURITY.md)**
- 📜 **[Code of Conduct](CODE_OF_CONDUCT.md)**
- 📄 **[Changelog](CHANGELOG.md)**

---

## ⚖️ License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms and details.

---

<div align="center">
  <sub>Built with ❤️ by Mostafa SAID</sub>
</div>
