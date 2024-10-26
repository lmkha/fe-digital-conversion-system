import Base from "./base";

class UserAPI extends Base {
    async createUser(
        username: string,
        password: string,
        fullName: string,
        email: string,
        phone: string,
        roleId: string,
        deptId: string,
        provinceId: string,
        districtId: string,
        wardId: string,
        gender: string,
        dateOfBirth: string,
        status: string,
        jobTitle: string,
        address: string,
        avatar: string
    ) {
        try {
            const url = '/user/create';
            const response = await this.post(url, {
                userName: username,
                password: password,
                fullName: fullName,
                email: email,
                phone: phone,
                roleId: roleId,
                deptId: deptId,
                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId,
                gender: gender,
                dateOfBirth: dateOfBirth,
                status: status,
                jobTitle: jobTitle,
                address: address,
                avatar: avatar
            });
            return {
                success: true,
                data: response.data,
                message: response.message,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }

    async uploadAvatar(file: File) {
        try {
            const url = '/user/upload-avata';
            const formData = new FormData();
            formData.append('file', file);

            const response = await this.post(url, formData);

            return {
                success: true,
                data: response.data
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || err.message,
            };
        }
    }

    async findUserByFilter({
        deptId,
        pageSize = '',
        pageNumber = '',
        fullName = '',
        username = '',
        email = '',
        phone = '',
        realRole = '',
        jobTitle = '',
        status = ''
    }: {
        deptId: string;
        pageSize?: string;
        pageNumber?: string;
        fullName?: string;
        username?: string;
        email?: string;
        phone?: string;
        realRole?: string;
        jobTitle?: string;
        status?: string;
    }) {
        try {
            const response = await this.get('/user/find-filter', {
                deptId,
                pageSize,
                pageNumber,
                fullName,
                userName: username,  // Lưu ý: nếu backend yêu cầu 'userName', vẫn cần giữ key là 'userName'
                email,
                phone,
                realRole,
                jobTitle,
                status
            });
            return {
                success: true,
                data: response.data,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || 'Unknown error',
                code: err.response?.data?.code || 'Unknown code'
            };
        }
    }


    async findUserById(userId: string) {
        try {
            const response = await this.get(`/user/find-by-id/`, {
                userId: userId
            });
            return {
                success: true,
                data: response.data,
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

    async updateUser(
        userId: string,
        email: string,
        fullName: string,
        phone: string,
        wardId: string,
        districtId: string,
        provinceId: string,
        gender: string,
        dateOfBirth: string,
        status: string,
        roleId: string,
        jobTitle: string,
        deptId: string,
        address: string,
        avatar: string,
    ) {
        try {
            const response = await this.put('/user/update', {
                userId: userId,
                email: email,
                fullName: fullName,
                phone: phone,
                wardId: wardId,
                districtId: districtId,
                provinceId: provinceId,
                gender: gender,
                dateOfBirth: dateOfBirth,
                status: status,
                roleId: roleId,
                jobTitle: jobTitle,
                deptId: deptId,
                address: address,
                avatar: avatar
            });
            return {
                success: true,
                data: response.data,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            };
        }
    }

    async changeUserStatus(userId: string, status: string) {
        try {
            const response = await this.patch('/user/update-status', {
                userId: userId,
                status: status
            });
            return {
                success: true,
                message: response.message,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            };
        }
    }

    async deleteUsers(userIds: string[]) {
        try {
            const response = await this.post('/user/delete', {
                userIds: userIds
            });
            return {
                success: true,
                message: response.message,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }
}

const user = new UserAPI();
export default user;
