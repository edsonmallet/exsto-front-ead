import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  currentLesson: any | null;
  completedLessons: any[];
  quizCompleted: any | null;
  setCurrentLesson: (lesson: any) => void;
  setQuizCompleted: (quiz: any) => void;
  setCompletedLessons: (lesson: any) => void;
  addCompletedLesson: (lessonId: string) => void;
  removeCompletedLesson: (lessonId: string) => void;
};

export const useLessonStore = create(
  persist<State>(
    (set) => ({
      currentLesson: null,
      setCurrentLesson: (lesson: any) => set(() => ({ currentLesson: lesson })),

      quizCompleted: null,
      setQuizCompleted: (quiz: any) => set(() => ({ quizCompleted: quiz })),

      completedLessons: [],
      setCompletedLessons: (lesson: any) =>
        set(() => ({ completedLessons: lesson })),

      addCompletedLesson: (lesson: any) =>
        set((state) => ({
          completedLessons: [...state.completedLessons, lesson.data],
        })),
      removeCompletedLesson: (lessonId: string) =>
        set((state) => ({
          completedLessons: state.completedLessons.filter(
            (lesson: any) => lesson?.id !== lessonId
          ),
        })),
    }),
    {
      name: "@Exsto_lesson",
    }
  )
);
