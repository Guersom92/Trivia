export default function Modal({ mostrarModal, puntaje, resetear }) {
  if (mostrarModal)
    return (
      <div className="modal visible">
        <div className="modal-contenido">
          <h2>¡End of the game!</h2>
          <p>Your final score: {puntaje + "/10"}</p>
          <button onClick={resetear}>Play Again</button>
        </div>
      </div>
    );

  return null;
}
