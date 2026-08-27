import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import type { Libro } from '../types/libro';
import BookCard from '../components/card';
import { Link } from 'react-router-dom';

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter y el Legado Maldito",
    autor: "J.K. Rowling",
    precio: 9500,
    imagen: "/img/9789878000299-5cd05fe5510d1b4ada16944485830551-1024-1024.webp"
  },
  {
    id: 2,
    titulo: "Las Aventuras de Pinocho",
    autor: "Antonio Colinas",
    precio: 7800,
    imagen: "/img/Portadas.2024-mejores-bonitas-pinocho-collodi-WMagazin-e1735465749152.jpg"
  }
];

export default function Home() {
  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <header className="hero-image text-white text-center py-5 mb-4">
        <Container className="py-5">
          <h1 className="display-4 fw-bold">Bienvenidos a Mi Biblioteca!</h1>
          <p className="lead">Descubrí las mejores lecturas y sumergite en nuevas aventuras.</p>
          <Link to="/catalogo" className="btn btn-light btn-lg">Ir al Catálogo</Link>
        </Container>
      </header>

      <Container className="py-4">
        <h2 className="text-center mb-4">Libros Destacados</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id} className="d-flex justify-content-center">
              <BookCard
                id={libro.id} 
                titulo={libro.titulo}
                autor={libro.autor}
                precio={libro.precio}
                imagen={libro.imagen}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}