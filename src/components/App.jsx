import { useState } from 'react';
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

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
