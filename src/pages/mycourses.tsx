import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { TitlePage } from "../components/TitlePage";
import api from "../services/api";
import { navigateTo } from "../utils/navigateTo";

export default function MyCoursePage({ data }: any) {
  const MyCourses = () => (
    <Flex
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <TitlePage title="Meus Cursos" />

      <Flex
        gap={10}
        wrap="wrap"
        maxW={"80vw"}
        justifyContent="center"
        alignItems="center"
      >
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
                  onClick={() => navigateTo(`/course/class/${item.id}`)}
                />
              )}
            </>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );

  return <PrivatePageTemplate header={<Header />} main={<MyCourses />} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  let res = await api.get("/courses?populate=*");
  res = res.data;

  res?.data?.map((item: any) => console.log(item));

  return {
    props: {
      data: res.data,
    },
  };
};
