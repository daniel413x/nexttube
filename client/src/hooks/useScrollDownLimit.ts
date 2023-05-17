import { useEffect, useState } from 'react';

const useScrollDownLimit: (block?: boolean) => boolean = (block) => {
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);
  useEffect(() => {
    const update = () => {
      if (block) {
        return;
      }
      const { pageYOffset, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      const clientYBottom = pageYOffset + innerHeight;
      const limit = scrollHeight;
      if (clientYBottom >= limit - 100) {
        setReachedLimit(true);
      } else {
        setReachedLimit(false);
      }
    };
    window.addEventListener('scroll', update);
    update();
    return () => window.removeEventListener('scroll', update);
  }, [block]);
  return reachedLimit;
};

export default useScrollDownLimit;
