import { PrismaClient } from '@prisma/client';

let prisma; // Declare the variable to hold Prisma client instance

if (process.env.NODE_ENV === 'production') {
  // In production environment, create a single Prisma client instance
  prisma = new PrismaClient();
} else {
  // In development mode, use a global variable to avoid multiple Prisma client instances on hot-reload
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma }; // Export the prisma client instance
