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
        h="10vh"
        borderBottom="1px solid"
        borderBottomColor={"gray.200"}
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
          flex={sidebar ? 2 : 1}
          h="90vh"
          overflowY="auto"
          direction={"column"}
          pb={20}
          css={{
            "&::-webkit-scrollbar": {
              background: "#eee",
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#eee",
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#777",
              borderRadius: "4px",
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
                background: "#eee",
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#eee",
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#777",
                borderRadius: "4px",
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
