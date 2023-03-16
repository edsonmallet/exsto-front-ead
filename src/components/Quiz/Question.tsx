import {
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Circle } from "phosphor-react";
import React from "react";

interface QuizQuestionProps {
  question: any;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
}: QuizQuestionProps) => {
  const [selected, setSelected] = React.useState<any>(null);

  const Options = ({ value, description, image, id }: any) => {
    return (
      <Flex
        p={3}
        bgColor={selected !== id ? "gray.100" : "green.600"}
        _hover={{ bgColor: selected !== id ? "gray.200" : "green.700" }}
        border="1px solid"
        borderColor={"gray.400"}
        width={"500px"}
        color={selected !== id ? "gray.700" : "white"}
        alignItems={"center"}
        justifyContent="space-between"
        mb={"3px"}
        borderRadius={8}
        cursor={"pointer"}
        transition={"all 0.2s ease-in-out"}
        transform={selected !== id ? "none" : "scale(1.05)"}
        onClick={() => setSelected((old: any) => (old === id ? null : id))}
      >
        <Flex alignItems={"center"} justifyContent="flex-start" gap={2}>
          <Circle size={20} weight={selected !== id ? "bold" : "fill"} />
          <Flex direction={"column"}>
            <Text fontWeight={700}>{value}</Text>
            <small>{description}</small>
          </Flex>
        </Flex>
        {image && (
          <Image
            alt={`Quiz Image - ${value}`}
            src={image}
            fallbackSrc="https://via.placeholder.com/150"
          />
        )}
      </Flex>
    );
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent="center"
        direction={"column"}
        gap={2}
        width={"full"}
        mb={2}
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
      </Flex>
      <Wrap justify="center" direction={"row"} w="full" spacing="20px">
        {question?.answers?.map((option: any) => (
          <WrapItem key={option?.id}>
            <Options
              value={option?.value}
              description={option?.description}
              id={option?.id}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
