import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type LibroCardProps from '../types/Libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

interface Props {
  onAgregar: (libro: LibroCardProps) => void;
}

function LibroNuevo({ onAgregar }: Props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    precio: '',
    disponible: true
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
      const errs: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!errs[campo]) {
          errs[campo] = issue.message;
        }
      }
      setErrores(errs);
      return;
    }


    setErrores({});
    onAgregar({
      id: Date.now(),
      titulo: resultado.data.titulo,
      autor: resultado.data.autor,
      precio: resultado.data.precio,
      disponible: resultado.data.disponible,
      imagen: IMG_PLACEHOLDER
    });

    navigate('/catalogo');
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo Libro</h2>
      <Form onSubmit={handleSubmit} noValidate>
        
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control 
            name="titulo" 
            value={form.titulo} 
            onChange={handleChange}
            isInvalid={!!errores.titulo} 
          />
          <Form.Control.Feedback type="invalid">
            {errores.titulo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control 
            name="autor" 
            value={form.autor} 
            onChange={handleChange}
            isInvalid={!!errores.autor} 
          />
          <Form.Control.Feedback type="invalid">
            {errores.autor}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control 
            type="number"
            name="precio" 
            value={form.precio} 
            onChange={handleChange}
            isInvalid={!!errores.precio} 
          />
          <Form.Control.Feedback type="invalid">
            {errores.precio}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check 
          className="mb-3" 
          label="Disponible"
          name="disponible" 
          checked={form.disponible} 
          onChange={handleChange} 
        />

        <Button type="submit" variant="primary">Agregar libro</Button>
      </Form>
    </div>
  );
}

export default LibroNuevo;