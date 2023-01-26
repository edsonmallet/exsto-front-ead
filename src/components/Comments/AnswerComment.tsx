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
import Cookies from "js-cookie";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";

interface AnswerCommentsProps {
  commentId: any;
  answers: any;
  refreshComments: () => void;
}

export const AnswerComments: React.FC<AnswerCommentsProps> = ({
  commentId,
  answers,
  refreshComments,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSettingsStore();
  const { showToast } = useToastStore();

  const [newAnswer, setNewAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendComment = React.useCallback(async () => {
    const dataSave = {
      answers: [...answers, { answer: newAnswer, user: user.id }],
    };

    setIsLoading(true);
    try {
      await api.put(
        `/forums/${commentId}`,
        { data: dataSave },
        {
          headers: { Authorization: `Bearer ${Cookies.get("Exsto_token")}` },
        }
      );
      refreshComments();
      setNewAnswer("");
      onClose();
      showToast("success", "Resposta gravada com sucesso!");
    } catch (error) {
      showToast("error", "Erro ao salvar resposta, tente novamente!");
    } finally {
      setIsLoading(false);
    }
  }, [
    answers,
    commentId,
    newAnswer,
    onClose,
    refreshComments,
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
