import { Flex, Heading } from "@chakra-ui/react";
import { CaretCircleRight } from "phosphor-react";
import { ReactNode } from "react";

interface Props {
  header: ReactNode;
  main: ReactNode;
  sidebar?: ReactNode;
  title?: ReactNode;
}

export const PrivatePageTemplate = ({
  header,
  main,
  sidebar,
  title,
}: Props) => {
  return (
    <Flex
      direction="column"
      bgColor={{ base: "#fff" }}
      w="full"
      minH="100vh"
      fontFamily="Open-Sans, sans-serif"
    >
      <Flex
        w="full"
        h="100px"
        borderBottom="1px solid"
        borderBottomColor={"gray.300"}
        boxShadow="lg"
        zIndex={10}
      >
        {header}
      </Flex>
      {title && (
        <Flex
          alignItems="center"
          justifyContent="center"
          gap={2}
          direction={"column"}
          py={8}
          w="full"
          bg="green.100"
        >
          <Heading as="h2" fontSize={"1.3rem"}>
            {title}
          </Heading>
        </Flex>
      )}

      <Flex
        w="full"
        direction={{ base: "column", md: "row" }}
        alignItems="stretch"
        justifyContent="center"
      >
        <Flex
          flex={sidebar ? 3 : 1}
          h="90vh"
          overflowY="auto"
          direction={"column"}
          alignItems="center"
          justifyContent="flex-start"
          w="full"
          pb={200}
          bg="gray.50"
          css={{
            "&::-webkit-scrollbar": {
              background: "#BDD02F30",
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#BDD02F30",
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#BDD02F",
              borderRadius: "8px",
            },
          }}
        >
          {main}
        </Flex>
        {sidebar && (
          <Flex
            flex={1}
            h="90vh"
            bg="gray.50"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                background: "#BDD02F30",
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#BDD02F30",
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#BDD02F",
                borderRadius: "8px",
              },
            }}
          >
            {sidebar}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
