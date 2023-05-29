import cn from 'classnames';
import { FC } from 'react';
import { RxSlider } from 'react-icons/rx';
import IconSpan from '../common/IconSpan';
import styles from './FilterMenu.module.scss';
import FilterMenuLink from './FilterMenuLink';

interface FilterMenuProps {
  show: boolean;
  searchTerm: string;
  changePage: (number: number) => void;
}

const FilterMenu: FC<FilterMenuProps> = ({ show, searchTerm, changePage }) => (
  <div
    className={cn(styles.filterMenu, {
      [styles.show]: show,
    })}
  >
    <div className={styles.col}>
      <span className={styles.label}>Duration</span>
      <IconSpan Icon={RxSlider} />
      <FilterMenuLink
        changePage={changePage}
        params="max=4"
        label="Under 4 minutes"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="min=4&max=16"
        label="4&#8211;20 minutes"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="min=20"
        label="Over 20 minutes"
        searchTerm={searchTerm}
      />
    </div>
    <div className={styles.col}>
      <span className={styles.label}>Upload date</span>
      <IconSpan Icon={RxSlider} />
      <FilterMenuLink
        changePage={changePage}
        params="range=hour"
        label="Last hour"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="range=day"
        label="Last day"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="range=week"
        label="This week"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="range=month"
        label="This month"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        changePage={changePage}
        params="range=year"
        label="This year"
        searchTerm={searchTerm}
      />
    </div>
    <div className={styles.col}>
      <span className={styles.label}>Sort</span>
      <IconSpan Icon={RxSlider} />
      <FilterMenuLink params="" label="Relevance" searchTerm={searchTerm} />
      <FilterMenuLink
        params="createdAt=desc"
        label="Most recent"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        params="views=desc"
        label="Views"
        searchTerm={searchTerm}
      />
      <FilterMenuLink
        params="likes=desc"
        label="Likes"
        searchTerm={searchTerm}
      />
    </div>
  </div>
);

export default FilterMenu;
