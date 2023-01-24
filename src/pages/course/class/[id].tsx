import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Header } from "../../../components/Header";
import { Player } from "../../../components/Player";
import { PrivatePageTemplate } from "../../../components/PrivatePageTemplate";
import { SideBar } from "../../../components/SideBar";
import { VideoInformation } from "../../../components/VideoInformation";
import api from "../../../services/api";

export default function CoursePage({ data }: any) {
  const Title = () => <Flex>{data?.attributes?.name}</Flex>;

  return (
    <PrivatePageTemplate
      header={<Header />}
      title={<Title />}
      main={
        <>
          <Player />
          <VideoInformation />
        </>
      }
      sidebar={<SideBar modules={data?.attributes?.course_modules?.data} />}
    />
  );
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const courseData = await api.get(
    `/courses?populate[course_modules][populate]=*&populate=*&filters[id][$eq]=${context?.params?.id}`
  );

  return {
    props: {
      data: courseData.data.data[0],
    },
  };
};