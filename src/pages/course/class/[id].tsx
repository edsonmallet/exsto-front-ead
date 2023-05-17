import { Flex, Heading, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Header } from "../../../components/Header";
import { Player } from "../../../components/Player";
import { PrivatePageTemplate } from "../../../components/PrivatePageTemplate";
import { SideBar } from "../../../components/SideBar";
import { VideoInformation } from "../../../components/VideoInformation";
import api from "../../../services/api";
import { useLessonStore } from "../../../stores";

export default function CoursePage({
  data,
  lessonsCompleted,
  quizCompleteds,
}: any) {
  const {
    currentLesson,
    setCurrentLesson,
    setCompletedLessons,
    setQuizCompleted,
  } = useLessonStore();

  React.useEffect(() => {
    setCurrentLesson(null);
    setCompletedLessons(lessonsCompleted);
    setQuizCompleted(quizCompleteds);
  }, []);

  console.log(quizCompleteds);

  const Title = () => <Flex>{data?.attributes?.name}</Flex>;

  return (
    <PrivatePageTemplate
      header={<Header />}
      title={<Title />}
      main={
        <>
          {currentLesson ? (
            <>
              <Player />
              <VideoInformation />
            </>
          ) : (
            <Flex
              w="full"
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}
            >
              <Image src="/nodata.webp" alt="logo big" />
              <Heading color={"gray.300"}>
                Selecione uma aula para assistir
              </Heading>
            </Flex>
          )}
        </>
      }
      sidebar={<SideBar modules={data?.attributes?.course_modules?.data} />}
    />
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: any;
  lessonsCompleted: any;
}> = async (context) => {
  let headers = {};
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    headers = { Authorization: `Bearer ${session.jwt}` };

    let endpoint = `/courses/${context?.params?.id}`;
    endpoint += `?populate[course_modules][sort][0]=showOrder`;
    endpoint += `&populate[course_modules][populate][lessons][sort][0]=showOrder`;
    endpoint += `&populate[course_modules][populate][lessons][populate][authors][populate]=*`;
    endpoint += `&populate[course_modules][populate][lessons][populate][quiz][populate][questions][populate]=*`;
    endpoint += `&populate[course_modules][populate][lessons][populate][supportMaterial][populate]=file`;
    endpoint += `&fields[0]=name`;
    endpoint += `&sort[0]=name`;

    const course = await api.get(endpoint, {
      headers: headers,
    });

    endpoint = `/lessons-completeds`;
    endpoint += `?populate[o]=lesson`;
    endpoint += `&populate[lesson][fields][0]=id`;
    endpoint += `&filters[course][id][$eq]=${context?.params?.id}`;
    endpoint += `&filters[user][id][$eq]=${session?.id}`;

    const lessonsCompleteds = await api.get(endpoint, {
      headers: headers,
    });

    endpoint = `/quiz-responses`;
    endpoint += `?populate[quiz][populate]=*`;
    endpoint += `&filters[user][id][$eq]=${session?.id}`;

    const quizCompleteds = await api.get(endpoint, {
      headers: headers,
    });

    return {
      props: {
        data: course.data.data,
        lessonsCompleted: lessonsCompleteds.data.data,
        quizCompleteds: quizCompleteds.data.data,
      },
    };
  }
};
