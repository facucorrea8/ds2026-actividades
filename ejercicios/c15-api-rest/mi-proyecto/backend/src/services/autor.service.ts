import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Julio Cortázar",
    nacionalidad: "Argentina",
  },
  {
    id: 2,
    nombre: "Jorge Luis Borges",
    nacionalidad: "Argentina",
  },
];

let proximoId = 3;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((a) => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevoAutor: Autor = {
    id: proximoId++,
    ...datos,
  };
  autores.push(nuevoAutor);
  return nuevoAutor;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return undefined;

  const autorActualizado: Autor = { id, ...datos };
  autores[index] = autorActualizado;
  return autorActualizado;
}

export function remove(id: number): boolean {
  const index = autores.findIndex((a) => a.id === id);
  if (index === -1) return false;

  autores.splice(index, 1);
  return true;
}