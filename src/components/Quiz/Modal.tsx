import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { CaretLeft, CaretRight, Check } from "phosphor-react";
import React from "react";
import { useLessonStore } from "../../stores";
import { QuizQuestion } from "./Question";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModalQuestions: React.FC<QuizProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentLesson } = useLessonStore();

  const [questions, setQuestions] = React.useState<any[]>([]);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    setQuestions(
      currentLesson?.attributes?.quiz?.data?.attributes?.questions?.data
    );
  }, [currentLesson]);

  return (
    <Modal size={"6xl"} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={"flex"}
          flexDirection={"column"}
          bgColor="gray.200"
        >
          <Flex alignItems={"center"} justifyContent="flex-start" gap={5}>
            <CaretRight size={32} weight="bold" />
            <Flex direction={"column"}>
              {currentLesson?.attributes?.quiz?.data?.attributes?.name}
              <small>
                {
                  currentLesson?.attributes?.quiz?.data?.attributes
                    ?.descriptions
                }
              </small>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody my={10}>
          {questions?.length > 0 && (
            <QuizQuestion question={questions[current]?.attributes} />
          )}
        </ModalBody>
        <ModalFooter bgColor={"gray.200"}>
          <Flex w="full" alignItems={"center"} justifyContent="space-between">
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setCurrent((old) => (old === 0 ? old : old - 1));
              }}
              leftIcon={<CaretLeft fontSize={24} weight="bold" />}
              isDisabled={current === 0}
            >
              Anterior
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={true}
              rightIcon={<Check fontSize={24} weight="bold" />}
            >
              {current + 1}/{questions?.length} - FINALIZAR
            </Button>
            <Button
              colorScheme="gray"
              mr={3}
              isDisabled={current === questions.length - 1}
              onClick={() => {
                setCurrent((old) =>
                  old === questions.length - 1 ? old : old + 1
                );
              }}
              rightIcon={<CaretRight fontSize={24} weight="bold" />}
            >
              Próximo
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
