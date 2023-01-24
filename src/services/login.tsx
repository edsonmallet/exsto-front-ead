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
  setLoading: any,
  showToast: any,
  identifier: string,
  password: string
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
    return response.data.jwt;
  } catch (e) {
    showToast("error", "Erro ao fazer Cadastro! Verifique suas credenciais.");
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
