import { Button, HStack } from "@chakra-ui/react";
import { navigateTo } from "../../utils/navigateTo";
import { Logo } from "../Logo";

export const Header = () => {
  return (
    <HStack w="full" height="full" px="8" justify="space-between" bg="gray.800">
      <Logo />
      <Button
        borderRadius="0"
        colorScheme="cyan"
        onClick={() => navigateTo("/")}
      >
        Sair
      </Button>
    </HStack>
  );
};
