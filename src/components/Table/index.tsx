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
          {head?.map((item) => (
            <Th key={Math.random()}>{item}</Th>
          ))}
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {body?.map((item: any) => (
          <Tr key={Math.random()}>
            {Object.keys(item?.attributes).map((row) => (
              <Td key={Math.random()}>{format(row, item?.attributes[row])}</Td>
            ))}
            <Td>
              <IconButton
                aria-label="Delete"
                icon={<Trash fontSize={20} weight="bold" />}
                colorScheme="red"
                size="sm"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          {head?.map((item) => (
            <Th key={Math.random()}>{item}</Th>
          ))}
        </Tr>
      </Tfoot>
    </Table>
  );
};
