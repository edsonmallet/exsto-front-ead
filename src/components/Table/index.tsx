import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
} from "@chakra-ui/react";
import { Trash } from "phosphor-react";
import React from "react";
import { parseHtml } from "../../utils/parseHtml";
import { formatDate } from "../../utils/convertDate";

const columnsTranslation = {
  message: "Mensagem",
  title: "Título",
  createdAt: "Criado em",
  updatedAt: "Publicado em",
};

interface Messages {
  attributes: {
    message: string;
    date: string;
    action: React.ReactNode | string;
  };
}

interface TableDataProps {
  caption?: string;
  head?: string[];
  body?: Messages[];
}

export const TableData: React.FC<TableDataProps> = ({
  caption,
  head,
  body,
}) => {
  const format = (row: string, item: any) =>
    ["createdAt", "updatedAt", "publishedAt"].includes(row)
      ? formatDate(item)
      : parseHtml(item);

  return (
    <Table variant="striped">
      <TableCaption>{caption}</TableCaption>
      <Thead>
        <Tr>
          {head?.map((item: any) => (
            <Th key={Math.random()}>{(columnsTranslation as any)[item]}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {body?.map((item: any) => (
          <Tr key={Math.random()}>
            {Object.keys(item?.attributes).map((row) => (
              <Td key={Math.random()}>{format(row, item?.attributes[row])}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          {head?.map((item) => (
            <Th key={Math.random()}>{(columnsTranslation as any)[item]}</Th>
          ))}
        </Tr>
      </Tfoot>
    </Table>
  );
};
