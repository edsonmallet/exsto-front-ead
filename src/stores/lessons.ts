import { create } from "zustand";

type State = {
  currentLesson: any | null;
  setCurrentLesson: (lesson: any) => void;
};

export const useLessonStore = create<State>((set) => ({
  currentLesson: null,
  setCurrentLesson: (lesson: any) => set(() => ({ currentLesson: lesson })),
}));
