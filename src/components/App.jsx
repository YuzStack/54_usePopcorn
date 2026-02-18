import { useEffect, useState } from 'react';
import { tempMovieData, tempWatchedData } from '../data-templates';
import Nav from './Nav';
import Main from './Main';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import Box from './Box';
import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';
import { API_KEY, BASE_URL } from '../configs';

function App() {
  const [query, setQuery] = useState('dafadfa');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&s=${query}`,
        );
        console.log(response);
        if (!response.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await response.json();

        if (data.Response === 'False') throw new Error(data.Error);
        console.log(data);

        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        <Box>
          {/* Using Ternary Operator */}
          {/* {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )} */}

          {/* Using Short-Circuiting */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}

          {/* NOTE: Only one of the above conditions will ever be true at any point in time. */}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>⛔️</span> {message}
    </p>
  );
}

export default App;
