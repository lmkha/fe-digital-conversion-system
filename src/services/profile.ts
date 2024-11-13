import profileAPI from "@/api/profile";
import user from "@/api/user";

export const updateUserProfile = async (data: {
    userId: string;
    jobTitle: string;
    deptId: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    wardId: string | null;
    districtId: string | null;
    provinceId: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    address: string | null;
    avatarFile?: File | null;
    avatar?: string | null;
}) => {
    console.log(data);
    if (!data.avatar && data.avatarFile) {
        const avatarUploadResult = await uploadAvatar(data.avatarFile);
        if (avatarUploadResult.success) {
            return await profileAPI.updateProfile({
                ...data,
                avatar: avatarUploadResult.url,
            });
        } else {
            return {
                success: false,
                message: "Có lỗi xảy ra khi tải ảnh lên",
            };
        }
    } else {
        return await profileAPI.updateProfile({
            ...data,
            avatar: data.avatar as string,
        });
    }
};

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