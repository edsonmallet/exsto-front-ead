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
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { UserCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { useLoadingStore, useToastStore } from "../../stores";
import { formatDate } from "../../utils/convertDate";
import { Loading } from "../Loading";

interface CommentsProps {
  courseId: number;
  lessonId: number;
}

export const Comments: React.FC<CommentsProps> = ({ courseId, lessonId }) => {
  const [comments, setComments] = React.useState<any[]>([]);
  const { setLoading, isLoading } = useLoadingStore();
  const { showToast } = useToastStore();

  const getQuestions = React.useCallback(async () => {
    setLoading(true);
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
  }, [courseId, lessonId, setLoading, showToast]);

  React.useEffect(() => {
    getQuestions();
  }, [courseId, getQuestions, lessonId]);

  return (
    <>
      {comments?.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          Nenhuma pergunta encontrada!
        </Alert>
      )}
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Flex mb={5}>
            <Button colorScheme={"green"} size="sm">
              Perguntar
            </Button>
          </Flex>
          <Accordion allowToggle>
            {comments?.map((comment) => (
              <AccordionItem bgColor={"gray.100"} key={comment.id} mb={4}>
                <AccordionButton>
                  <Flex direction={"column"} gap={2} flex="1" textAlign="left">
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
                <AccordionPanel py={4} bg="white" border={"1px solid #eee"}>
                  <Button colorScheme={"blue"} size="sm" mb={4}>
                    Responder
                  </Button>
                  <Box p={2} bgColor="green.100" borderRadius={"lg"}>
                    {comment?.attributes?.answers?.map((anwser: any) => (
                      <>
                        <p key={anwser?.id}>{anwser?.answer}</p>
                        <HStack
                          marginTop="2"
                          spacing="2"
                          display="flex"
                          alignItems="center"
                        >
                          {anwser?.user?.data?.attributes?.avatar?.data?.url ? (
                            <Image
                              borderRadius="full"
                              boxSize="24px"
                              src={
                                anwser?.user?.data?.attributes?.avatar?.data
                                  ?.url
                              }
                              alt={`Avatar of ${anwser?.user?.data?.attributes?.username}`}
                            />
                          ) : (
                            <UserCircle size={24} />
                          )}

                          <Text fontSize={"xs"}>
                            {anwser?.user?.data?.attributes?.username}
                          </Text>
                        </HStack>
                      </>
                    ))}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};
