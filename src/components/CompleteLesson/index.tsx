import { Button, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CheckCircle } from "phosphor-react";
import React from "react";
import api from "../../services/api";
import {
  useLessonStore,
  useLoadingStore,
  useSettingsStore,
  useToastStore,
} from "../../stores";

export const CompleteLesson: React.FC = () => {
  const {
    currentLesson,
    completedLessons,
    addCompletedLesson,
    removeCompletedLesson,
  } = useLessonStore();
  const { showToast } = useToastStore();
  const { isLoading, setLoading } = useLoadingStore();
  const { data: session } = useSession();
  const router = useRouter();

  const isCompletedLesson = completedLessons
    .map((lesson: any) => lesson?.attributes?.lesson?.data?.id)
    .includes(currentLesson?.id);

  const isRemove: any = completedLessons?.filter(
    (lesson: any) => lesson?.attributes?.lesson?.data?.id === currentLesson?.id
  )[0];

  const onToggleLesson = React.useCallback(async () => {
    setLoading(true);
    try {
      if (isCompletedLesson) {
        await api.delete(`/lessons-completeds/${isRemove?.id}`, {
          headers: { Authorization: `Bearer ${(session as any)?.jwt}` },
        });
        removeCompletedLesson(isRemove?.id);
      } else {
        const incluededLesson = await api.post(
          `/lessons-completeds?populate[0]=lesson&populate[lesson][fields][0]=id`,
          {
            data: {
              user: (session as any)?.id,
              course: router.query.id,
              lesson: currentLesson.id,
            },
          },
          {
            headers: { Authorization: `Bearer ${(session as any)?.jwt}` },
          }
        );
        addCompletedLesson(incluededLesson?.data);
      }
    } catch (error) {
      showToast("error", "Erro ao marcar aula como completa");
    } finally {
      setLoading(false);
    }
  }, [
    setLoading,
    isCompletedLesson,
    removeCompletedLesson,
    currentLesson.id,
    isRemove?.id,
    session,
    addCompletedLesson,
    router.query.id,
    showToast,
  ]);

  return (
    <>
      <Flex w="full" justifyContent={"flex-start"}>
        <Button
          colorScheme={isCompletedLesson ? "green" : "gray"}
          leftIcon={<CheckCircle fontSize={24} weight="bold" />}
          onClick={onToggleLesson}
          size="sm"
          isDisabled={isLoading}
          isLoading={isLoading}
          loadingText="Aguarde ..."
        >
          Aula Completa
        </Button>
      </Flex>
    </>
  );
};
