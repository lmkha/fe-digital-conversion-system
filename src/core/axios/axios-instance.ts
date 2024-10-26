import axios from 'axios';
import Router from 'next/router';
import { get, set } from '@/hooks/use-local-storage';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Axios request!');
        const accessToken = get('accessToken');
        const language = localStorage.getItem('language') || 'vi';
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.headers['Accept-Language'] = language;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    (error) => {
        console.log('Axios error!');
        const { response } = error;
        if (response?.status === 401) {
            set('accessToken', '');
            set('userInfo', {});
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
