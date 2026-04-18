function calcularPrecioFinal(monto, medioPago) {

    let descuento = 0;

    if (monto < 200) {
        descuento = 0;
    } else if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") {
            descuento = 0.30; 
        } else if (medioPago === "D") {
            descuento = 0.20; 
        } else if (medioPago === "C") {
            descuento = 0.10; 
        }
    } else if (monto > 400) {
        descuento = 0.40; 
    }

    const precioFinal = monto * (1 - descuento);
    return precioFinal;
}

const pruebas = [
    { monto: 138, medio: "D" },
    { monto: 333, medio: "C" }, 
    { monto: 288, medio: "E" }, 
    { monto: 459, medio: "C" }, 
    { monto: 672, medio: "E" }  
];

pruebas.forEach(p => {
    const final = calcularPrecioFinal(p.monto, p.medio);
    console.log(`Monto: $${p.monto} | Pago: ${p.medio} | Final: $${final}`);
});