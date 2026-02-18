import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import StarRating from './components/StarRating';
import './index.css';
import App from './components/App';

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color='blue' maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
