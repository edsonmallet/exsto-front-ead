import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { SideBar } from "../components/SideBar";
import { VideoInformation } from "../components/VideoInformation";
import { GET_COURSES } from "../graphql/querys/courses";
import { initializeApollo } from "../utils/apollo";

export default function NotificationsPage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <p>notifications</p>
        </>
      }
    />
  );
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: GET_COURSES,
//     variables: { limit: 9 },
//   });

//   return {
//     props: {
//       revalidate: 60,
//       courses: data.courses,
//     },
//   };
// }
