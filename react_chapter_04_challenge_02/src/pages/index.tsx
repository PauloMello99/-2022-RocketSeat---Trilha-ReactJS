import { Button, Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const body = { params: { after: pageParam } };
      const response = await api.get('/images', body);
      const { data: items, after = null } = response.data;
      return { data: items, pageParam: { after } };
    },
    { getNextPageParam: lastPage => lastPage.pageParam.after || null }
  );

  const formattedData = useMemo(
    () => data?.pages?.flatMap(p => p.data),
    [data]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="8"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            <Text>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Text>
          </Button>
        )}
      </Box>
    </>
  );
}
