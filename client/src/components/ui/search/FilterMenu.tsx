import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { RxSlider } from 'react-icons/rx';
import IconSpan from '../common/IconSpan';
import styles from './FilterMenu.module.scss';

interface FilterMenuProps {
  show: boolean;
  searchTerm: string;
}

const FilterMenu: FC<FilterMenuProps> = ({ show, searchTerm }) => (
  <div
    className={cn(styles.filterMenu, {
      [styles.show]: show,
    })}
  >
    <div className={styles.col}>
      <span className={styles.label}>Duration</span>
      <IconSpan Icon={RxSlider} />
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&max=4`}>
        Under 4 minutes
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&min=4&max=16`}>
        4 &#8211; 20 minutes
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&min=20`}>
        Over 20 minutes
      </Link>
    </div>
    <div className={styles.col}>
      <span className={styles.label}>Upload date</span>
      <IconSpan Icon={RxSlider} />
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&range=hour`}>
        Last hour
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&range=day`}>
        Last day
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&range=week`}>
        This week
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&range=month`}>
        This month
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&range=year`}>
        This year
      </Link>
    </div>
    <div className={styles.col}>
      <span className={styles.label}>Sort</span>
      <IconSpan Icon={RxSlider} />
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}`}>Relevance</Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&createdAt=desc`}>
        Most recent
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&views=desc`}>
        Views
      </Link>
      <Link href={`/${SEARCH_ROUTE}?searchTerm=${searchTerm}&likes=desc`}>
        Likes
      </Link>
    </div>
  </div>
);

export default FilterMenu;
