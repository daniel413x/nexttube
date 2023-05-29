import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';
import IconSpan from '../common/IconSpan';
import styles from './FilterMenuLink.module.scss';

interface FilterMenuLinkProps {
  searchTerm: string;
  params: string;
  label: string;
  changePage?: (number: number) => void;
}

const FilterMenuLink: FC<FilterMenuLinkProps> = ({
  searchTerm,
  params,
  label,
  changePage,
}) => {
  const active = useRouter().asPath.includes(params) && params;
  const getParams = (param: string) =>
    `/${SEARCH_ROUTE}?${
      searchTerm ? `${'searchTerm='}${searchTerm}${param && '&'}` : ''
    }${param}`;
  return (
    <Link
      className={styles.filterMenuLink}
      onClick={changePage ? () => changePage(1) : undefined}
      shallow={false}
      href={getParams(params)}
    >
      {label}
      <IconSpan
        className={cn(styles.checkIcon, {
          [styles.show]: active,
        })}
        Icon={FaCheck}
      />
    </Link>
  );
};

FilterMenuLink.defaultProps = {
  changePage: undefined,
};

export default FilterMenuLink;
