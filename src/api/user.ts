import axiosInstance from "@/core/axios/axios-instance";
import Base from "./base";

class UserAPI extends Base {
    async createUser({
        username,
        password,
        fullName,
        jobTitle,
        email,
        phone,
        roleId,
        deptId,
        provinceId,
        districtId,
        wardId,
        gender,
        dateOfBirth,
        status,
        address,
        avatar
    }: {
        username: string,
        password: string,
        fullName: string,
        jobTitle: string,
        email: string | null,
        phone: string | null,
        roleId: string | null,
        deptId: string | null,
        provinceId: string | null,
        districtId: string | null,
        wardId: string | null,
        gender: string | null,
        dateOfBirth: string | null,
        status: string | null,
        address: string | null,
        avatar: string
    }) {
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
        pageSize = null,
        pageNumber = null,
        fullName = null,
        username = null,
        email = null,
        phone = null,
        realRole = null,
        jobTitle = null,
        status = null
    }: {
        deptId: string;
        pageSize?: string | null;
        pageNumber?: string | null;
        fullName?: string | null;
        username?: string | null;
        email?: string | null;
        phone?: string | null;
        realRole?: string | null;
        jobTitle?: string | null;
        status?: string | null;
    }) {
        try {
            const response = await this.get('/user/find-filter', {
                deptId: deptId,
                pageSize: pageSize,
                pageNumber: pageNumber,
                fullName: fullName,
                userName: username,
                email: email,
                phone: phone,
                realRole: realRole,
                jobTitle: jobTitle,
                status: status
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

    async updateUser({
        userId,
        roleId,
        jobTitle,
        deptId,
        avatar,
        fullName,
        email,
        phone,
        wardId,
        districtId,
        provinceId,
        gender,
        dateOfBirth,
        status,
        address,
    }: {
        userId: string,
        roleId: string,
        jobTitle: string,
        deptId: string,
        avatar: string,
        fullName: string,
        email: string | null,
        phone: string | null,
        wardId: string | null,
        districtId: string | null,
        provinceId: string | null,
        gender: string | null,
        dateOfBirth: string | null,
        status: string | null,
        address: string | null
    }) {
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

    async downloadUserTemplate(deptId: string) {
        try {
            const url = `/user/download-user-template?deptId=${deptId}`;
            const response = await axiosInstance.get(url, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'file_mau_import.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return {
                success: true
            };
        } catch (err: any) {
            console.error(err);
            return {
                success: false,
                message: err.response?.data?.message,
                code: err.response?.data?.code
            };
        }
    }

    async importUsers(file: File, deptId: string) {
        try {
            const url = `/user/import-user?deptId=${deptId}`;
            const formData = new FormData();
            formData.append('file', file);

            const response = await this.post(url, formData);

            return {
                success: true,
                message: 'Import thành công',
                data: response.data
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || err.message,
            };
        }
    }

    async downloadUsersExcelFile({
        deptId,
        pageSize,
        pageNumber,
        fullName,
        username,
        email,
        phone,
        realRole,
        jobTitle,
        status
    }: {
        deptId: string;
        pageSize?: string | null;
        pageNumber?: string | null;
        fullName?: string | null;
        username?: string | null;
        email?: string | null;
        phone?: string | null;
        realRole?: string | null;
        jobTitle?: string | null;
        status?: string | null;
    }) {
        try {
            const url = '/user/download-excel';
            const response = await this.get(url, {
                deptId,
                pageSize,
                pageNumber,
                fullName,
                userName: username,
                email,
                phone,
                realRole,
                jobTitle,
                status
            }, { responseType: 'blob' }); // Thêm config `responseType: 'blob'`

            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'danh_sach_nguoi_dung.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return {
                success: true,
                data: response,
                message: 'Tải file thành công',
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || err.message,
            };
        }
    }


    async changeRandomPassword(userId: string) {
        const url = '/user/provide-random-password';
        try {
            const response = await this.put(url, {
                userId: userId
            });
            return {
                success: true,
                message: 'Đổi mật khẩu thành công, mật khẩu mới: Abcd1@34',
                data: response.data
            }
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
