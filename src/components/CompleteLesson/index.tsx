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
import { CheckCircle, Question } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";
import { Loading } from "../Loading";

export const CompleteLesson: React.FC = () => {
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
          colorScheme={"blackAlpha"}
          onClick={onOpen}
          size="md"
          leftIcon={<CheckCircle fontSize={24} weight="bold" />}
        >
          Aula Completa
        </Button>
      </Flex>
    </>
  );
};
