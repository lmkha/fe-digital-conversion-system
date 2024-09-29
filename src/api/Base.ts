import axiosInstance from "@/utils/axiosInstance";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

class Base {
    async execute(options: { method: HttpMethod; url: string; data?: any }) {
        try {
            const response = await axiosInstance({
                method: options.method,
                url: options.url,
                data: options.data,
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async get(url: string) {
        return this.execute({ method: 'get', url });
    }

    async post(url: string, data: any) {
        return this.execute({ method: 'post', url, data });
    }

    async put(url: string, data: any) {
        return this.execute({ method: 'put', url, data });
    }

    async delete(url: string) {
        return this.execute({ method: 'delete', url });
    }
}

export default Base;
