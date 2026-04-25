const catalogo = [
    { isbn: "AUTO-123", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true },
    { isbn: "AUTO-456", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false }
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo); //refresca la lista
}
function eliminarLibro(isbn) {
    const indice = catalogo.findIndex(l => l.isbn === isbn); //busca el indice del libro por el isbn
    if (indice !== -1) {
        catalogo.splice(indice, 1); //splice elimina un elemento de una lista
        renderizar(catalogo);
    }
}
function validarFormulario() {
    const inputTitulo = document.getElementById("nuevoTitulo");
    const inputAutor = document.getElementById("nuevoAutor");
    const inputPrecio = document.getElementById("nuevoPrecio");
    const divError = document.getElementById("errorForm");
    divError.textContent = ""; //limpia el ereor anterior
    if (inputTitulo.value === "" || inputAutor.value === "" || Number(inputPrecio.value) <= 0) { //verifica que todos los campos este completados
        divError.textContent = "Error: Todos los campos son obligatorios y el precio debe ser > 0";
        return null;
    }
    return {
        isbn: "AUTO-" + Date.now(), // genera ID unico
        titulo: inputTitulo.value,
        autor: inputAutor.value,
        precio: Number(inputPrecio.value),
        disponible: true
    };
}
function renderizar(libros) {
    const listaUL = document.getElementById("listado");
    listaUL.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${libro.titulo} - ${libro.autor} ($${libro.precio}) 
            <button class="btn-borrar" data-isbn="${libro.isbn}">Eliminar</button>
        `;
        listaUL.appendChild(li);
    });
    const botonesBorrar = document.querySelectorAll(".btn-borrar");
    botonesBorrar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const target = e.target;
            const isbn = target.getAttribute("data-isbn");
            if (isbn)
                eliminarLibro(isbn);
        });
    });
}
const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.onclick = () => {
    const nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        document.getElementById("nuevoTitulo").value = "";
        document.getElementById("nuevoAutor").value = "";
        document.getElementById("nuevoPrecio").value = "";
    }
};
renderizar(catalogo);
export {};
