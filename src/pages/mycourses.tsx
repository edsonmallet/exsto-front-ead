import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { CaretRight } from "phosphor-react";
import React from "react";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { TitlePage } from "../components/TitlePage";
import api from "../services/api";
import { navigateTo } from "../utils/navigateTo";
import { parseHtml } from "../utils/parseHtml";

export default function MyCoursePage({ data, trails }: any) {
  console.log(trails);
  const MyCourses = () => (
    <>
      <TitlePage title="Meus Cursos" />
      {trails?.map((trail: any) => (
        <>
          {trail?.attributes?.learningTrails?.data?.map((item: any) => (
            <React.Fragment key={item?.id}>
              <Flex
                gap={10}
                wrap="wrap"
                justifyContent="center"
                alignItems="stretch"
                py={10}
                bg="#BDD02F40"
                w="full"
              >
                <Flex
                  w={{ base: "100%", md: "80%" }}
                  gap={8}
                  direction={"column"}
                >
                  <Flex alignItems={"center"} gap={4}>
                    <Image src="/iconeSmart.svg" alt="logo big" w={"48px"} />
                    <Flex direction={"column"}>
                      <Flex>
                        <Text fontSize={24} fontWeight="bold">
                          Trilha de Aprendizado:
                        </Text>
                        <Text fontSize={24} fontWeight="light">
                          {item?.attributes?.title}
                        </Text>
                      </Flex>
                      <Text fontSize={12} fontWeight="light">
                        {parseHtml(item?.attributes?.description)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    gap={10}
                    wrap="nowrap"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    overflowX={"auto"}
                    overflowY={"hidden"}
                    p={4}
                    css={{
                      "&::-webkit-scrollbar": {
                        background: "#BDD02F30",
                        height: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#BDD02F30",
                        height: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#BDD02F",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {item?.attributes?.courses?.data?.map((course: any) => (
                      <>
                        {course.attributes.visibility && (
                          <CardCourse
                            course={course.attributes}
                            key={course.id}
                            onClick={() =>
                              navigateTo(`/course/class/${course.id}`)
                            }
                          />
                        )}
                      </>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </React.Fragment>
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
            <>
              {item?.attributes?.courses?.data?.map((course: any) => (
                <CardCourse
                  course={course.attributes}
                  key={course.id}
                  onClick={() => navigateTo(`/course/class/${course.id}`)}
                />
              ))}
            </>
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
  endpoint += `&populate[courses][populate]=categories`;
  endpoint += `&populate[courses][populate]=coverImage`;
  endpoint += `&filters[user][id][$eq]=${session.id}`;
  endpoint += `&sort[0]=createdAt`;

  const courses = await api.get(endpoint, {
    headers: headers,
  });

  endpoint = "/my-learning-trails";
  endpoint += `?populate[user]=*`;
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
