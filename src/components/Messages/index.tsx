import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Trash, UserCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { useLoadingStore, useSettingsStore, useToastStore } from "../../stores";
import { formatDate } from "../../utils/convertDate";
import { Loading } from "../Loading";
import { AnswerMessages } from "./AnswerMessages";
import { NewMessages } from "./NewMessages";

interface MessagesProps {
  courseId: number;
}

export const MessagesCourses: React.FC<MessagesProps> = ({ courseId }) => {
  const { data: session } = useSession();
  const [Messages, setMessages] = React.useState<any[]>([]);

  const { setLoading, isLoading } = useLoadingStore();

  const { showToast } = useToastStore();
  const { user } = useSettingsStore();

  const [accordionIndex, setAccordionIndex] = React.useState<any>(-1);

  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const getQuestions = React.useCallback(
    async (loading = true) => {
      setLoading(loading);
      try {
        let endpoint = `/messages`;
        endpoint += `?sort[0]=createdAt:desc`;
        endpoint += `&populate[from][fields][0]=username`;
        endpoint += `&populate[from][populate]=avatar`;
        endpoint += `&populate[to][fields][0]=username`;
        endpoint += `&populate[to][populate]=avatar`;
        endpoint += `&populate[answers][populate][user][fields][0]=username`;
        endpoint += `&populate[answers][populate][user]=avatar`;
        endpoint += `&filters[course][id][$eq]=${courseId}`;
        endpoint += `&filters[$or][0][from][id][$eq]=${user?.id}`;
        endpoint += `&filters[$or][1][to][id][$eq]=${user?.id}`;
        const course = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${(session as any)?.jwt}`,
          },
        });
        setMessages(course.data.data);
      } catch (error) {
        showToast("error", "Erro ao carregar comentários");
      } finally {
        setLoading(false);
      }
    },
    [courseId, session, setLoading, showToast, user?.id]
  );

  const handleDeleteComment = React.useCallback(
    async (id: any) => {
      setLoadingBtn(true);
      try {
        let endpoint = `/messages/${id}`;

        await api.delete(endpoint, {
          headers: { Authorization: `Bearer ${(session as any)?.jwt}` },
        });
        getQuestions(false);
      } catch (error) {
        showToast("error", "Erro ao deletar comentários");
      } finally {
        setLoadingBtn(false);
      }
    },
    [getQuestions, session, showToast]
  );

  const handleDeleteAnswer = React.useCallback(
    async (comment: any, id: any) => {
      const dataSave = {
        answers: comment?.attributes?.answers?.filter(
          (item: any) => item?.id !== id
        ),
      };
      setLoadingBtn(true);
      try {
        let endpoint = `/messages/${comment?.id}`;
        await api.put(
          endpoint,
          { data: dataSave },
          {
            headers: { Authorization: `Bearer ${(session as any)?.jwt}` },
          }
        );
        getQuestions(false);
      } catch (error) {
        showToast("error", "Erro ao deletar comentários");
      } finally {
        setLoadingBtn(false);
      }
    },
    [getQuestions, session, showToast]
  );

  React.useEffect(() => {
    if (courseId) getQuestions();
  }, [courseId, getQuestions]);

  return (
    <>
      <NewMessages
        courseId={courseId}
        refreshMessages={() => getQuestions(false)}
      />
      {isLoading && <Loading />}
      {!isLoading && Messages?.length === 0 && (
        <Alert status="info" mb={2}>
          <AlertIcon />
          Nenhuma pergunta encontrada!
        </Alert>
      )}

      {!isLoading && Messages?.length > 0 && (
        <>
          <Tabs variant="soft-rounded" colorScheme="green" w="full">
            <TabList>
              <Tab>Enviadas</Tab>
              <Tab>Recebidas</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Accordion
                  w="full"
                  allowToggle
                  index={accordionIndex}
                  onChange={(expandedIndex) => setAccordionIndex(expandedIndex)}
                >
                  {Messages?.filter(
                    (comment) =>
                      comment?.attributes?.from?.data?.id === user?.id
                  ).map((comment: any) => (
                    <AccordionItem
                      bgColor={"gray.100"}
                      key={comment?.id}
                      mb={4}
                      position="relative"
                    >
                      <>
                        <AccordionButton>
                          <Flex
                            direction={"column"}
                            gap={2}
                            flex="1"
                            textAlign="left"
                          >
                            <Text fontSize={"lg"}>
                              {comment?.attributes?.title}
                            </Text>
                            <HStack
                              marginTop="2"
                              spacing="2"
                              display="flex"
                              alignItems="center"
                            >
                              <Text fontSize={"xs"}>Para:</Text>
                              {comment?.attributes?.to?.data?.attributes?.avatar
                                ?.data?.url ? (
                                <Image
                                  borderRadius="full"
                                  boxSize="24px"
                                  src={
                                    comment?.attributes?.to?.data?.attributes
                                      ?.avatar?.data?.url
                                  }
                                  alt={`Avatar of ${comment?.attributes?.to?.data?.attributes?.username}`}
                                />
                              ) : (
                                <UserCircle size={24} />
                              )}

                              <Text fontSize={"xs"}>
                                {
                                  comment?.attributes?.to?.data?.attributes
                                    ?.username
                                }
                              </Text>
                              <Text fontSize={"xs"}>
                                {formatDate(comment?.attributes?.createdAt)}
                              </Text>
                            </HStack>
                          </Flex>
                          <Badge colorScheme={"green"}>
                            {comment?.attributes?.answers?.length} Respostas
                          </Badge>
                          <AccordionIcon />
                        </AccordionButton>
                        {comment?.attributes?.from?.data?.id === user.id && (
                          <IconButton
                            aria-label="Delete"
                            colorScheme={"red"}
                            size="xs"
                            icon={<Trash fontSize={20} />}
                            position="absolute"
                            top={-3}
                            right={-3}
                            onClick={() => handleDeleteComment(comment?.id)}
                          />
                        )}
                      </>

                      <AccordionPanel
                        py={4}
                        bg="white"
                        border={"1px solid #eee"}
                      >
                        <AnswerMessages
                          commentId={comment?.id}
                          answers={comment?.attributes?.answers}
                          refreshMessages={() => getQuestions(false)}
                        />

                        {comment?.attributes?.answers?.map(
                          (answer: any, indexAnswer: number) => (
                            <Box
                              key={answer?.id}
                              p={3}
                              bgColor="green.100"
                              borderRadius={"lg"}
                              position="relative"
                              mb={2}
                            >
                              <p key={answer?.id}>{answer?.answer}</p>
                              <HStack
                                marginTop="2"
                                spacing="2"
                                display="flex"
                                alignItems="center"
                              >
                                {answer?.user?.data?.attributes?.avatar?.data
                                  ?.url ? (
                                  <Image
                                    borderRadius="full"
                                    boxSize="24px"
                                    src={
                                      answer?.user?.data?.attributes?.avatar
                                        ?.data?.url
                                    }
                                    alt={`Avatar of ${answer?.user?.data?.attributes?.username}`}
                                  />
                                ) : (
                                  <UserCircle size={24} />
                                )}

                                <Text fontSize={"xs"}>
                                  {answer?.user?.data?.attributes?.username}
                                </Text>
                                <Text fontSize={"xs"}>
                                  {formatDate(answer?.created, true)}
                                </Text>
                              </HStack>
                              {answer?.user?.data?.id === user.id && (
                                <IconButton
                                  aria-label="Delete"
                                  colorScheme={"red"}
                                  size="xs"
                                  icon={<Trash fontSize={20} />}
                                  top={-3}
                                  right={-3}
                                  position="absolute"
                                  isLoading={loadingBtn}
                                  isDisabled={loadingBtn}
                                  onClick={() =>
                                    handleDeleteAnswer(comment, answer?.id)
                                  }
                                />
                              )}
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabPanel>
              <TabPanel>
                <Accordion
                  w="full"
                  allowToggle
                  index={accordionIndex}
                  onChange={(expandedIndex) => setAccordionIndex(expandedIndex)}
                >
                  {Messages?.filter(
                    (comment) => comment?.attributes?.to?.data?.id === user?.id
                  ).map((comment: any) => (
                    <AccordionItem
                      bgColor={"gray.100"}
                      key={comment?.id}
                      mb={4}
                      position="relative"
                    >
                      <>
                        <AccordionButton>
                          <Flex
                            direction={"column"}
                            gap={2}
                            flex="1"
                            textAlign="left"
                          >
                            <Text fontSize={"lg"}>
                              {comment?.attributes?.title}
                            </Text>
                            <HStack
                              marginTop="2"
                              spacing="2"
                              display="flex"
                              alignItems="center"
                            >
                              <Text fontSize={"xs"}>De:</Text>
                              {comment?.attributes?.from?.data?.attributes
                                ?.avatar?.data?.url ? (
                                <Image
                                  borderRadius="full"
                                  boxSize="24px"
                                  src={
                                    comment?.attributes?.from?.data?.attributes
                                      ?.avatar?.data?.url
                                  }
                                  alt={`Avatar of ${comment?.attributes?.from?.data?.attributes?.username}`}
                                />
                              ) : (
                                <UserCircle size={24} />
                              )}
                              <Text fontSize={"xs"}>
                                {
                                  comment?.attributes?.from?.data?.attributes
                                    ?.username
                                }
                              </Text>
                              <Text fontSize={"xs"}>
                                {formatDate(comment?.attributes?.createdAt)}
                              </Text>
                            </HStack>
                          </Flex>
                          <Badge colorScheme={"green"}>
                            {comment?.attributes?.answers?.length} Respostas
                          </Badge>
                          <AccordionIcon />
                        </AccordionButton>
                        {comment?.attributes?.from?.data?.id === user.id && (
                          <IconButton
                            aria-label="Delete"
                            colorScheme={"red"}
                            size="xs"
                            icon={<Trash fontSize={20} />}
                            position="absolute"
                            top={-3}
                            right={-3}
                            onClick={() => handleDeleteComment(comment?.id)}
                          />
                        )}
                      </>

                      <AccordionPanel
                        py={4}
                        bg="white"
                        border={"1px solid #eee"}
                      >
                        <AnswerMessages
                          commentId={comment?.id}
                          answers={comment?.attributes?.answers}
                          refreshMessages={() => getQuestions(false)}
                        />

                        {comment?.attributes?.answers?.map(
                          (answer: any, indexAnswer: number) => (
                            <Box
                              key={answer?.id}
                              p={3}
                              bgColor="green.100"
                              borderRadius={"lg"}
                              position="relative"
                              mb={2}
                            >
                              <p key={answer?.id}>{answer?.answer}</p>
                              <HStack
                                marginTop="2"
                                spacing="2"
                                display="flex"
                                alignItems="center"
                              >
                                {answer?.user?.data?.attributes?.avatar?.data
                                  ?.url ? (
                                  <Image
                                    borderRadius="full"
                                    boxSize="24px"
                                    src={
                                      answer?.user?.data?.attributes?.avatar
                                        ?.data?.url
                                    }
                                    alt={`Avatar of ${answer?.user?.data?.attributes?.username}`}
                                  />
                                ) : (
                                  <UserCircle size={24} />
                                )}

                                <Text fontSize={"xs"}>
                                  {answer?.user?.data?.attributes?.username}
                                </Text>
                                <Text fontSize={"xs"}>
                                  {formatDate(answer?.created, true)}
                                </Text>
                              </HStack>
                              {answer?.user?.data?.id === user.id && (
                                <IconButton
                                  aria-label="Delete"
                                  colorScheme={"red"}
                                  size="xs"
                                  icon={<Trash fontSize={20} />}
                                  top={-3}
                                  right={-3}
                                  position="absolute"
                                  isLoading={loadingBtn}
                                  isDisabled={loadingBtn}
                                  onClick={() =>
                                    handleDeleteAnswer(comment, answer?.id)
                                  }
                                />
                              )}
                            </Box>
                          )
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
};
