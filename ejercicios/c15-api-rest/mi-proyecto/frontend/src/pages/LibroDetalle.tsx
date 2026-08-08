import { useParams, Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';

const librosSimulados = [
  { id: 1, titulo: "Harry Potter y el Legado Maldito", autor: "J.K. Rowling", precio: 9500, imagen: "/img/9789878000299-5cd05fe5510d1b4ada16944485830551-1024-1024.webp" },
  { id: 2, titulo: "Las Aventuras de Pinocho", autor: "Antonio Colinas", precio: 7800, imagen: "/img/Portadas.2024-mejores-bonitas-pinocho-collodi-WMagazin-e1735465749152.jpg" }
];

export default function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  
  const libro = librosSimulados.find(l => l.id === Number(id));

  if (!libro) {
    return (
      <Container className="py-5 text-center">
        <h2>Libro no encontrado</h2>
        <Button as={Link} to="/" variant="primary" className="mt-3">Volver al Inicio</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm p-4">
        <div className="row g-0 align-items-center">
          <div className="col-md-4 text-center">
            <img 
              src={libro.imagen} 
              alt={libro.titulo} 
              className="img-fluid rounded" 
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title className="display-6 fw-bold mb-3">{libro.titulo}</Card.Title>
              <Card.Subtitle className="mb-4 text-muted fs-4">Autor: {libro.autor}</Card.Subtitle>
              <h3 className="text-success fw-bold mb-4">Precio: ${libro.precio}</h3>
              <p className="text-secondary">
                Esta es una descripción genérica del libro. Acá vas a poder mostrar toda la información detallada del catálogo en los próximos trabajos prácticos.
              </p>
              <div className="mt-5">
                <Button as={Link} to="/" variant="outline-secondary" className="me-2">
                  Volver
                </Button>
                <Button variant="primary">Comprar Ahora</Button>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </Container>
  );
}