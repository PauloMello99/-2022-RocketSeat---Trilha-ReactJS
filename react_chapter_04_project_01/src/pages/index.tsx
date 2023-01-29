import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";

interface SignInFormData {
  email: string;
  password: string;
}

const schema: Yup.SchemaOf<SignInFormData> = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .typeError("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .typeError("Senha inválida")
    .required("Senha é obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            label="Email"
            error={formState.errors.email}
            {...register("email")}
          />
          <Input
            label="Password"
            error={formState.errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          mt={8}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
