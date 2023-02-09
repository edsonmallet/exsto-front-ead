import api from "./api";

export interface Login {
  jwt: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export const signin = async (
  identifier: string,
  password: string,
  setLoading?: any,
  showToast?: any
) => {
  setLoading(true);
  try {
    const response = await api.post<Login>("/auth/local", {
      identifier,
      password,
    });
    return response.data;
  } catch (e) {
    showToast("error", "Erro ao fazer login! Verifique suas credenciais.");
  } finally {
    setLoading(false);
  }
};

export const register = async (setLoading: any, showToast: any, data: any) => {
  setLoading(true);
  try {
    const response = await api.post<Login>("/auth/local/register", data);

    if (data?.courses && data?.courses.length > 0) {
      for (let course of data?.courses) {
        await api.post(
          "/mycourses",
          {
            data: {
              uuid: crypto.randomUUID(),
              user: response?.data?.user?.id,
              course: course,
            },
          },
          {
            headers: { Authorization: `Bearer ${response.data.jwt}` },
          }
        );
      }
    }

    if (data?.learningTrails && data?.learningTrails.length > 0) {
      for (let learningTrail of data?.learningTrails) {
        await api.post(
          "/my-learning-trails",
          {
            data: {
              uuid: crypto.randomUUID(),
              user: response?.data?.user?.id,
              learning_trail: learningTrail,
            },
          },
          {
            headers: { Authorization: `Bearer ${response.data.jwt}` },
          }
        );
      }
    }
    return response.data.jwt;
  } catch (e) {
    showToast("error", "Erro ao fazer Cadastro! Verifique seus dados");
  } finally {
    setLoading(false);
  }
};

export const forgotPassword = async (
  setLoading: any,
  showToast: any,
  data: any
) => {
  setLoading(true);
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  } catch (e) {
    showToast("error", "Erro ao enviar email!");
  } finally {
    setLoading(false);
  }
};
