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
import { typesLessons } from "../../utils/typesLessons";

interface ListModulesProps {
  modules: any;
}

export const ListModules: React.FC<ListModulesProps> = ({ modules }) => {
  const { setCurrentLesson, currentLesson } = useLessonStore();
  return (
    <Accordion w="full" defaultIndex={[0]} allowMultiple>
      {modules?.map((module: any) => (
        <AccordionItem key={module.id} mb={1}>
          <AccordionButton
            bg="gray.300"
            _expanded={{ bg: "green.500", color: "white" }}
          >
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
              fontSize={"sm"}
            >
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
                  bg={currentLesson?.id === lesson?.id ? "gray.200" : ""}
                >
                  <Flex direction={"column"} gap={2}>
                    <Flex alignItems={"center"} gap={2} p={2}>
                      <CircleWavyCheck
                        fontSize={21}
                        color={false ? "#BDD02F" : "#aaa"}
                        weight={"fill"}
                      />
                      <Text fontSize={"sm"}>{lesson?.attributes?.title}</Text>
                      <Badge colorScheme={"blackAlpha"}>
                        {lesson?.attributes?.workload}
                      </Badge>
                      <Badge colorScheme={"blue"}>
                        {typesLessons(lesson?.attributes?.type)}
                      </Badge>
                    </Flex>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};