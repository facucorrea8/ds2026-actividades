interface LibroOL {
    title: string;
    author_name?: string[]; 
    first_publish_year?: number;
}

interface OpenLibraryResponse {
    docs: LibroOL[];
}

const inputBusqueda = document.getElementById('libro-input') as HTMLInputElement;
const botonBuscar = document.getElementById('buscar-btn') as HTMLButtonElement;
const contenedorResultados = document.getElementById('resultados') as HTMLDivElement;
const mensajeError = document.getElementById('error-msg') as HTMLParagraphElement;

botonBuscar.addEventListener('click', async () => {
    const query = inputBusqueda.value.trim();

    if (!query) {
        mensajeError.innerText = "Por favor, ingresa un nombre de libro.";
        mensajeError.style.display = 'block';
        return;
    }

    mensajeError.style.display = 'none';
    contenedorResultados.innerHTML = "Buscando...";

    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data: OpenLibraryResponse = await response.json();

        renderizarTarjetas(data.docs.slice(0, 10));
    } catch (error) {
        mensajeError.innerText = "Error al conectar con la API.";
        mensajeError.style.display = 'block';
    }
});

function renderizarTarjetas(libros: LibroOL[]) {
    contenedorResultados.innerHTML = '';

    if (libros.length === 0) {
        contenedorResultados.innerHTML = 'No se encontraron resultados.';
        return;
    }

    libros.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'libro-card';
        
        const autor = libro.author_name ? libro.author_name[0] : 'Autor desconocido';
        const año = libro.first_publish_year ? libro.first_publish_year : 'Año no disponible';

        card.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año:</strong> ${año}</p>
        `;
        contenedorResultados.appendChild(card);
    });
}