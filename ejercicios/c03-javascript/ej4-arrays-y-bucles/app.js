const numeros = [8,54,67,23,12,99,78,2];

let sumatotal = 0;
let numeromayor=numeros[0];
let numeromenor=numeros[0];
let promedio=0;

for (const num of numeros) {

    sumatotal = sumatotal + num;

    if (num > numeromayor) {
        numeromayor = num;
    }

    if (num < numeromenor) {
        numeromenor = num;
    }
}

promedio = sumatotal / numeros.length;

console.log(`Suma Total: ${sumatotal}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número Mayor: ${numeromayor}`);
console.log(`Número Menor: ${numeromenor}`);

function generarAsteriscos(n) {
    let resultado = "";
    
    for (let i = 0; i < n; i++) {
        resultado = resultado + "*";
    }
    
    return resultado;
}

console.log(generarAsteriscos(5)); 
console.log(generarAsteriscos(8));