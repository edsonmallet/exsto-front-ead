import { GetServerSideProps } from "next";
import { Header } from "../../../components/Header";
import { Player } from "../../../components/Player";
import { PrivatePageTemplate } from "../../../components/PrivatePageTemplate";
import { SideBar } from "../../../components/SideBar";
import { VideoInformation } from "../../../components/VideoInformation";
import api from "../../../services/api";

export default function CoursePage({ data }: any) {
  console.log(data);
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <Player />
          <VideoInformation />
        </>
      }
      sidebar={<SideBar modules={data} />}
    />
  );
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const course = await api.get(
    `/course-modules?sort[0]=showOrder&populate[lessons][populate]=suportMaterial&populate[supportMaterial][populate]=*&populate[courses][populate]=*&filters[courses][id][$eq]=${context?.params?.id}`
  );

  return {
    props: {
      data: course.data.data,
    },
  };
};
