import "dotenv/config"; // 🔥 IMPORTANT

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;

console.log("DATABASE_URL =", process.env.DATABASE_URL); // debug

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;