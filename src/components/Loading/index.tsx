import { Flex } from "@chakra-ui/react";
import { Spinner } from "phosphor-react";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <Flex w="full" alignItems={"center"} justifyContent="center" minH={"300px"}>
      <Spinner color={"green.500"} size="xl" />
    </Flex>
  );
};
