import { Alert, AlertIcon, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import api from "../services/api";
import { useSettingsStore } from "../stores";
import { navigateTo } from "../utils/navigateTo";
import { formatDate } from "../utils/convertDate";
import { getSession, useSession } from "next-auth/react";
import CardLearningTrail from "../components/CardLearningTrail";
import { ArrowRight } from "phosphor-react";

export default function HomePage({ data }: any) {
  const { data: session } = useSession();
  const { user, setUser } = useSettingsStore();

  const getUserLogged = React.useCallback(async () => {
    const res = await api.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${(session as any).jwt}`,
      },
    });
    setUser(res?.data);
  }, [session, setUser]);

  React.useEffect(() => {
    getUserLogged();
  }, []);

  const Home = () => (
    <>
      <Flex my={8} w={"full"} alignItems={"center"} direction={"column"}>
        <Image src="/smart40black.svg" alt="logo big" maxW={400} />
        <Text my={10} fontSize={24} fontWeight="light" textAlign={"center"}>
          Aprenda tudo sobre a plataforma didática revolucionaria{" "}
          <b>SMART 4.0</b> e suas tecnologias.
        </Text>
      </Flex>

      {data?.length > 0 &&
        data?.map((classes: any) => (
          <>
            <Flex
              mb={5}
              w={{ base: "100%", md: "80%" }}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              direction={"column"}
            >
              <Alert status="success">
                <AlertIcon />
                <Flex direction={"column"}>
                  <Flex gap={2} align="center">
                    <Text fontWeight={"bold"}>{classes?.attributes?.Nome}</Text>
                    <Text fontSize={12}>
                      {classes?.attributes?.description}
                    </Text>
                  </Flex>

                  <Flex gap={2} align="center">
                    {formatDate(classes?.attributes?.initial_data, false)}{" "}
                    <ArrowRight />{" "}
                    {formatDate(classes?.attributes?.final_date, false)}
                  </Flex>
                </Flex>
              </Alert>
            </Flex>
            {(classes?.attributes?.learning_trails?.data?.length > 0 ||
              classes?.attributes?.courses?.data?.length > 0) && (
              <Flex
                mb={10}
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
                    Trilhas e Cursos
                  </Text>
                </Flex>
                <Flex gap={8}>
                  {classes?.attributes?.learning_trails?.data?.map(
                    (trail: any) => (
                      <>
                        <CardLearningTrail
                          key={trail?.id}
                          trail={trail}
                          onClick={() =>
                            navigateTo(`/learning-trails/${trail?.id}`)
                          }
                        />
                      </>
                    )
                  )}
                  {classes?.attributes?.courses?.data?.map((item: any) => (
                    <>
                      {item.attributes.visibility && (
                        <CardCourse
                          course={item.attributes}
                          key={item.id}
                          onClick={() => navigateTo(`/course/${item.id}`)}
                        />
                      )}
                    </>
                  ))}
                </Flex>
              </Flex>
            )}
          </>
        ))}
    </>
  );

  return <PrivatePageTemplate header={<Header />} main={<Home />} />;
}

export const getServerSideProps: GetServerSideProps<{
  data: any;
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

  let endpoint = "/classes";
  endpoint += `?populate[courses][populate]=*`;
  endpoint += `&populate[learning_trails][populate]=*`;

  const classes = await api.get(endpoint, {
    headers: headers,
  });

  return {
    props: {
      data: classes.data.data,
    },
  };
};
