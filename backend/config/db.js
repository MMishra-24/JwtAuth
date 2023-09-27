const { PrismaClient } = require('@prisma/client');

// Create a global instance of the Prisma Client
const prisma = new PrismaClient();

module.exports = {prisma};