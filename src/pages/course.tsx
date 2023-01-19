import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { SideBar } from "../components/SideBar";
import { VideoInformation } from "../components/VideoInformation";
import api from "../services/api";

export default function CoursePage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <Player />
          <VideoInformation />
        </>
      }
      sidebar={<SideBar />}
    />
  );
}

export async function getStaticProps() {
  const res = await api.get("/courses");

  console.log(res.data);

  return {
    props: {
      revalidate: 60,
      courses: res.data,
    },
  };
}
