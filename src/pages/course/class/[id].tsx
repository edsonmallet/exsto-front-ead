import { Flex, Heading, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { Header } from "../../../components/Header";
import { Player } from "../../../components/Player";
import { PrivatePageTemplate } from "../../../components/PrivatePageTemplate";
import { SideBar } from "../../../components/SideBar";
import { VideoInformation } from "../../../components/VideoInformation";
import api from "../../../services/api";
import { useLessonStore } from "../../../stores";

export default function CoursePage({ data }: any) {
  const { currentLesson, setCurrentLesson } = useLessonStore();

  React.useEffect(() => {
    setCurrentLesson(null);
  }, [setCurrentLesson]);

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

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const { Exsto_token } = context.req.cookies;
  let endpoint = "/courses";
  endpoint += `?populate[0]=course_modules`;
  endpoint += `&populate[1]=course_modules.lessons`;
  endpoint += `&populate[2]=course_modules.lessons.authors`;
  endpoint += `&filters[id][$eq]=${context?.params?.id}`;
  endpoint += `&fields[0]=name`;

  const courseData = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  return {
    props: {
      data: courseData.data.data[0],
    },
  };
};
