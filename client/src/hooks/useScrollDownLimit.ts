import { RefObject, useEffect, useState } from 'react';

const useScrollDownLimit: (
  block?: boolean,
  offset?: number | null,
  ref?: RefObject<any>
) => boolean = (block, offset, ref) => {
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);
  useEffect(() => {
    const update = () => {
      if (block) {
        return;
      }
      const { pageYOffset, innerHeight } = window;
      const { scrollHeight } = ref?.current
        ? ref.current
        : document.documentElement;
      const clientYBottom = ref?.current
        ? ref.current.scrollTop
        : pageYOffset + innerHeight;
      const limit = scrollHeight;
      if (clientYBottom >= limit - (offset || 100)) {
        setReachedLimit(true);
      } else {
        setReachedLimit(false);
      }
    };
    (ref?.current || window).addEventListener('scroll', update);
    update();
    const current = ref?.current;
    return () => (current || window).removeEventListener('scroll', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, offset, ref?.current]);
  return reachedLimit;
};

export default useScrollDownLimit;
