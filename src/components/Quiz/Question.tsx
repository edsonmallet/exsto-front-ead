import { Alert, AlertIcon, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface QuizQuestionProps {
  question: any;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
}: QuizQuestionProps) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent="center"
      direction={"column"}
      gap={2}
    >
      <small>{question?.title}</small>
      <Heading as="h5" size="md" noOfLines={1}>
        <p>{question?.question}</p>
      </Heading>

      <Alert status="info">
        <AlertIcon />
        {question?.helperText}
      </Alert>
    </Flex>
  );
};
