const catalogo = [
    { isbn: "978-1", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true, genero: "Fantasía" },
    { isbn: "978-2", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false },
    { isbn: "978-3", titulo: "Ficciones", autor: "Borges", precio: 1800, disponible: true, genero: "Fantasía" }
];
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((acc, libro) => acc + libro.precio, 0); //recorre los libros y suma los precios, el cero es el inicializador del contador
    return total / libros.length;
}
function renderizar(libros) {
    const listaUL = document.getElementById("listado");
    const statsP = document.getElementById("stats");
    listaUL.innerHTML = ""; //vacia la lista
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        listaUL.appendChild(li);
    });
    statsP.textContent = `Mostrando ${libros.length} libros. Precio promedio: $${precioPromedio(libros).toFixed(2)}`;
}
const btnFiltrar = document.getElementById("filtrar"); // conectan los botones HTML con las funciones
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
const inputAutor = document.getElementById("filtroAutor");
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
export {};
