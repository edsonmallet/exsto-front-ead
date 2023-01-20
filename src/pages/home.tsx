import { Flex, Image, Text } from "@chakra-ui/react";
import CardCourse from "../components/CardCourse";
import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";

export default function HomePage() {
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
        alignItems="center"
      >
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
      </Flex>
    </Flex>
  );

  return <PrivatePageTemplate header={<Header />} main={<Home />} />;
}
