import axios from 'axios';
import Router from 'next/router';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Axios request!');
        const accessToken = localStorage.getItem('accessToken');
        const language = localStorage.getItem('language') || 'vi';
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.headers['Accept-Language'] = language;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response?.status === 401 || response?.status === 403) {
            localStorage.removeItem('accessToken');
            Router.push('/login');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
