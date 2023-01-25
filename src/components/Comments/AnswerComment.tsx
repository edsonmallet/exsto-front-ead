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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const NewComments: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <ModalHeader>Pergunta</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme={"green"}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
