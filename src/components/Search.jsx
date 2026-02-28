import { useRef } from 'react';
import useKey from '../hooks/useKey';

function Search({ query, onSetQuery }) {
  const inputRef = useRef(null);

  useKey(
    'Enter',
    function () {
      onSetQuery('');
      inputRef.current.focus();
    },
    /* eslint-disable */
    inputRef.current !== document.activeElement,
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
