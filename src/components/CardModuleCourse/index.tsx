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
      <Image
        w={"24px"}
        src={module?.icon?.data?.attributes?.url ?? "/circlesFourFill.svg"}
        alt={module?.icon?.data?.attributes?.alternativeText ?? "Marcador"}
      />
      <Flex direction={"column"}>
        <Heading fontSize={20}>{module?.name}</Heading>
        <Text fontSize={"sm"}>{parseHtml(module?.description)}</Text>
      </Flex>
    </Flex>
  );
};
