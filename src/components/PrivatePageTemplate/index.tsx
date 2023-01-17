import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  header: ReactNode;
  main: ReactNode;
  sidebar?: ReactNode;
}

export const PrivatePageTemplate = ({ header, main, sidebar }: Props) => {
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
        borderBottomColor={"gray.300"}
      >
        {header}
      </GridItem>
      <Grid templateColumns={{ md: "repeat(1, 1fr 380px)" }}>
        <GridItem
          colSpan={1}
          h="90vh"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "8px",
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
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                borderRadius: "8px",
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
