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
import { useSession } from "next-auth/react";
import { Circle } from "phosphor-react";
import React from "react";
import { useQuizStore } from "../../stores";

interface QuizQuestionProps {
  question: any;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
}: QuizQuestionProps) => {
  const { data: session } = useSession();
  const { responses, addResponse, setData, user, quiz } = useQuizStore();

  const [selected, setSelected] = React.useState<any>(null);

  React.useEffect(() => {
    setSelected(
      responses?.find((r: any) => r.id === question?.id)?.answerSelected
    );
  }, [question, responses]);

  const handleSelect = (id: number) => {
    setSelected((old: any) => (old === id ? null : id));
    addResponse({ ...question, answerSelected: id });
  };

  React.useEffect(() => {
    if (!user || !quiz)
      setData((session as any)?.id, question?.attributes?.quiz?.data?.id);
  }, [user, quiz, setData, session, question?.attributes?.quiz?.data?.id]);

  React.useEffect(() => {
    console.log(responses);
  }, [responses]);

  const Options = ({ value, description, image, id }: any) => {
    return (
      <Flex
        p={3}
        bgColor={selected !== id ? "gray.100" : "blue.600"}
        _hover={{ bgColor: selected !== id ? "gray.200" : "blue.700" }}
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
        onClick={() => handleSelect(id)}
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
        <small>{question?.attributes?.title}</small>
        <Heading as="h5" size="md" noOfLines={1}>
          <p>{question?.attributes?.question}</p>
        </Heading>

        {question?.attributes?.helperText && (
          <Alert status="info" maxW={500}>
            <AlertIcon />
            {question?.attributes?.helperText}
          </Alert>
        )}
      </Flex>
      <Wrap justify="center" direction={"row"} w="full" spacing="20px">
        {question?.attributes?.answers?.map((option: any) => (
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
