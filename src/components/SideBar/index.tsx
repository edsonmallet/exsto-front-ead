import { Text, VStack } from "@chakra-ui/react";
import { ListModules } from "../ListModules";

interface SideBarProps {
  modules: any;
}

export const SideBar = ({ modules }: SideBarProps) => {
  return (
    <VStack w="full" h="full" align="flex-start">
      <Text
        fontWeight="bold"
        fontSize="lg"
        p="2"
        w="full"
        bg="gray.400"
        color="white"
      >
        Módulos
      </Text>

      {modules?.map((module: any) => (
        <ListModules module={module} key={module.id} />
      ))}
    </VStack>
  );
};
