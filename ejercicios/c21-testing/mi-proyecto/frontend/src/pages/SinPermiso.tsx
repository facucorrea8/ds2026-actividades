import { Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function SinPermiso() {
  return (
    <Container className="mt-4">
      <Alert variant="warning">
        <Alert.Heading>Acceso Restringido</Alert.Heading>
        <p>No tenés los permisos necesarios para acceder a esta sección.</p>
        <hr />
        <Link to="/catalogo" className="btn btn-outline-warning">
          Volver al catálogo
        </Link>
      </Alert>
    </Container>
  );
}