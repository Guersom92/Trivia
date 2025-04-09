import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { barajo } from "../logica/barajo"; // Asegúrate que la ruta es correcta

const TIMEOUT_DELAY = 1500;
const CONFETTI_THRESHOLD = 6;

export function useQuiz(questions = []) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = window.localStorage.getItem("currentIndex");
    if (storedIndex) return JSON.parse(storedIndex);
    return 0;
  });
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [shuffledAlternatives, setShuffledAlternatives] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(() => {
    const storedScore = window.localStorage.getItem("currentScore");
    if (storedScore) return JSON.parse(storedScore);
    return 0;
  });
  const [isAnswered, setIsAnswered] = useState(false);

  // Efecto para barajar cuando cambian las preguntas o el índice
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      const allAlternatives = [
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers,
      ];
      setShuffledAlternatives(barajo(allAlternatives));
      setSelectedAlternative(null);
      setIsAnswered(false);
      // Guardar el índice actual y el puntaje en localStorage
      window.localStorage.setItem("currentScore", score);
      window.localStorage.setItem("currentIndex", currentIndex);
    }
  }, [questions, currentIndex]);

  const handleAlternativeClick = useCallback(
    (alternative) => {
      if (isAnswered) return; // Evitar clicks después de responder

      setIsAnswered(true);
      setSelectedAlternative(alternative);

      const correctAnswer = questions[currentIndex]?.correctAnswer;
      let currentScore = score;

      if (alternative === correctAnswer) {
        setScore((prevScore) => {
          currentScore = prevScore + 1;
          return currentScore;
        });
      }

      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentIndex(nextIndex);
        } else {
          // Fin del cuestionario
          setShowModal(true);
          if (currentScore >= CONFETTI_THRESHOLD) {
            confetti();
          }
        }
      }, TIMEOUT_DELAY);
    },
    [currentIndex, questions, score, isAnswered]
  );

  const resetQuiz = useCallback(() => {
    setShowModal(false);
    setScore(0);
    setCurrentIndex(0);
    setSelectedAlternative(null);
    setIsAnswered(false);
    window.localStorage.removeItem("questions");
    window.localStorage.removeItem("currentIndex");
    window.localStorage.removeItem("currentScore");
  }, []);

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion?.correctAnswer;

  return {
    currentIndex,
    currentQuestion,
    correctAnswer,
    score,
    selectedAlternative,
    shuffledAlternatives,
    showModal,

    handleAlternativeClick,
    resetQuiz,
    totalQuestions: questions.length,
  };
}
