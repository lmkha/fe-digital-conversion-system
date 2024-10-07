import department from "@/api/department";
import address from "@/api/address";

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
export interface DetailedDepartment {
    deptId: string;
    deptName: string;
    level: number;
    provinceId: string;
    districtId: string;
    wardId: string;
    provinceName: string;
    districtName: string;
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
export const getProvinces = async (
    setProvinceList: React.Dispatch<React.SetStateAction<Province[]>>
) => {
    const result = await address.getProvinces();
    if (result.success) {
        setProvinceList(result.data);
    } else {
        console.error("Error fetching provinces:", result.message);
        setProvinceList([]);
    }
}

export const getDistricts = async (
    provinceId: string,
    setDistrictList: React.Dispatch<React.SetStateAction<District[]>>
) => {
    const result = await address.getDistricts(provinceId);
    if (result.success) {
        setDistrictList(result.data.map((district: any) => ({
            districtId: district.districtId,
            districtName: district.districtName
        })));
    } else {
        console.error("Error fetching districts:", result.message);
        setDistrictList([]);
    }
}

export const getWards = async (
    districtId: string,
    setWardList: React.Dispatch<React.SetStateAction<Ward[]>>
) => {
    const result = await address.getWards(districtId);
    if (result.success) {
        setWardList(result.data.map((ward: any) => ({
            wardId: ward.wardId,
            wardName: ward.wardName
        })));
    } else {
        console.error("Error fetching wards:", result.message);
        setWardList([]);
    }
}

export const getDepartments = async (
    setDepartmentList: React.Dispatch<React.SetStateAction<{
        department: DetailedDepartment;
        isCheck: boolean;
    }[]>>
) => {
    const result = await department.getDepartments();
    console.log(result.data);
    if (result.success) {
        setDepartmentList(result.data.map((dept: any) => ({
            department: {
                deptId: dept.deptId,
                deptName: dept.deptName,
                level: dept.level,
                provinceId: dept.provinceId,
                districtId: dept.districtId,
                wardId: dept.wardId,
                provinceName: dept.provinceName,
                districtName: dept.districtName,
                wardName: dept.wardName
            },
            isCheck: false
        })));
    } else {
        console.error("Error fetching departments:", result.message);
        setDepartmentList([]);
    }
};

export const getDepartmentById = async (
    deptId: string,
    setDetailedDepartment: React.Dispatch<React.SetStateAction<DetailedDepartment>>
) => {
    const result = await department.getDepartmentById(deptId);
    if (result.success) {
        setDetailedDepartment({
            deptId: result.data.deptId,
            deptName: result.data.deptName,
            level: result.data.level,
            provinceId: result.data.provinceId,
            districtId: result.data.districtId,
            wardId: result.data.wardId,
            provinceName: result.data.provinceName,
            districtName: result.data.districtName,
            wardName: result.data.wardName
        });
    } else {
        console.error("Error fetching department by id:", result.message);
    }
}

export const deleteDepartments = async (
    ids: string[],
) => {
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
    },
) => {
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

export const findDepartmentFilter = async (
    provinceId: string,
    parentId: string,
    deptName: string,
    level: number,
    setDetailedDepartmentList: React.Dispatch<React.SetStateAction<DetailedDepartment[]>>
) => {
    const result = await department.findDepartmentFilter(provinceId, parentId, deptName, level);
    if (result.success) {
        setDetailedDepartmentList(result.data.depts.map((dept: any) => ({
            deptId: dept.deptid,
            deptName: dept.deptname,
            level: dept.level,
            provinceName: dept.provincename,
            districtName: dept.districtname,
            wardName: dept.wardname,
            provinceId: '',
            districtId: '',
            wardId: ''
        })));
    } else {
        console.error("Error filtering department:", result.message);
        setDetailedDepartmentList([]);
    }
}

export const findDepartmentFilterFull = async (
    provinceId: string,
    parentId: string,
    deptName: string,
    level: string,
    wardName: string,
    districtName: string,
    pageSize: string,
    pageNumber: string,
    setDetailedDepartmentList: React.Dispatch<React.SetStateAction<DetailedDepartment[]>>
) => {
    const result = await department.findDepartmentFilterFull(provinceId, parentId, deptName, level, wardName, districtName, pageSize, pageNumber);
    if (result.success) {
        setDetailedDepartmentList(result.data.depts.map((dept: any) => ({
            deptName: dept.deptname,
            deptId: dept.deptid,
            level: dept.level,
            provinceName: dept.provincename,
            districtName: dept.districtname,
            wardName: dept.wardname,
            provinceId: '',
            districtId: '',
            wardId: ''
        })));
    } else {
        console.error("Error filtering department:", result.message);
        setDetailedDepartmentList([]);
    }
}

//=========================================================================================================
// Handle isCheck change
export const handleIsCheckChange = (
    id: string,
    isCheck: boolean,
    setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItem[]>>,
    setDepartmentList: React.Dispatch<React.SetStateAction<{
        department: DetailedDepartment;
        isCheck: boolean
    }[]>>
) => {
    if (isCheck) {
        setCheckedItems(prevSelectedData => [
            ...prevSelectedData,
            { id }
        ]);
    } else {
        setCheckedItems(prevSelectedData =>
            prevSelectedData.filter(item => item.id !== id)
        );
    }

    setDepartmentList(prevDepartmentList =>
        prevDepartmentList.map(department =>
            department.department.deptId === id
                ? { ...department, isCheck }
                : department
        )
    );
};

// Handle select all
export const handleSelectAll = (
    departmentList: {
        department: DetailedDepartment;
        isCheck: boolean
    }[],
    setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItem[]>>,
    setDepartmentList: React.Dispatch<React.SetStateAction<{
        department: DetailedDepartment;
        isCheck: boolean
    }[]>>
) => {
    console.log('Select all');

    setDepartmentList(prevDepartmentList =>
        prevDepartmentList.map(department =>
            ({ ...department, isCheck: true })
        )
    );

    setCheckedItems(
        departmentList.map(item => ({ id: item.department.deptId }))
    );
};

// Handle unselect all
export const handleUnselectAll = (
    setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItem[]>>,
    setDepartmentList: React.Dispatch<React.SetStateAction<{
        department: DetailedDepartment;
        isCheck: boolean
    }[]>>
) => {
    console.log('Unselect all');

    setDepartmentList(prevDepartmentList =>
        prevDepartmentList.map(department =>
            ({ ...department, isCheck: false })
        )
    );

    setCheckedItems([]);
};

// Handle selector data change
