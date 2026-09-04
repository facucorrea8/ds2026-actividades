import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import LibroCard from '../components/card';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/Libro';

export default function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el catálogo</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Catálogo de Libros</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {(libros ?? []).map((libro) => (
          <Col key={libro.id}>
            <LibroCard {...libro} />
          </Col>
        ))}
      </Row>
    </div>
  );
}