import "./App.css";
import Alternativa from "./componentes/alternativa";
import Spinner from "./componentes/spinner";
import Modal from "./componentes/modal";
import Header from "./componentes/header";
import { useFetch } from "./hooks/useFetch";
import { useQuiz } from "./hooks/UseQuiz";

function App() {
  const { questions, loading, error, fetchQuestions } = useFetch();
  const {
    currentIndex,
    currentQuestion,
    correctAnswer,
    score,
    selectedAlternative,
    shuffledAlternatives,
    showModal,

    handleAlternativeClick,
    resetQuiz,
    totalQuestions,
  } = useQuiz(questions);

  const handleReset = async () => {
    resetQuiz(); // Resetea el estado interno del quiz
    await fetchQuestions(); // Vuelve a cargar nuevas preguntas
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>¡Oops! Algo salió mal.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="cuestionario">
      <Modal
        mostrarModal={showModal}
        puntaje={score}
        resetear={handleReset}
        totalPreguntas={totalQuestions}
      />

      <Header
        handleReset={handleReset}
        indiceActual={currentIndex}
        totalPreguntas={totalQuestions}
        preguntaTexto={currentQuestion.question}
      />

      <div className="alternativas">
        {shuffledAlternatives.map((alternative, i) => (
          <Alternativa
            key={i}
            alternativa={alternative}
            handleAlternativeClick={handleAlternativeClick}
            isSelected={selectedAlternative === alternative}
            isCorrect={alternative === correctAnswer}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
