import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface BookCardProps {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
}

export default function BookCard({ titulo, autor, precio, imagen }: BookCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imagen} 
        alt={titulo} 
        style={{ height: '280px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-5 fw-bold">{titulo}</Card.Title>
          <Card.Text className="text-muted mb-2">{autor}</Card.Text>
          <Card.Text className="fw-bold text-dark fs-5">${precio}</Card.Text>
        </div>
        
        <div className="mt-3 d-flex flex-column gap-2">
          <Button href="libro.html" variant="outline-primary" className="w-100">
            Ver más
          </Button>

          <Button 
            variant={liked ? "danger" : "outline-danger"} 
            onClick={() => setLiked(!liked)}
            className="w-100"
          >
            {liked ? '❤️ Quitar' : '🤍 Me gusta'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}