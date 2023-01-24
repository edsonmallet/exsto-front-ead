import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ArrowDown, House, SignOut } from "phosphor-react";
import { useSettingsStore } from "../../stores";
import { navigateTo } from "../../utils/navigateTo";
import { LogoBlack } from "../LogoBlack";

export const Header = () => {
  const { user } = useSettingsStore();
  return (
    <HStack
      w="full"
      height="full"
      px="8"
      justify="space-between"
      bg="transparent"
    >
      <LogoBlack />
      <HStack spacing={2}>
        <Button
          aria-label="Home"
          onClick={() => navigateTo("/home")}
          leftIcon={<House weight="bold" />}
          variant="ghost"
        >
          Home
        </Button>
        <Button variant="ghost" onClick={() => navigateTo("/mycourses")}>
          Meus Cursos
        </Button>
        <Button variant="ghost" onClick={() => navigateTo("/notifications")}>
          Notificação
        </Button>
        <Button variant="ghost" onClick={() => navigateTo("/messages")}>
          Mensagens
        </Button>
        <Menu>
          <MenuButton as={Button} variant="ghost" rightIcon={<ArrowDown />}>
            Conteudo Extra
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
          </MenuList>
        </Menu>
        <Avatar
          name={user?.username ?? "Aluno"}
          cursor={"pointer"}
          onClick={() => navigateTo("/profile")}
        />
        <IconButton
          aria-label="Sign out"
          borderRadius={"full"}
          size={"sm"}
          colorScheme="red"
          onClick={() => navigateTo("/logout")}
          icon={<SignOut weight="bold" />}
        />
      </HStack>
    </HStack>
  );
};
