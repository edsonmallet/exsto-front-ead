import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CircleWavyCheck } from "phosphor-react";
import React from "react";
import { useLessonStore } from "../../stores";

interface ListModulesProps {
  module: any;
}

export const ListModules: React.FC<ListModulesProps> = ({ module }) => {
  const { setCurrentLesson } = useLessonStore();
  return (
    <Accordion w="full" defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <AccordionButton
          bg="gray.300"
          _expanded={{ bg: "green.500", color: "white" }}
        >
          <Box as="span" flex="1" textAlign="left" fontWeight={"bold"} py={2}>
            {module?.attributes?.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <List>
            {module?.attributes?.lessons?.data?.map((lesson: any) => (
              <ListItem
                key={lesson.id}
                borderBottom="1px solid"
                borderColor={"gray.300"}
                py={2}
                px={2}
                _hover={{ bg: "gray.200" }}
                cursor={"pointer"}
                transition={"all 0.2s ease-in-out"}
                onClick={() => setCurrentLesson(lesson)}
              >
                <Flex direction={"column"} gap={2}>
                  <Flex alignItems={"center"} gap={2}>
                    <CircleWavyCheck
                      fontSize={21}
                      color={"#BDD02F"}
                      weight={false ? "fill" : "bold"}
                    />
                    <Text>{lesson?.attributes?.title}</Text>
                  </Flex>
                  <Flex gap={1}>
                    <Badge colorScheme={"green"}>
                      {lesson?.attributes?.type}
                    </Badge>
                    <Badge colorScheme={"green"}>
                      {lesson?.attributes?.workload}
                    </Badge>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
