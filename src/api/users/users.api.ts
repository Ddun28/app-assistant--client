import { AxiosResponse } from "axios";
import api from "..";

export const getOneUser = async (id: string): Promise<AxiosResponse> => {
  try {
    const { data } = await api.get(`/users/${id}`);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const getQR = async (id: string): Promise<AxiosResponse> => {
  try {
    console.log("api.defaults.headers.common['Authorization']", api.defaults.headers.common['Authorization'])
    const data = await api.get(`/users/qr/${id}`, { headers: { Authorization: api.defaults.headers.common['Authorization'] } })
    return data;
  } catch (error: any) {
    return error.response;
  }
}