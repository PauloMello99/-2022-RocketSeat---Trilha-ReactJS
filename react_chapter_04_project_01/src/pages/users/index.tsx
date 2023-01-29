import { useState } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/SideBar";

import useUsers, { getUsers } from "../../hooks/users";
import { queryClient } from "../../services/query";
import { api } from "../../services/api";
import { User } from "../../interfaces/User";

interface UserListProps {
  users: User[];
  totalCount: number;
}

export default function UserList({ users, totalCount }: UserListProps) {
  const [page, setPage] = useState(1);
  const isWide = useBreakpointValue({ base: false, lg: true });

  const { data, error, isLoading, isFetching } = useUsers(
    { page },
    { initialData: { totalCount, users } }
  );

  const handlePrefetchUser = async (id: string) =>
    queryClient.prefetchQuery(["user", id], async () => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Novo usuário
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWide && <Th>Data de Cadastro</Th>}
                    {isWide && <Th width="8" />}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td px={["4", "4", "6"]}>
                        <Box>
                          <Link
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWide && (
                        <Td px={["4", "4", "6"]}>{user.created_at}</Td>
                      )}
                      {isWide && (
                        <Td px={["4", "4", "6"]}>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                totalCountOfRegisters={data.totalCount}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<
  UserListProps
> = async () => {
  try {
    const { users, totalCount } = await getUsers({ page: 1, pageCount: 10 });
    return { props: { users, totalCount } };
  } catch (error) {
    return { props: { users: [], totalCount: 0 } };
  }
};
