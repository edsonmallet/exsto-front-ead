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
  Tooltip,
} from "@chakra-ui/react";
import { CircleWavyCheck } from "phosphor-react";
import React from "react";
import { useLessonStore } from "../../stores";
import { typesLessons } from "../../utils/typesLessons";

interface ListModulesProps {
  modules: any;
}

export const ListModules: React.FC<ListModulesProps> = ({ modules }) => {
  const { setCurrentLesson, currentLesson, completedLessons, quizCompleted } =
    useLessonStore();

  return (
    <Accordion w="full" defaultIndex={[0]} allowMultiple pb={150}>
      {modules?.map((module: any) => (
        <AccordionItem key={module.id} mb={2}>
          <AccordionButton
            bg="gray.200"
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
            <List bgColor={"white"}>
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
                  bg={currentLesson?.id === lesson?.id ? "green.100" : ""}
                >
                  <Flex direction={{ base: "column", lg: "row" }} gap={2}>
                    <Flex alignItems={"center"} gap={2}>
                      <CircleWavyCheck
                        fontSize={21}
                        color={
                          completedLessons
                            .map(
                              (lesson: any) =>
                                lesson?.attributes?.lesson?.data?.id
                            )
                            .includes(lesson?.id)
                            ? "#BDD02F"
                            : "#aaa"
                        }
                        weight={"fill"}
                      />
                      <Text fontSize={"sm"}>{lesson?.attributes?.title}</Text>
                      <Tooltip label={typesLessons(lesson?.attributes?.type)}>
                        <Badge
                          colorScheme={"green"}
                          size="xs"
                          py={1}
                          px={2}
                          borderRadius={16}
                        >
                          {typesLessons(lesson?.attributes?.type)[0]}
                        </Badge>
                      </Tooltip>
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
