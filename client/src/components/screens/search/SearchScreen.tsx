import { useRouter } from 'next/router';
import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import SearchPageResults from '@components/ui/search/SearchPageResults';

const SearchScreen: FC = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  return (
    <MainLayout title={(searchTerm as string) || 'Search'}>
      <SearchPageResults />
    </MainLayout>
  );
};

export default SearchScreen;
