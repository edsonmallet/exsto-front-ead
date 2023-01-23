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
  course: any;
}

export default function CardCourse({ onClick, course }: CardCourseProps) {
  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      _hover={{ transform: "scale(1.02)" }}
      transition={"all 0.2s ease-in-out"}
    >
      <Flex
        zIndex={1}
        top={3}
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
        {course?.scheduling ? (
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
      >
        <Box h={"170px"} bg={"gray.100"} mb={6} pos={"relative"}>
          {course?.coverImage?.data?.attributes?.url && (
            <Image
              alt={course?.coverImage?.data?.attributes?.alternativeText}
              src={course?.coverImage?.data?.attributes?.url}
            />
          )}
          {!course?.coverImage?.data?.attributes?.url &&
            course?.urlVideoPreview && (
              <AspectRatio maxW="400px" ratio={16 / 9}>
                <iframe
                  width="560"
                  src={`${course?.urlVideoPreview}?autoplay=0&showinfo=0&controls=0&rel=0&modestbranding=0&playsinline=0`}
                  title="YouTube video player"
                  allowFullScreen
                />
              </AspectRatio>
            )}
          {!course?.coverImage?.data?.attributes?.url &&
            !course?.urlVideoPreview && (
              <Image w="full" alt="Generico" src="/courseGenericImage.png" />
            )}
        </Box>
        <Flex direction="column" p={4} gap={2}>
          <Flex gap={2}>
            {course?.categories?.data?.map((category: any) => (
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
              {course?.name}
            </Heading>
            <Tooltip label="Carga Horária" aria-label="Carga Horária">
              <Badge colorScheme={"gray"} size="xs" p={1}>
                {course?.workload} hr
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
            {parse(course?.sinopse)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
