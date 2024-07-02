import axios from 'axios';
import api from "..";

export const fetchQrCode = async (userId: string): Promise<string> => {
    try {
        const response = await api.get(`/users/qr/${userId}`);
        return response.data.image;   
    } catch (error: any) {
        return error.response;
    }
};