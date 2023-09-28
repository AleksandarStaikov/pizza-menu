import { useEffect, useState } from "react";

const API_KEY = "d9a0d153";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function fetchMoviesData() {
      //   callback?.();
      const abortController = new AbortController();

      async function fetchMoviesDataAsync() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: abortController.signal }
          );

          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          if (data.Error) throw new Error(data.Error);

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name === "AbortError") return;
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMoviesDataAsync();

      return () => {
        abortController.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
