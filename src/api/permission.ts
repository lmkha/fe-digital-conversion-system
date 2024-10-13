import Base from "./base";

class PermissionAPI extends Base {
    async findPermissionByFilter(
        permissionCode: string,
        permissionName: string,
        pageNumber: string,
        pageSize: string
    ) {
        try {
            const partOfPermissionCode = permissionCode ? `&permissionCode=${permissionCode}` : '';
            const partOfPermissionName = permissionName ? `&permissionName=${permissionName}` : '';
            const partOfPageNumber = pageNumber ? `&pageNumber=${pageNumber}` : '';
            const partOfPageSize = pageSize ? `&pageSize=${pageSize}` : '';
            const url = `/permission/find-filter?${partOfPermissionCode}${partOfPermissionName}${partOfPageNumber}${partOfPageSize}`;
            const response = await this.get(url);
            return {
                success: true,
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

const permission = new PermissionAPI();
export default permission;
