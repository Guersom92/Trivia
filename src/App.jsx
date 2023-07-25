import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [pregunta, setPregunta] = useState(null);
  const [numeroDePregunta, setNumeroDePregunta] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [NombreClase, setNombreClase] = useState("answer");
  const [respuestas, setRespuestas] = useState(null);

  const api =
    "https://the-trivia-api.com/api/questions?categories=general_knowledge,arts_and_literature,film_and_tv,history,music,science&limit=10&difficulty=hard";

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setPregunta(data[numeroDePregunta]), console.log(data);
      });
  }, []);

  //UseEffect q cambia la pregunta cuando el numero de pregunta cambia
  // useEffect(()=>{setPregunta(data[numeroDePregunta])},[numeroDePregunta])

  const manejarClick = (a) => {
    // setNumeroDePregunta(numeroDePregunta + 1);
    // setPregunta(data[numeroDePregunta + 1]);
    setRespuestaSeleccionada(a);
    setNombreClase(
      pregunta.correctAnswer == a
        ? "respuesta correcto"
        : "respuesta incorrecto"
    );
  };

  // Use effect que establece las respuestas
  useEffect(() => {
    let respuestas;
    if (pregunta) {
      respuestas = pregunta?.incorrectAnswers;
      respuestas.push(pregunta?.correctAnswer);
      respuestas = barajo(respuestas);
    }
    setRespuestas(respuestas);
  }, [pregunta]);

  /* Creando funcion de Barajo */
  function barajo(array) {
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

  return (
    <main className="app">
      <h1>{pregunta?.question}</h1>
      <div className="respuestas">
        {respuestas?.map((a) => {
          return (
            <div
              className={respuestaSeleccionada == a ? NombreClase : "respuesta"}
              onClick={() => manejarClick(a)}
            >
              {a}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
