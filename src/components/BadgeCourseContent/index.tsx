import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface BadgeCourseContentProps {
  icon: React.ReactNode;
  title: string;
  bgColor?: string;
}

export const BadgeCourseContent: React.FC<BadgeCourseContentProps> = ({
  icon,
  title,
  bgColor = "#B3C52D",
}: BadgeCourseContentProps) => {
  return (
    <Flex
      direction={"column"}
      flex="1 0 21%"
      w={"210px"}
      p={6}
      gap={2}
      alignItems={"center"}
      justifyContent="center"
      bgColor={bgColor}
      borderRadius={"md"}
    >
      {icon}
      <Text fontWeight={"bold"} align="center" fontSize={"sm"}>
        {title}
      </Text>
    </Flex>
  );
};
