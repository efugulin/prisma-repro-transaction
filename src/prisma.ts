import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

prisma.$use(async (params, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export default prisma;
