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
import { ArrowDown, SignOut } from "phosphor-react";
import { navigateTo } from "../../utils/navigateTo";
import { LogoBlack } from "../LogoBlack";

export const Header = () => {
  return (
    <HStack w="full" height="full" px="8" justify="space-between" bg="white">
      <LogoBlack />
      <HStack spacing={8}>
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/")}
        >
          Meus Cursos
        </Button>
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/")}
        >
          Notificação
        </Button>
        <Button
          variant="ghost"
          fontWeight={"hairline"}
          onClick={() => navigateTo("/")}
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
          onClick={() => navigateTo("/profile")}
        />
        <IconButton
          aria-label="Sign out"
          onClick={() => navigateTo("/")}
          icon={<SignOut />}
        />
      </HStack>
    </HStack>
  );
};
