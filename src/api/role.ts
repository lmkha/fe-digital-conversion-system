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
}

const role = new RoleAPI();
export default role;
