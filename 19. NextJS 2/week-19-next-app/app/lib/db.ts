import { PrismaClient } from "@prisma/client";

/* This function returns a new instance to the prisma client */
const prismaClient = () => {
    return new PrismaClient()
}

/* We are using the globalThis.prisma because we are using backend otherwise we would have used the window.prisma */
const prisma = globalThis.prisma ?? prismaClient()

/* This problem is not in production mode it is in dev only */
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma