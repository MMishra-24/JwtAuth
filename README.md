# JwtAuth

This a implementation of a favourite movies listing for user with jwt authentication.

Pre-requisites
Node, Postgresql 16

Commands:
For backend:
cd backend
Run npm install
npm install prisma --save-dev
created a .env for database_url and paste "export DATABASE_URL=postgresql://postgres:root@localhost:5432/postgres?schema=public" (according to your env)
npx prisma migrate dev --name init (making migrations)

