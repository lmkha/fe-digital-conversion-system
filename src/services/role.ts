import role from "@/api/role"
import PaginationInfo from "@/core/types/pagination-info";
import RoleItem from "./models/role-item";

export const getRolesByFilter = async (
    deptId: string,
    roleCode: string = '',
    roleName: string = '',
    pageSize: string = '',
    pageNumber: string = '',
): Promise<{
    success: boolean;
    message: string;
    pageInfo: PaginationInfo;
    roles: RoleItem[];
}> => {
    const result = await role.findRolesByFilter(roleCode, roleName, deptId, pageSize, pageNumber);
    if (result.success) {
        return {
            success: true,
            pageInfo: {
                pageSize: 10,
                pageNumber: result.data.pageNumber,
                total: result.data.total,
                start: result.data.start,
                end: result.data.end,
            },
            roles: result.data.roles.map((role: any): RoleItem => ({
                id: role.roleId,
                code: role.roleCode,
                name: role.roleName,
                selected: false,
            })),
            message: result.message,
        }
    } else {
        return {
            success: false,
            message: result.message,
            pageInfo: {
                pageSize: 10,
                pageNumber: 0,
                total: 0,
                start: 0,
                end: 0,
            },
            roles: []
        }
    }
}

export const getRoles = async (deptId: string) => {
    return getRolesByFilter(deptId);
}

export const createRole = async (
    deptId: string,
    roleCode: string,
    roleName: string,
    permissionIds: string[],
) => {
    const result = await role.createRole(roleCode, roleName, permissionIds, deptId);
    if (result.success) {
        return {
            success: true,
            message: result.message,
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

export const deleteRole = async (roleIds: string[]) => {
    const result = await role.deleteRole(roleIds);
    if (result.success) {
        return {
            success: true,
            message: result.message,
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

// Include permission ids that had been assigned to the role
export const findRoleById = async (roleId: string) => {
    const result = await role.findRoleById(roleId);
    if (result.success) {
        return {
            success: true,
            data: {
                roleId: result.data.roleId,
                roleCode: result.data.roleCode,
                roleName: result.data.roleName,
                permissionIds: result.data.permissionIds,
            }
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

export const updateRole = async (
    roleId: string,
    roleName: string,
    permissionIds: string[],
) => {
    const result = await role.updateRole({
        roleId,
        roleName,
        permissionIds,
    });
    if (result.success) {
        return {
            success: true,
            message: result.message,
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

export const downloadExcelFile = async (
    roleCode: string,
    roleName: string,
    deptId: string,
    pageNumber: string,
    pageSize: string,
) => {
    const result = await role.downloadExcelFile(roleCode, roleName, deptId, pageNumber, pageSize);
    return result;
}

export const getRolesByDeptId = async (deptId: string) => {
    const result = await role.getRolesByDeptId(deptId);
    if (result.success) {
        return {
            success: true,
            roles: result.data.map((role: any) => ({
                roleId: role.roleId,
                roleName: role.roleName,
            }))
        }
    } else {
        return {
            success: false,
            message: result.message,
            roles: []
        }
    }
}
