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
      px="8"
    >
      <HStack w="full" maxW="container.lg" minH="50vh" spacing="16">
        <VStack w="full" align="flex-start" spacing="8">
          <Logo />

          <Text fontSize="2xl" fontWeight="bold" lineHeight={1.15}>
            Plataforma de cursos online da{" "}
            <Text as="span" color="cyan.500">
              Exsto
            </Text>
          </Text>
          <Text>
            Tenha acesso aos melhores cursos online de tecnologia da internet.
          </Text>
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
            borderColor="#2D3748"
            bg="gray.800"
            placeholder="E-mail"
            type="email"
          />
          <Input
            border="1px"
            borderRadius="0"
            borderColor="#2D3748"
            bg="gray.800"
            type="password"
            placeholder="Senha"
          />
          <Button
            onClick={() => navigateTo("/course/haushsua")}
            colorScheme="orange"
            borderRadius="0"
            variant={"ghost"}
            size="sm"
            w="full"
          >
            Esqueceu a senha?
          </Button>
          <Button
            onClick={() => navigateTo("/course/haushsua")}
            w="full"
            colorScheme="cyan"
            borderRadius="0"
          >
            Acessar
          </Button>
          <Button
            onClick={() => navigateTo("/course/haushsua")}
            w="full"
            colorScheme="cyan"
            borderRadius="0"
            variant={"outline"}
          >
            Cadastre-se
          </Button>
        </VStack>
      </HStack>
      <Image
        w="full"
        maxW="container.lg"
        src="/hero-bg.svg"
        h="50vh"
        alt="img"
      />
    </VStack>
  );
};

export default index;
