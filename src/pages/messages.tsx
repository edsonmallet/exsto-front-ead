import { Flex, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Header, PrivatePageTemplate, TitlePage } from "../components";
import { MessagesCourses } from "../components/Messages";
import api from "../services/api";

export default function MyMessagesPage({ courses }: any) {
  const [courseId, setCourseId] = React.useState<number>(0);

  const Messages = () => (
    <Flex
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
      w="full"
    >
      <TitlePage title="Mensagens" />

      <Flex
        gap={10}
        wrap="wrap"
        w={{ base: "100%", md: "80%", "2xl": "60%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Select
          placeholder="Selecione um Curso"
          _placeholder={{ color: "gray.900" }}
          name="courseId"
          iconColor="#B3C52D"
          border="1px"
          borderColor="#B3C52D"
          bg="gray.100"
          value={courseId}
          size={"lg"}
          onChange={(e) => setCourseId(Number(e.target.value))}
        >
          {courses?.map((item: any) => (
            <option
              key={item?.attributes?.course?.data?.id}
              value={item?.attributes?.course?.data?.id}
            >
              {item?.attributes?.course?.data?.attributes?.name}
            </option>
          ))}
        </Select>
        <MessagesCourses courseId={courseId} />
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Messages />} />;
}

export const getServerSideProps: GetServerSideProps<{
  courses: any;
}> = async (context) => {
  let headers = {};
  const session: any = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }

  let endpoint = "/mycourses";
  endpoint += `?populate[user]=*`;
  endpoint += `&populate[course][populate]=categories`;
  endpoint += `&filters[user][id][$eq]=${session.id}`;
  endpoint += `&sort[0]=createdAt`;

  const courses = await api.get(endpoint, {
    headers: headers,
  });

  return {
    props: {
      courses: courses.data.data,
    },
  };
};
