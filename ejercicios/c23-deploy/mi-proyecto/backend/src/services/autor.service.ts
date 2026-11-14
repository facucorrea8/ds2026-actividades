import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export type AutorConLibros = Prisma.AutorGetPayload<{
  include: { libros: true };
}>;

export async function findAll(): Promise<AutorConLibros[]> {
  return prisma.autor.findMany({
    include: { libros: true },
  });
}

export async function findById(id: number): Promise<AutorConLibros | null> {
  return prisma.autor.findUnique({
    where: { id },
    include: { libros: true },
  });
}

export async function create(datos: Prisma.AutorCreateInput): Promise<AutorConLibros> {
  return prisma.autor.create({
    data: datos,
    include: { libros: true },
  });
}

export async function update(id: number, datos: Prisma.AutorUpdateInput): Promise<AutorConLibros | null> {
  return prisma.autor.update({
    where: { id },
    data: datos,
    include: { libros: true },
  });
}

export async function remove(id: number): Promise<boolean> {
  await prisma.autor.delete({ where: { id } });
  return true;
}