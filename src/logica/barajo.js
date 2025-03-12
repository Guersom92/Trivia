  /* Creando funcion de Barajo */
export function barajo(array) {
    let arrayBarajeado = [];
    let indicesUsados = [];

    let i = 0;
    while (i < array.length) {
      let numeroRandom = Math.floor(Math.random() * array.length);

      if (!indicesUsados.includes(numeroRandom)) {
        arrayBarajeado.push(array[numeroRandom]);
        indicesUsados.push(numeroRandom);
        i++;
      }
    }
    return arrayBarajeado;
  }