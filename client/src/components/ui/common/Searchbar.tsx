import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IVideo } from '@types';
import useActions from '@hooks/useActions';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import useKeyPress from '@hooks/useKeyPress';
import useSearch from '@hooks/useSearch';
import useVideo from '@hooks/useVideo';
import videoApi from '@store/api/video';
import Button from './Button';
import IconSpan from './IconSpan';
import styles from './Searchbar.module.scss';
import VideoItemSmall from './video-items/VideoItemSmall';

const Searchbar: FC = () => {
  const { searchInput } = useVideo();
  const { setSearchInput } = useActions();
  const router = useRouter();
  const { pathname } = router;
  const { searchTerm: searchTermParam } = router.query;
  useEffect(() => {
    setSearchInput(searchTermParam as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTermParam]);
  const isSearchPage = pathname.slice(1) === SEARCH_ROUTE;
  const { ref, setShow, show } = useHideOnOutsideClick(true);
  const {
    handleSearch: useSearchHandleSearch,
    results,
    isSuccess,
    searchTerm,
  } = useSearch<IVideo>({
    itemsPerPage: 6,
    api: videoApi.useGetVideosBySearchTermQuery,
    skip: isSearchPage,
  });
  const searchPage = `/${SEARCH_ROUTE}?searchTerm=${searchTerm}`;
  const inputValue = isSearchPage ? searchInput : searchTerm;
  const handleSearch = isSearchPage
    ? (e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)
    : useSearchHandleSearch;
  const handleInputClick = () => {
    if (results?.length && !show) {
      setShow(true);
    }
  };
  const handleResultClick = () => {
    setShow(false);
  };
  useEffect(() => {
    if (results?.length && !isSearchPage) {
      setShow(true);
    }
  }, [results, setShow, isSearchPage]);
  const enterPress = useKeyPress('Enter');
  useEffect(() => {
    if (
      document.activeElement === document.getElementById('header-searchbar')
    ) {
      router.push(searchPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPress]);
  return (
    <div className={styles.searchbar}>
      <label htmlFor="header-searchbar">
        <input
          ref={ref}
          id="header-searchbar"
          type="text"
          placeholder="Search videos"
          value={inputValue}
          onChange={handleSearch}
          onClick={handleInputClick}
        />
      </label>
      <IconSpan Icon={FaSearch} className={styles.magnifyingGlassIcon} />
      {!isSearchPage && isSuccess && (
        <div
          className={cn(styles.results, styles.resultsWrapper, {
            [styles.hide]: !show,
          })}
          ref={ref}
        >
          <ul className={styles.results}>
            {results?.length ? (
              results.map((video) => (
                <li className={styles.result} key={video.name}>
                  <Button onClick={handleResultClick} overlay tabIndex={-1}>
                    <VideoItemSmall isSmall video={video} key={video.id} />
                  </Button>
                </li>
              ))
            ) : (
              <div className="text-white">Videos not found</div>
            )}
          </ul>
          {results.length > 0 && (
            <Link className={styles.moreResultsLink} href={searchPage}>
              <IconSpan Icon={FaSearch} />
              Expanded search
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
