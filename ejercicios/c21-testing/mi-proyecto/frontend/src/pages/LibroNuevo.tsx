import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/LibroSchema';
import { apiFetch } from '../services/api';
import type { Autor } from '../types/Libro';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

export default function LibroNuevo() {
  const navigate = useNavigate();

  const [autores, setAutores] = useState<Autor[]>([]);
  
  const [form, setForm] = useState({
    titulo: '',
    autorId: '',
    precio: '',
    disponible: true,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    apiFetch<Autor[]>('/autores')
      .then((data) => setAutores(data))
      .catch((err) => console.error('Error al obtener autores:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
  const target = e.target;
  const { name, value, type, checked } = target;

  setForm((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultado = libroSchema.safeParse({
      ...form,
      autor: form.autorId,
    });

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

    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: resultado.data.titulo,
          precio: Number(resultado.data.precio),
          autorId: Number(form.autorId),
          disponible: form.disponible,
          imagen: IMG_PLACEHOLDER,
        }),
      });
      navigate('/catalogo');
    } catch (err: any) {
      setErrores({ global: err.message });
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-4">Nuevo Libro</h2>

      {errores.global && <Alert variant="danger">{errores.global}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        {/* Título */}
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

        {/* Autor (Selector dinámico de autores) */}
        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Select
            name="autorId"
            value={form.autorId}
            onChange={handleChange}
            isInvalid={!!errores.autor}
          >
            <option value="">Seleccione un autor...</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errores.autor}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Precio */}
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

        {/* Disponible */}
        <Form.Check
          type="checkbox"
          className="mb-3"
          label="Disponible"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />

        <Button type="submit" variant="primary">
          Agregar libro
        </Button>
      </Form>
    </div>
  );
}