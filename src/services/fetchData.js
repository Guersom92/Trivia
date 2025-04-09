export const fetchData = async () => {
  const api =
    "https://the-trivia-api.com/api/questions?categories=general_knowledge,arts_and_literature,film_and_tv,history,music,science&limit=10&difficulty=hard";
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
};
