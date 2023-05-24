import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { ReduxQuery } from '@types';
import useDebounce from './useDebounce';
import usePagination from './usePagination';

interface UseSearchProps {
  concurrentlySetQueryPage?: boolean;
  itemsPerPage?: number;
  api: ReduxQuery;
  input?: string; // used on /search
  concat?: boolean;
  filters?: { [key: string]: string | number };
  skip?: boolean;
}

const useSearch = <T>({
  itemsPerPage,
  api,
  concurrentlySetQueryPage,
  input,
  concat,
  filters,
  skip,
}: UseSearchProps) => {
  const router = useRouter();
  const { searchTerm: searchTermParam } = router.query;
  const [results, setResults] = useState<T[]>([]);
  const [dbCount, setDbCount] = useState<number>(0);
  const [pageChanged, setPageChanged] = useState<boolean>(false);
  const [inputChanged, setInputChanged] = useState<boolean>(false);
  const { page, pageLimitReached, changePage, pageLimit } = usePagination({
    itemsPerPage: itemsPerPage || 10,
    itemsInDb: dbCount,
    concurrentlySetQueryPage,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const usedInput = input || searchTerm;
  const debouncedSearch = useDebounce(usedInput, 500, () => {
    if (inputChanged) {
      changePage(1);
      // prevent double fetching after new input if page was > 1
    }
  });
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // used if no input prop
    setSearchTerm(e.target.value);
  };
  const { data, isSuccess, isLoading, isFetching } = api(
    {
      searchTerm: debouncedSearch || searchTermParam,
      page,
      limit: itemsPerPage,
      ...filters,
    },
    {
      skip: (!searchTermParam && !debouncedSearch) || skip,
    }
  );
  useEffect(() => {
    if (page !== 1) {
      // must except page 1 or concat won't work on search with a new input
      setPageChanged(true);
      // helps determine whether to overwrite/set new results or concat to the current list
    }
  }, [page]);
  useEffect(() => setInputChanged(true), [input]);
  useEffect(() => {
    if (page === 1 && inputChanged) {
      setInputChanged(false);
      // unblock fetching after new input
    }
  }, [inputChanged, page]);
  useEffect(() => {
    if (data) {
      setDbCount(data[1]);
      if (pageChanged && concat) {
        // user didn't type a new search, no need to reset results
        setResults([...results, ...data[0]]);
        setPageChanged(false);
      } else {
        setResults(data[0]);
        // user typed a new search, need to reset results
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, concat]);
  return {
    handleSearch,
    results,
    isSuccess,
    searchTerm,
    pageLimitReached,
    changePage,
    pageLimit,
    dbCount,
    page,
    isLoading,
    isFetching,
  };
};

export default useSearch;
