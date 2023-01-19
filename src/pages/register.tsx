import { useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft } from "phosphor-react";
import React from "react";
import { Logo } from "../components/Logo";
import { MUTATION_REGISTER } from "../graphql/mutations/register";
import { navigateTo } from "../utils/navigateTo";

export default function Register() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
  });

  const [createUser] = useMutation(MUTATION_REGISTER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      variables: {
        input: {
          username: values.username,
          password: values.password,
          email: values.email,
        },
      },
    });
  };

  return (
    <VStack
      w="full"
      bgGradient="linear(to-b, gray.900, gray.700)"
      backgroundImage={"url(/homebg.webp)"}
      backgroundRepeat="no-repeat"
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      color="gray.50"
      minH="100vh"
      spacing="0"
      pt={32}
    >
      <HStack w="full" maxW="container.lg" minH="50vh" spacing="16">
        <VStack w="full" align="flex-start" spacing="8">
          <Logo />
          <Text
            fontSize="5xl"
            fontWeight="bold"
            lineHeight={1.15}
            textTransform="uppercase"
          >
            Comece agora sua jornada 4.0.
          </Text>
          <Text fontSize="2xl" fontWeight={"hairline"}>
            Aprenda tudo sobre a plataforma didática revolucionaria SMART 4.0 e
            suas tecnologias.
          </Text>
          <Image src="/smart40.svg" alt="Smart 4.0" width={300} />
        </VStack>

        <VStack
          w="full"
          maxW="450px"
          bgColor="#ffffff20"
          borderRadius="lg"
          p={12}
          spacing={8}
          align="flex-end"
        >
          <Text fontWeight="bold" fontSize="lg">
            Preencha os dados e prepare-se para alavancar sua carreira
          </Text>
          <form onSubmit={(e) => handleSubmit(e)}>
            <VStack w="full">
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Nome"
                type="text"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="Whatsapp"
                type="text"
                name="whatsapp"
                onChange={(e) => handleChange(e)}
              />
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                placeholder="E-mail"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Input
                border="1px"
                borderColor="#B3C52D"
                bg="gray.800"
                type="password"
                placeholder="Senha"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <Checkbox colorScheme="green" defaultChecked size="md">
                <Text fontSize={"small"} fontWeight="hairline">
                  Ao informar seus dados a seguir para a próxima etapa. Você
                  automaticamente con- corda com nossa Política de privacidade.
                </Text>
              </Checkbox>
            </VStack>
            <Button w="full" type="submit" colorScheme="green">
              Cadastrar
            </Button>
          </form>
          <Button
            onClick={() => navigateTo("/")}
            colorScheme="green"
            variant={"link"}
            w="full"
            leftIcon={<ArrowLeft />}
            size="sm"
          >
            Voltar para login
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
}
