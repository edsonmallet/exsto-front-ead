import { create } from "zustand";

type State = {
  user: any | null;
  quiz: any | null;
  responses: any[];
  setData: (user: any, quiz: any) => void;
  setResponses: (response: any) => void;
  addResponse: (responses: string) => void;
  removeResponse: (responses: string) => void;
};

export const useQuizStore = create<State>((set) => ({
  responses: [],
  user: null,
  quiz: null,

  setData: (user: any, quiz: any) => set(() => ({ user: user, quiz: quiz })),

  setResponses: (response: any) => set(() => ({ responses: response })),

  addResponse: (response: any) =>
    set((state) => {
      let temp = [...state.responses];
      const indexToggle = temp.findIndex(
        (resp: any) =>
          resp.id === response.id &&
          resp.answerSelected === response.answerSelected
      );

      if (indexToggle !== -1)
        return { responses: temp.splice(indexToggle - 1, 1) };

      const index = temp.findIndex((resp: any) => resp.id === response.id);
      index !== -1 ? (temp[index] = response) : temp.push(response);

      return {
        responses: temp,
      };
    }),

  removeResponse: (responseId: string) =>
    set((state) => ({
      responses: state.responses.filter((resp: any) => resp?.id !== responseId),
    })),
}));
