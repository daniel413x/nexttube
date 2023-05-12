import { ChangeEvent, useEffect, useState } from 'react';
import { ReduxQuery } from '@types';
import useDebounce from './useDebounce';
import usePagination from './usePagination';

interface UseSearchProps {
  concurrentlySetQuery?: boolean;
  itemsPerPage?: number;
  api: ReduxQuery;
}

const useSearch = ({
  itemsPerPage,
  api,
  concurrentlySetQuery,
}: UseSearchProps) => {
  const [dbCount, setDbCount] = useState<number>(0);
  const { page, pageLimitReached, changePage, pageLimit } = usePagination({
    itemsPerPage: itemsPerPage || 10,
    itemsInDb: dbCount,
    concurrentlySetQuery,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const { data, isSuccess } = api(
    {
      searchTerm: debouncedSearch,
      page,
      limit: itemsPerPage,
    },
    {
      skip: !debouncedSearch,
    }
  );
  useEffect(() => {
    if (data) {
      setDbCount(data[1]);
    }
  }, [data]);
  return {
    handleSearch,
    results: data ? data[0] : [],
    isSuccess,
    searchTerm,
    pageLimitReached,
    changePage,
    pageLimit,
  };
};

export default useSearch;
