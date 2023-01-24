import { Flex } from "@chakra-ui/react";
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
          w="full"
          bgColor={"green.200"}
          alignItems={"center"}
          justifyContent="flex-start"
          gap={2}
          fontWeight="bold"
          py={6}
        >
          <Flex
            w={{ base: "100%", md: "50%" }}
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <CaretCircleRight weight="bold" fontSize={20} /> {title}
          </Flex>
        </Flex>
      )}

      <Flex
        w="full"
        gap={2}
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
            bg="gray.100"
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
