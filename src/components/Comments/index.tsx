import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { UserCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import { formatDate } from "../../utils/convertDate";

interface CommentsProps {
  courseId: number;
  lessonId: number;
}

export const Comments: React.FC<CommentsProps> = ({ courseId, lessonId }) => {
  const [comments, setComments] = React.useState<any[]>([]);

  const getQuestions = async () => {
    let endpoint = `/forums`;
    endpoint += `?sort[0]=createdAt`;
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
    console.log(course.data.data);
  };

  React.useEffect(() => {
    getQuestions();
  }, [courseId, lessonId]);

  return (
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
                  {comment?.attributes?.creator?.data?.attributes?.avatar?.data
                    ?.url ? (
                    <Image
                      borderRadius="full"
                      boxSize="24px"
                      src={
                        comment?.attributes?.creator?.data?.attributes?.avatar
                          ?.data?.url
                      }
                      alt={`Avatar of ${comment?.attributes?.creator?.data?.attributes?.username}`}
                    />
                  ) : (
                    <UserCircle size={24} />
                  )}

                  <Text fontSize={"xs"}>
                    {comment?.attributes?.creator?.data?.attributes?.username}
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
                            anwser?.user?.data?.attributes?.avatar?.data?.url
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
  );
};
