import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Flag, GraduationCap, Laptop, Medal, PlayCircle } from "phosphor-react";
import {
  BadgeCourseContent,
  CardModuleCourse,
  Header,
  PrivatePageTemplate,
} from "../../components";
import api from "../../services/api";
import { navigateTo } from "../../utils/navigateTo";
import { parseHtml } from "../../utils/parseHtml";

export default function CourseDetailPage({ data }: any) {
  const Details = () => (
    <Flex
      w="full"
      py={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <Flex
        w="full"
        gap={10}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          maxW={{ base: "90vw", lg: "50vw" }}
          gap={6}
          px={8}
          direction={{ base: "column", lg: "row" }}
        >
          <Flex flex={1} direction={"column"} gap={4}>
            {data?.coverImage?.data?.attributes?.url && (
              <Image
                alt={data?.coverImage?.data?.attributes?.alternativeText}
                src={data?.coverImage?.data?.attributes?.url}
              />
            )}
            {!data?.coverImage?.data?.attributes?.url &&
              data?.urlVideoPreview && (
                <AspectRatio maxW="400px" ratio={16 / 9}>
                  <iframe
                    width="560"
                    src={`${data?.urlVideoPreview}?autoplay=0&showinfo=0&controls=0&rel=0&modestbranding=0&playsinline=0`}
                    title="YouTube video player"
                    allowFullScreen
                  />
                </AspectRatio>
              )}
            {!data?.coverImage?.data?.attributes?.url &&
              !data?.urlVideoPreview && (
                <Image w="full" alt="Generico" src="/courseGenericImage.png" />
              )}
          </Flex>
          <Flex flex={1} direction={"column"} gap={4}>
            <Flex gap={2}>
              {data?.categories?.data?.map((category: any) => (
                <Badge
                  size="lg"
                  colorScheme="green"
                  key={category.id}
                  py={2}
                  px={2}
                  borderRadius="full"
                >
                  {category?.attributes?.name}
                </Badge>
              ))}
            </Flex>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {data?.name}
            </Heading>
            <Text color={"gray.500"} fontSize="md">
              {parseHtml(data?.sinopse)}
            </Text>
            <Button
              w="full"
              colorScheme={"green"}
              onClick={() => navigateTo(`/course/class/${data?.id}`)}
            >
              Continue Aprendendo
            </Button>
          </Flex>
        </Flex>

        <Flex gap={6} px={8} wrap="wrap">
          <BadgeCourseContent
            icon={<Medal size={56} weight="fill" />}
            title="CERTIFICADO DE CONCLUSÃO"
            bgColor="#B3C52D"
          />
          <BadgeCourseContent
            icon={<PlayCircle size={56} weight="fill" />}
            title={` ${data?.workload} HORAS AULA`}
            bgColor="#B3C52D70"
          />
          <BadgeCourseContent
            icon={<Laptop size={56} weight="fill" />}
            title="ASSISTA QUANDO E ONDE QUISER"
            bgColor="#B3C52D"
          />
          <BadgeCourseContent
            icon={<GraduationCap size={56} weight="fill" />}
            title="VÍDEOS E MATERIAIS COMPLEMENTARES"
            bgColor="#B3C52D70"
          />
        </Flex>

        <Flex
          gap={8}
          p={8}
          w="full"
          bgColor="#B3C52D70"
          justifyContent="center"
          alignItems={"center"}
          direction={{ base: "column" }}
        >
          <Heading> Com esse curso você estará apto a </Heading>
          <Text>{parseHtml(data?.objective)}</Text>
        </Flex>

        <Flex gap={8} p={8} w="full" justifyContent="center">
          <Flex flex={1} justifyContent="center">
            <Flex direction={"column"} w={"300px"}>
              <Heading>
                O que você vai{" "}
                <span style={{ color: "#B3C52D" }}>aprender</span>
              </Heading>
              <Text mt={5}>
                Os conteúdos ofertados aqui são embassados nas experiências dos
                instrutores no mercado.
              </Text>
            </Flex>
          </Flex>

          <Flex flex={1} gap={4} wrap="wrap">
            {data?.modules?.map((module: any) => (
              <CardModuleCourse module={module} key={module.id} />
            ))}
          </Flex>
        </Flex>

        <Flex
          gap={8}
          p={8}
          w="full"
          bgColor="#B3C52D70"
          justifyContent="center"
          alignItems={"center"}
          direction={{ base: "column" }}
        >
          <Heading>
            Pra <span style={{ color: "#B3C52D" }}>quem</span> é
          </Heading>
          <Text>{parseHtml(data?.targetAudience)}</Text>
        </Flex>

        <Flex
          gap={8}
          p={8}
          w="full"
          bgColor="#fff"
          justifyContent="center"
          alignItems={"center"}
          direction={{ base: "column" }}
        >
          <Heading>Pré-Requisitos</Heading>
          <Text>{parseHtml(data?.prerequisites)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Details />} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const { Exsto_token } = context.req.cookies;

  let endpoint = `/courses/${context?.params?.id}`;
  endpoint += `?populate[categories]=*`;
  endpoint += `&populate[modules]=*`;
  endpoint += `&sort[0]=showOrder`;

  const course = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  return {
    props: {
      data: { id: course.data.data.id, ...course.data.data.attributes },
    },
  };
};
