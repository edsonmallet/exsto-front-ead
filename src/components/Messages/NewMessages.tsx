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
  Select,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";

interface NewMessagesProps {
  courseId: number;
  refreshMessages: () => void;
}

export const NewMessages: React.FC<NewMessagesProps> = ({
  courseId,
  refreshMessages,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSettingsStore();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [toUser, setToUser] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [usersCourse, setUsersCourse] = React.useState<any[]>([]);

  const handleSendComment = React.useCallback(async () => {
    const dataSave = {
      title,
      message,
      from: user?.id,
      to: toUser,
      course: courseId,
    };
    setIsLoading(true);
    try {
      await api.post(
        `/messages`,
        { data: dataSave },
        {
          headers: { Authorization: `Bearer ${(session as any).jwt}` },
        }
      );
      refreshMessages();
      setTitle("");
      setMessage("");
      onClose();
      showToast("success", "Pergunta gravada com sucesso!");
    } catch (error) {
      showToast("error", "Erro ao salvar pergunta, tente novamente!");
    } finally {
      setIsLoading(false);
    }
  }, [
    title,
    message,
    user?.id,
    toUser,
    courseId,
    session,
    refreshMessages,
    onClose,
    showToast,
  ]);

  const getUserByCourse = React.useCallback(async () => {
    let endpoint = `/mycourses`;
    endpoint += `?populate[course]=*`;
    endpoint += `&filters[$and][0][course][id][$eq]=${courseId}`;
    endpoint += `&populate[user][fields][0]=username`;

    const userByCourse = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${(session as any).jwt}` },
    });

    setUsersCourse(
      userByCourse.data.data.map((user: any) => user?.attributes?.user?.data)
    );
  }, [courseId, session]);

  React.useEffect(() => {
    if (courseId) getUserByCourse();
  }, [courseId, getUserByCourse]);

  return (
    <>
      <Flex w="full" justifyContent={"flex-start"}>
        <Button colorScheme={"green"} onClick={onOpen} size="sm">
          Enviar Mensagem
        </Button>
      </Flex>

      <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sua Mensagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={2}>
              <Select
                placeholder="Selecione um usuário"
                _placeholder={{ color: "gray.900" }}
                name="courseId"
                borderColor={"gray.400"}
                backgroundColor="gray.50"
                onChange={(e) => setToUser(Number(e.target.value))}
              >
                {usersCourse.map((user) => (
                  <option key={user?.id} value={user?.id}>
                    {user?.attributes?.username}
                  </option>
                ))}
              </Select>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              colorScheme={"green"}
              isDisabled={
                !title || !message || message?.length < 10 || isLoading
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
