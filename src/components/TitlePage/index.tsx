import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface TitlePageProps {
  title: string;
}

export const TitlePage: React.FC<TitlePageProps> = ({
  title,
}: TitlePageProps) => {
  return (
    <Flex my={10}>
      <Heading>{title}</Heading>
    </Flex>
  );
};
