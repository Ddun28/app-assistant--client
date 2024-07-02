import { AxiosError, AxiosResponse } from "axios"
import api from ".."

const authUser = async (password: string, document: string): Promise<AxiosResponse> => {
  try {
    const body = { password, document }
    const data = await api.post("/auth/login", body)
    api.defaults.headers.common['Authorization'] = data.data.token;
    return data
  } catch (error: AxiosError | any) {
    return error
  }
}

const autoLogin = async (_id: string, token: string): Promise<AxiosResponse> => {
  try {
    const res = await api.get(`/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return res;
  } catch (error: AxiosError | any) {
    return error.response;
  }
}


export {
  authUser,
  autoLogin
}