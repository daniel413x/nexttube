import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import styles from './Loader.module.scss';

const Loader: FC<SkeletonProps> = (props) => (
  <Skeleton
    baseColor="#2d2c35"
    highlightColor="#353340"
    className={styles.loader}
    {...props}
  />
);

export default Loader;
