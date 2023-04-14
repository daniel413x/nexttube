import { FC } from 'react';
import { FaSearch } from 'react-icons/fa';
import useSearch from '@hooks/useSearch';
import videoApi from '@store/api/video';
import IconSpan from './IconSpan';
import styles from './Searchbar.module.scss';

const Searchbar: FC = () => {
  const { handleSearch, data, isSuccess, searchTerm } = useSearch({
    api: videoApi.useGetVideosBySearchTermQuery,
  });
  return (
    <div className={styles.searchbar}>
      <label htmlFor="header-searchbar">
        <input
          id="header-searchbar"
          type="text"
          placeholder="Search videos"
          value={searchTerm}
          onChange={handleSearch}
        />
      </label>
      <IconSpan Icon={FaSearch} className={styles['magnifying-glass-icon']} />
      {isSuccess && (
        <div className={styles.result}>
          {data?.length ? (
            data.map((video) => (
              <div>{video.name}</div>
              // <VideoItem isSmall item={video} key={video.id} />
            ))
          ) : (
            <div className="text-white">Videos not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
