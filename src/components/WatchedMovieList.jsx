import WatchedMovie from './WatchedMovie';

function WatchedMovieList({ watched, onRemoveWatchedMovie }) {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
