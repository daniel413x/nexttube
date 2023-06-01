import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { BsSliders } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';
import SectionHeader from '@components/ui/common/SectionHeader';
import { IVideo, VideoSearchQueryFilters } from '@types';
import useBreakpoints from '@hooks/useBreakpoints';
import useScrollDownLimit from '@hooks/useScrollDownLimit';
import useSearch from '@hooks/useSearch';
import useVideo from '@hooks/useVideo';
import videoApi from '@store/api/video';
import Button from '../common/Button';
import IconSpan from '../common/IconSpan';
import LoaderBarIcon from '../common/LoaderBarIcon';
import FilterMenu from './FilterMenu';
import Result from './Result';
import styles from './SearchPageResults.module.scss';

const SearchPageResults: FC = () => {
  const { md } = useBreakpoints();
  const router = useRouter();
  const { asPath, pathname } = router;
  const filters = useMemo(() => {
    const { searchTerm: x, ...rest } = router.query;
    return rest;
  }, [router.query]);
  const showResetButton = Object.keys(filters).length > 0;
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [noResultsTerm, setNoResultsTerm] = useState<string>('');
  const { searchInput } = useVideo();
  const {
    results,
    dbCount,
    changePage,
    page,
    pageLimitReached,
    isFetching,
    didAttemptFetch,
  } = useSearch<IVideo>({
    itemsPerPage: 8,
    api: videoApi.useGetVideosBySearchTermQuery,
    concat: true,
    filters: filters as VideoSearchQueryFilters,
  });
  useEffect(() => {
    if (results.length === 0) {
      setNoResultsTerm(searchInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);
  const [noSearchMessage, setNoSearchMessage] = useState<boolean>(false);
  const [noResultsNotification, setNoResultsNotification] =
    useState<boolean>(false);
  useEffect(() => {
    if (!isFetching && didAttemptFetch && results.length === 0) {
      setNoResultsNotification(true);
    } else {
      setNoResultsNotification(false);
    }
  }, [isFetching, didAttemptFetch, results.length]);
  useEffect(() => {
    const noSearch = asPath === pathname;
    if (noSearch) {
      setNoSearchMessage(true);
    } else {
      setNoSearchMessage(false);
    }
  }, [asPath, pathname]);
  let notificationMessage = 'No search has been performed yet';
  if (Object.keys(filters).length > 0) {
    notificationMessage = 'Your query yielded no results';
  } else if (noResultsTerm) {
    notificationMessage = `"${noResultsTerm}" yielded no results`;
  }
  const scrolledToBottom = useScrollDownLimit(
    pageLimitReached || results.length === 0
  );
  useEffect(() => {
    if (scrolledToBottom) {
      changePage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolledToBottom]);
  return (
    <div className={styles.searchPageResults}>
      <div className={styles.resultsWrapper}>
        <SectionHeader title="Search results" />
        <div className={styles.topRow}>
          <div className={styles.filtersButtons}>
            <Button
              className={styles.filtersButton}
              disabled={results.length === 0 && !showFilters}
              onClick={() => setShowFilters(!showFilters)}
            >
              <IconSpan Icon={BsSliders} />
              Advanced
            </Button>
            {showResetButton && (
              <Link
                className={cn(styles.filtersButton, styles.removeButton)}
                href={`/${SEARCH_ROUTE}${
                  searchInput ? `?searchTerm=${searchInput}` : ''
                }`}
                onClick={() => {
                  changePage(1);
                }}
                shallow
              >
                <IconSpan Icon={CiCircleRemove} />
                <span className={styles.label}>Reset</span>
              </Link>
            )}
          </div>
          <FilterMenu
            show={showFilters}
            searchTerm={searchInput}
            changePage={changePage}
          />
          <span className={styles.videosFound}>Videos found: {dbCount}</span>
        </div>
        <div className={styles.messageWrapper}>
          <span
            className={cn(styles.message, {
              // [styles.show]: noSearchMessage || noResultsNotification,
              [styles.show]: noSearchMessage || noResultsNotification,
            })}
          >
            {notificationMessage}
          </span>
          <ul className={styles.results}>
            {results.length
              ? results.map((video) => (
                  <Result key={video.id} video={video} md={md} />
                ))
              : null}
          </ul>
        </div>
        {isFetching && results.length ? (
          <div className={styles.loader}>
            <LoaderBarIcon />
          </div>
        ) : (
          <Button
            className={styles.moreButton}
            onClick={() => changePage(page + 1)}
            disabled={isFetching || pageLimitReached || results.length === 0}
          >
            More
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchPageResults;
