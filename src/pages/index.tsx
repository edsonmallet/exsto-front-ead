import { Button, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import { navigateTo } from "../utils/navigateTo";

const index = () => {
  return (
    <VStack
      w="full"
      bgGradient="linear(to-b, gray.900, gray.700)"
      color="gray.50"
      minH="100vh"
      spacing="0"
      pt={32}
    >
      <HStack w="full" maxW="container.lg" minH="50vh" spacing="16">
        <VStack w="full" align="flex-start" spacing="8">
          <Logo />
          <Text fontSize="5xl" fontWeight="bold" lineHeight={1.15}>
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
          bg="gray.900"
          p="12"
          style={{ outline: "1px solid #2D3748" }}
          spacing="4"
          align="flex-start"
        >
          <Text fontWeight="bold" fontSize="lg">
            Acesse
          </Text>
          <Input
            border="1px"
            borderRadius="0"
            borderColor="#B3C52D"
            bg="gray.800"
            placeholder="E-mail"
            type="email"
          />
          <Input
            border="1px"
            borderRadius="0"
            borderColor="#B3C52D"
            bg="gray.800"
            type="password"
            placeholder="Senha"
          />
          <Button
            onClick={() => navigateTo("/course")}
            colorScheme="gray"
            borderRadius="0"
            variant={"link"}
            size="sm"
            w="full"
          >
            Esqueceu a senha?
          </Button>
          <Button
            onClick={() => navigateTo("/course")}
            w="full"
            colorScheme="green"
            borderRadius="0"
          >
            Acessar
          </Button>
          <Button
            onClick={() => navigateTo("/course")}
            w="full"
            colorScheme="green"
            borderRadius="0"
            variant={"outline"}
          >
            Cadastre-se
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default index;
