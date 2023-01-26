import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import {
  CircleWavy,
  CircleWavyCheck,
  GraduationCap,
  Laptop,
  Medal,
  PlayCircle,
} from "phosphor-react";
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
  console.log(data);
  const Details = () => (
    <Flex
      w="full"
      py={10}
      gap={8}
      alignItems={"center"}
      justifyContent="center"
      direction={"column"}
    >
      <Flex
        w={{ base: "100%", md: "80%", "2xl": "60%" }}
        gap={4}
        p={8}
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex flex={1} direction={"column"} gap={4}>
          {data?.coverImage?.data?.attributes?.url && (
            <Image
              w="full"
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
        <Flex flex={1} direction={"column"} gap={8}>
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
            size="xl"
            colorScheme={"green"}
            onClick={() => navigateTo(`/course/class/${data?.id}`)}
            py={8}
          >
            Continue Aprendendo
          </Button>
        </Flex>
      </Flex>

      <Flex
        w={{ base: "100%", md: "80%", "2xl": "60%" }}
        gap={4}
        p={8}
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex gap={4} wrap="nowrap">
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
      </Flex>

      <Flex
        w="full"
        bgColor="#B3C52D70"
        justifyContent="center"
        alignItems={"center"}
        direction={{ base: "column" }}
      >
        <Flex
          w={{ base: "100%", md: "80%", "2xl": "60%" }}
          gap={4}
          p={16}
          alignItems={"center"}
          justifyContent="center"
          direction={"column"}
        >
          <Heading> Com esse curso você estará apto a </Heading>
          <Text fontSize={"2xl"} textAlign="center">
            {parseHtml(data?.objective)}
          </Text>
        </Flex>
      </Flex>

      <Flex gap={8} p={16} w="full" justifyContent="center">
        <Flex
          w={{ base: "100%", md: "80%", "2xl": "60%" }}
          gap={4}
          alignItems={"center"}
          justifyContent="center"
        >
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
      </Flex>

      <Flex
        gap={8}
        p={16}
        w="full"
        bgColor="#B3C52D70"
        justifyContent="center"
        alignItems={"center"}
      >
        <Flex
          w={{ base: "100%", md: "80%", "2xl": "60%" }}
          gap={4}
          alignItems={"center"}
          justifyContent="center"
          direction={"column"}
        >
          <Heading mb={10}>
            Pra <span style={{ color: "#B3C52D" }}>quem</span> é
          </Heading>
          <Flex
            gap={8}
            wrap="wrap"
            w={{ base: "100%", md: "80%", "2xl": "60%" }}
            justifyContent="center"
            alignItems={"stretch"}
          >
            {data?.targetAudiency?.map((target: any) => (
              <Flex gap={8} key={target?.id}>
                <Flex
                  position={"relative"}
                  alignItems={"center"}
                  justifyContent="flex-start"
                >
                  <Box position={"absolute"} left={-6} zIndex={3}>
                    <CircleWavyCheck weight="fill" size={48} color="#555" />
                  </Box>
                  <Flex
                    bgColor="#fff"
                    boxShadow="xl"
                    minH="120px"
                    w={"250px"}
                    alignItems={"center"}
                    justifyContent="flex-start"
                    p={4}
                    pl={8}
                    border={"1px solid #ddd"}
                    zIndex={1}
                    fontWeight={500}
                    fontSize={"md"}
                  >
                    {target?.item}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        gap={8}
        p={16}
        w="full"
        bgColor="#fff"
        justifyContent="center"
        alignItems={"center"}
        direction={{ base: "column" }}
      >
        <Heading mb={10}>Pré-Requisitos</Heading>

        <Flex
          gap={8}
          wrap="wrap"
          w={{ base: "100%", md: "80%", "2xl": "60%" }}
          justifyContent="center"
          alignItems={"stretch"}
        >
          {data?.preRequisites?.map((preRequisite: any) => (
            <Flex gap={8} key={preRequisite?.id}>
              <Flex
                position={"relative"}
                alignItems={"center"}
                justifyContent="flex-start"
              >
                <Box position={"absolute"} left={-6} zIndex={3}>
                  <CircleWavy weight="fill" size={48} color="#B3C52D" />
                </Box>
                <Flex
                  bgColor="#fff"
                  boxShadow="xl"
                  minH="120px"
                  w={"250px"}
                  alignItems={"center"}
                  justifyContent="flex-start"
                  p={4}
                  pl={8}
                  border={"1px solid #ddd"}
                  zIndex={1}
                  fontWeight={500}
                  fontSize={"md"}
                >
                  {preRequisite?.item}
                </Flex>
              </Flex>
            </Flex>
          ))}
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
  endpoint += `&populate[coverImage]=*`;
  endpoint += `&populate[targetAudiency]=*`;
  endpoint += `&populate[preRequisites]=*`;
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
