import { AspectRatio, HStack, Image } from "@chakra-ui/react";
import { useLessonStore } from "../../stores";

export const Player = () => {
  const { currentLesson } = useLessonStore();
  return (
    <>
      <HStack w="full" bg="black" justify="center">
        {currentLesson?.attributes?.urlVideo ? (
          <AspectRatio maxW="800px" w="full" ratio={16 / 9}>
            <iframe
              width="100%"
              src={`${currentLesson?.attributes?.urlVideo}?autoplay=0&showinfo=0&controls=1&rel=0&modestbranding=1&playsinline=0`}
              title="video player"
              allowFullScreen
            />
          </AspectRatio>
        ) : (
          <Image src="/notvideo.jpg" alt="Not video" w="full" maxW={"800px"} />
        )}
      </HStack>
    </>
  );
};
