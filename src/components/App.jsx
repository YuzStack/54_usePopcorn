import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import Box from './Box';
import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';
import MovieDetails from './MovieDetails';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useMovies from '../useMovies';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  const [watched, setWatched] = useState(function () {
    const storedWatched = localStorage.getItem('watched');
    return storedWatched ? JSON.parse(storedWatched) : [];
  });

  const { movies, isLoading, error } = useMovies(query);

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched],
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
    setWatched(curWatched => [...curWatched, movieObj]);
  };

  const handleRemoveWatchedMovie = function (movieID) {
    setWatched(curWatched =>
      curWatched.filter(movie => movie.imdbID !== movieID),
    );
  };

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </Header>

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
              <WatchedMovieList
                watched={watched}
                onRemoveWatchedMovie={handleRemoveWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
