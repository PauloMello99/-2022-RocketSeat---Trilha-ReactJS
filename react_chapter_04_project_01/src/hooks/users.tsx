import { useQuery, UseQueryOptions } from "react-query";

import { User } from "../interfaces/User";

import { api } from "../services/api";

interface UsersProps {
  page?: number;
  pageCount?: number;
}

interface UsersReponse {
  users: User[];
}

interface UsersData {
  users: User[];
  totalCount: number;
}

export async function getUsers({
  page = 1,
  pageCount = 10,
}: UsersProps): Promise<UsersData> {
  const { data, headers } = await api.get<UsersReponse>("/users", {
    params: { page, per_page: pageCount },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { totalCount, users };
}

function useUsers(
  props: UsersProps,
  options: UseQueryOptions<UsersData, Error>
) {
  return useQuery(["users", props.page], () => getUsers(props), options);
}

export default useUsers;
