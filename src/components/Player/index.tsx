import { AspectRatio, HStack } from "@chakra-ui/react";
import { useLessonStore } from "../../stores";

export const Player = () => {
  const { currentLesson } = useLessonStore();
  return (
    <HStack w="full" justify="center" px="8" bg="white">
      <AspectRatio maxW="container.lg" w="full" ratio={16 / 9}>
        <iframe
          width="560"
          src={`${currentLesson?.attributes?.urlVideo}?autoplay=0&showinfo=0&controls=1&rel=0&modestbranding=1&playsinline=0`}
          title="YouTube video player"
          allowFullScreen
        />
      </AspectRatio>
    </HStack>
  );
};
