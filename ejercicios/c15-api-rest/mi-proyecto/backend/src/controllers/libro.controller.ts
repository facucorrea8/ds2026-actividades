import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible
    ? req.query.disponible === "true"
    : undefined;
  const libros = libroService.findAll(disponible);
  return res.json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevoLibro = libroService.create(req.body);
  return res.status(201).json(nuevoLibro);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libroActualizado = libroService.update(id, req.body);

  if (!libroActualizado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libroActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = libroService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.status(204).send();
}