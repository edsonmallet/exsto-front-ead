import { Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import CardCourse from "../components/CardCourse";
import CardLearningTrail from "../components/CardLearningTrail";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { TitlePage } from "../components/TitlePage";
import api from "../services/api";
import { navigateTo } from "../utils/navigateTo";

export default function MyCoursePage({ data, trails }: any) {
  const MyCourses = () => (
    <>
      <TitlePage title="Meus Cursos" />
      <Flex
        my={10}
        w={{ base: "100%", md: "80%" }}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        direction={"column"}
      >
        <Flex
          alignItems={"center"}
          justifyContent="flex-start"
          w="full"
          gap={4}
          mb={8}
        >
          <Image src="/iconeSmart.svg" alt="logo big" w={"48px"} />
          <Text fontSize={24} fontWeight="bold">
            Trilhas de aprendizagem
          </Text>
        </Flex>
      </Flex>
      {trails?.map((trail: any) => (
        <>
          {trail?.attributes?.learningTrails?.data?.map((item: any) => (
            <CardLearningTrail
              key={item?.id}
              trail={item}
              onClick={() => navigateTo(`/learning-trails/${item?.id}`)}
            />
          ))}
        </>
      ))}
      <Flex
        my={10}
        w={{ base: "100%", md: "80%" }}
        alignItems={"center"}
        direction={"column"}
      >
        <Flex
          alignItems={"center"}
          justifyContent="flex-start"
          w="full"
          gap={4}
          mb={8}
        >
          <Image src="/iconeSmart.svg" alt="logo big" w={"48px"} />
          <Text fontSize={24} fontWeight="bold">
            Cursos Avulsos
          </Text>
        </Flex>
        <Flex gap={10} wrap="wrap" justifyContent="center" alignItems="stretch">
          {data?.map((item: any) => (
            <CardCourse
              course={item?.attributes?.course?.data?.attributes}
              key={item?.attributes?.course?.data?.id}
              onClick={() =>
                navigateTo(
                  `/course/class/${item?.attributes?.course?.data?.id}`
                )
              }
            />
          ))}
        </Flex>
      </Flex>
    </>
  );

  return <PrivatePageTemplate header={<Header />} main={<MyCourses />} />;
}

export const getServerSideProps: GetServerSideProps<{
  data: any;
  trails: any;
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
  }

  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }

  let endpoint = "/mycourses";
  endpoint += `?populate[user]=*`;
  endpoint += `&populate[course][populate]=categories`;
  endpoint += `&populate[course][populate]=coverImage`;
  endpoint += `&filters[user][id][$eq]=${session.id}`;
  endpoint += `&sort[0]=createdAt`;

  const courses = await api.get(endpoint, {
    headers: headers,
  });

  endpoint = "/my-learning-trails";
  endpoint += `?populate[user]=*`;
  endpoint += `&populate[learningTrails][populate][image]=*`;
  endpoint += `&populate[learningTrails][populate][courses][populate]=categories`;
  endpoint += `&populate[learningTrails][populate][courses][populate]=coverImage`;
  endpoint += `&filters[user][id][$eq]=${session.id}`;
  endpoint += `&sort[0]=createdAt`;

  const learningTrails = await api.get(endpoint, {
    headers: headers,
  });

  return {
    props: {
      data: courses.data.data,
      trails: learningTrails.data.data,
    },
  };
};
