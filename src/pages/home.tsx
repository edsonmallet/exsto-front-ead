import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { CaretRight } from "phosphor-react";
import React from "react";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import api from "../services/api";
import { navigateTo } from "../utils/navigateTo";
import { parseHtml } from "../utils/parseHtml";

export default function HomePage({ data, trails }: any) {
  const Home = () => (
    <>
      <Flex my={4} w={"full"} alignItems={"center"} direction={"column"}>
        <Image src="/smart40black.svg" alt="logo big" maxW={400} />
        <Text my={10} fontSize={24} fontWeight="light" textAlign={"center"}>
          Aprenda tudo sobre a plataforma didática revolucionaria{" "}
          <b>SMART 4.0</b> e suas tecnologias.
        </Text>
      </Flex>
      {trails?.map((trail: any) => (
        <React.Fragment key={trail?.id}>
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
              <Flex
                w="full"
                alignItems={"center"}
                justifyContent="space-between"
                gap={8}
              >
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
                </Flex>
                <Button
                  colorScheme={"green"}
                  size="lg"
                  rightIcon={<CaretRight weight="bold" />}
                >
                  Acessar
                </Button>
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
                {trail?.attributes?.courses?.data?.map((item: any) => (
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
          </Flex>
        </React.Fragment>
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
  const { Exsto_token } = context.req.cookies;

  let endpoint = "/courses";
  endpoint += `?populate[categories]=*`;
  endpoint += `&populate[coverImage]=*`;
  endpoint += `&sort[0]=showOrder`;

  const courses = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  endpoint = "/learning-trails";
  endpoint += `?populate[0]=courses`;
  endpoint += `&populate[1]=courses.coverImage`;
  endpoint += `&populate[2]=courses.categories`;
  endpoint += `&sort[0]=createdAt`;

  const learningTrails = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  return {
    props: {
      data: courses.data.data,
      trails: learningTrails.data.data,
    },
  };
};
