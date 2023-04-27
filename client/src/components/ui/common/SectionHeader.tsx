import { FC } from 'react';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => (
  <div className={styles.sectionHeader}>
    <h2>{title}</h2>
  </div>
);

export default SectionHeader;
