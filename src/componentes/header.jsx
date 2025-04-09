export default function Header({
  indiceActual,
  totalPreguntas,
  preguntaTexto,
  handleReset,
}) {
  return (
    <header>
      <button onClick={handleReset}>Play Again</button>
      <div>
        <span>Question </span>
        <span translate="no">
          {indiceActual + 1}/{totalPreguntas}
        </span>
      </div>

      <progress value={indiceActual + 1} max={10} />
      <h1>{preguntaTexto}</h1>
    </header>
  );
}
