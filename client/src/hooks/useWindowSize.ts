import { useEffect, useState } from 'react';

interface WindowSizeProps {
  width: number;
  height: number;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

const useWindowSize = (): WindowSizeProps => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [xs, setXs] = useState<boolean>(false);
  const [sm, setSm] = useState<boolean>(false);
  const [md, setMd] = useState<boolean>(false);
  const [lg, setLg] = useState<boolean>(false);
  const [xl, setXl] = useState<boolean>(false);
  const [xxl, setXxl] = useState<boolean>(false);
  useEffect(() => {
    const updateSize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setSize({ width, height });
      if (width < 576) {
        setXs(true);
      } else if (width >= 576) {
        setSm(true);
      } else if (width >= 768) {
        setMd(true);
      } else if (width >= 992) {
        setLg(true);
      } else if (width >= 1200) {
        setXl(true);
      } else if (width >= 1400) {
        setXxl(true);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [window.innerWidth, window.innerHeight]);
  return {
    ...size,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};

export default useWindowSize;
