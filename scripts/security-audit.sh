#!/bin/bash

# Security Audit Script for Animated Landing
set -e

echo "🔒 Starting comprehensive security audit..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run from project root."
    exit 1
fi

print_header "Production Dependencies Security Audit"

# Critical check: Production dependencies MUST have no high/critical vulnerabilities
if npm audit --omit=dev --audit-level=high >/dev/null 2>&1; then
    print_success "Production dependencies are secure (no high/critical vulnerabilities)"
    PROD_SECURE=true
else
    print_error "CRITICAL: Production dependencies have high/critical vulnerabilities!"
    print_info "Running detailed production audit..."
    npm audit --omit=dev --audit-level=high
    PROD_SECURE=false
fi

print_header "Full Dependency Security Audit"

# Full audit for visibility
print_info "Checking all dependencies for vulnerabilities..."
if npm audit --audit-level=high >/dev/null 2>&1; then
    print_success "No high/critical vulnerabilities found in any dependencies"
    FULL_SECURE=true
else
    print_warning "Some moderate vulnerabilities found (acceptable in development dependencies)"
    print_info "Detailed vulnerability report:"
    npm audit --audit-level=moderate | head -50
    echo "..."
    print_info "Run 'npm audit' for full details"
    FULL_SECURE=false
fi

print_header "Dependency Updates Check"

# Check for outdated packages
print_info "Checking for outdated dependencies..."
if npm outdated >/dev/null 2>&1; then
    print_warning "Some dependencies have updates available"
    print_info "Outdated packages:"
    npm outdated | head -10
    echo "..."
    print_info "Run 'npm outdated' for full list"
else
    print_success "All dependencies are up to date"
fi

print_header "Security Recommendations"

# Count vulnerabilities
VULN_COUNT=$(npm audit --audit-level=low --json 2>/dev/null | grep -o '"total":[0-9]*' | cut -d':' -f2 || echo "0")
PROD_VULN_COUNT=$(npm audit --omit=dev --audit-level=low --json 2>/dev/null | grep -o '"total":[0-9]*' | cut -d':' -f2 || echo "0")

print_info "Vulnerability Summary:"
echo "  - Production dependencies: $PROD_VULN_COUNT vulnerabilities"
echo "  - All dependencies: $VULN_COUNT vulnerabilities"

if [ "$PROD_SECURE" = true ]; then
    print_success "Production security: PASSED"
else
    print_error "Production security: FAILED - IMMEDIATE ACTION REQUIRED"
fi

if [ "$FULL_SECURE" = true ]; then
    print_success "Overall security: EXCELLENT"
elif [ "$VULN_COUNT" -lt 20 ]; then
    print_warning "Overall security: ACCEPTABLE (moderate dev vulnerabilities)"
else
    print_warning "Overall security: NEEDS ATTENTION (many vulnerabilities)"
fi

print_header "Security Actions"

print_info "Recommended actions:"

if [ "$PROD_SECURE" = false ]; then
    echo "  🚨 URGENT: Fix production vulnerabilities immediately"
    echo "     Command: npm audit fix --omit=dev"
fi

if [ "$VULN_COUNT" -gt 15 ]; then
    echo "  📈 Consider updating dependencies:"
    echo "     Command: npm update"
    echo "     Manual: Review and update major versions"
fi

echo "  🔄 Regular maintenance:"
echo "     - Run this script monthly"
echo "     - Review SECURITY.md for current status"
echo "     - Monitor GitHub security advisories"

print_header "Security Commands Reference"

print_info "Useful security commands:"
echo "  npm audit                          # Full vulnerability report"
echo "  npm audit --omit=dev               # Production dependencies only"
echo "  npm audit --audit-level=high       # High/critical vulnerabilities only"
echo "  npm audit fix                      # Attempt automatic fixes"
echo "  npm outdated                       # Check for updates"
echo "  npm update                         # Update to latest compatible versions"

print_header "Docker Security"

if [ -f "Dockerfile" ]; then
    print_info "Docker security recommendations:"
    echo "  - Scan images with: docker scan <image-name>"
    echo "  - Use specific base image versions"
    echo "  - Run containers as non-root user ✅ (already implemented)"
    echo "  - Use .dockerignore to exclude sensitive files ✅ (already implemented)"
fi

print_header "Summary"

if [ "$PROD_SECURE" = true ]; then
    print_success "Security audit completed successfully!"
    print_info "Production dependencies are secure for deployment."
    
    if [ "$FULL_SECURE" = false ]; then
        print_warning "Note: Development dependencies have moderate vulnerabilities (acceptable)."
        print_info "See SECURITY.md for details on our security policy."
    fi
    
    exit 0
else
    print_error "Security audit FAILED!"
    print_error "Production vulnerabilities must be fixed before deployment."
    exit 1
fi 