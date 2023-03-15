import { Alert, AlertIcon, Flex, Heading } from "@chakra-ui/react";
import { Circle } from "phosphor-react";
import React from "react";

interface QuizQuestionProps {
  question: any;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
}: QuizQuestionProps) => {
  const [selected, setSelected] = React.useState<any>(null);

  const Options = ({ value, description, id }: any) => {
    return (
      <Flex
        maxW={"500px"}
        p={3}
        bgColor={selected !== id ? "gray.100" : "green.600"}
        _hover={{ bgColor: selected !== id ? "gray.200" : "green.700" }}
        border="1px solid"
        borderColor={"gray.400"}
        width={"100%"}
        color={selected !== id ? "gray.700" : "white"}
        alignItems={"center"}
        justifyContent="flex-start"
        gap={2}
        borderRadius={8}
        cursor={"pointer"}
        transition={"all 0.2s ease-in-out"}
        transform={selected !== id ? "none" : "scale(1.05)"}
        onClick={() => setSelected((old: any) => (old === id ? null : id))}
      >
        <Circle size={20} weight={selected !== id ? "bold" : "fill"} />
        <Flex direction={"column"}>
          <p>{value}</p>
          <small>{description}</small>
        </Flex>
      </Flex>
    );
  };

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

      {question?.helperText && (
        <Alert status="info" maxW={500}>
          <AlertIcon />
          {question?.helperText}
        </Alert>
      )}

      {question?.answers?.map((option: any) => (
        <Options
          key={option?.id}
          value={option?.value}
          description={option?.description}
          id={option?.id}
        />
      ))}
    </Flex>
  );
};
