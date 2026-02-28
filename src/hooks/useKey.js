import { useEffect } from 'react';

function useKey(key, callback, condition = true) {
  useEffect(
    function () {
      const handler = function (e) {
        if (e.key.toLowerCase() === key.toLowerCase() && condition) callback();
      };

      document.addEventListener('keydown', handler);

      return function () {
        document.removeEventListener('keydown', handler);
      };
    },
    [callback, key, condition],
  );
}

export default useKey;
