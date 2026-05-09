const inputBusqueda = document.getElementById('libro-input');
const botonBuscar = document.getElementById('buscar-btn');
const contenedorResultados = document.getElementById('resultados');
const mensajeError = document.getElementById('error-msg');

botonBuscar.addEventListener('click', async () => {
    const query = inputBusqueda.value.trim();

    if (!query) {
        mensajeError.innerText = "Por favor, ingresá un nombre de libro.";
        mensajeError.style.display = 'block';
        return;
    }

    mensajeError.style.display = 'none';
    contenedorResultados.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div><p>Buscando...</p></div>';

    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        renderizarTarjetas(data.docs.slice(0, 12)); // Mostramos los primeros 12
    } catch (error) {
        mensajeError.innerText = "Error al conectar con la API.";
        mensajeError.style.display = 'block';
        contenedorResultados.innerHTML = '';
    }
});

function renderizarTarjetas(libros) {
    contenedorResultados.innerHTML = '';

    if (libros.length === 0) {
        contenedorResultados.innerHTML = '<p class="text-center w-100">No se encontraron resultados.</p>';
        return;
    }

    libros.forEach(libro => {
        const autor = libro.author_name ? libro.author_name[0] : 'Autor desconocido';
        const imgUrl = libro.cover_i 
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` 
            : 'https://via.placeholder.com/200x300?text=Sin+Portada';

        const col = document.createElement('div');
        col.className = 'col';
        
        // Usamos la estructura de Card de Bootstrap (Paso 3)
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${imgUrl}" class="card-img-top" alt="${libro.title}" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${libro.title}</h5>
                    <p class="card-text text-muted small">${autor}</p>
                    <a href="libro.html" class="btn btn-outline-primary w-100 mt-auto">Ver detalle</a>
                </div>
            </div>
        `;
        contenedorResultados.appendChild(col);
    });
}