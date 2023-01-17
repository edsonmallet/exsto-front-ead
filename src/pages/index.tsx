import { Button, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { Lock } from "phosphor-react";
import { Logo } from "../components/Logo";
import { navigateTo } from "../utils/navigateTo";

export default function Index() {
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
            />
            <Input
              border="1px"
              borderColor="#B3C52D"
              bg="gray.800"
              type="password"
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
            onClick={() => navigateTo("/course")}
            w="full"
            colorScheme="green"
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
