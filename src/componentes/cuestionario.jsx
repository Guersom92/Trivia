import React, { useState, useEffect } from "react";
import Alternativa from "./alternativa";
import confetti from "canvas-confetti";
import Spinner from "./spinner";
import Modal from "./modal";
import { barajo } from "../logica/barajo";
import Progreso from "./progreso";

function Cuestionario() {
  const [data, setData] = useState([]);
  const [indice, setIndice] = useState(0);
  const [alternativaSeleccionada, setAlternativaSeleccionada] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [alternarivasBarajeadas, setAlternativasBarajeadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [cargando, setCargando] = useState(true);

  const api =
    "https://the-trivia-api.com/api/questions?categories=general_knowledge,arts_and_literature,film_and_tv,history,music,science&limit=10&difficulty=hard";

  // Funcion de reseteo

  async function resetear() {
    setCargando(true);
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
      setMostrarModal(false);
      setPuntaje(0);
      setIndice(0);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    } finally {
      setCargando(false);
    }
  }

  //Trayendo preguntas del API
  async function fetchPreguntas() {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    } finally {
      setCargando(false);
    }
  }

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
        setMostrarModal(true);
        if (puntaje >= 6) confetti();
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
  if (cargando) {
    return <Spinner />;
  }
  //Por si no se recibe nada del API
  if (data.length === 0) {
    return <h2>No questions found</h2>;
  }

  let preguntaActual = data[indice];
  let respuestaCorrecta = preguntaActual.correctAnswer;

  return (
    <main className="cuestionario">
      <Modal
        mostrarModal={mostrarModal}
        puntaje={puntaje}
        resetear={resetear}
      />

      <Progreso indice={indice} preguntaActual={preguntaActual} />

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
