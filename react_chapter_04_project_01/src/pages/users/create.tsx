import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/query";
import { useRouter } from "next/router";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const schema: Yup.SchemaOf<CreateUserFormData> = Yup.object().shape({
  name: Yup.string().typeError("Nome inválido").required("Nome é obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .typeError("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .typeError("Senha inválida")
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirmação da senha deve ser exatamente igual a senha"
  ),
});

export default function CreateUser() {
  const router = useRouter();
  const createUser = useMutation(
    async (user: CreateUserFormData) =>
      api.post("users", { user: { ...user, created_at: new Date() } }),
    { onSuccess: () => queryClient.invalidateQueries("users") }
  );

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(schema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values);
    router.push("/users");
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <Stack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome Completo"
                error={formState.errors.name}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                error={formState.errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Senha"
                type="password"
                error={formState.errors.password}
                {...register("password")}
              />
              <Input
                label="Confirme sua senha"
                type="password"
                error={formState.errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              />
            </SimpleGrid>
          </Stack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
