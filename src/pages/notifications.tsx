import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  Header,
  PrivatePageTemplate,
  TableData,
  TitlePage,
} from "../components";
import api from "../services/api";

export default function NotificationsPage({ data }: any) {
  const Messages = () => (
    <Flex
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <TitlePage title="Notificações" />

      <Flex
        gap={10}
        wrap="wrap"
        maxW={"80vw"}
        justifyContent="center"
        alignItems="center"
      >
        <TableData head={Object?.keys(data[0]?.attributes)} body={data} />
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Messages />} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
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
  let endpoint = "/notifications";
  endpoint += `?fields[0]=message`;
  endpoint += `&fields[1]=title`;
  endpoint += `&fields[2]=createdAt`;

  const notifications = await api.get(endpoint, {
    headers: headers,
  });

  console.log(notifications.data.data);

  return {
    props: {
      data: notifications.data.data,
    },
  };
};
