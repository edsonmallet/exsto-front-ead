import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Trash, UserCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { useLoadingStore, useSettingsStore, useToastStore } from "../../stores";
import { formatDate } from "../../utils/convertDate";
import { Loading } from "../Loading";
import { AnswerComments } from "./AnswerComment";
import { NewComments } from "./NewComments";

interface CommentsProps {
  courseId: number;
  lessonId: number;
}

export const Comments: React.FC<CommentsProps> = ({ courseId, lessonId }) => {
  const [comments, setComments] = React.useState<any[]>([]);

  const { setLoading, isLoading } = useLoadingStore();
  const { showToast } = useToastStore();
  const { user } = useSettingsStore();

  const [accordionIndex, setAccordionIndex] = React.useState<any>(-1);

  const getQuestions = React.useCallback(
    async (loading?: any) => {
      setLoading(loading ?? true);
      try {
        let endpoint = `/forums`;
        endpoint += `?sort[0]=createdAt:desc`;
        endpoint += `&populate[creator][fields][0]=username`;
        endpoint += `&populate[creator][populate]=avatar`;
        endpoint += `&populate[answers][populate][user][fields][0]=username`;
        endpoint += `&populate[answers][populate][user]=avatar`;
        endpoint += `&filters[course][id][$eq]=${courseId}`;
        endpoint += `&filters[lesson][id][$eq]=${lessonId}`;
        const course = await api.get(endpoint, {
          headers: { Authorization: `Bearer ${Cookies.get("Exsto_token")}` },
        });
        setComments(course.data.data);
      } catch (error) {
        showToast("error", "Erro ao carregar comentários");
      } finally {
        setLoading(false);
      }
    },
    [courseId, lessonId, setLoading, showToast]
  );

  const handleDeleteComment = React.useCallback(
    async (id: any) => {
      try {
        let endpoint = `/forums/${id}`;

        await api.delete(endpoint, {
          headers: { Authorization: `Bearer ${Cookies.get("Exsto_token")}` },
        });
        getQuestions(false);
      } catch (error) {
        showToast("error", "Erro ao deletar comentários");
      }
    },
    [getQuestions, showToast]
  );

  const handleDeleteAnswer = React.useCallback(
    async (comment: any, id: any) => {
      const dataSave = {
        answers: comment?.attributes?.answers?.filter(
          (item: any) => item?.id !== id
        ),
      };

      try {
        let endpoint = `/forums/${comment?.id}`;
        await api.put(
          endpoint,
          { data: dataSave },
          {
            headers: { Authorization: `Bearer ${Cookies.get("Exsto_token")}` },
          }
        );
        getQuestions(false);
      } catch (error) {
        showToast("error", "Erro ao deletar comentários");
      }
    },
    [getQuestions, showToast]
  );

  React.useEffect(() => {
    getQuestions();
  }, [courseId, getQuestions, lessonId]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && comments?.length === 0 && (
        <Alert status="info" mb={2}>
          <AlertIcon />
          Nenhuma pergunta encontrada!
        </Alert>
      )}

      {!isLoading && (
        <>
          <NewComments
            courseId={courseId}
            lessonId={lessonId}
            refreshComments={() => getQuestions(false)}
          />
          <Accordion
            allowToggle
            index={accordionIndex}
            onChange={(expandedIndex) => setAccordionIndex(expandedIndex)}
          >
            {comments?.map((comment: any) => (
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
                      <Text fontSize={"lg"}>{comment?.attributes?.title}</Text>
                      <HStack
                        marginTop="2"
                        spacing="2"
                        display="flex"
                        alignItems="center"
                      >
                        {comment?.attributes?.creator?.data?.attributes?.avatar
                          ?.data?.url ? (
                          <Image
                            borderRadius="full"
                            boxSize="24px"
                            src={
                              comment?.attributes?.creator?.data?.attributes
                                ?.avatar?.data?.url
                            }
                            alt={`Avatar of ${comment?.attributes?.creator?.data?.attributes?.username}`}
                          />
                        ) : (
                          <UserCircle size={24} />
                        )}

                        <Text fontSize={"xs"}>
                          {
                            comment?.attributes?.creator?.data?.attributes
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
                  {comment?.attributes?.creator?.data?.id === user.id && (
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

                <AccordionPanel py={4} bg="white" border={"1px solid #eee"}>
                  <AnswerComments
                    commentId={comment?.id}
                    answers={comment?.attributes?.answers}
                    refreshComments={() => getQuestions(false)}
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
                          {answer?.user?.data?.attributes?.avatar?.data?.url ? (
                            <Image
                              borderRadius="full"
                              boxSize="24px"
                              src={
                                answer?.user?.data?.attributes?.avatar?.data
                                  ?.url
                              }
                              alt={`Avatar of ${answer?.user?.data?.attributes?.username}`}
                            />
                          ) : (
                            <UserCircle size={24} />
                          )}

                          <Text fontSize={"xs"}>
                            {answer?.user?.data?.attributes?.username}
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
        </>
      )}
    </>
  );
};
