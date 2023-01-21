import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Circle } from "phosphor-react";
import React from "react";
import { parseHtml } from "../../utils/parseHtml";
interface CardModuleCourseProps {
  module: any;
}

export const CardModuleCourse: React.FC<CardModuleCourseProps> = ({
  module,
}) => {
  return (
    <Flex pb={2} alignItems={"flex-start"} flex="1 0 40%" gap={3}>
      {module?.icon?.data?.attributes?.url ? (
        <Image
          w={"32px"}
          src={module?.icon?.data?.attributes?.url}
          alt={module?.icon?.data?.attributes?.alternativeText}
        />
      ) : (
        <Circle fontSize={100} weight="bold" />
      )}
      <Flex direction={"column"}>
        <Heading fontSize={20}>{module?.name}</Heading>
        <Text fontSize={"sm"}>{parseHtml(module?.description)}</Text>
      </Flex>
    </Flex>
  );
};
