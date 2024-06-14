const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || new PrismaClient();

const client = global.prisma;

if (process.env.NODE_ENV !== 'production') {
  global.prisma = client;
}

module.exports = client;
