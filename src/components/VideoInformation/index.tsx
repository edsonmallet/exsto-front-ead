import {
  Avatar,
  Flex,
  HStack,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLessonStore } from "../../stores";
import { parseHtml } from "../../utils/parseHtml";
import { Comments } from "../Comments";

export const VideoInformation = () => {
  const { currentLesson } = useLessonStore();
  const router = useRouter();

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={2}
        direction={"column"}
        py={8}
        w="full"
        bg="gray.200"
      >
        <Flex
          w={{ base: "100%", md: "80%" }}
          alignItems="flex-start"
          justifyContent="flex-start"
          gap={2}
        >
          <Text fontWeight="bold" fontSize="xl">
            {currentLesson?.attributes?.title}
          </Text>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={2}
        direction={"column"}
        w="full"
      >
        <Flex
          w={{ base: "100%", md: "80%" }}
          alignItems="flex-start"
          justifyContent="flex-start"
          gap={2}
        >
          <Tabs isLazy size="sm" variant="line" colorScheme={"green"}>
            <TabList fontWeight={"bold"}>
              <Tab>Autor</Tab>
              <Tab>Sinopse</Tab>
              <Tab>Habilidades e Competências</Tab>
              <Tab>Material de apoio</Tab>
              <Tab>Comentários e Dúvidas</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack w="full" justify="space-between" spacing="8">
                  {currentLesson?.attributes?.authors?.data?.map(
                    (author: any) => (
                      <>
                        <Flex gap={2} key={author.id}>
                          <Avatar
                            bg="green.500"
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
              <TabPanel>
                <Flex direction={"column"} gap={2} w="full">
                  <UnorderedList>
                    {currentLesson?.attributes?.supportMaterial?.map(
                      (material: any) => (
                        <ListItem
                          key={material.id}
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          fontWeight="bold"
                          borderBottom={"1px solid"}
                          borderBottomColor={"gray.300"}
                          p={2}
                        >
                          <Link
                            href={material?.file?.data[0]?.attributes?.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {material?.name}
                          </Link>
                        </ListItem>
                      )
                    )}
                  </UnorderedList>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Comments
                  courseId={Number(router?.query?.id)}
                  lessonId={currentLesson?.id}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};
