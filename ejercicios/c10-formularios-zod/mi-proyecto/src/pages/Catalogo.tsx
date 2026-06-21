import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LibroCard from '../components/card';
import type LibroCardProps from '../types/Libro';

interface CatalogoProps {
  libros: LibroCardProps[];
}

export default function Catalogo({ libros }: CatalogoProps) {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Catálogo de Libros</h2>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </div>
  );
}