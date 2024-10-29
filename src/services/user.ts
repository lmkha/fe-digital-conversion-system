import user from "@/api/user";
import { UserItem } from "./models/user-item";
import PaginationInfo from "@/core/types/pagination-info";

const uploadAvatar = async (file: File | null) => {
    if (!file) {
        return {
            success: true,
            url: ''
        }
    }
    const result = await user.uploadAvatar(file);
    if (result.success) {
        return {
            success: true,
            url: result.data.url,
        }
    } else {
        return {
            success: false,
            url: ''
        }
    }
}

const createUser = async (
    username: string,
    password: string,
    fullName: string,
    email: string,
    phone: string,
    roleId: string,
    deptId: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    gender: string,
    dateOfBirth: string,
    status: string,
    jobTitle: string,
    address: string,
    avatar: string
) => {
    const result = await user.createUser({
        username: username,
        password: password,
        fullName: fullName,
        jobTitle: jobTitle,
        roleId: roleId,
        deptId: deptId,
        avatar: avatar,
        email: email || null,
        phone: phone || null,
        provinceId: provinceId || null,
        districtId: districtId || null,
        wardId: wardId || null,
        gender: gender || null,
        dateOfBirth: dateOfBirth || null,
        status: status || null,
        address: address || null
    })

    if (result.success) {
        return {
            success: true,
            data: result.data
        }
    } else {
        return {
            success: false,
            message: result.message,
            code: result.code
        }
    }
}

export const uploadAvatarAndCreateUser = async (
    file: File | null,
    username: string,
    password: string,
    fullName: string,
    email: string,
    phone: string,
    roleId: string,
    deptId: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    gender: string,
    dateOfBirth: string,
    status: string,
    jobTitle: string,
    address: string
) => {
    const uploadResult = await uploadAvatar(file);
    if (uploadResult.success) {
        const createUserResult = await createUser(
            username,
            password,
            fullName,
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
            jobTitle,
            address,
            uploadResult.url
        )
        if (createUserResult.success) {
            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: createUserResult.message,
                code: createUserResult.code
            }
        }
    } else {
        return {
            success: false,
            message: 'Upload avatar không thành công!'
        }
    }

}

export const findUserByFilter = async ({
    deptId,
    pageSize = '',
    pageNumber = '',
    fullName = '',
    username = '',
    email = '',
    phone = '',
    realRole = '',
    jobTitle = '',
    status = ''
}: {
    deptId: string;
    pageSize?: string;
    pageNumber?: string;
    fullName?: string;
    username?: string;
    email?: string;
    phone?: string;
    realRole?: string;
    jobTitle?: string;
    status?: string;
}): Promise<{
    success: boolean;
    message: string;
    data: {
        paginationInfo: PaginationInfo
        users: UserItem[];
    };
}> => {
    const result = await user.findUserByFilter({
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
    });

    if (result.success) {
        const { pageNumber, total, start, end, users } = result.data;
        return {
            success: true,
            message: result.message,
            data: {
                paginationInfo: {
                    pageSize: 10,
                    pageNumber: pageNumber,
                    total: total,
                    start: start,
                    end: end,
                },
                users: users.map((user: any): UserItem => ({
                    userId: user.userId,
                    username: user.userName,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    realRole: user.realRole,
                    jobTitle: user.jobTitle,
                    status: user.status,
                    selected: false
                }))
            }
        };
    } else {
        return {
            success: false,
            message: result.message,
            data: {
                paginationInfo: {
                    pageSize: 0,
                    pageNumber: 0,
                    total: 0,
                    start: 0,
                    end: 0
                },
                users: []
            }
        };
    }
};

export const findUserByDeptId = async (deptId: string) => {
    const result = await findUserByFilter({ deptId: deptId });
    return result;
}

export const findUserById = async (userId: string) => {
    const result = await user.findUserById(userId);
    return result;
}

export const updateUser = async (
    userId: string,
    email: string,
    fullName: string,
    phone: string,
    wardId: string,
    districtId: string,
    provinceId: string,
    gender: string,
    dateOfBirth: string,
    status: string,
    roleId: string,
    jobTitle: string,
    deptId: string,
    address: string,
    avatar: string

) => {
    return await user.updateUser({
        userId: userId,
        roleId: roleId,
        jobTitle: jobTitle,
        deptId: deptId,
        avatar: avatar,
        fullName: fullName,
        email: email || null,
        phone: phone || null,
        wardId: wardId || null,
        districtId: districtId || null,
        provinceId: provinceId || null,
        gender: gender || null,
        dateOfBirth: dateOfBirth || null,
        status: status || null,
        address: address || null,
    });
}

export const uploadAvatarAndUpdateUser = async (
    userId: string,
    email: string,
    fullName: string,
    phone: string,
    wardId: string,
    districtId: string,
    provinceId: string,
    gender: string,
    dateOfBirth: string,
    status: string,
    roleId: string,
    jobTitle: string,
    deptId: string,
    address: string,
    avatar: File
) => {
    const uploadResult = await uploadAvatar(avatar);
    if (uploadResult.success) {
        const createUserResult = await updateUser(
            userId = userId,
            email = email,
            fullName = fullName,
            phone = phone,
            wardId = wardId,
            districtId = districtId,
            provinceId = provinceId,
            gender = gender,
            dateOfBirth = dateOfBirth,
            status = status,
            roleId = roleId,
            jobTitle = jobTitle,
            deptId = deptId,
            address = address,
            avatar = uploadResult.url
        )
        if (createUserResult.success) {
            return {
                success: true,
                avatar: uploadResult.url
            }
        } else {
            return {
                success: false,
                message: createUserResult.message,
                code: createUserResult.code
            }
        }
    } else {
        return {
            success: false,
            message: 'Upload avatar thất bại!'
        }
    }
}

export const changeUserStatus = async (userId: string, status: string) => {
    return await user.changeUserStatus(userId, status);
}

export const deleteUsers = async (userIds: string[]) => {
    return await user.deleteUsers(userIds);
}
