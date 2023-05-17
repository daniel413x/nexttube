import { useCallback, useEffect, useState } from 'react';
import { getMaxPage } from '@utils';

interface UsePaginationProps {
  itemsPerPage: number;
  itemsInDb: number;
  concurrentlySetQueryPage?: boolean;
}

interface UsePaginationReturn {
  page: number;
  pageLimit: number;
  pageLimitReached: boolean;
  changePage: (number: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePagination = ({
  itemsPerPage,
  itemsInDb,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const [pageLimitReached, setPageLimitReached] = useState<boolean>(true);
  const changePage = useCallback(
    (number: number) => {
      const newPage = number > pageLimit || number < 1 ? pageLimit : number;
      setPage(newPage);
    },
    [pageLimit]
  );
  const nextPage = () => changePage(page + 1);
  const prevPage = () => changePage(page - 1);
  useEffect(() => {
    const newPageLimit = getMaxPage(itemsInDb, itemsPerPage);
    setPageLimit(newPageLimit || 1);
    if (newPageLimit > 0 && page > newPageLimit) {
      changePage(newPageLimit);
    }
  }, [itemsInDb, itemsPerPage, page, changePage]);
  useEffect(() => {
    if (page === pageLimit) {
      setPageLimitReached(true);
    } else {
      setPageLimitReached(false);
    }
  }, [page, pageLimit]);
  return {
    page,
    pageLimit,
    pageLimitReached,
    changePage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
