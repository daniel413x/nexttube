import { RefObject, useEffect, useState } from 'react';

const useTrackDimensions: (refOrId?: RefObject<any>) => {
  height: number | undefined;
  width: number | undefined;
} = (refOrId) => {
  const [height, setHeight] = useState<number | undefined>(window.innerHeight);
  const [width, setWidth] = useState<number | undefined>(window.innerWidth);
  useEffect(() => {
    const update = () => {
      let returnedHeight;
      let returnedWidth;
      if (refOrId) {
        if (!(refOrId as any).current) {
          return;
        }
        const ref = refOrId as any;
        returnedHeight = ref?.current.clientHeight || 0;
        returnedWidth = ref?.current.clientWidth || 0;
      } else {
        returnedHeight = window.innerHeight || 0;
        returnedWidth = window.innerWidth || 0;
      }
      setHeight(returnedHeight);
      setWidth(returnedWidth);
    };
    window.addEventListener('resize', update);
    update();
    return () => window.removeEventListener('resize', update);
  }, [window.innerHeight, window.innerWidth, refOrId?.current?.clientHeight]);
  return { height, width };
};

export default useTrackDimensions;
