import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
  AspectRatio,
  Badge,
} from "@chakra-ui/react";
import { HourglassMedium, RocketLaunch } from "phosphor-react";
import parse from "html-react-parser";

interface CardCourseProps {
  onClick?: () => void;
  course: any;
}

export default function CardCourse({ onClick, course }: CardCourseProps) {
  return (
    <Center>
      <Box
        onClick={onClick}
        cursor={"pointer"}
        maxW={"400px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
        _hover={{ transform: "scale(1.02)" }}
        transition={"all 0.2s ease-in-out"}
      >
        <Flex bgColor={"#B3C52D"} w={"full"} p={3} gap={4}>
          {course?.scheduling ? (
            <>
              <HourglassMedium size={32} weight="bold" />
              <Text fontSize={"xl"} fontWeight="bold">
                EM BREVE
              </Text>
            </>
          ) : (
            <>
              <RocketLaunch size={32} weight="bold" />
              <Text fontSize={"xl"} fontWeight="bold">
                LANÇAMENTO
              </Text>
            </>
          )}
        </Flex>
        <Box h={"210px"} bg={"gray.100"} mb={6} pos={"relative"}>
          <AspectRatio maxW="400px" ratio={16 / 9}>
            <iframe
              width="560"
              src="https://www.youtube.com/embed/ktxszcFNiaw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </Box>
        <Stack px={4}>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={400}
            fontSize={"2xl"}
            letterSpacing={1.1}
          >
            {course?.categories?.data?.map((category: any) => (
              <Badge size="lg" colorScheme="green" key={category.id}>
                {category?.attributes?.name}
              </Badge>
            ))}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {course?.name}
          </Heading>
          <Text color={"gray.500"}>{parse(course?.sinopse)}</Text>
        </Stack>
        {course?.authors && course?.authors.data.length > 0 && (
          <>
            {course?.authors.data.map((author: any) => (
              <Stack
                key={author?.id}
                mt={6}
                direction={"row"}
                spacing={4}
                align={"center"}
                p={4}
              >
                <Avatar
                  src={
                    author?.attributes.avatar ??
                    "https://avatars0.githubusercontent.com/u/1164541?v=4"
                  }
                />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{author?.attributes.name}</Text>
                  <Text color={"gray.500"}>{author?.attributes.createdAt}</Text>
                </Stack>
              </Stack>
            ))}
          </>
        )}
      </Box>
    </Center>
  );
}
