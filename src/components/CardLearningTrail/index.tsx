import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  AspectRatio,
  Badge,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { HourglassMedium, RocketLaunch } from "phosphor-react";
import parse from "html-react-parser";

interface CardCourseProps {
  onClick?: () => void;
  trail: any;
}

export default function CardLearningTrail({ onClick, trail }: CardCourseProps) {
  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      _hover={{ transform: "scale(1.02)" }}
      transition={"all 0.2s ease-in-out"}
      minW={"350px"}
      onClick={onClick}
    >
      <Flex
        zIndex={1}
        top={6}
        bgColor={"#B3C52D"}
        w={"fit-content"}
        px={8}
        py={2}
        borderRadius={"full"}
        gap={4}
        position="relative"
        alignItems="center"
        justifyContent={"center"}
        boxShadow={"lg"}
      >
        {trail?.atrributes?.scheduling ? (
          <>
            <HourglassMedium size={24} weight="bold" />
            <Text fontSize={"md"} fontWeight="bold">
              EM BREVE
            </Text>
          </>
        ) : (
          <>
            <RocketLaunch size={24} weight="bold" />
            <Text fontSize={"md"} fontWeight="bold">
              LANÇAMENTO
            </Text>
          </>
        )}
      </Flex>
      <Box
        onClick={onClick}
        cursor={"pointer"}
        maxW={"350px"}
        w={"full"}
        h={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
        borderRadius={"2xl"}
        border="8px solid"
        borderColor={"green.500"}
      >
        <Box bg={"green.100"} pos={"relative"}>
          {trail?.attributes?.image?.data?.attributes?.url && (
            <Image
              alt={trail?.attributes?.image?.data?.attributes?.alternativeText}
              src={trail?.attributes?.image?.data?.attributes?.url}
            />
          )}
          {!trail?.attributes?.image?.data?.attributes?.url &&
            trail?.attributes?.urlVideoPreview && (
              <AspectRatio maxW="400px" ratio={16 / 9}>
                <iframe
                  width="560"
                  src={`${trail?.attributes?.urlVideoPreview}?autoplay=0&showinfo=0&controls=0&rel=0&modestbranding=0&playsinline=0`}
                  title="YouTube video player"
                  allowFullScreen
                />
              </AspectRatio>
            )}
          {!trail?.attributes?.image?.data?.attributes?.url &&
            !trail?.attributes?.urlVideoPreview && (
              <Image w="full" alt="Generico" src="/courseGenericImage.png" />
            )}
        </Box>
        <Flex direction="column" p={4} gap={2} bgColor="green.100" h="full">
          <Flex gap={2}>
            <Badge size="xs" colorScheme="red" p={1}>
              Trilha
            </Badge>
            {trail?.categories?.data?.map((category: any) => (
              <Badge size="xs" colorScheme="green" key={category.id} p={1}>
                {category?.attributes?.name}
              </Badge>
            ))}
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"md"}
              fontFamily={"body"}
            >
              {trail?.attributes?.title}
            </Heading>
            <Tooltip label="Carga Horária" aria-label="Carga Horária">
              <Badge colorScheme={"gray"} size="xs" p={1}>
                {trail?.workload}
              </Badge>
            </Tooltip>
          </Flex>
          <Text
            color={"gray.500"}
            maxHeight={"150px"}
            overflowY="scroll"
            fontSize={"small"}
            pr={2}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                borderRadius: "4px",
              },
            }}
          >
            {parse(trail?.attributes?.description)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
