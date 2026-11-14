import { describe, it, expect } from "vitest";
import request  from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("Matriz de permisos - Rutas de Libros (sin DB)", () => {
  it("POST /api/libros sin token responde 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .send({ titulo: "Rayuela", precio: 7000 });
    
    expect(res.status).toBe(401);
  });

  it("POST /api/libros con token de CLIENTE responde 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({ titulo: "Rayuela", precio: 7000 });
    
    expect(res.status).toBe(403);
  });

  it("POST /api/libros con ADMIN y body inválido responde 400 (no 403)", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ titulo: "Rayuela", precio: -5 });
    
    expect(res.status).toBe(400);
  });

  it("DELETE /api/libros/1 con token de CLIENTE responde 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    
    expect(res.status).toBe(403);
  });

  it("GET /api/no-existe responde 404", async () => {
    const res = await request(app).get("/api/no-existe");
    
    expect(res.status).toBe(404);
  });
});