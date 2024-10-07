// Department.ts
import Base from "./base";

class DepartmentAPI extends Base {
    async getDepartments() {
        try {
            const response = await this.get('/department?provinceId');
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
            };
        }
    }

    async getDepartmentById(id: string) {
        try {
            const response = await this.get(`/department/find-by-id?deptId=${id}`);
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
            };
        }
    }

    async deleteDepartments(ids: string[]) {
        try {
            const response = await this.post('/department/delete', {
                deptIds: ids
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

    async createDepartment(
        data: {
            deptName: string;
            wardId: string;
            districtId: string;
            provinceId: string;
            parentId?: string | null;
        }
    ) {
        try {
            const response = await this.post('/department/create', data);
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

    async updateDepartment(
        data: {
            deptId: string;
            deptName: string;
            wardId: string;
            districtId: string;
            provinceId: string;
        }
    ) {
        try {
            const response = await this.put('/department/update', data);
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

    async findDepartmentFilter(provinceId: string, parentId: string, deptName: string, level: number) {
        try {
            const url = parentId ? `/department/find-filter?provinceId=${provinceId}&parentId=${parentId}&deptName=${deptName}&level=${level}` :
                `/department/find-filter?provinceId=${provinceId}&deptName=${deptName}&level=${level}`;
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

    async findDepartmentFilterFull(
        provinceId: string,
        parentId: string,
        deptName: string,
        level: string,
        wardName: string,
        districtName: string,
        pageSize: string,
        pageNumber: string
    ) {
        try {
            const partOfParentId = parentId ? `&parentId=${parentId}` : '';
            const partOfDeptName = deptName ? `&deptName=${deptName}` : '';
            const partOfLevel = level ? `&level=${level}` : '';
            const partOfWardName = wardName ? `&wardName=${wardName}` : '';
            const partOfDistrictName = districtName ? `&districtName=${districtName}` : '';
            const partOfPageSize = pageSize ? `&pageSize=${pageSize}` : '';
            const partOfPageNumber = pageNumber ? `&pageNumber=${pageNumber}` : '';
            const url = `/department/find-filter?provinceId=${provinceId}${partOfParentId}${partOfDeptName}${partOfLevel}${partOfWardName}${partOfDistrictName}${partOfPageSize}${partOfPageNumber}`;
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

const department = new DepartmentAPI();
export default department;
