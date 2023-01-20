import { Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";
import { TitlePage } from "../components/TitlePage";

export default function ProfilePage() {
  const Profile = () => (
    <Flex
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <TitlePage title="Profile" />

      <Flex
        gap={10}
        wrap="wrap"
        maxW={"80vw"}
        justifyContent="center"
        alignItems="center"
      >
        <p>profile</p>
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Profile />} />;
}
