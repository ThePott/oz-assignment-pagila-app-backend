import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const prismaGetAllFilms = async () => await prisma.film.findMany()

