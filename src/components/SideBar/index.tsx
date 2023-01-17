import { Divider, Text, VStack } from "@chakra-ui/react";
import { IClass } from "../../entities/IClass";
import { CardClass } from "../CardClass";
import { CardClassActive } from "../CardClassActive";
import { CardClassContainer } from "../CardClassContainer";

const classes: IClass[] = [
  {
    id: 1,
    date: new Date(),
    isPublished: true,
    type: "AULA PRÁTICA",
    title: "Aula 01 - Titulo aula ignite labs",
    slug: "aula01",
  },
  {
    id: 2,
    date: new Date(),
    isPublished: true,
    type: "LIVE",
    title: "Aula 02 - Titulo aula ignite labs",
    slug: "aula02",
  },
  {
    id: 3,
    date: new Date(),
    isPublished: false,
    type: "AULA PRÁTICA",
    title: "Aula 03 - Titulo aula ignite labs",
    slug: "aula03",
  },

  {
    id: 4,
    date: new Date(),
    isPublished: false,
    type: "AULA PRÁTICA",
    title: "Aula 03 - Titulo aula ignite labs",
    slug: "aula03",
  },

  {
    id: 5,
    date: new Date(),
    isPublished: false,
    type: "AULA PRÁTICA",
    title: "Aula 03 - Titulo aula ignite labs",
    slug: "aula03",
  },

  {
    id: 6,
    date: new Date(),
    isPublished: false,
    type: "AULA PRÁTICA",
    title: "Aula 03 - Titulo aula ignite labs",
    slug: "aula03",
  },
];

export const SideBar = () => {
  return (
    <VStack w="full" h="full" py="8" px="4" align="flex-start" spacing="8">
      <Text fontWeight="bold" fontSize="lg">
        Aulas
      </Text>

      <VStack w="full" spacing="8" pb={16}>
        {classes?.map((classProps) => (
          <CardClassContainer key={classProps.id} classProps={classProps} />
        ))}
      </VStack>
    </VStack>
  );
};
