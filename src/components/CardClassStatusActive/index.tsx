import { HStack, Icon, Text } from "@chakra-ui/react";
import { LockKeyOpen } from "phosphor-react";

export const CardClassStatusAcitve = () => {
  return (
    <>
      <HStack w="full" bg="transparent" justify="space-between">
        <HStack color="gray.900">
          <Icon as={LockKeyOpen} />
          <Text fontSize="xs">CONTEÚDO LIBERADO</Text>
        </HStack>

        <Text
          fontSize="xs"
          border="1px"
          color="gray.900"
          p="1"
          px="2"
          borderRadius={"2"}
        >
          AULA PRÁTICA
        </Text>
      </HStack>
    </>
  );
};
