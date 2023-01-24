import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
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
        <TableData head={Object.keys(data[0]?.attributes)} body={data} />
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Messages />} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const { Exsto_token } = context.req.cookies;
  let endpoint = "/notifications";

  const notifications = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${Exsto_token}` },
  });

  return {
    props: {
      data: notifications.data.data,
    },
  };
};
