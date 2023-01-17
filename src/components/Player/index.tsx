import { AspectRatio, HStack, Image } from "@chakra-ui/react";

export const Player = () => {
  return (
    <HStack w="full" justify="center" px="8" bg="white">
      <AspectRatio maxW="container.lg" w="full" ratio={16 / 9}>
        <Image
          src="https://bit.ly/naruto-sage"
          alt="naruto"
          objectFit="cover"
        />
      </AspectRatio>
    </HStack>
  );
};
