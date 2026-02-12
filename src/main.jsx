import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import StarRating from './components/StarRating';
// import './index.css';
// import App from './components/App';

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
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
      defaultRating={3}
    />
    <StarRating
      maxRating={10}
      size={25}
      color='red'
      className='test'
      defaultRating={5}
    />

    <Test />
  </StrictMode>,
);
