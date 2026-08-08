import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export function getAll(_req: Request, res: Response) {
  const autores = autorService.findAll();
  return res.json(autores);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = autorService.findById(id);

  if (!autor) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.json(autor);
}

export function create(req: Request, res: Response) {
  const nuevoAutor = autorService.create(req.body);
  return res.status(201).json(nuevoAutor);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autorActualizado = autorService.update(id, req.body);

  if (!autorActualizado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.json(autorActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = autorService.remove(id);

  if (!eliminado) {
    return res.status(404).json({ error: "Autor no encontrado" });
  }

  return res.status(204).send();
}