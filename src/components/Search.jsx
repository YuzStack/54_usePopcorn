import { useEffect, useRef } from 'react';

function Search({ query, onSetQuery }) {
  const inputRef = useRef(null);

  useEffect(
    function () {
      const callback = function (e) {
        if (e.key === 'Enter' && inputRef.current !== document.activeElement) {
          onSetQuery('');
          inputRef.current.focus();
        }
      };

      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [onSetQuery],
  );

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      autoFocus
      onChange={e => onSetQuery(e.target.value)}
      ref={inputRef}
    />
  );
}

export default Search;
