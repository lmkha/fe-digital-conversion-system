import permission from "@/api/permission";

export const getPermissionByFilter = async (
    permissionCode: string,
    permissionName: string,
    pageNumber: string,
    pageSize: string,
) => {
    const result = await permission.findPermissionByFilter(permissionCode, permissionName, pageNumber, pageSize);
    if (result.success) {
        return {
            success: true,
            pageInto: {
                pageNumber: result.data.pageNumber,
                total: result.data.total,
                start: result.data.start,
                end: result.data.end,
            },
            parentList: result.data.permissionGroups.map((item: any) => ({
                isExpanded: false,
                permissionId: item.permissionId,
                permissionNo: item.permissionNo,
                permissionCode: item.permissionCode,
                permissionName: item.permissionName,
                type: item.type,
                childrenList: item.components.map((component: any) => ({
                    permissionId: component.permissionId,
                    permissionNo: component.permissionNo,
                    type: component.type,
                    permissionCode: component.permissionCode,
                    permissionName: component.permissionName,
                    parentId: item.parentId,
                })),
            }))
        }
    } else {
        console.error(result.message);
        return {
            success: false,
            message: result.message,
            pageInto: {
                pageNumber: '0',
                total: '0',
                start: '0',
                end: '0',
            },
            parentList: []
        }
    }
}
