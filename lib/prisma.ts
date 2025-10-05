import { PrismaClient } from "../app/generated/prisma";

type PrismaClientInterface = ReturnType<typeof prismaClient>;

const prismaClient = () => {
  return new PrismaClient();
};

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma: PrismaClientInterface = globalPrisma.prisma ?? prismaClient();

export default prisma;
