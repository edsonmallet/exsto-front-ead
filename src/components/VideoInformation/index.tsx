import { Avatar, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { AiOutlineLinkedin } from "react-icons/ai";
import { useLessonStore } from "../../stores";
import { navigateTo } from "../../utils/navigateTo";
import { parseHtml } from "../../utils/parseHtml";

export const VideoInformation = () => {
  const { currentLesson } = useLessonStore();
  return (
    <VStack w="full" justify="center" bg="white" p="8">
      <HStack w="full" maxW="container.lg" align="flex-start">
        <VStack w="full" align="flex-start">
          <Text fontWeight="bold" fontSize="xl">
            {currentLesson?.attributes?.title}
          </Text>
          <Text lineHeight={1.5} color="gray.600">
            {parseHtml(currentLesson?.attributes?.sinopse)}
          </Text>
          <HStack w="full" justify="space-between" spacing="8">
            <Avatar src="https://avatars.githubusercontent.com/u/47259718?v=4" />
            <VStack w="full" align="flex-start" spacing="0">
              <Text>Rafael Fischer</Text>
              <Text fontSize="xs" color="gray.600">
                Front-End Developer & UI/UX Designer
              </Text>
            </VStack>
            <IconButton
              variant="ghost"
              aria-label="Linkedin"
              fontSize={32}
              colorScheme="green"
              icon={<AiOutlineLinkedin />}
              onClick={() =>
                navigateTo("https://www.linkedin.com/in/fischerafael/")
              }
            />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
