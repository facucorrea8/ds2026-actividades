import NavbarLibreria from './components/navbar';
import BookCard from './components/card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const libros = [
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
    },
  ];

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <NavbarLibreria />
      
      <header className="hero-image text-white text-center py-5 mb-4">
        <Container className="py-5">
          <h1 className="display-4 fw-bold">¡Bienvenidos a Mi Biblioteca!</h1>
          <p className="lead">Descubrí las mejores lecturas y sumergite en nuevas aventuras.</p>
          <a href="catalogo.html" className="btn btn-light btn-lg">Ir al Catálogo</a>
        </Container>
      </header>

      <Container className="py-4">
        <h2 className="text-center mb-4">Libros Destacados</h2>
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {libros.map((libro) => (
            <Col key={libro.id} className="d-flex justify-content-center">
              <BookCard 
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

export default App;