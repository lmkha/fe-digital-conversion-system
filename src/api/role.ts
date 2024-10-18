import axiosInstance from "@/core/axios/axios-instance";
import Base from "./base";

class RoleAPI extends Base {
    async findRolesByFilter(
        roleCode: string,
        roleName: string,
        deptId: string,
        pageNumber: string,
        pageSize: string,
    ) {
        try {
            const partOfRoleCode = roleCode ? `roleCode=${roleCode}&` : '';
            const partOfRoleName = roleName ? `roleName=${roleName}&` : '';
            const partOfDeptId = deptId ? `deptId=${deptId}&` : '';
            const partOfPageNumber = pageNumber ? `pageNumber=${pageNumber}&` : '';
            const partOfPageSize = pageSize ? `pageSize=${pageSize}&` : '';
            const url = `/role/find-filter?${partOfRoleCode}${partOfRoleName}${partOfDeptId}${partOfPageNumber}${partOfPageSize}`;
            const response = await this.get(url);
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

    async createRole(
        roleCode: string,
        roleName: string,
        permissionIds: string[],
        deptId: string
    ) {
        try {
            const url = '/role/create';
            const response = await this.post(url, {
                roleCode,
                roleName,
                permissionIds,
                deptId
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

    async deleteRole(roleIds: string[]) {
        try {
            const url = `/role/delete`;
            const response = await this.post(url, {
                roleIds: roleIds
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

    // Include permissionIds that had been assigned to the role
    async findRoleById(roleId: string) {
        try {
            const url = `/role/find-by-id/?roleId=${roleId}`;
            const response = await this.get(url);
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

    async updateRole(data: {
        roleId: string,
        roleName: string,
        permissionIds: string[],
    }) {
        try {
            const response = await this.put('/role/update', data);
            return {
                success: true,
                message: response.message,
                code: response.code
            };
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data
            }
        }
    }

    async downloadExcelFile(
        roleCode: string,
        roleName: string,
        deptId: string,
        pageNumber: string,
        pageSize: string,
    ) {
        try {
            const partOfRoleCode = roleCode ? `&roleCode=${roleCode}` : '';
            const partOfRoleName = roleName ? `&roleName=${roleName}` : '';
            const partOfDeptId = deptId ? `&deptId=${deptId}` : '';
            const partOfPageNumber = pageNumber ? `&pageNumber=${pageNumber}` : '';
            const partOfPageSize = pageSize ? `&pageSize=${pageSize}` : '';
            const url = `/role/download-excel?${partOfRoleCode}${partOfRoleName}${partOfDeptId}${partOfPageNumber}${partOfPageSize}`;

            const response = await axiosInstance.get(url, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'RoleData.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return {
                success: true,
                data: response.data,
                message: 'Tải file thành công',
            };
        } catch (err: any) {
            console.error(err);

            return {
                success: false,
                message: err.response?.data?.message || 'Tải file thất bại',
                code: err.response?.data?.code || 'ERROR'
            };
        }
    }

    async getRolesByDeptId(deptId: string) {
        try {
            const response = await this.get(`/role/find-by-dept?deptId=${deptId}`);
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
}

const role = new RoleAPI();
export default role;
