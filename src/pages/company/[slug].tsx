import {
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { ArrowLeft } from "phosphor-react";
import React from "react";
import { Logo } from "../../components/Logo";
import { register } from "../../services/login";
import { useLoadingStore, useToastStore } from "../../stores";
import { navigateTo } from "../../utils/navigateTo";
import InputMask from "react-input-mask";
import { GetServerSideProps } from "next";
import api from "../../services/api";

export default function RegisterByCompany({ data }: any) {
  console.log(data);
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    email: "",
    whatsapp: "",
    document: "",
    terms: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await register(setLoading, showToast, values);
    if (token) {
      Cookies.set("Exsto_token", token);
      navigateTo("/home");
    }
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
            <VStack w="full" gap={2}>
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
                placeholder="E-mail"
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Input
                as={InputMask}
                mask="(99) 9 9999-9999"
                maskChar={null}
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
                type="password"
                placeholder="Senha"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <Checkbox
                colorScheme="green"
                defaultChecked={values.terms}
                size="lg"
                name="terms"
                onChange={(e) => handleChange(e)}
              >
                <Text fontSize={"small"} fontWeight="hairline">
                  Ao informar seus dados a seguir para a próxima etapa. Você
                  automaticamente con- corda com nossa Política de privacidade.
                </Text>
              </Checkbox>
            </VStack>
            <Button
              mt={4}
              w="full"
              type="submit"
              colorScheme="green"
              isLoading={isLoading}
              loadingText="Cadastrando..."
            >
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

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async (context) => {
  let endpoint = "/companies";
  endpoint += `?filters[slug][$eq]=${context.params?.slug}`;
  endpoint += `&populate[0]=logo`;

  const courses = await api.get(endpoint);

  return {
    props: {
      data: courses.data.data,
    },
  };
};
