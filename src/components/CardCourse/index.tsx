import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { HourglassMedium, RocketLaunch } from "phosphor-react";

interface CardCourseProps {
  onClick?: () => void;
}

export default function CardCourse({ onClick }: CardCourseProps) {
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
      >
        <Flex bgColor={"#B3C52D"} w={"full"} p={3} gap={4}>
          <RocketLaunch size={32} weight="bold" />
          <HourglassMedium size={32} weight="bold" />
          <Text fontSize={"xl"} fontWeight="bold">
            Lançamento
          </Text>
        </Flex>
        <Box h={"210px"} bg={"gray.100"} mb={6} pos={"relative"}></Box>
        <Stack px={4}>
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
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"} p={4}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
