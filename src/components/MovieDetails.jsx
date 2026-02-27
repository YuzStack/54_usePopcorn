import { useEffect, useRef, useState } from 'react';
import { API_KEY, BASE_URL } from '../configs';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import StarRating from './StarRating';

function MovieDetails({
  selectedMovieID,
  onCloseMovie,
  onAddWatchedMovie,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating],
  );

  const isWatched = watchedMovies.some(
    movie => movie.imdbID === selectedMovieID,
  );

  const watchedMovieUserRating = watchedMovies.find(
    movie => movie.imdbID === selectedMovieID,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError('');

          const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${selectedMovieID}`,
          );
          if (!response.ok)
            throw new Error('Something went wrong with fetching movie details');

          const data = await response.json();
          if (data.Response === 'False') throw new Error(data.Error);

          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [selectedMovieID],
  );

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = 'usePopcorn 🍿';
      };
    },
    [title],
  );

  useEffect(
    function () {
      const callback = function (e) {
        if (e.key === 'Escape') onCloseMovie();
      };

      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [onCloseMovie],
  );

  const handleAddMovie = function () {
    const newWatchedMovieObj = {
      imdbID: selectedMovieID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatchedMovie(newWatchedMovieObj);
    onCloseMovie();
  };

  return (
    <div className='details'>
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <header>
            <button onClick={onCloseMovie} className='btn-back'>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                ⭐️<span>{imdbRating}</span> IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {isWatched ? (
                <p>You rated this movie {watchedMovieUserRating} ⭐️</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAddMovie} className='btn-add'>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}

      {error && <ErrorMessage message={error} />}

      {/* NOTE: Only one of the conditions above will ever be true at any point in time. */}
    </div>
  );
}

export default MovieDetails;
