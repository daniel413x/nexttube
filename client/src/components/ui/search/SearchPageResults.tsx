import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
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
import LoaderIcon from '../common/LoaderIcon';
import FilterMenu from './FilterMenu';
import Result from './Result';
import styles from './SearchPageResults.module.scss';

const SearchPageResults: FC = () => {
  const { md } = useBreakpoints();
  const router = useRouter();
  const filters = { ...router.query };
  const showResetButton = Object.keys(filters).length > 1;
  delete filters.searchTerm;
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [noResultsTerm, setNoResultsTerm] = useState<string>('');
  const { searchInput } = useVideo();
  const {
    results,
    dbCount,
    changePage,
    page,
    pageLimitReached,
    isLoading,
    isFetching,
  } = useSearch<IVideo>({
    itemsPerPage: 8,
    api: videoApi.useGetVideosBySearchTermQuery,
    input: searchInput,
    concat: true,
    filters: filters as VideoSearchQueryFilters,
  });
  useEffect(() => {
    if (results.length === 0) {
      setNoResultsTerm(searchInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);
  const [interacted, setInteracted] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(false);
  const initialNotification =
    results.length === 0 && !searchInput && !interacted;
  const noResultsNotification =
    !isLoading && interacted && results.length === 0;
  const scrolledToBottom = useScrollDownLimit(
    pageLimitReached || results.length === 0
  );
  useEffect(() => {
    if (scrolledToBottom) {
      changePage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolledToBottom]);
  useEffect(() => {
    if (initialNotification) {
      setInitial(true);
    } else {
      setInteracted(true);
      setInitial(false);
    }
  }, [initialNotification]);
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
              <Button
                className={cn(styles.filtersButton, styles.removeButton)}
                onClick={() =>
                  router.push(
                    `/${SEARCH_ROUTE}${
                      searchInput ? `?searchTerm=${searchInput}` : ''
                    }`
                  )
                }
              >
                <IconSpan Icon={CiCircleRemove} />
                <span className={styles.label}>Reset</span>
              </Button>
            )}
          </div>
          <FilterMenu show={showFilters} searchTerm={searchInput} />
          <span className={styles.videosFound}>Videos found: {dbCount}</span>
        </div>
        <ul className={styles.results}>
          <span
            className={cn(styles.message, {
              [styles.show]: initialNotification || noResultsNotification,
            })}
          >
            {initial
              ? 'No search has been performed yet'
              : `"${noResultsTerm}" yielded no results`}
          </span>
          {results.length
            ? results.map((video) => <Result video={video} md={md} />)
            : null}
        </ul>
        {isFetching && results.length ? (
          <LoaderIcon />
        ) : (
          <Button
            className={styles.moreButton}
            onClick={() => changePage(page + 1)}
            disabled={pageLimitReached || results.length === 0}
          >
            More
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchPageResults;
