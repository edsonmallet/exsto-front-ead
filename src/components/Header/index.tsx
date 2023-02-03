import {
  Avatar,
  Box,
  Button,
  Hide,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Show,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { House, List, SignOut } from "phosphor-react";
import { useSettingsStore } from "../../stores";
import { navigateTo } from "../../utils/navigateTo";
import { LogoBlack } from "../LogoBlack";

export const Header = () => {
  const { user } = useSettingsStore();

  const MenuFull = () => (
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
      <Avatar
        name={user?.username ?? "Aluno"}
        cursor={"pointer"}
        onClick={() => navigateTo("/profile")}
        bg={"green.500"}
      />
      <IconButton
        aria-label="Sign out"
        borderRadius={"full"}
        size={"sm"}
        colorScheme="red"
        onClick={() => signOut({ callbackUrl: "/logout" })}
        icon={<SignOut weight="bold" />}
      />
    </HStack>
  );

  const MenuMobile = () => (
    <Menu colorScheme={"green"}>
      <MenuButton
        as={IconButton}
        icon={<List fontSize={32} fontWeight="bold" />}
        variant="ghost"
        colorScheme="green"
        aria-label="Options"
        p={4}
      />
      <MenuList>
        <MenuItem onClick={() => navigateTo("/home")} gap={2}>
          <House weight="bold" />
          Home
        </MenuItem>
        <MenuItem onClick={() => navigateTo("/mycourses")}>
          Meus Cursos
        </MenuItem>
        <MenuItem onClick={() => navigateTo("/notifications")}>
          Notificação
        </MenuItem>
        <MenuItem onClick={() => navigateTo("/messages")}>Mensagens</MenuItem>
        <MenuDivider />
        <MenuItem gap={2} bg="gray.100">
          <Avatar
            name={user?.username ?? "Aluno"}
            cursor={"pointer"}
            onClick={() => navigateTo("/profile")}
            bg={"green.500"}
            size="sm"
          />
          {user?.username}
        </MenuItem>
        <MenuItem
          onClick={() => signOut({ callbackUrl: "/logout" })}
          gap={2}
          color="red"
          bg="red.50"
        >
          <SignOut weight="bold" color="red" /> SAIR
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <HStack
      w="full"
      height="full"
      px="8"
      justify="space-between"
      bg="transparent"
    >
      <LogoBlack />
      <Show breakpoint="(min-width: 1280px)">
        <MenuFull />
      </Show>
      <Show breakpoint="(max-width: 1280px)">
        <MenuMobile />
      </Show>
    </HStack>
  );
};
