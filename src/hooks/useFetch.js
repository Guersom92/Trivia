import { useState, useCallback, useEffect } from "react";

const API_URL =
  "https://the-trivia-api.com/api/questions?categories=general_knowledge,arts_and_literature,film_and_tv,history,music,science&limit=10&difficulty=hard";

export function useFetch() {
  const [data, setData] = useState(() => {
    const storedData = window.localStorage.getItem("questions");
    if (storedData) return JSON.parse(storedData);
    return [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (window.localStorage.getItem("questions")) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      if (jsonData && jsonData.length > 0) {
        setData(jsonData);
        window.localStorage.setItem("questions", JSON.stringify(jsonData));
      } else {
        setData([]);
        setError("No se encontraron preguntas.");
      }
    } catch (err) {
      console.error("Error fetching trivia data:", err);
      setError(`Error al cargar las preguntas: ${err.message}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    questions: data,
    loading,
    error,
    fetchQuestions: fetchData,
  };
}
