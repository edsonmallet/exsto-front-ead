import { Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import api from "../services/api";
import { navigateTo } from "../utils/navigateTo";

export default function HomePage({ data }: any) {
  const Home = () => (
    <Flex
      my={10}
      w="full"
      alignItems={"center"}
      justifyContent="center"
      direction={"column"}
    >
      <Image src="/smart40black.svg" alt="logo big" maxW={400} />
      <Text my={10} fontSize={24} fontWeight="light">
        Aprenda tudo sobre a plataforma didática revolucionaria <b>SMART 4.0</b>{" "}
        e suas tecnologias.
      </Text>
      <Flex
        gap={10}
        wrap="wrap"
        w="80vw"
        justifyContent="center"
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
  );

  return <PrivatePageTemplate header={<Header />} main={<Home />} />;
}

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async (context) => {
  const { Exsto_token } = context.req.cookies;

  let endpoint = "/courses";
  endpoint += `?populate[categories]=*`;
  endpoint += `&populate[coverImage]=*`;
  endpoint += `&sort[0]=showOrder`;

  const courses = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  return {
    props: {
      data: courses.data.data,
    },
  };
};
