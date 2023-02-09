import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { CaretRight } from "phosphor-react";
import React from "react";
import { Header, PrivatePageTemplate, TitlePage } from "../../components";
import CardCourse from "../../components/CardCourse";
import api from "../../services/api";
import { useSettingsStore, useToastStore } from "../../stores";
import { navigateTo } from "../../utils/navigateTo";
import { parseHtml } from "../../utils/parseHtml";

export default function LearningTrails({ trail }: any) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, setUser } = useSettingsStore();
  const { showToast } = useToastStore();

  const handleTrailEnrollment = React.useCallback(
    async (learningTrailId: number) => {
      setIsLoading(true);
      try {
        const dataSave = {
          uuid: crypto.randomUUID(),
          learning_trail: learningTrailId,
          user: user?.id,
        };

        await api.post(
          `/my-learning-trails`,
          { data: dataSave },
          {
            headers: {
              Authorization: `Bearer ${(session as any).jwt}`,
            },
          }
        );
        showToast("success", "Inscrição realizada com sucesso!");
        navigateTo(`/mycourses`);
      } catch (error) {
        showToast("error", "Erro ao realizar inscrição!");
      } finally {
        setIsLoading(false);
      }
    },
    [session, showToast, user?.id]
  );
  const MyCourses = () => (
    <>
      <TitlePage title="Sobre a Trilha" />
      <Flex
        gap={10}
        wrap="wrap"
        justifyContent="center"
        alignItems="stretch"
        py={10}
        bg="#BDD02F40"
        w="full"
      >
        <Flex w={{ base: "100%", md: "80%" }} gap={8} direction={"column"}>
          <Flex alignItems={"center"} gap={4}>
            <Image src="/iconeSmart.svg" alt="logo big" w={"48px"} />
            <Flex direction={"column"}>
              <Flex>
                <Text fontSize={24} fontWeight="bold">
                  Trilha de Aprendizado:
                </Text>
                <Text fontSize={24} fontWeight="light">
                  {trail?.attributes?.title}
                </Text>
              </Flex>
              <Text fontSize={12} fontWeight="light">
                {parseHtml(trail?.attributes?.description)}
              </Text>
            </Flex>
            <Button
              colorScheme={"green"}
              size="lg"
              rightIcon={<CaretRight weight="bold" />}
              px={8}
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => handleTrailEnrollment(trail?.id)}
            >
              Acessar
            </Button>
          </Flex>
          <Flex
            gap={10}
            wrap="wrap"
            justifyContent="space-evenly"
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
            {trail?.attributes?.courses?.data?.map((course: any) => (
              <>
                {course.attributes.visibility && (
                  <CardCourse
                    course={course.attributes}
                    key={course.id}
                    onClick={() => navigateTo(`/course/class/${course.id}`)}
                  />
                )}
              </>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );

  return <PrivatePageTemplate header={<Header />} main={<MyCourses />} />;
}

export const getServerSideProps: GetServerSideProps<{
  trail: any;
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

  let endpoint = `/learning-trails/${context?.params?.id}`;
  endpoint += `?populate[0]=courses`;
  endpoint += `&populate[1]=courses.coverImage`;
  endpoint += `&populate[2]=courses.categories`;

  const learningTrails = await api.get(endpoint, {
    headers: headers,
  });

  return {
    props: {
      trail: learningTrails.data.data,
    },
  };
};
