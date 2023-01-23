import { Text, VStack } from "@chakra-ui/react";
import { ListModules } from "../ListModules";

interface SideBarProps {
  modules: any;
}

export const SideBar = ({ modules }: SideBarProps) => {
  return (
    <VStack w="full" h="full" py="8" align="flex-start" spacing="8">
      <Text fontWeight="bold" fontSize="lg" px="4">
        Módulos
      </Text>

      {modules?.map((module: any) => (
        <ListModules module={module} key={module.id} />
      ))}
    </VStack>
  );
};
