import {
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Lock } from "phosphor-react";
import React from "react";
import { Logo } from "../components/Logo";
import { navigateTo } from "../utils/navigateTo";
import { useLoadingStore, useSettingsStore, useToastStore } from "../stores";
import { signIn } from "next-auth/react";

export default function Index() {
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();
  const [values, setValues] = React.useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  const { setUser } = useSettingsStore();

  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/home",
    });

    console.log(res);

    if (res?.url) {
      navigateTo(res?.url);
    }

    showToast("error", "Usuário ou senha inválidos.");
  };

  const isDisabled = !values.identifier || !values.password;

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
          <Text fontWeight="bold" fontSize="lg" w="full">
            Acesse
          </Text>

          <VStack w="full">
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.800"
              placeholder="E-mail"
              type="email"
              name="identifier"
              onChange={(e) => handleChange(e)}
            />
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.800"
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Senha"
            />
          </VStack>

          <Button
            onClick={() => navigateTo("/forgot")}
            colorScheme="white"
            variant={"link"}
            leftIcon={<Lock />}
          >
            Esqueceu a senha?
          </Button>

          <Button
            onClick={handleSubmit}
            type="submit"
            w="full"
            colorScheme="green"
            isDisabled={isDisabled || isLoading}
            isLoading={isLoading}
            loadingText="Aguarde..."
          >
            Acessar
          </Button>

          <Button
            onClick={() => navigateTo("/register")}
            w="full"
            colorScheme="green"
            variant={"link"}
          >
            Cadastre-se
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
}
