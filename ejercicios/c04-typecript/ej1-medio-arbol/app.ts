const num = document.getElementById('num') as HTMLInputElement;
const boton = document.getElementById('boton') as HTMLButtonElement;
const resultado = document.getElementById('resultado') as HTMLElement;

boton.addEventListener('click', () => {
    // Al ser HTMLInputElement, TS sabe que tiene la propiedad .value
    const nume: number = parseInt(num.value);

    if (isNaN(nume) || nume <= 0) {
        alert("Por favor, ingresa un número válido mayor a 0");
        return;
    }

    let arbol: string = "";
    for (let i: number = 1; i <= nume; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
});
export {};