# Multi-stage Dockerfile for React + Express app
FROM node:18-alpine AS base

# Install system dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --frozen-lockfile

# Copy source code
COPY . .

# Build the app
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV PORT=5000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copy built application
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/package.json ./package.json

# Copy production dependencies
COPY --from=deps --chown=appuser:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "dist/index.js"] 