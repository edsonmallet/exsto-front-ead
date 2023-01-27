import { Text, VStack } from "@chakra-ui/react";
import { ListModules } from "../ListModules";

interface SideBarProps {
  modules: any;
}

export const SideBar = ({ modules }: SideBarProps) => {
  return (
    <VStack
      w="full"
      align="flex-start"
      borderLeft={"1px solid #ddd"}
      bgColor="gray.100"
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        p="2"
        w="full"
        bg="gray.700"
        color="white"
      >
        Módulos
      </Text>

      <ListModules modules={modules} />
    </VStack>
  );
};
