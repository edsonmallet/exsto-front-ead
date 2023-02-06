import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";

interface NewCommentsProps {
  courseId: number;
  lessonId: number;
  refreshComments: () => void;
}

export const NewComments: React.FC<NewCommentsProps> = ({
  courseId,
  lessonId,
  refreshComments,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSettingsStore();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendComment = React.useCallback(async () => {
    const dataSave = {
      title,
      question,
      creator: user?.id,
      course: courseId,
      lesson: lessonId,
    };
    setIsLoading(true);
    try {
      await api.post(
        `/forums`,
        { data: dataSave },
        {
          headers: { Authorization: `Bearer ${(session as any).jwt}` },
        }
      );
      refreshComments();
      setTitle("");
      setQuestion("");
      onClose();
      showToast("success", "Pergunta gravada com sucesso!");
    } catch (error) {
      showToast("error", "Erro ao salvar pergunta, tente novamente!");
    } finally {
      setIsLoading(false);
    }
  }, [
    courseId,
    lessonId,
    onClose,
    question,
    refreshComments,
    session,
    showToast,
    title,
    user?.id,
  ]);

  return (
    <>
      <Flex mb={5}>
        <Button colorScheme={"green"} onClick={onOpen} size="sm">
          Perguntar
        </Button>
      </Flex>

      <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sua Dúvida</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Digite um título para sua dúvida"
              borderColor={"gray.400"}
              backgroundColor="gray.50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={2}
            />
            <Textarea
              placeholder="Digite sua dúvida"
              borderColor={"gray.400"}
              backgroundColor="gray.50"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme={"green"}
              isDisabled={
                !title || !question || question?.length < 10 || isLoading
              }
              onClick={handleSendComment}
              isLoading={isLoading}
              loadingText="Aguarde..."
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
