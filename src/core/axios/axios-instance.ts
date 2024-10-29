import axios from "axios";
import Router from "next/router";
import { get, set } from "@/hooks/use-local-storage";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Axios request!");
        const accessToken = get("accessToken");
        const language = localStorage.getItem("language") || "vi";
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.headers["Accept-Language"] = language;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        console.log("Axios error!");

        const { response } = error;
        console.log("response", response);
        if (response?.status === 401 && response?.data?.message === "jwt expired") {
            const originalRequest = error.config;

            const refreshToken = get("refreshToken");
            if (!refreshToken || originalRequest._retry) {
                set("accessToken", "");
                set("refreshToken", "");
                set("userInfo", {});
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const result = await axiosInstance.post("/auth/refresh-token", {
                    refreshToken,
                });
                const data = result.data.data;
                const newAccessToken = data.accessToken;
                console.log("newAccessToken:::", newAccessToken);

                set("accessToken", newAccessToken);

                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                set("accessToken", "");
                set("userInfo", {});
                Router.push("/login");
                return Promise.reject(refreshError);
            }
        } else if (response?.status === 401 && response?.data?.code === 3001) {
            set("accessToken", "");
            set("refreshToken", "");
            set("userInfo", {});
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
