import { SEARCH_ROUTE } from '@data/consts';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IVideo } from '@types';
import useActions from '@hooks/useActions';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import useKeyPress from '@hooks/useKeyPress';
import useSearch from '@hooks/useSearch';
import videoApi from '@store/api/video';
import Button from './Button';
import IconSpan from './IconSpan';
import styles from './Searchbar.module.scss';
import VideoItemSmall from './video-items/VideoItemSmall';

const Searchbar: FC = () => {
  const { setSearchInput } = useActions();
  const router = useRouter();
  const { pathname } = router;
  const { searchTerm: searchTermParam } = router.query;
  const isSearchPage = pathname.slice(1) === SEARCH_ROUTE;
  const { ref, setShow, show } = useHideOnOutsideClick(false);
  const { handleSearch, results, searchTerm, showResults, isSuccess } =
    useSearch<IVideo>({
      itemsPerPage: 6,
      api: videoApi.useGetVideosBySearchTermQuery,
      skip: isSearchPage,
    });
  const searchPage = `/${SEARCH_ROUTE}?searchTerm=${searchTerm}`;
  useEffect(() => {
    if (searchPage) {
      setSearchInput(searchTermParam as string);
    }
  }, [searchTermParam, setSearchInput, searchPage]);
  const input = searchTerm;
  const showWrapper = !isSearchPage && showResults;
  const handleInputClick = () => {
    if (showWrapper && !show) {
      setShow(true);
    }
  };
  const handleResultClick = () => {
    setShow(false);
  };
  useEffect(() => {
    if (showWrapper) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [showWrapper, setShow]);
  const enterPress = useKeyPress('Enter');
  useEffect(() => {
    if (
      document.activeElement === document.getElementById('header-searchbar')
    ) {
      if (!searchTerm) {
        return;
      }
      router.push(searchPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPress]);
  return (
    <div className={styles.searchbar} ref={ref}>
      <label htmlFor="header-searchbar">
        <input
          id="header-searchbar"
          type="text"
          placeholder="Search videos"
          value={input || ''}
          onChange={handleSearch}
          onClick={handleInputClick}
        />
      </label>
      <IconSpan Icon={FaSearch} className={styles.magnifyingGlassIcon} />
      <div
        className={cn(styles.results, styles.resultsWrapper, {
          [styles.hide]: !show,
        })}
        ref={ref}
      >
        <ul className={styles.results}>
          {results.map((video) => (
            <li className={styles.result} key={video.name}>
              <Button onClick={handleResultClick} overlay tabIndex={-1}>
                <VideoItemSmall
                  transition
                  isSmall
                  video={video}
                  key={video.id}
                />
              </Button>
            </li>
          ))}
          {results.length === 0 && isSuccess && (
            <div className={styles.videosNotFound}>
              <span>&#129335; Videos not found</span>
            </div>
          )}
        </ul>
        {results.length > 0 && (
          <Link className={styles.moreResultsLink} href={searchPage}>
            <IconSpan Icon={FaSearch} />
            Expanded search
          </Link>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
