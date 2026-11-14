import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { prisma } from "../config/prisma";
import { JWT_SECRET } from "../config/env";

const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("Tests de Integración con DB - Libros", () => {
  let autorId: number;
  const uniqueTitulo = `Test Libro Integracion ${Date.now()}`;

  beforeAll(async () => {
    // Creamos un autor de prueba válido para que la relación no falle
    const autor = await prisma.autor.create({
      data: {
        nombre: "Autor Test",
        nacionalidad: "Argentina"
      }
    });
    autorId = autor.id;
  });

  afterAll(async () => {
    // Limpiamos los registros creados en orden para respetar las FK
    await prisma.libro.deleteMany({ where: { titulo: { contains: "Test Libro Integracion" } } });
    await prisma.autor.deleteMany({ where: { id: autorId } });
    await prisma.$disconnect();
  });

  it("POST /api/libros debe crear un libro en la DB real y retornar 201", async () => {
    const nuevoLibro = {
      titulo: uniqueTitulo,
      precio: 15000,
      stock: 10,
      autorId: autorId,
      imagen: "https://ejemplo.com/imagen.jpg"
    };

    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send(nuevoLibro);

    if (res.status !== 201) {
      console.log("--> RESPUESTA DEL SERVER:", res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.titulo).toBe(nuevoLibro.titulo);

    const libroEnDb = await prisma.libro.findUnique({
      where: { id: res.body.id }
    });
    expect(libroEnDb).not.toBeNull();
    expect(libroEnDb?.titulo).toBe(nuevoLibro.titulo);
  });
});