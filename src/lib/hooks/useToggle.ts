import { useState } from 'react';

export const useToggle = (initState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initState);

  const toggle = () => setState((current) => !current);

  return [state, toggle];
};
