import department from "@/api/department";
import address from "@/api/address";
import PaginationInfo from "@/core/types/pagination-info";
import { DepartmentItem } from "./models/department-item";

export interface Province {
    provinceId: string;
    provinceName: string;
}
export interface District {
    districtId: string;
    districtName: string;
}
export interface Ward {
    wardId: string;
    wardName: string;
}
export interface BasicDepartment {
    deptId: string;
    deptName: string;
}
export interface CheckedItem {
    id: string;
}
export interface FilterData {
    departmentName: string;
    level: string;
    district: string;
    ward: string;
}

// Call API =========================================================================================================
export const getProvinces = async (): Promise<Province[]> => {
    const result = await address.getProvinces();
    if (result.success) {
        return result.data;
    } else {
        console.error("Error fetching provinces:", result.message);
        return [];
    }
}

export const getDistricts = async (provinceId: string): Promise<District[]> => {
    const result = await address.getDistricts(provinceId);
    if (result.success) {
        return result.data.map((district: any) => ({
            districtId: district.districtId,
            districtName: district.districtName
        }));
    } else {
        console.error("Error fetching districts:", result.message);
        return [];
    }
}

export const getWards = async (districtId: string): Promise<Ward[]> => {
    const result = await address.getWards(districtId);
    if (result.success) {
        return result.data.map((ward: any) => ({
            wardId: ward.wardId,
            wardName: ward.wardName
        }));
    } else {
        console.error("Error fetching wards:", result.message);
        return [];
    }
}

export const getDepartments = async (): Promise<DepartmentItem[]> => {
    const result = await department.getDepartments();
    console.log(result.data);
    if (result.success) {
        return result.data.map((dept: any): DepartmentItem => ({
            deptId: dept.deptId,
            deptName: dept.deptName,
            level: dept.level,
            provinceId: dept.provinceId,
            districtId: dept.districtId,
            wardId: dept.wardId,
            provinceName: dept.provinceName,
            districtName: dept.districtName,
            wardName: dept.wardName,
            selected: false
        }));
    } else {
        console.error("Error fetching departments:", result.message);
        return [];
    }
};

export const getDepartmentById = async (deptId: string): Promise<DepartmentItem> => {
    const result = await department.getDepartmentById(deptId);
    if (result.success) {
        return {
            deptId: result.data.deptId,
            deptName: result.data.deptName,
            level: result.data.level,
            provinceId: result.data.provinceId,
            districtId: result.data.districtId,
            wardId: result.data.wardId,
            provinceName: result.data.provinceName,
            districtName: result.data.districtName,
            wardName: result.data.wardName,
            selected: false
        }
    } else {
        console.error("Error fetching department by id:", result.message);
        return {
            deptId: '',
            deptName: '',
            level: 0,
            provinceId: '',
            districtId: '',
            wardId: '',
            provinceName: '',
            districtName: '',
            wardName: '',
            selected: false
        };
    }
}

export const deleteDepartments = async (ids: string[]) => {
    const result = await department.deleteDepartments(ids);
    return result;
}

export const createDepartment = async (
    data: {
        deptName: string;
        wardId: string;
        districtId: string;
        provinceId: string;
        parentId: string;
    }) => {
    const result = await department.createDepartment(data);
    return result;
}

export const createDepartmentLevel1 = async (
    data: {
        deptName: string;
        wardId: string;
        districtId: string;
        provinceId: string;
    },
) => {
    const result = await department.createDepartment(data);
    return result;
}

export const updateDepartment = async (
    data: {
        deptId: string;
        deptName: string;
        wardId: string;
        districtId: string;
        provinceId: string;
    }
) => {
    const result = await department.updateDepartment(data);
    return result;
}

export const findDepartmentsByFilter = async (
    provinceId: string,
    parentId: string,
    deptName: string,
    level: string,
    wardName: string,
    districtName: string,
    pageSize: string,
    pageNumber: string,
): Promise<DepartmentItem[]> => {
    const result = await department.findDepartmentsByFilter(provinceId, parentId, deptName, level, wardName, districtName, pageSize, pageNumber);

    if (result.success) {
        return result.data.depts.map((dept: any): DepartmentItem => ({
            deptName: dept.deptname,
            deptId: dept.deptid,
            level: dept.level,
            provinceName: dept.provincename,
            districtName: dept.districtname,
            wardName: dept.wardname,
            provinceId: '',
            districtId: '',
            wardId: '',
            selected: false
        }));
    } else {
        console.error("Error filtering department:", result.message);
        return [];
    }
}

export const findDepartmentsByFilterWithPageInfo = async ({
    provinceId,
    parentId,
    deptName = '',
    level = '',
    wardName = '',
    districtName = '',
    pageSize = '',
    pageNumber = '',
}: {
    provinceId: string,
    parentId: string,
    deptName?: string,
    level?: string,
    wardName?: string,
    districtName?: string,
    pageSize?: string,
    pageNumber?: string,
}): Promise<{
    paginationInfo: PaginationInfo,
    departments: DepartmentItem[]
}> => {
    const result = await department.findDepartmentsByFilter(provinceId, parentId, deptName, level, wardName, districtName, pageSize, pageNumber);
    if (result.success) {
        return {
            paginationInfo: {
                pageSize: 10,
                pageNumber: result.data.pageNumber,
                total: result.data.total,
                start: result.data.start,
                end: result.data.end,
            },
            departments: result.data.depts.map((dept: any): DepartmentItem => ({
                deptName: dept.deptname,
                deptId: dept.deptid,
                level: dept.level,
                provinceName: dept.provincename,
                districtName: dept.districtname,
                wardName: dept.wardname,
                provinceId: '',
                districtId: '',
                wardId: '',
                selected: false
            }))
        }
    } else {
        console.error("Error filtering department:", result.message);
        return {
            paginationInfo: {
                pageSize: 0,
                pageNumber: 0,
                total: 0,
                start: 0,
                end: 0
            },
            departments: []
        }
    }
}

export const downloadDepartmentsExcelFile = async (
    provinceId: string,
    parentId: string,
    deptName: string,
    level: string,
    wardName: string,
    districtName: string,
    pageSize: string,
    pageNumber: string,
) => {
    const result = await department.downloadDepartmentsExcelFile(provinceId, parentId, deptName, level, wardName, districtName, pageSize, pageNumber);
    return result;
}
