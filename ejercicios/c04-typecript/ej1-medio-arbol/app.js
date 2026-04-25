const num = document.getElementById('num');
const boton = document.getElementById('boton');
const resultado = document.getElementById('resultado');
boton.addEventListener('click', () => {
    // Al ser HTMLInputElement, TS sabe que tiene la propiedad .value
    const nume = parseInt(num.value);
    if (isNaN(nume) || nume <= 0) {
        alert("Por favor, ingresa un número válido mayor a 0");
        return;
    }
    let arbol = "";
    for (let i = 1; i <= nume; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    resultado.textContent = arbol;
});
export {};
