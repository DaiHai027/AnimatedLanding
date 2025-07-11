# CI/CD Pipeline Setup Guide

This document explains the comprehensive CI/CD pipeline implemented for the Animated Landing project.

## 📋 Overview

The CI/CD pipeline includes:
- **Quality Checks**: TypeScript type checking, ESLint, and automated testing
- **Security Audits**: Dependency vulnerability scanning
- **Build Processes**: Automated building and artifact management
- **Docker Integration**: Containerized deployment with multi-stage builds
- **Deployment Automation**: Automated deployment to production environments

## 🏗️ Pipeline Architecture

### 1. Main CI/CD Workflow (`.github/workflows/ci.yaml`)
**Triggers**: Push to `main`/`develop`, Pull Requests
**Jobs**:
- **quality-checks**: TypeScript checking, linting, testing, coverage
- **build**: Application building and artifact storage
- **security-audit**: Dependency vulnerability scanning
- **deploy**: Production deployment (main branch only)

### 2. Docker Build & Deploy (`.github/workflows/docker-deploy.yml`)
**Triggers**: Push to `main`, version tags, Pull Requests
**Features**:
- Multi-stage Docker builds
- GitHub Container Registry integration
- Automated image tagging and versioning
- Production deployment with Docker containers

### 3. PR Validation (`.github/workflows/pr-validation.yml`)
**Triggers**: Pull Requests
**Features**:
- Comprehensive validation checks
- Bundle size analysis
- Automated PR comments with results
- Quality gates for code review

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Install New Testing Dependencies
The pipeline requires additional testing and linting dependencies:
```bash
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitest/coverage-v8 @vitest/ui audit-ci eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh jsdom vitest
```

### 3. Environment Setup
Create a `.env` file for local development:
```env
NODE_ENV=development
PORT=5000
# Add your database and other environment variables
```

### 4. Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Quality Assurance
npm run check        # TypeScript type checking
npm run lint         # ESLint checking
npm run lint:fix     # ESLint with auto-fix
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ui      # Run tests with UI

# Database
npm run db:push      # Push database schema
```

## 🐳 Docker Usage

### Development
```bash
# Build and run with Docker Compose
docker-compose --profile dev up

# Or run production build
docker-compose up
```

### Production
```bash
# Build image
docker build -t animated-landing .

# Run container
docker run -p 5000:5000 animated-landing
```

## 🔧 Configuration Files

### ESLint Configuration (`.eslintrc.json`)
- TypeScript and React rules
- Accessibility and best practices
- Consistent code style enforcement

### Vitest Configuration (`vitest.config.ts`)
- React Testing Library integration
- Coverage reporting
- Path aliases and test environment setup

### Docker Configuration
- **Dockerfile**: Multi-stage production build
- **docker-compose.yml**: Local development and production services
- **.dockerignore**: Optimized build context

## 📊 Quality Gates

### Automated Checks
- ✅ TypeScript type safety
- ✅ ESLint code quality
- ✅ Unit test coverage
- ✅ Security vulnerability scanning
- ✅ Build verification
- ✅ Bundle size monitoring

### Deployment Requirements
- All quality checks must pass
- Security audit must have no high/critical vulnerabilities
- Build artifacts must be generated successfully
- Tests must maintain coverage thresholds

## 🚀 Deployment Process

### Automatic Deployment
1. **Code Push**: Push to `main` branch
2. **Quality Checks**: All tests and quality gates pass
3. **Build**: Application and Docker image built
4. **Security Scan**: Dependencies audited
5. **Deploy**: Automated deployment to production

### Manual Deployment
```bash
# Build and deploy locally
npm run build
npm run start

# Or use Docker
docker-compose up
```

## 📈 Monitoring and Health Checks

### Health Check Endpoint
```
GET /api/health
```
Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

### Docker Health Checks
- Container health monitoring
- Automatic restart on failure
- Load balancer integration ready

## 🔐 Security Features

### Dependency Scanning
- `npm audit` for known vulnerabilities
- `audit-ci` for CI/CD integration
- Automated security updates

### Container Security
- Non-root user execution
- Minimal base image (Alpine Linux)
- Multi-stage builds for smaller attack surface

## 🎯 Best Practices

### Code Quality
- Pre-commit hooks (recommended)
- Consistent formatting with ESLint
- Type safety with TypeScript
- Comprehensive test coverage

### CI/CD
- Fast feedback with parallel jobs
- Caching for improved performance
- Secure artifact management
- Environment-specific configurations

## 📚 Additional Resources

### GitHub Actions
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Container Registry Guide](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Docker
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/#use-multi-stage-builds)

## 🐛 Troubleshooting

### Common Issues
1. **Missing Dependencies**: Run `npm install` to ensure all dependencies are installed
2. **Docker Build Failures**: Check `.dockerignore` and build context
3. **Test Failures**: Verify test setup and environment configuration
4. **Deployment Issues**: Check environment variables and health endpoints

### Support
For issues or questions, please check the workflow logs in the GitHub Actions tab or create an issue in the repository. 