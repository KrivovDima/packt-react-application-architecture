import { API_URL } from '@/config/constants';
import Axios from 'axios';

export const apiClient = Axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message;

        console.error(message);

        return Promise.reject(error);
    }
);
