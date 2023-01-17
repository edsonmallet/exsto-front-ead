import { HStack, Icon, Text } from "@chakra-ui/react";
import { HiOutlineLockOpen } from "react-icons/hi";

export const CardClassPublished = () => {
  return (
    <>
      <HStack w="full" justify="space-between">
        <HStack color="green">
          <Icon as={HiOutlineLockOpen} />

          <Text fontSize="xs">CONTEÚDO LIBERADO</Text>
        </HStack>

        <Text
          fontSize="xs"
          border="1px"
          color="green"
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
