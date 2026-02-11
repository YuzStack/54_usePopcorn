import { useState } from 'react';
import { tempMovieData, tempWatchedData } from '../data-templates';
import Nav from './Nav';
import Main from './Main';
import SearchResults from './SearchResults';
import WatchedMovies from './WatchedMovies';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Nav query={query} onSetQuery={setQuery} movies={movies} />

      <Main>
        <SearchResults movies={movies} />
        <WatchedMovies watched={watched} />
      </Main>
    </>
  );
}

export default App;
