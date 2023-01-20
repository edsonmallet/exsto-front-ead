import { Button, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";

import { ArrowLeft } from "phosphor-react";
import React from "react";
import { Logo } from "../components/Logo";
import { forgotPassword } from "../services/login";
import { useLoadingStore, useToastStore } from "../stores";
import { navigateTo } from "../utils/navigateTo";

export default function Forgot() {
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await forgotPassword(setLoading, showToast, values);
    if (res?.ok) navigateTo("/login");
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
            textTransform={"uppercase"}
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
          <Text fontWeight="bold" fontSize="lg" w={"full"}>
            Recupere a senha
          </Text>
          <VStack w="full">
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.800"
              placeholder="E-mail"
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />

            <Button
              onClick={() => handleSubmit()}
              type="submit"
              colorScheme="green"
              isDisabled={isLoading || !values.email}
              isLoading={isLoading}
              loadingText="Cadastrando..."
              w="full"
            >
              Recuperar
            </Button>
          </VStack>
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
