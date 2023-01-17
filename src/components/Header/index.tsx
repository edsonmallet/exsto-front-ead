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
import { ArrowDown, HouseSimple, SignOut } from "phosphor-react";
import { navigateTo } from "../../utils/navigateTo";
import { LogoBlack } from "../LogoBlack";

export const Header = () => {
  return (
    <HStack w="full" height="full" px="8" justify="space-between" bg="white">
      <LogoBlack />
      <HStack spacing={2}>
        <IconButton
          aria-label="Home"
          onClick={() => navigateTo("/home")}
          icon={<HouseSimple />}
          variant="ghost"
        />
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/mycourses")}
        >
          Meus Cursos
        </Button>
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/notifications")}
        >
          Notificação
        </Button>
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/messages")}
        >
          Mensagens
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            fontWeight={"hairline"}
            variant="ghost"
            rightIcon={<ArrowDown />}
          >
            Conteudo Extra
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
          </MenuList>
        </Menu>
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          cursor={"pointer"}
          onClick={() => navigateTo("/profile")}
        />
        <IconButton
          aria-label="Sign out"
          onClick={() => navigateTo("/logout")}
          icon={<SignOut />}
        />
      </HStack>
    </HStack>
  );
};
