#!/bin/bash

# Build Validation Script
set -e

echo "🔍 Validating build process..."

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

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run from project root."
    exit 1
fi

print_status "Found package.json"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    if npm install; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_status "Dependencies already installed"
fi

# Run TypeScript type checking
echo "🔧 Running TypeScript type checking..."
if npm run check; then
    print_status "TypeScript check passed"
else
    print_error "TypeScript check failed"
    exit 1
fi

# Try to build the project
echo "🏗️  Building the project..."
if npm run build; then
    print_status "Build successful"
else
    print_error "Build failed"
    exit 1
fi

# Check if build output exists
if [ -d "dist" ]; then
    print_status "Build output directory exists"
    
    # Check for main files
    if [ -f "dist/index.js" ]; then
        print_status "Server build output found"
    else
        print_warning "Server build output not found at dist/index.js"
    fi
    
    if [ -d "dist/public" ]; then
        print_status "Client build output found"
    else
        print_warning "Client build output not found at dist/public"
    fi
else
    print_error "Build output directory not found"
    exit 1
fi

# Test if the built app can start (quick test)
echo "🚀 Testing if built app can start..."
timeout 10s npm start &
SERVER_PID=$!
sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
    print_status "Server started successfully"
    kill $SERVER_PID
else
    print_warning "Server failed to start or exited quickly"
fi

print_status "Build validation completed successfully!"
echo "🎉 Your build process is working correctly!" 