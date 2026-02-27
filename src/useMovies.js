import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from './configs';

function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal },
          );
          if (!response.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await response.json();
          if (data.Response === 'False') throw new Error(data.Error);

          setMovies(data.Search);
        } catch (err) {
          if (err.name === 'AbortError') return;
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.trim() || query.length < 3) {
        setMovies([]);
        setError('');

        //  handleCloseMovie();
        // callback?.();
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, isLoading, error };
}

export default useMovies;
