import express from "express";

const app = express();
const PORT = 3000;

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  precio: number;
  portada: string;
  sinopsis: string;
}

const libros: Libro[] = [
  {
    id: "1",
    titulo: "El resplandor",
    autor: "Stephen King",
    genero: "Terror",
    precio: 25000,
    portada: "https://images-na.ssl-images-amazon.com/images/I/81A7bS6PqML.jpg",
    sinopsis: "Alucinante novela de terror sobre un hotel aislado y la locura de un escritor."
  },
  {
    id: "2",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    precio: 22000,
    portada: "https://images-na.ssl-images-amazon.com/images/I/81af+gDuMmL.jpg",
    sinopsis: "La obra cumbre de la literatura hispanoamericana que narra la historia de la familia Buendía."
  },
  {
    id: "3",
    titulo: "Dune",
    autor: "Frank Herbert",
    genero: "Ciencia ficción",
    precio: 28000,
    portada: "https://images-na.ssl-images-amazon.com/images/I/81ym3g79bKL.jpg",
    sinopsis: "Una obra maestra de la ciencia ficción ambientada en el desértico planeta Arrakis."
  }
];

// 3. Primer endpoint: GET /libros
app.get("/libros", (_req, res) => {
  res.json(libros);
});

// Endpoint base para testear conectividad
app.get("/", (_req, res) => {
  res.json({ mensaje: "¡API de la Librería funcionando de diez!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});