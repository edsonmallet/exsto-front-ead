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
  Header,
  PrivatePageTemplate,
} from "../../components";
import api from "../../services/api";
import { navigateTo } from "../../utils/navigateTo";
import { parseHtml } from "../../utils/parseHtml";

export default function CourseDetailPage({ data }: any) {
  console.log(data);
  const Details = () => (
    <Flex
      w="full"
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <Flex
        gap={10}
        wrap="wrap"
        maxW={"full"}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          gap={8}
          w={{ base: "90vw", md: "50vw" }}
          direction={{ base: "column", lg: "row" }}
        >
          <Flex flex={1} direction={"column"} gap={4}>
            {data?.coverImage?.data?.attributes?.url && (
              <Image
                alt={data?.coverImage?.data?.attributes?.alternativeText}
                src={data?.coverImage?.data?.attributes?.url}
                w="full"
              />
            )}
            {!data?.coverImage?.data && (
              <AspectRatio maxW="500px" ratio={16 / 9}>
                <iframe
                  width="560"
                  src={`${data?.urlVideoPreview}?autoplay=0&showinfo=0&controls=0&rel=0&modestbranding=0&playsinline=0`}
                  title="YouTube video player"
                  allowFullScreen
                />
              </AspectRatio>
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
              onClick={() => navigateTo("/course/class/123")}
            >
              Continue Aprendendo
            </Button>
          </Flex>
        </Flex>

        <Flex gap={8} wrap="wrap" w={{ base: "90vw", md: "50vw" }} py={2}>
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

        <Flex gap={8} w="full" bgColor="#B3C52D70" justifyContent="center">
          <Flex w={"50vw"} py={50} justifyContent="center">
            <Heading> Com esse curso você estará apto a </Heading>
          </Flex>
        </Flex>

        <Flex gap={8} w="full" justifyContent="center">
          <Flex w={"50vw"} py={50} justifyContent="space-between">
            <Flex flex={1} justifyContent="center">
              <Flex direction={"column"}>
                <Heading>
                  O que você vai{" "}
                  <span style={{ color: "#B3C52D" }}>aprender</span>
                </Heading>
                <Text mt={5}>
                  Os conteúdos ofertados aqui são embassados nas experiências
                  dos instrutores no mercado.
                </Text>
              </Flex>

              <Flex gap={4} wrap="wrap">
                <Flex alignItems={"stretch"} w="40%" gap={2}>
                  <Flex>
                    <Flag fontSize={44} weight="fill" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Heading fontSize={20}>Metodologia</Heading>
                    <Text>
                      Você vai conferir aulas em vídeo com direcionamento claro
                      e prático. Também vale a pena consultar e ler com atenção
                      o material de apoio para fixar os aprendizados.
                    </Text>
                  </Flex>
                </Flex>

                <Flex alignItems={"stretch"} w="40%" gap={2}>
                  <Flex>
                    <Flag fontSize={44} weight="fill" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Heading fontSize={20}>Metodologia</Heading>
                    <Text>
                      Você vai conferir aulas em vídeo com direcionamento claro
                      e prático. Também vale a pena consultar e ler com atenção
                      o material de apoio para fixar os aprendizados.
                    </Text>
                  </Flex>
                </Flex>

                <Flex alignItems={"stretch"} w="40%" gap={2}>
                  <Flex>
                    <Flag fontSize={44} weight="fill" />
                  </Flex>
                  <Flex direction={"column"}>
                    <Heading fontSize={20}>Metodologia</Heading>
                    <Text>
                      Você vai conferir aulas em vídeo com direcionamento claro
                      e prático. Também vale a pena consultar e ler com atenção
                      o material de apoio para fixar os aprendizados.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={8} w="full" bgColor="#B3C52D70" justifyContent="center">
          <Flex w={"50vw"} py={50} justifyContent="center">
            <Heading>
              Pra <span style={{ color: "#B3C52D" }}>quem</span> é
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Details />} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  let res = await api.get(`/courses/${context?.params?.id}?populate=*`);
  console.log(res.data);

  return {
    props: {
      data: { id: res.data.data.id, ...res.data.data.attributes },
    },
  };
};
