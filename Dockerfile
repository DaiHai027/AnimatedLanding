# Multi-stage Dockerfile for React + Express app
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

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