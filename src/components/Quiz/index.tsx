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
import { CaretLeft, CaretRight, Question } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";
import { Loading } from "../Loading";

export const Quiz: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSettingsStore();
  const { showToast } = useToastStore();
  const { data: session } = useSession();

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [toUser, setToUser] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [usersCourse, setUsersCourse] = React.useState<any[]>([]);

  return (
    <>
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

      <Modal size={"6xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Loading />
          </ModalBody>

          <ModalFooter>
            <Flex w="full" alignItems={"center"} justifyContent="space-between">
              <Button
                colorScheme="gray"
                mr={3}
                onClick={onClose}
                leftIcon={<CaretLeft fontSize={24} weight="bold" />}
              >
                Anterior
              </Button>
              <Button
                colorScheme="gray"
                mr={3}
                onClick={onClose}
                rightIcon={<CaretRight fontSize={24} weight="bold" />}
              >
                Próximo
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
