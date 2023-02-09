import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

export const Loading: React.FC = () => {
  return (
    <Flex alignItems={"center"} justifyContent="center">
      <Spinner color={"green.500"} size="lg" />
    </Flex>
  );
};
