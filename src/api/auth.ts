import Base from "./base";

class Auth extends Base {
    async login(userName: string, password: string, deptId: string) {
        try {
            const response = await this.post('/auth/login', {
                userName: userName,
                password: password,
                deptId: deptId
            });
            return {
                success: response.success,
                data: response.data,
                message: response.message,
                code: response.code
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
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

    async sendRecoverySMS(phone: string) {
        try {
            const response = await this.post('/auth/forgot-password-sms', {
                phone: phone,
            });

            return { success: true, message: response.message };
        } catch (err: any) {
            return { success: false, message: err.response.data.message };
        }
    }

    async changePassword(password: string) {
        try {
            const response = await this.put('/user/change-password', {
                newPassword: password,
            });
            return { success: true, message: response.message };
        } catch (err: any) {
            return { success: false, message: err.response.data.message };
        }
    }
}

const auth = new Auth();
export default auth;
