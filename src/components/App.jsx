import { useEffect, useState } from 'react';
// import { tempMovieData, tempWatchedData } from '../data-templates';
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
import MovieDetails from './MovieDetails';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function App() {
  const [query, setQuery] = useState('Avengers');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${query}`,
          );
          // console.log(response);
          if (!response.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await response.json();

          if (data.Response === 'False') throw new Error(data.Error);
          // console.log(data);

          setMovies(data.Search);
        } catch (err) {
          // console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (!query.trim() || query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();
    },
    [query],
  );

  const handleSelectMovie = function (movieID) {
    setSelectedMovieID(curSelectedMovieID =>
      curSelectedMovieID === movieID ? null : movieID,
    );
  };

  const handleCloseMovie = function () {
    setSelectedMovieID(null);
  };

  const handleAddWatchedMovie = function (movieObj) {
    // const movieIsAlreadyAdded = watched?.some(
    //   movie => movie.imdbID === movieObj.imdbID,
    // );
    // if (movieIsAlreadyAdded) return;

    setWatched(curWatched => [...curWatched, movieObj]);
  };

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}

          {/* NOTE: Only one of the conditions above will ever be true at any point in time. */}
        </Box>

        <Box>
          {selectedMovieID ? (
            <MovieDetails
              selectedMovieID={selectedMovieID}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
