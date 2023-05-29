/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { ReduxQuery } from '@types';
import useDebounce from './useDebounce';
import usePagination from './usePagination';

interface UseSearchProps {
  api: ReduxQuery;
  concurrentlySetQueryPage?: boolean;
  concat?: boolean;
  filters?: { [key: string]: string | number };
  skip?: boolean;
  itemsPerPage?: number;
}

const useSearch = <T>({
  itemsPerPage,
  api,
  concat,
  filters,
  skip,
  concurrentlySetQueryPage,
}: UseSearchProps) => {
  const router = useRouter();
  const { searchTerm: searchTermParam } = router.query;
  const [results, setResults] = useState<T[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [dbCount, setDbCount] = useState<number>(0);
  const { page, pageLimitReached, changePage, pageLimit } = usePagination({
    itemsPerPage: itemsPerPage || 10,
    itemsInDb: dbCount,
    concurrentlySetQueryPage,
  });
  const [searchTerm, setSearchTerm] = useState<string>(
    (searchTermParam as string) || ''
  );
  const debouncedSearch = useDebounce(searchTerm, 500);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const [queryParams, setQueryParams] = useState<any>({
    searchTerm: searchTermParam || debouncedSearch,
    page,
    limit: itemsPerPage,
  });
  const [queryFilters, setQueryFilters] = useState<any>({
    ...filters,
  });
  useEffect(() => {
    // handle enter key press-predicated searches here, such as on /search
    setSearchTerm(searchTermParam as string);
    changePage(1);
    setQueryParams({ ...queryParams, searchTerm: searchTermParam, page: 1 });
  }, [searchTermParam]);
  useEffect(() => {
    setQueryParams({ ...queryParams, page });
  }, [page]);
  useEffect(() => {
    if (filters) {
      changePage(1);
      setQueryParams({ ...queryParams, page: 1 });
      setQueryFilters({ ...filters });
      // always use the same set of filters passed in through parent component
    }
  }, [filters]);
  useEffect(() => {
    setQueryParams({ ...queryParams, searchTerm: debouncedSearch });
    if (debouncedSearch === '') {
      setShowResults(false);
    }
  }, [debouncedSearch]);
  const [didAttemptFetch, setDidAttemptFetch] = useState<boolean>(false);
  const [syncedIsSuccess, setSyncedIsSuccess] = useState<boolean>(false);
  const [syncedIsFetching, setSyncedIsFetching] = useState<boolean>(false);
  // if we want to pass down an rtk fetch hook and also manage setting results within useSearch, then without these booleans, isSuccess and isFetching will be ahead of results by one execution context, resulting in ui rendering issues
  const { data, isSuccess, isLoading, isFetching } = api(
    {
      ...queryParams,
      ...queryFilters,
    },
    {
      skip: !queryParams.searchTerm || skip,
    }
  );
  useEffect(() => {
    if (isFetching) {
      setSyncedIsFetching(true);
      setDidAttemptFetch(true);
    }
  }, [isFetching]);
  useEffect(() => {
    if (!isSuccess) {
      setSyncedIsSuccess(false);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (data) {
      setDbCount(data[1]);
      if (page > 1 && concat) {
        // scroll loading, user didn't type a new search, no need to reset results
        setResults([...results, ...data[0]]);
      } else {
        // user typed a new search, need to reset results
        setResults(data[0]);
      }
      setSyncedIsSuccess(true);
      setShowResults(true);
    }
    setSyncedIsFetching(false);
  }, [data, concat]);
  return {
    handleSearch,
    results,
    isFetching: syncedIsFetching,
    isSuccess: syncedIsSuccess,
    searchTerm,
    pageLimitReached,
    changePage,
    pageLimit,
    dbCount,
    page,
    isLoading,
    didAttemptFetch,
    showResults,
  };
};

export default useSearch;
