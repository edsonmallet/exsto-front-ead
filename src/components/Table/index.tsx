import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

interface Messages {
  message: string;
  date: string;
  action: React.ReactNode | string;
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
  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {head?.map((item) => (
              <Th key={Math.random()}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {body?.map((item: any) => (
            <Tr key={Math.random()}>
              {Object.keys(item).map((row) => (
                <Td key={Math.random()}>{item[row]}</Td>
              ))}
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
    </TableContainer>
  );
};
