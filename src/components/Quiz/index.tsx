import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Question } from "phosphor-react";
import React from "react";
import { useLessonStore } from "../../stores";
import { QuizModalQuestions } from "./Modal";

export const Quiz: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentLesson } = useLessonStore();

  return (
    <>
      {currentLesson?.attributes?.quiz?.data && (
        <>
          <QuizModalQuestions isOpen={isOpen} onClose={onClose} />
          <Flex w="full" justifyContent={"flex-start"}>
            <Button
              colorScheme={"blue"}
              onClick={onOpen}
              size="sm"
              leftIcon={<Question fontSize={24} weight="bold" />}
            >
              Fazer Teste
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
