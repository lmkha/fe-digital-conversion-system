import user from "@/api/user";
import { UserItem } from "./models/user-item";
import PaginationInfo from "@/core/types/pagination-info";
import UserDescription from "./models/user-description";
import { PreviewUserList } from "@/contexts/management-user-context";

const uploadAvatar = async (file: File | null) => {
  if (!file) {
    return {
      success: true,
      url: "",
    };
  }
  const result = await user.uploadAvatar(file);
  if (result.success) {
    return {
      success: true,
      url: result.data.url,
    };
  } else {
    return {
      success: false,
      url: "",
    };
  }
};

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
    address: address || null,
  });

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      message: result.message,
      code: result.code,
    };
  }
};

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
    );
    if (createUserResult.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: createUserResult.message,
        code: createUserResult.code,
      };
    }
  } else {
    return {
      success: false,
      message: "Upload avatar không thành công!",
    };
  }
};

export const findUserByFilter = async ({
  deptId,
  pageSize = "",
  pageNumber = "",
  fullName = "",
  username = "",
  email = "",
  phone = "",
  realRole = "",
  jobTitle = "",
  status = "",
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
    paginationInfo: PaginationInfo;
    users: UserItem[];
  };
}> => {
  const result = await user.findUserByFilter({
    deptId: deptId,
    pageSize: pageSize || null,
    pageNumber: pageNumber || null,
    fullName: fullName || null,
    username: username || null,
    email: email || null,
    phone: phone || null,
    realRole: realRole || null,
    jobTitle: jobTitle || null,
    status: status || null,
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
        users: users.map(
          (user: any): UserItem => ({
            userId: user.userId,
            username: user.userName,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            realRole: user.realRole,
            jobTitle: user.jobTitle,
            status: user.status,
            selected: false,
          })
        ),
      },
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
          end: 0,
        },
        users: [],
      },
    };
  }
};

export const findUserByDeptId = async (deptId: string) => {
  const result = await findUserByFilter({ deptId: deptId });
  return result;
};

export const findUserById = async (userId: string) => {
  const result = await user.findUserById(userId);
  return result;
};

export const checkEmail = async (email: string) => {
  const result = await user.checkEmail(email);
  return result;
};

export const checkUserName = async (userName: string) => {
  const result = await user.checkUserName(userName);
  return result;
};

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
};

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
      (userId = userId),
      (email = email),
      (fullName = fullName),
      (phone = phone),
      (wardId = wardId),
      (districtId = districtId),
      (provinceId = provinceId),
      (gender = gender),
      (dateOfBirth = dateOfBirth),
      (status = status),
      (roleId = roleId),
      (jobTitle = jobTitle),
      (deptId = deptId),
      (address = address),
      (avatar = uploadResult.url)
    );
    if (createUserResult.success) {
      return {
        success: true,
        avatar: uploadResult.url,
      };
    } else {
      return {
        success: false,
        message: createUserResult.message,
        code: createUserResult.code,
      };
    }
  } else {
    return {
      success: false,
      message: "Upload avatar thất bại!",
    };
  }
};

export const changeUserStatus = async (userId: string, status: string) => {
  return await user.changeUserStatus(userId, status);
};

export const deleteUsers = async (userIds: string[]) => {
  return await user.deleteUsers(userIds);
};

export const downloadUserTemplate = async (deptId: string) => {
  return await user.downloadUserTemplate(deptId);
};

export const importUsers = async (users: PreviewUserList) => {
  const result = await user.importUsers(users);
  return {
    success: result.success,
    message: result.message,
    data: {
      countSuccess: result?.data?.countSuccess,
      countError: result?.data?.countError,
      errorUsers: result?.data?.userError.map(
        (errorUser: any) =>
          ({
            userName: errorUser.userName,
            fullName: errorUser.fullName,
            email: errorUser.email,
            jobTitle: errorUser.jobTitle,
            role: errorUser.role,
            description: errorUser.description,
            success: errorUser.success,
            deptId: errorUser.deptId,
          } as UserDescription)
      ) as PreviewUserList,
    },
  };
};

export const previewUser = async (file: File, deptId: string) => {
  const result = await user.previewUser(file, deptId);
  return {
    success: result.success,
    message: result.message,
    data: {
      users: result?.data?.map(
        (user: any) =>
          ({
            ...user,
          } as UserDescription)
      ) as UserDescription[],
    },
  };
};

export const validateUser = async (users: PreviewUserList) => {
  const result = await user.validateUser(users);
  return {
    success: result.success,
    message: result.message,
    data: {
      users: result?.data?.map(
        (user: any) =>
          ({
            ...user,
          } as UserDescription)
      ) as UserDescription[],
    },
  };
};

export const downloadUserError = async (
  listUserError: PreviewUserList,
  deptId: string
) => {
  return await user.downLoadUserError(listUserError, deptId);
};

export const downloadUsersExcelFile = async ({
  deptId,
  pageSize = "",
  pageNumber = "",
  fullName = "",
  username = "",
  email = "",
  phone = "",
  realRole = "",
  jobTitle = "",
  status = "",
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
}) => {
  return user.downloadUsersExcelFile({
    deptId: deptId,
    pageSize: pageSize || null,
    pageNumber: pageNumber || null,
    fullName: fullName || null,
    username: username || null,
    email: email || null,
    phone: phone || null,
    realRole: realRole || null,
    jobTitle: jobTitle || null,
    status: status || null,
  });
};

export const provideRandomPassword = async (userId: string) => {
  return await user.changeRandomPassword(userId);
};
