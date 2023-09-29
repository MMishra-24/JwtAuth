# JwtAuth - Favorite Movies Listing with JWT Authentication

JwtAuth is an implementation of a favorite movies listing application with JWT (JSON Web Token) authentication.

## Pre-requisites
- Node.js
- PostgreSQL 16

## Getting Started

### Backend

1. Navigate to the `backend` directory.
- cd backend

2. Install the required Node.js packages.
- npm install

3. Create a `.env` file for the database URL. Add the following line and replace it with your database URL (depends on the env).
- export DATABASE_URL=postgresql://postgres:root@localhost:5432/postgres?schema=public

4. Run Prisma migrations to create the database tables.
- npx prisma migrate dev --name init

5. Start the frontend development server.
- npm start

### Frontend

1. Navigate to the `movie-dashboard` directory.
- cd movie-dashboard

2. Install the required Node.js packages.
- npm install

3. Start the frontend development server.
- npm start
