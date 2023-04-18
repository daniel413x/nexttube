import { FC, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import useSearch from '@hooks/useSearch';
import videoApi from '@store/api/video';
import Button from './Button';
import IconSpan from './IconSpan';
import styles from './Searchbar.module.scss';
import VideoItemSmall from './video-items/VideoItemSmall';

const Searchbar: FC = () => {
  const { ref, setShow, show } = useHideOnOutsideClick(false);
  const {
    handleSearch,
    data: results,
    isSuccess,
    searchTerm,
  } = useSearch({
    api: videoApi.useGetVideosBySearchTermQuery,
  });
  const handleInputClick = () => {
    if (results?.length && !show) {
      setShow(true);
    }
  };
  const handleResultClick = () => {
    setShow(false);
  };
  useEffect(() => {
    if (results?.length) {
      setShow(true);
    }
  }, [results?.length, setShow]);
  return (
    <div className={styles.searchbar}>
      <label htmlFor="header-searchbar">
        <input
          id="header-searchbar"
          type="text"
          placeholder="Search videos"
          value={searchTerm}
          onChange={handleSearch}
          onClick={handleInputClick}
        />
      </label>
      <IconSpan Icon={FaSearch} className={styles.magnifyingGlassIcon} />
      {isSuccess && (
        <ul className={`${styles.results} ${!show && styles.hide}`} ref={ref}>
          {results?.length ? (
            results.map((video) => (
              <li className={styles.result} key={video.name}>
                <Button onClick={handleResultClick} overlay>
                  <VideoItemSmall isSmall video={video} key={video.id} />
                </Button>
              </li>
            ))
          ) : (
            <div className="text-white">Videos not found</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
