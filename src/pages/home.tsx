import { Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import api from "../services/api";
import { useSettingsStore, useToastStore } from "../stores";
import { navigateTo } from "../utils/navigateTo";
import { getSession, useSession } from "next-auth/react";
import CardLearningTrail from "../components/CardLearningTrail";

export default function HomePage({ data, trails }: any) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, setUser } = useSettingsStore();
  const { showToast } = useToastStore();

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
      {trails?.length > 0 && (
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
          {trails?.map((trail: any) => (
            <>
              <CardLearningTrail
                key={trail?.id}
                trail={trail}
                onClick={() => navigateTo(`/learning-trails/${trail?.id}`)}
              />
            </>
          ))}
        </Flex>
      )}
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
        <Flex
          gap={10}
          wrap="wrap"
          justifyContent={"space-evenly"}
          alignItems="stretch"
        >
          {data?.map((item: any) => (
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
    </>
  );

  return <PrivatePageTemplate header={<Header />} main={<Home />} />;
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

  let endpoint = "/courses";
  endpoint += `?populate[categories]=*`;
  endpoint += `&populate[coverImage]=*`;
  endpoint += `&sort[0]=showOrder`;

  const courses = await api.get(endpoint, {
    headers: headers,
  });

  endpoint = "/learning-trails";
  endpoint += `?populate[0]=image`;
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
