import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { CaretCircleDoubleRight, CaretCircleRight } from "phosphor-react";
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
    <Grid
      bgColor={{ base: "#fff" }}
      w="full"
      minH="100vh"
      templateColumns="repeat(1, 1fr)"
      fontFamily="sans-serif"
    >
      <GridItem
        colSpan={2}
        h="10vh"
        borderBottom="1px solid"
        borderBottomColor={"gray.200"}
      >
        {header}
      </GridItem>
      {title && (
        <GridItem colSpan={2} w="full" bgColor={"gray.200"} py={4} px={8}>
          <Flex
            alignItems={"center"}
            justifyContent="flex-start"
            gap={2}
            fontWeight="bold"
          >
            <CaretCircleRight weight="bold" fontSize={20} /> {title}
          </Flex>
        </GridItem>
      )}
      <Grid
        templateColumns={{ md: `repeat(1, 1fr ${!!sidebar ? "380px" : ""})` }}
      >
        <GridItem
          colSpan={1}
          h="90vh"
          overflowY="auto"
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
        </GridItem>
        {sidebar && (
          <GridItem
            colSpan={1}
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
          </GridItem>
        )}
      </Grid>
    </Grid>
  );
};
