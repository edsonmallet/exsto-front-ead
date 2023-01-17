import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import { IClass } from "../../entities/IClass";
import { formatDate } from "../../utils/formatDate";
import { CardClassStatusAcitve } from "../CardClassStatusActive";

interface Props {
  classProps: IClass;
}

export const CardClassActive = ({ classProps }: Props) => {
  return (
    <VStack w="full" height="fit-content" align="flex-start" spacing="2">
      <Text color={classProps.isPublished ? "green" : "gray.600"}>
        {formatDate(classProps.date)}
      </Text>
      <VStack
        w="full"
        height="fit-content"
        align="flex-start"
        borderRadius={"2"}
        p="4"
        spacing="4"
        bg="green.500"
        color="gray.900"
        cursor={"pointer"}
      >
        <CardClassStatusAcitve />

        <Text fontWeight="bold">{classProps.title}</Text>
      </VStack>
    </VStack>
  );
};
