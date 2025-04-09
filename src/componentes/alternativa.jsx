function Alternativa({
  alternativa,
  isCorrect,
  isSelected,
  handleAlternativeClick,
}) {
  let conditionalClass = "alternativa";
  if (isCorrect && isSelected) {
    conditionalClass += " correcto";
  } else if (!isCorrect && isSelected) {
    conditionalClass += " incorrecto";
  }

  return (
    <div
      onClick={() => {
        handleAlternativeClick(alternativa);
      }}
      className={conditionalClass}
    >
      {alternativa}
    </div>
  );
}

export default Alternativa;
