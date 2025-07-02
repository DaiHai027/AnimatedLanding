# SocialSphere - Full-Stack Social Media Application

## Overview

SocialSphere is a modern social media web application built with a full-stack TypeScript architecture. The application features a React frontend with shadcn/ui components, an Express.js backend, and PostgreSQL database integration using Drizzle ORM. The project implements a clean separation between client, server, and shared code with type-safe database operations and modern development tooling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Animations**: Framer Motion for smooth UI interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with extensible interface
- **API Structure**: RESTful API with `/api` prefix routing

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with type-safe queries and migrations
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Migration System**: Drizzle Kit for database migrations
- **Session Storage**: Configurable storage interface (currently in-memory)

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Type Safety**: Zod schemas for runtime validation and TypeScript inference
- **Schema Location**: `/shared/schema.ts` for cross-platform consistency

### UI Components
- **Component Library**: Complete shadcn/ui implementation with 30+ components
- **Theme System**: Dark mode support with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Interactive Elements**: Canvas-based mouse trail effects and smooth animations

### API Infrastructure
- **Storage Interface**: Abstracted storage layer (`IStorage`) for easy testing and swapping
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Request Logging**: Comprehensive request/response logging for development
- **Type Safety**: Shared types between client and server

## Data Flow

1. **Client Requests**: React components use TanStack Query for data fetching
2. **API Layer**: Express.js routes handle HTTP requests with proper validation
3. **Storage Layer**: Abstracted storage interface interacts with database
4. **Database Operations**: Drizzle ORM provides type-safe database queries
5. **Response Handling**: Structured error handling and response formatting

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm and drizzle-kit for database operations
- **UI**: @radix-ui components for accessible UI primitives
- **Validation**: Zod for schema validation and type inference
- **Animation**: framer-motion for smooth UI transitions

### Development Tools
- **Build**: Vite with React plugin and runtime error overlay
- **Linting**: TypeScript compiler for type checking
- **Styling**: Tailwind CSS with PostCSS for processing

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `/dist/public`
- **Backend**: ESBuild bundles Express server to `/dist/index.js`
- **Static Assets**: Served from build output directory

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Hot reload with Vite middleware integration
- **Production**: Optimized builds with proper error handling

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Development**: Automatic schema synchronization
- **Production**: Migration-based deployment strategy

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Added interactive mouse trail effects with star cursor
- July 02, 2025. Enhanced CTA section with modern glassmorphism design
- July 02, 2025. Added animated borders to feature cards
- July 02, 2025. Implemented Easter egg mini-game "SocialSphere Defender"
  - Konami code activation (↑↑↓↓←→←→BA)
  - Clickable game controller icon in navigation
  - Space shooter gameplay with particles and scoring
- July 02, 2025. Replaced space shooter with classic brick breaker game
  - Ball physics with paddle bouncing mechanics
  - Colorful brick grid with particle effects when destroyed
  - Score tracking and win/lose conditions
  - A/D or arrow key controls for paddle movement
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```