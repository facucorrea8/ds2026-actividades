import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 7500,
    imagen: "https://ejemplo.com/rayuela.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 6800,
    imagen: "https://ejemplo.com/ficciones.jpg",
    disponible: true,
  },
];

let proximoId = 3;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter((l) => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevoLibro: Libro = {
    id: proximoId++,
    ...datos,
  };
  libros.push(nuevoLibro);
  return nuevoLibro;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return undefined;

  const libroActualizado: Libro = { id, ...datos };
  libros[index] = libroActualizado;
  return libroActualizado;
}

export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;

  libros.splice(index, 1);
  return true;
}