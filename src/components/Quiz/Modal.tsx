import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CaretLeft, CaretRight, Check, CheckCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import {
  useLessonStore,
  useLoadingStore,
  useQuizStore,
  useToastStore,
} from "../../stores";
import { QuizQuestion } from "./Question";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModalQuestions: React.FC<QuizProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { currentLesson } = useLessonStore();
  const { data: session } = useSession();
  const { showToast } = useToastStore();
  const { setLoading, isLoading } = useLoadingStore();
  const { setResponses, responses, user, quiz } = useQuizStore();

  const [finalized, setFinalized] = React.useState(false);

  const [questions, setQuestions] = React.useState<any[]>([]);
  const [current, setCurrent] = React.useState(0);

  const _getResultQuiz = React.useCallback(
    (responses: any[]) => {
      const total = questions.reduce(
        (acc, curr) => acc + curr?.attributes?.points,
        0
      );

      const corrects = responses
        .filter(
          (r) =>
            r?.answerSelected ===
            r?.attributes?.answers.find((a: any) => a.isCorrect === true)?.id
        )
        .reduce((acc, curr) => acc + curr?.attributes?.points, 0);

      return `${corrects}/${total}`;
    },
    [questions]
  );

  const handleFinishQuiz = React.useCallback(async () => {
    setLoading(true);
    try {
      const dataSave = {
        finished_at: new Date(),
        user: user,
        quiz: quiz,
        final_note: _getResultQuiz(responses),
        results: responses,
      };
      await api.post(
        `/quiz-responses`,
        { data: dataSave },
        {
          headers: { Authorization: `Bearer ${(session as any).jwt}` },
        }
      );
      showToast("success", "Respostas gravadas com sucesso!");
      setFinalized(true);
    } catch (error: any) {
      showToast("error", "Erro ao gravar respostas, tente novamente!");
    } finally {
      setLoading(false);
    }
  }, [_getResultQuiz, quiz, responses, session, setLoading, showToast, user]);

  React.useEffect(() => {
    setQuestions(
      currentLesson?.attributes?.quiz?.data?.attributes?.questions?.data
    );
  }, [currentLesson]);

  React.useEffect(() => {
    setResponses([]);
    setFinalized(false);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    router.reload();
  };

  return (
    <Modal size={"6xl"} isCentered isOpen={isOpen} onClose={handleClose}>
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
          {finalized && (
            <Flex w="full" alignItems={"center"} justifyContent="center">
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent="center"
                py={10}
                px={6}
              >
                <CheckCircle fontSize={150} weight="fill" color={"green"} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                  Você terminou o quiz!
                </Heading>
                <Text color={"gray.500"}>
                  <Heading as="h3" size={"lg"}>
                    Resultado: {_getResultQuiz(responses)}
                  </Heading>
                </Text>
              </Flex>
            </Flex>
          )}

          {!finalized && questions?.length > 0 && (
            <QuizQuestion question={questions[current]} />
          )}
        </ModalBody>
        <ModalFooter bgColor={"gray.200"}>
          {!finalized && (
            <Flex w="full" alignItems={"center"} justifyContent="space-between">
              <Button
                colorScheme="twitter"
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
                colorScheme="green"
                size={"lg"}
                isDisabled={responses.length !== questions.length || isLoading}
                isLoading={isLoading}
                loadingText="Finalizando Quiz..."
                rightIcon={<Check fontSize={24} weight="bold" />}
                onClick={() => handleFinishQuiz()}
              >
                {responses?.length}/{questions?.length} - FINALIZAR
              </Button>
              <Button
                colorScheme="twitter"
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
          )}
          {finalized && (
            <Button colorScheme="green" size={"lg"} onClick={handleClose}>
              Fechar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
