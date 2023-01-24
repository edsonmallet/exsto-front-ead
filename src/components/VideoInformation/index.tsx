import {
  Avatar,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLessonStore } from "../../stores";
import { parseHtml } from "../../utils/parseHtml";

export const VideoInformation = () => {
  const { currentLesson } = useLessonStore();

  return (
    <VStack w="full" justify="center" bg="white" p="8">
      <HStack w="full" maxW="container.lg" align="flex-start">
        <VStack w="full" align="flex-start">
          <Text fontWeight="bold" fontSize="xl" mb={8}>
            {currentLesson?.attributes?.title}
          </Text>

          <Tabs size="md" variant="solid-rounded">
            <TabList>
              <Tab>Autor</Tab>
              <Tab>Sinopse</Tab>
              <Tab>Habilidades e Competências</Tab>
              <Tab>Material de apoio</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack w="full" justify="space-between" spacing="8">
                  {currentLesson?.attributes?.authors?.data?.map(
                    (author: any) => (
                      <>
                        <Flex gap={2} key={author.id}>
                          <Avatar
                            bg="teal"
                            color="white"
                            size="2xl"
                            src={
                              author?.attributes?.avatar?.data?.attributes
                                ?.url ?? ""
                            }
                            name={author?.attributes?.name}
                          />
                          <VStack w="full" align="flex-start" spacing="0">
                            <Text fontWeight={"bold"}>
                              {author?.attributes?.name}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {parseHtml(author?.attributes?.minibio)}
                            </Text>
                          </VStack>
                        </Flex>
                      </>
                    )
                  )}
                </HStack>
              </TabPanel>
              <TabPanel>
                <Text lineHeight={1.5} color="gray.600">
                  {parseHtml(currentLesson?.attributes?.sinopse)}
                </Text>
              </TabPanel>
              <TabPanel>
                <Text lineHeight={1.5} color="gray.600">
                  {parseHtml(currentLesson?.attributes?.skillAndCompetence)}
                </Text>
              </TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </HStack>
    </VStack>
  );
};
