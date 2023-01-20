import { CaretCircleRight } from "phosphor-react";
import React from "react";

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
} from "@chakra-ui/react";

interface ModalProps {
  open: boolean;
  title: string;
  tagTitle?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  color?: string;
}

export const ModalCustom: React.FC<ModalProps> = ({
  open,
  title,
  tagTitle,
  size = "3xl",
  onClose,
  children,
  color,
}: ModalProps) => {
  return (
    <>
      <Modal
        size={size}
        isCentered
        onClose={onClose}
        isOpen={open}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={8}
          boxShadow={"dark-lg"}
          m={size === "full" ? 5 : 0}
        >
          <ModalHeader bgColor={"#fbfbfb"} borderRadius={8}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} justifyContent="center" gap={2}>
                <CaretCircleRight
                  fontSize={24}
                  weight="bold"
                  style={{ marginTop: 4 }}
                />
                {title}
              </Flex>
              {tagTitle && (
                <Tag mr={10} colorScheme={color || "yellow"}>
                  {tagTitle.length > 30
                    ? tagTitle.substring(0, 30) + "..."
                    : tagTitle}
                </Tag>
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody mb={3} position={"relative"}>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
