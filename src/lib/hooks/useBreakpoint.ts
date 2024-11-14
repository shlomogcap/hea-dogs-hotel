import { useState, useEffect } from 'react';

export const useBreakpoint = (breakpoint: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(breakpoint);

    const handleResize = () => {
      setMatches(mq.matches);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return matches;
};
