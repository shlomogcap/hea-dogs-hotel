import { RefObject, useEffect, useState } from 'react';
type IUseOverflowedProps = {
  ref: RefObject<HTMLElement>;
};
export const useOverflowed = ({ ref }: IUseOverflowedProps) => {
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setIsOverflowed(
        element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth,
      );
    }
  }, [ref]);
  return isOverflowed;
};
