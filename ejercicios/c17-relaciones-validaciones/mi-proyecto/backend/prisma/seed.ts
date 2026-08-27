import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francia" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ensayo" },
  { nombre: "Ficción" },
];

const libros = [
  {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 4500,
    imagen: "https://placehold.co/150",
    disponible: true,
    cats: ["Novela"],
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 6200,
    imagen: "https://placehold.co/150",
    disponible: true,
    cats: ["Ensayo", "Ficción"],
  },
];

async function main() {
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.categoria.deleteMany();

  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });