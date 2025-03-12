import React, { useState, useEffect } from "react";
import Alternativa from "./alternativa";

function Cuestionario() {
  const [data, setData] = useState([]);
  const [indice, setIndice] = useState(0);
  const [alternativaSeleccionada, setAlternativaSeleccionada] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [alternarivasBarajeadas, setAlternativasBarajeadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const api =
    "https://the-trivia-api.com/api/questions?categories=general_knowledge,arts_and_literature,film_and_tv,history,music,science&limit=10&difficulty=hard";

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

  // Funcion de reseteo

  async function resetear() {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
      setMostrarModal(false);
      setPuntaje(0);
      setIndice(0);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  }

  //Trayendo preguntas del API
  const fetchPreguntas = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  // funcion para cambiar de pregunta
  function siguientePregunta(respuesta) {
    if (animando || alternativaSeleccionada !== null) return;

    setAlternativaSeleccionada(respuesta);
    setAnimando(true);
    if (respuesta === respuestaCorrecta) {
      setPuntaje((puntajePrevio) => puntajePrevio + 1);
    }

    // Demora para visualización del efecto
    setTimeout(() => {
      setAlternativaSeleccionada(null);
      setAnimando(false);

      if (indice < data.length - 1) {
        setIndice(indice + 1);
      } else {
        console.log("¡Has terminado todas las preguntas!");
        setMostrarModal(true);
      }
    }, 1500);
  }

  // Barajear alternativas
  useEffect(() => {
    if (data.length > 0) {
      const actual = data[indice];
      const todasAlternativas = [
        actual.correctAnswer,
        ...actual.incorrectAnswers,
      ];
      setAlternativasBarajeadas(barajo(todasAlternativas));
    }
  }, [data, indice]);

  // Mensaje de carga
  if (data.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  let preguntaActual = data[indice];
  let respuestaCorrecta = preguntaActual.correctAnswer;

  return (
    <main className="cuestionario">
      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>¡Fin del Juego!</h2>
            <p>Tu puntuación final: {puntaje + "/10"}</p>
            <button onClick={resetear}>Jugar de Nuevo</button>
          </div>
        </div>
      )}

      <span>Pregunta {indice + 1} / 10</span>
      <progress value={indice + 1} max={10} />
      <h1>{preguntaActual.question}</h1>
      <div className="alternativas">
        {alternarivasBarajeadas.map((alternativa, i) => {
          let clase = "alternativa";
          if (alternativaSeleccionada === alternativa) {
            if (alternativa === respuestaCorrecta) {
              clase += " correcto"; // Clase para respuesta correcta
            } else if (alternativa != respuestaCorrecta) {
              clase += " incorrecto"; // Clase para respuesta incorrecta
            }
          }
          return (
            <Alternativa
              className={clase}
              alternativa={alternativa}
              key={i}
              respuestaCorrecta={respuestaCorrecta}
              siguientePregunta={siguientePregunta}
            />
          );
        })}
      </div>
    </main>
  ); // Ejecutar acción si la variable NO es null
  // Código a ejecutar
}

export default Cuestionario;
