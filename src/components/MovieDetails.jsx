import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from '../configs';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import StarRating from './StarRating';

function MovieDetails({ selectedMovieID, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
          // console.log(response);
          if (!response.ok)
            throw new Error('Something went wrong with fetching movie details');

          const data = await response.json();
          // console.log(data);
          if (data.Response === 'False') throw new Error(data.Error);

          setMovie(data);
        } catch (err) {
          // console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [selectedMovieID],
  );

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
              <StarRating maxRating={10} size={24} />
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
