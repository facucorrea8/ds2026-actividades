const prod = document.getElementById('text');
const bt = document.getElementById('boton');
const list = document.getElementById('lista');
const cont = document.getElementById('contador');

const actualizarContador = () => {
    const total = list.children.length;
    cont.textContent = `${total} productos en la lista`;
};

bt.addEventListener('click', () => {
    const nombreProducto = prod.value.trim(); // trim se fija que no haya espacios en blanco al principio o al final y los elimima si hay 
    if (nombreProducto === "") {
        alert("Por favor, escribe un nombre de producto.");
        return;
    }

    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = nombreProducto + " ";

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = "Eliminar";

    botonEliminar.onclick = function() {
        nuevoItem.remove(); 
        actualizarContador(); 
    };

    nuevoItem.appendChild(botonEliminar);
    lista.appendChild(nuevoItem);

    prod.value = "";
    prod.focus();
    actualizarContador();

});