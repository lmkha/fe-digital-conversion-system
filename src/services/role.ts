import role from "@/api/role"

export const getRolesByFilter = async (
    deptId: string,
    roleCode: string = '',
    roleName: string = '',
    pageSize: string = '',
    pageNumber: string = '',
) => {
    const result = await role.findRolesByFilter(roleCode, roleName, deptId, pageSize, pageNumber);
    if (result.success) {
        return {
            success: true,
            pageInfo: {
                pageNumber: result.data.pageNumber,
                total: result.data.total,
                start: result.data.start,
                end: result.data.end,
            },
            roles: result.data.roles.map((role: any) => ({
                roleId: role.roleId,
                roleCode: role.roleCode,
                roleName: role.roleName,
                isCheck: false,
            }))
        }
    } else {
        return {
            success: false,
            message: result.message,
            pageInfo: {
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
