export interface Autor {
  id: number;
  nombre: string;
  nacionalidad?: string;
}

export interface Libro {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  autorId?: number;
  autor: Autor;
}