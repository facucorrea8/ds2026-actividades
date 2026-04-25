interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "978-1", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true, genero: "Fantasía" },
    { isbn: "978-2", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false },
    { isbn: "978-3", titulo: "Ficciones", autor: "Borges", precio: 1800, disponible: true, genero: "Fantasía" }
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, libro) => acc + libro.precio, 0);  //recorre los libros y suma los precios, el cero es el inicializador del contador
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listaUL = document.getElementById("listado") as HTMLUListElement;
    const statsP = document.getElementById("stats") as HTMLParagraphElement;
    
    listaUL.innerHTML = "";  //vacia la lista

    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        listaUL.appendChild(li);
    });

    statsP.textContent = `Mostrando ${libros.length} libros. Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
}

const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;                  // conectan los botones HTML con las funciones
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;
const inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;

btnFiltrar.onclick = () => {
    const resultados = buscarPorAutor(inputAutor.value);
    renderizar(resultados);
};

btnDisponibles.onclick = () => {
    renderizar(librosDisponibles());
};

btnTodos.onclick = () => {
    renderizar(catalogo);
};

renderizar(catalogo);

