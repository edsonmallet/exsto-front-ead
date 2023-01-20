import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Flag } from "phosphor-react";
import { Header, PrivatePageTemplate } from "../../components";
import { navigateTo } from "../../utils/navigateTo";

export default function CourseDetailPage() {
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
        <Flex gap={8} w="50vw">
          <Box w="70%">Image</Box>
          <Flex direction={"column"} gap={4}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={400}
              fontSize={"2xl"}
              letterSpacing={1.1}
            >
              TECH
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              Boost your conversion rate
            </Heading>
            <Text color={"gray.500"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </Text>
            <Button
              w="full"
              colorScheme={"green"}
              onClick={() => navigateTo("/course/class/123")}
            >
              Continue Aprendendto
            </Button>
          </Flex>
        </Flex>

        <Flex gap={8} w="50vw" py={50}>
          <Flex w={"25%"} h={100} bgColor="#B3C52D">
            Image
          </Flex>
          <Flex w={"25%"} h={100} bgColor="#B3C52D70">
            Image
          </Flex>
          <Flex w={"25%"} h={100} bgColor="#B3C52D">
            Image
          </Flex>
          <Flex w={"25%"} h={100} bgColor="#B3C52D70">
            Image
          </Flex>
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
