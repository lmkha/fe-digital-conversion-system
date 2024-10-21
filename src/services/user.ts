import user from "@/api/user";

const uploadAvatar = async (file: File) => {
    console.log(`Check file in uploadAvatar: `, file);
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
    avatar: string
) => {
    const result = await user.createUser(
        username = username,
        password = password,
        fullName = fullName,
        email = email,
        phone = phone,
        roleId = roleId,
        deptId = deptId,
        provinceId = provinceId,
        districtId = districtId,
        wardId = wardId,
        gender = gender,
        dateOfBirth = dateOfBirth,
        status = status,
        jobTitle = jobTitle,
        avatar = avatar
    )

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
    file: File,
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
) => {
    console.log(`Check file in uploadAvatarAndCreateUser: `, file);
    const uploadResult = await uploadAvatar(file);
    console.log(`Check uploadResult in uploadAvatarAndCreateUser: `, uploadResult);
    console.log(`Check upload avatar url in uploadAvatarAndCreateUser: `, uploadResult.url);
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
            message: ''
        }
    }

}

export const findUserByFilter = async (
    deptId: string,
    pageSize: string = '',
    pageNumber: string = '',
    fullName: string = '',
    username: string = '',
    email: string = '',
    phone: string = '',
    realRole: string = '',
    jobTitle: string = '',
    status: string = '',
) => {
    const result = await user.findUserByFilter(
        deptId = deptId,
        pageSize = pageSize,
        pageNumber = pageNumber,
        fullName = fullName,
        username = username,
        email = email,
        phone = phone,
        realRole = realRole,
        jobTitle = jobTitle,
        status = status
    );
    if (result.success) {
        return {
            success: true,
            message: result.message,
            data: {
                pageInfo: {
                    pageNumber: result.data.pageNumber,
                    total: result.data.total,
                    start: result.data.start,
                    end: result.data.end,
                },
                users: result.data.users.map((user: any) => {
                    return {
                        userId: user.userId,
                        username: user.userName,
                        fullName: user.fullName,
                        email: user.email,
                        phone: user.phone,
                        realRole: user.realRole,
                        jobTitle: user.jobTitle,
                        status: user.status,
                        selected: false
                    }
                })
            }
        }
    } else {
        return {
            success: false,
            message: result.message,
            data: {
                pageInfo: {
                    pageNumber: '',
                    total: '',
                    start: '',
                    end: '',
                },
                users: []
            }
        }
    }
}

export const findUserByDeptId = async (deptId: string) => {
    const result = await findUserByFilter(deptId);
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
    deptId: string

) => {
    return await user.updateUser(
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
        deptId = deptId
    );
}
