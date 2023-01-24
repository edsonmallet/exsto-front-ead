import { Flex } from "@chakra-ui/react";
import {
  Header,
  PrivatePageTemplate,
  TableData,
  TitlePage,
} from "../components";

const messages = [
  {
    attributes: {
      message: "Mensagem 1",
      date: "01/01/2021",
      action: "Ação 1",
    },
  },
  {
    attributes: {
      message: "Mensagem 2",
      date: "01/01/2021",
      action: "Ação 1",
    },
  },
  {
    attributes: {
      message: "Mensagem 3",
      date: "01/01/2021",
      action: "Ação 1",
    },
  },
];

export default function MyMessagesPage() {
  const Messages = () => (
    <Flex
      my={10}
      alignItems={"center"}
      justifyContent="flex-start"
      direction={"column"}
    >
      <TitlePage title="Mensagens" />

      <Flex
        gap={10}
        wrap="wrap"
        maxW={"80vw"}
        justifyContent="center"
        alignItems="center"
      >
        <TableData head={Object?.keys(messages[0])} body={messages} />
      </Flex>
    </Flex>
  );
  return <PrivatePageTemplate header={<Header />} main={<Messages />} />;
}
