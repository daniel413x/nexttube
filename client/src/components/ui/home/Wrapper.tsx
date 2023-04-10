import { FC } from 'react';
import styles from './Wrapper.module.scss';
import Catalog from './Catalog';
import Discover from './Discover';

const Wrapper: FC = () => (
  <div className={styles.wrapper}>
    <Discover />
    <Catalog />
  </div>
);

export default Wrapper;
