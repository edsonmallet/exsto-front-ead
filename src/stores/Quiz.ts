import { create } from "zustand";

type State = {
  currentLesson: any | null;
  completedLessons: any[];
  setCurrentLesson: (lesson: any) => void;
  setCompletedLessons: (lesson: any) => void;
  addCompletedLesson: (lessonId: string) => void;
  removeCompletedLesson: (lessonId: string) => void;
};

export const useQuizStore = create<State>((set) => ({
  currentLesson: null,
  setCurrentLesson: (lesson: any) => set(() => ({ currentLesson: lesson })),

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
}));
