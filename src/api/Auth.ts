import { set } from "@/hooks/useLocalStorage";
import Base from "./Base";


class Auth extends Base {
    async login(userName: string, password: string, deptId: string) {
        try {
            const response = await this.post('/auth/login', {
                userName: userName,
                password: password,
                deptId: deptId
            });
            set("accessToken", response.data.access_token);
        } catch (err) {
            throw err;
        }
    }

    async checkEmailExists(email: string) {
        try {
            const response = await this.post('/user/checkEmail', {
                email: email
            })
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async sendRecoveryEmail(email: string) {
        try {
            const response = await this.post('/auth/forgot-password', {
                email: email
            })
            return response.data;
        } catch (err) {
            return false;
        }
    }
}

const auth = new Auth();
export default auth;
