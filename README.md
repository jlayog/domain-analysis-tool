# Domain Analysis Tool

Welcome to the Domain Analysis Tool project! This project is built using Next.js 14, React, TypeScript, and JSX. This README will guide you through the setup and usage of the project.

[recording.webm](https://github.com/user-attachments/assets/294c7637-1c19-4a53-8c4e-9f1e177f594c)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Client Structure](#client-directory-structure)
- [Server Structure](#server-structure)
- [Scripts](#scripts)

## Introduction

The Domain Analysis Tool is a web application designed to help clients analyze and visualize domain data. It leverages the power of Next.js for server-side rendering, React for building user interfaces, and TypeScript for type safety.

## Features

- **Server-Side Rendering**: Utilizes Next.js for improved performance and SEO.
- **React Components**: Modular and reusable components built with React.
- **TypeScript**: Strongly typed codebase for better maintainability and fewer runtime errors.
- **JSX**: Syntax extension for JavaScript, making it easier to write and understand UI components.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/domain-analysis-tool.git
    cd domain-analysis-tool
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## 📁 Client Directory Structure

```
client
│── app                           # Next.js App Router directory
│   ├── (pages)                   # Pages directory (App Router)
│   │   ├── [unit]                # Dynamic route for a unit
│   │   ├── admin                 # Admin dashboard
│   │   ├── login                 # Login page
│   │   ├── oauth-success         # OAuth success page
│   │   ├── 404.tsx               # Custom 404 page
│   │   ├── layout.tsx            # Root layout for the application
│   │   ├── page.tsx              # Homepage
│   │
│   ├── components                # All reusable components
│   │   ├── features              # Feature-specific components
│   │   │   ├── ProgressOverlay.module.css
│   │   │   ├── ProgressOverlay.tsx
│   │   │   ├── UnitListPanel.module.css
│   │   │   ├── UnitListPanel.tsx
│   │   │
│   │   ├── layout                # Layout-related components (shared across pages)
│   │   │   ├── Footer.module.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Grid.module.css
│   │   │   ├── Logo.tsx
│   │   │   ├── Logo.module.css
│   │   │   ├── Navbar.module.css
│   │   │   ├── Navbar.tsx
│   │   │
│   │   ├── ui                    # Generic UI components
│   │       ├── Card.module.css
│   │       ├── Card.tsx
│   │       ├── Container.module.css
│   │       ├── Container.tsx
│   │       ├── PageCard.module.css
│   │       ├── PageCard.tsx
│   │       ├── Pagination.module.css
│   │       ├── Pagination.tsx
│
│── hooks                         # Custom React hooks
│   ├── useAdminAuth.ts           # Uses admin credentials to send form data
│   ├── useAuth.ts                # Handles Admin Login 
│   ├── useSave.ts                # Save function for Units
│
│── styles                        # Global CSS styles
│
│── types                         # TypeScript type definitions
│   ├── componentTypes.ts         # Types for UI components
│   ├── index.ts                  # Centralized exports for all types
│   ├── pageTypes.ts              # Types for pages and API responses
│
│── public                        # Static assets (images, icons, etc.)
│
│── .next                         # Next.js build output (auto-generated)
│── node_modules                  # Project dependencies (auto-generated)
│── .gitignore                     # Git ignore rules
│── tsconfig.json                  # TypeScript configuration
│── package.json                   # Project dependencies and scripts
│── next.config.mjs                # Next.js configuration
│── README.md                      # Project documentation
```

### Key Directories

#### `/app`
This is the main directory for routing and page-level components. It contains subdirectories for each route of the application.

`[unit]/page.tsx`

Represents the dynamic route for managing a specific "unit."
Handles data fetching, rendering, and interactions related to the unit pages.

`admin/page.tsx`

The admin dashboard route.
Provides functionalities for managing application-wide settings and administrative actions.

`login/page.tsx`

The login page for authenticating users.
Handles user input for credentials and redirects upon successful login.

`oauth-success/page.tsx`

Displays a confirmation page upon successful OAuth-based authentication.

`404.tsx`

Custom 404 page for handling undefined routes.
Provides a user-friendly error message for navigation errors.

`globals.css`

Global CSS for the application, applying styles that affect all pages and components.
Includes resets, typography, and global layout settings.

`layout.tsx`

Defines the overall layout of the application, wrapping all pages.
Typically includes shared components like the header, footer, and navigation.

`page.tsx`

The landing page of the application.
Provides an overview or entry point for users.

#### `/components`
This folder contains reusable UI components and their corresponding CSS modules.

`Button.tsx & Button.module.css`

A customizable button component used across the application.
Supports different styles, sizes, and states (e.g., loading, disabled).

`Card.tsx & Card.module.css`

Represents a styled card component for displaying information.
Used for individual items or summaries.

`Container.tsx & Container.module.css`

A layout component for wrapping content with consistent padding and spacing.

`Footer.tsx & Footer.module.css`

The footer of the application, displayed at the bottom of every page.
May include links, copyright information, or branding.

`Grid.tsx & Grid.module.css`

Defines a grid system for arranging child components in a responsive layout.
Includes styles for columns, rows, and gaps.

`Layout.tsx`

A higher-order layout component for defining the structure of the application pages.
Often wraps content with shared elements like navigation bars.

`Logo.tsx & Logo.module.css`

Displays the application's logo.
May include links or branding styles.

`Navbar.tsx & Navbar.module.css`

The navigation bar for the application.
Includes links to different routes and user authentication controls.

`PageCard.tsx & PageCard.module.css`

Represents an individual "page" within a unit.
Handles user interactions such as editing, keeping, or deleting a page.

`Pagination.tsx & Pagination.module.css`

Provides pagination controls for navigating through paginated data.
Includes buttons and logic for switching pages.

`ProgressOverlay.tsx & ProgressOverlay.module.css`

Displays an overlay with a progress bar.
Typically used during data saving or loading operations.

`UnitListPanel.tsx & UnitListPanel.module.css`

Displays a list of units available in the application.
Includes UI for selecting or managing units.

#### `/hooks`
This folder contains custom React hooks for managing shared state and logic.

`useAdminAuth.ts`

A hook for managing admin-specific authentication.
Includes logic for verifying admin permissions.

`useAuth.ts`

A generic authentication hook.
Handles user login, logout, and token management.

`useSave.ts`

A hook for managing save operations, such as sending data to the server.
Includes state tracking for loading and error handling.

#### `/public`
Static assets that are served directly by Next.js, including fonts, images, and other media files.

`favicon.ico`

The favicon for the application, displayed in the browser tab.

#### 📁 types/ - TypeScript Type Definitions
The types/ directory contains TypeScript type definitions for pages, components, and API responses. This ensures type safety, reduces errors, and improves code maintainability.
```
types
│── componentTypes.ts  # Types for UI components
│── index.ts           # Centralized type exports (combines the other types into a single call, in case types are shared)
│── pageTypes.ts       # Types for pages and API responses
```

## Scripts

The following scripts are available in the project:

- `dev`: Starts the development server.
- `fast`: Starts the development server with turbo. Use if `start` is running slow or if your device is older.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.
- `test`: Runs the test suite.

## 📁 Server Structure

The `server` directory contains the backend application code built with Express.js and MySQL. Here's a detailed breakdown of its structure:

```
server/
├── config/          # Configuration files
│   └── connection.js # Database connection setup
├── db/              # Database related files
│   └── seeds.sql    # Initial database seed data
├── routes/          # API route handlers
│   ├── googleRoutes.js  # Google Analytics API routes
│   ├── pageRoutes.js    # Page management routes
│   └── unitRoutes.js    # Unit management routes
├── .dockerignore    # Docker build exclusions
├── .env            # Environment variables (not in repo)
├── .gitignore      # Git ignore rules
├── Dockerfile      # Docker container configuration
├── index.js        # Main application entry point
└── package.json    # Project dependencies and scripts
```

### Key Components

#### `/config`
Contains configuration files for the application:
- `connection.js`: Sets up and manages MySQL database connections using environment variables

#### `/db`
Database-related files:
- `seeds.sql`: Contains SQL statements for initializing the database with starter data, including units, pages, and audience types

#### `/routes`
API route handlers organized by feature:
- `googleRoutes.js`: Handles integration with Google Analytics API for fetching page view data
- `pageRoutes.js`: Manages CRUD operations for individual pages, including updates to keep/delete status, priorities, and notes
- `unitRoutes.js`: Handles operations related to organizational units and their pages

### Root Files

#### `index.js`
The main application entry point that:
- Sets up Express server configuration
- Configures middleware (CORS, session handling, etc.)
- Mounts route handlers
- Establishes database connection
- Starts the HTTP server

#### `package.json`
Defines project metadata and dependencies:
- Runtime dependencies (Express, MySQL2, etc.)
- Development dependencies (nodemon)
- NPM scripts for running and developing the application

#### Docker Files
- `.dockerignore`: Lists files and directories to exclude from Docker builds
- `Dockerfile`: Contains instructions for building the server container

#### Environment Configuration
- `.env`: Stores sensitive configuration values (not committed to repository)
- `.gitignore`: Specifies which files Git should ignore

### 📜 Available Scripts

Available npm scripts:
- `start`: Launches the production server
- `dev`: Runs the server with nodemon for development
- `test`: Placeholder for test suite execution


---

# 📄 Docker Setup & Troubleshooting
This project uses Docker to containerize both the Next.js client and Express.js server, ensuring a consistent development and deployment environment.
---

## 🛠 Docker Files Overview
### 📂 `docker-compose.yml` (Multi-Service Setup)
📍 Defines how to build and run multiple services (client & server).
✅ Ensures that the Next.js frontend and Express.js backend communicate properly.

Key Services:

- server (Express.js API)
- client (Next.js UI)

```yaml
services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: server-1
    ports:
      - "3001:3001"
    env_file:
      - .env  # Ensures Docker loads environment variables
    environment:
      MYSQL_HOST: "${HOST}"
      MYSQL_USER: "${DB_USER}"
      MYSQL_PASSWORD: "${DB_PASSWORD}"
      MYSQL_DATABASE: "${DB_NAME}"
      GOOGLE_CLIENT_ID: "${GOOGLE_CLIENT_ID}"
      GOOGLE_CLIENT_SECRET: "${GOOGLE_CLIENT_SECRET}"
      GOOGLE_REDIRECT_URI: "${GOOGLE_REDIRECT_URI}"
      SECRET: "${SECRET}"
      NODE_ENV: production
    networks:
      - app-network
    restart: unless-stopped
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: client-1
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_BACKEND_URL: http://server:3001
      NODE_ENV: production
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge
```
### This combines both Dockerfiles in the /client and /server folders
- Simplifies multi-container management (client + server run together).
- Ensures consistent networking (app-network allows inter-service communication).
- Loads environment variables (env_file: .env for credentials).

---

### 📂 client/Dockerfile (Frontend) (local)
```bash
# Set the base image to Node 20 for the Next.js app
FROM node:20-alpine AS builder

# Create a user with permissions to run the app
# -S -> create system user
# -G -> add user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host machine
# Best practice to run app as non-root user
RUN addgroup webservices && adduser -S -G webservices webservices

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
# This is done before copying the rest of the files to take advantage of Docker's caching mechanism
# If the package.json and package-lock.json files have not changed, Docker will use the cached image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

RUN npm run build

# Runtime stage
FROM node:20-alpine

# Copy app user from builder
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /app

# Copy built files from builder
COPY --from=builder --chown=webservices:webservices /app/.next ./.next
COPY --from=builder --chown=webservices:webservices /app/public ./public
COPY --from=builder --chown=webservices:webservices /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Switch to non-root user
USER webservices

EXPOSE 3000

CMD ["npm", "start"]
```

### 📂 server/Dockerfile (Backend) (local)

```bash
# Set the base image to Node 20 for the Next.js app
FROM node:20-alpine AS builder

# Create a user with permissions to run the app
# -S -> create system user
# -G -> add user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host machine
# Best practice to run app as non-root user
RUN addgroup webservices && adduser -S -G webservices webservices

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
# This is done before copying the rest of the files to take advantage of Docker's caching mechanism
# If the package.json and package-lock.json files have not changed, Docker will use the cached image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

RUN npm run build

# Runtime stage
FROM node:20-alpine

# Copy app user from builder
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /app

# Copy built files from builder
COPY --from=builder --chown=webservices:webservices /app/.next ./.next
COPY --from=builder --chown=webservices:webservices /app/public ./public
COPY --from=builder --chown=webservices:webservices /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Switch to non-root user
USER webservices

EXPOSE 3000

CMD ["npm", "start"]
```
---

## 🛠 Running Docker Commands

### Build and Start Containers
```sh
docker-compose up --build
```
This builds the client and server folder using the `docker-compose.yml` file.

### Stop containers
```sh
docker-compose down
```
This removes the containers and shuts them down.

### Check running containers
```sh
docker ps
```
Displays a list of active Docker Containers

### Restart Containers
```sh
docker-compose down && docker-compose up --build
```
Useful if modifying in quick-succession.

### Error logging
```sh
docker logs server-1
docker logs client-1
```

---

## Troubleshooting Issues & Solutions
Problem: Inside the container, running env | grep DB shows that DB_USER, DB_NAME, etc., are undefined. Connection to db was refused.

Error log:
```sh
server-1  | Database connection failed: AggregateError [ECONNREFUSED]:                                                                                
server-1  |     at internalConnectMultiple (node:net:1122:18)                                                                                         
server-1  |     at internalConnectMultiple (node:net:1190:5)                                                                                          
server-1  |     at afterConnectMultiple (node:net:1689:7) {                                                                                           
server-1  |   code: 'ECONNREFUSED',                                                                                                                   
server-1  |   fatal: true,
server-1  |   [errors]: [                                                                                                                             
server-1  |     Error: connect ECONNREFUSED 192.168.65.254:3371                                                                                       
server-1  |         at createConnectionError (node:net:1652:14)                                                                                       
server-1  |         at afterConnectMultiple (node:net:1682:16) {                                                                                      
server-1  |       errno: -111,                                                                                                                        
server-1  |       code: 'ECONNREFUSED',                                                                                                               
server-1  |       syscall: 'connect',                                                                                                                 
server-1  |       address: '192.168.65.254',                                                                                                          
server-1  |       port: 3371                                                                                                                          
server-1  |     },
server-1  |     Error: connect ENETUNREACH fdc4:f303:9324::254:3371 - Local (:::0)                                                                    
server-1  |         at internalConnectMultiple (node:net:1186:16)                                                                                     
server-1  |         at afterConnectMultiple (node:net:1689:7) {                                                                                       
server-1  |       errno: -101,                                                                                                                        
server-1  |       code: 'ENETUNREACH',                                                                                                                
server-1  |       syscall: 'connect',                                                                                                                 
server-1  |       address: 'fdc4:f303:9324::254',                                                                                                     
server-1  |       port: 3371                                                                                                                          
server-1  |     }                                                                                                                                     
server-1  |   ]                                                                                                                                       
server-1  | }
```

Debugging: After adding the following lines to our `connection.js` in our server folder:
```js
console.log("Connecting to DB with:", {
  host: process.env.HOST,
  user: process.env.DB_USER,
  port: process.env.PORT,
  database: process.env.DB_NAME,
});
 
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully!");
    connection.release();
  }
});
```
It returned the following:

```sh
2025-01-29 10:44:16 
2025-01-29 10:44:16 > server@0.0.1 start
2025-01-29 10:44:16 > node index.js
2025-01-29 10:44:16 
2025-01-29 10:44:16 Connecting to DB with: {
2025-01-29 10:44:16   host: undefined,
2025-01-29 10:44:16   user: undefined,
2025-01-29 10:44:16   port: undefined,
2025-01-29 10:44:16   database: undefined
2025-01-29 10:44:16 }
2025-01-29 10:44:17 Example app listening on http://localhost:3001
2025-01-29 10:44:17 Warning: connect.session() MemoryStore is not
2025-01-29 10:44:17 designed for a production environment, as it will leak
2025-01-29 10:44:17 memory, and will not scale past a single process.
2025-01-29 10:44:17 Database connection failed: AggregateError [ECONNREFUSED]: 
2025-01-29 10:44:17     at internalConnectMultiple (node:net:1122:18)
2025-01-29 10:44:17     at internalConnectMultiple (node:net:1190:5)
2025-01-29 10:44:17     at afterConnectMultiple (node:net:1689:7) {
2025-01-29 10:44:17   code: 'ECONNREFUSED',
2025-01-29 10:44:17   fatal: true,
2025-01-29 10:44:17   [errors]: [
2025-01-29 10:44:17     Error: connect ECONNREFUSED 192.168.65.254:3360
2025-01-29 10:44:17         at createConnectionError (node:net:1652:14)
2025-01-29 10:44:17         at afterConnectMultiple (node:net:1682:16) {
2025-01-29 10:44:17       errno: -111,
2025-01-29 10:44:17       code: 'ECONNREFUSED',
2025-01-29 10:44:17       syscall: 'connect',
2025-01-29 10:44:17       address: '192.168.65.254',
2025-01-29 10:44:17       port: 3360
2025-01-29 10:44:17     },
2025-01-29 10:44:17     Error: connect ENETUNREACH fdc4:f303:9324::254:3360 - Local (:::0)
2025-01-29 10:44:17         at internalConnectMultiple (node:net:1186:16)
2025-01-29 10:44:17         at afterConnectMultiple (node:net:1689:7) {
2025-01-29 10:44:17       errno: -101,
2025-01-29 10:44:17       code: 'ENETUNREACH',
2025-01-29 10:44:17       syscall: 'connect',
2025-01-29 10:44:17       address: 'fdc4:f303:9324::254',
2025-01-29 10:44:17       port: 3360
2025-01-29 10:44:17     }
2025-01-29 10:44:17   ]
2025-01-29 10:44:17 }
2025-01-29 10:44:21 Error fetching units: Error
2025-01-29 10:44:21     at PromisePool.query (/app/node_modules/mysql2/lib/promise/pool.js:36:22)
2025-01-29 10:44:21     at /app/routes/unitRoutes.js:10:40
2025-01-29 10:44:21     at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
2025-01-29 10:44:21     at next (/app/node_modules/express/lib/router/route.js:149:13)
2025-01-29 10:44:21     at Route.dispatch (/app/node_modules/express/lib/router/route.js:119:3)
2025-01-29 10:44:21     at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
2025-01-29 10:44:21     at /app/node_modules/express/lib/router/index.js:284:15
2025-01-29 10:44:21     at Function.process_params (/app/node_modules/express/lib/router/index.js:346:12)
2025-01-29 10:44:21     at next (/app/node_modules/express/lib/router/index.js:280:10)
2025-01-29 10:44:21     at Function.handle (/app/node_modules/express/lib/router/index.js:175:3) {
2025-01-29 10:44:21   code: 'ECONNREFUSED',
2025-01-29 10:44:21   errno: undefined,
2025-01-29 10:44:21   sql: undefined,
2025-01-29 10:44:21   sqlState: undefined,
2025-01-29 10:44:21   sqlMessage: undefined
2025-01-29 10:44:21 }
2025-01-29 10:44:21 Fetching all units...
```

This proved that our `.env` file was not being passed during build time.

Solution:
- Inside the docker container terminal, ensure that .env exists in the root directory. This was a huge issue in preventing us from connecting to the database.
```sh
ls -la .env
```
- `.env` was not being passed in the `docker-compose.yml`, to which we added:
```yml
env_file:
  - .env
```


<<<<<<< Updated upstream
Deployed with Docker.

Migrated from my GitLab account.
=======
>>>>>>> Stashed changes
