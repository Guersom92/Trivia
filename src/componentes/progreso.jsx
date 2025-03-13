export default function Progreso({ indice, preguntaActual }) {
  return (
    <div className="contenedor-progreso">
      <div>
        <span>Question</span>
        <span translate="no"> {indice + 1}/10</span>
      </div>

      <progress value={indice + 1} max={10} />
      <h1>{preguntaActual.question}</h1>
    </div>
  );
}
