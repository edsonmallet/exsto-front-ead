import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft } from "phosphor-react";
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
      <VStack align="center" spacing="8">
        <Logo />
        <Text fontSize="5xl" fontWeight="bold" lineHeight={1.15}>
          Sua jornada 4.0 chegou ao fim!
        </Text>
        <Text fontSize="2xl" fontWeight={"hairline"}>
          Esperamos que sua experiência conosco, tenha sido boa!
        </Text>
        <Image src="/smart40.svg" alt="Smart 4.0" width={300} />

        <Button
          variant={"link"}
          colorScheme="green"
          onClick={() => navigateTo("/")}
          leftIcon={<ArrowLeft />}
        >
          Voltar para a Home
        </Button>
      </VStack>
    </VStack>
  );
}
