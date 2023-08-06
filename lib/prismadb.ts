import { PrismaClient } from "@prisma/client";
// añadimos la variable prisma al objeto global window cual prehistorics
declare global {
    var prisma: PrismaClient | undefined;
}
// the way Next 13 does hot reloading it will instantiate several clients,we don't want this(Singleton pattern)
const prismadb = globalThis.prisma || new PrismaClient();
// en producción el hot reloading no va a fastidiar asi que esta linea es solo para que no instancie muchos clientes en desarrollo
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;