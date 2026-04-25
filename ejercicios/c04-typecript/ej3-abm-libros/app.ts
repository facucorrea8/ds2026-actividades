interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "AUTO-123", titulo: "El Aleph", autor: "Borges", precio: 1500, disponible: true },
    { isbn: "AUTO-456", titulo: "Rayuela", autor: "Cortázar", precio: 2200, disponible: false }
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);  //refresca la lista
}

function eliminarLibro(isbn: string): void {
    const indice = catalogo.findIndex(l => l.isbn === isbn); //busca el indice del libro por el isbn
    if (indice !== -1) {
        catalogo.splice(indice, 1); //splice elimina un elemento de una lista
        renderizar(catalogo);
    }
}

function validarFormulario(): Libro | null {
    const inputTitulo = document.getElementById("nuevoTitulo") as HTMLInputElement;
    const inputAutor = document.getElementById("nuevoAutor") as HTMLInputElement;
    const inputPrecio = document.getElementById("nuevoPrecio") as HTMLInputElement;
    const divError = document.getElementById("errorForm") as HTMLDivElement;

    divError.textContent = "";     //limpia el ereor anterior

    if (inputTitulo.value === "" || inputAutor.value === "" || Number(inputPrecio.value) <= 0) {   //verifica que todos los campos este completados
        divError.textContent = "Error: Todos los campos son obligatorios y el precio debe ser > 0";
        return null;
    }

    return {                                        // carga los datos en el libro
        isbn: "AUTO-" + Date.now(),                // genera ID unico
        titulo: inputTitulo.value,
        autor: inputAutor.value,
        precio: Number(inputPrecio.value),
        disponible: true
    };
}

function renderizar(libros: Libro[]): void {
    const listaUL = document.getElementById("listado") as HTMLUListElement;
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
            const target = e.target as HTMLButtonElement;
            const isbn = target.getAttribute("data-isbn");
            if (isbn) eliminarLibro(isbn);
        });
    });
}

const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement;
btnAgregar.onclick = () => {
    const nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        (document.getElementById("nuevoTitulo") as HTMLInputElement).value = "";
        (document.getElementById("nuevoAutor") as HTMLInputElement).value = "";
        (document.getElementById("nuevoPrecio") as HTMLInputElement).value = "";
    }
};

renderizar(catalogo);

export {};