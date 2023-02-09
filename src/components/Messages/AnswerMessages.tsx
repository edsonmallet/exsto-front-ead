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
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";

interface AnswerMessagesProps {
  commentId: any;
  answers: any;
  refreshMessages: () => void;
}

export const AnswerMessages: React.FC<AnswerMessagesProps> = ({
  commentId,
  answers,
  refreshMessages,
}) => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSettingsStore();
  const { showToast } = useToastStore();

  const [newAnswer, setNewAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendComment = React.useCallback(async () => {
    const dataSave = {
      answers: [
        ...answers,
        { answer: newAnswer, user: user.id, created: new Date() },
      ],
    };

    try {
      await api.put(
        `/messages/${commentId}`,
        { data: dataSave },
        {
          headers: { Authorization: `Bearer ${(session as any).jwt}` },
        }
      );
      refreshMessages();
      setNewAnswer("");
      onClose();
      showToast("success", "Resposta gravada com sucesso!");
    } catch (error) {
      showToast("error", "Erro ao salvar resposta, tente novamente!");
    }
  }, [
    answers,
    commentId,
    newAnswer,
    onClose,
    refreshMessages,
    session,
    showToast,
    user.id,
  ]);

  return (
    <>
      <Flex mb={5}>
        <Button colorScheme={"blue"} onClick={onOpen} size="sm">
          Responder
        </Button>
      </Flex>

      <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sua Resposta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Digite sua resposta"
              borderColor={"gray.400"}
              backgroundColor="gray.50"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme={"green"}
              isDisabled={!newAnswer || newAnswer?.length < 10 || isLoading}
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
