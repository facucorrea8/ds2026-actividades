import { prisma } from "../src/config/prisma";

const libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://placehold.co/150", disponible: true },
  { titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 6200, imagen: "https://placehold.co/150", disponible: true },
];

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();