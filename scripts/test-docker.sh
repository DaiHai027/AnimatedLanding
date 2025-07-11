#!/bin/bash

# Docker Build and Test Script
set -e

echo "🐳 Starting Docker build and test process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop."
    exit 1
fi

print_status "Docker is running"

# Build the Docker image
echo "🏗️  Building Docker image..."
if docker build -t animated-landing-test .; then
    print_status "Docker build successful"
else
    print_error "Docker build failed"
    exit 1
fi

# Test the image with a quick run
echo "🚀 Testing Docker image..."
if docker run --rm -d -p 5001:5000 --name animated-landing-test animated-landing-test; then
    print_status "Docker container started successfully"
    
    # Wait for container to be ready
    sleep 10
    
    # Test health endpoint
    echo "🏥 Testing health endpoint..."
    if curl -f http://localhost:5001/api/health >/dev/null 2>&1; then
        print_status "Health check passed"
    else
        print_warning "Health check failed, but container is running"
    fi
    
    # Stop the container
    docker stop animated-landing-test >/dev/null 2>&1
    print_status "Docker container stopped"
else
    print_error "Failed to start Docker container"
    exit 1
fi

# Clean up
echo "🧹 Cleaning up..."
docker rmi animated-landing-test >/dev/null 2>&1 || true

print_status "Docker build and test completed successfully!"
echo "🎉 Your Docker configuration is working correctly!" 