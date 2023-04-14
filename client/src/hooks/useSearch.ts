import { ChangeEvent, useState } from 'react';
import { ReduxQuery } from '@types';
import useDebounce from './useDebounce';

interface UseSearchProps {
  limit?: number;
  api: ReduxQuery; // eg import videoApi from '@store/api/video'; api: videoApi.useGetVideosBySearchTermQuery
}

const useSearch = ({ limit, api }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const { data, isSuccess } = api(debouncedSearch, {
    skip: !debouncedSearch,
    selectFromResult: ({ data: resultsData, ...rest }) => ({
      data: resultsData?.slice(0, limit),
      ...rest,
    }),
  });
  return {
    handleSearch,
    data,
    isSuccess,
    searchTerm,
  };
};

export default useSearch;
