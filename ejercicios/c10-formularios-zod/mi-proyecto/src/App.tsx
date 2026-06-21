import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import type LibroCardProps from './types/Libro';

const librosIniciales: LibroCardProps[] = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 8500, disponible: true, imagen: 'https://placehold.co/300x400?text=Libro+1' },
  { id: 2, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 9200, disponible: true, imagen: 'https://placehold.co/300x400?text=Libro+2' }
];

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales);

  const agregarLibro = (nuevo: LibroCardProps) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libro/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}

export default App;