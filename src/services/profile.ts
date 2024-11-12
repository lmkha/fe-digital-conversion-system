import profileAPI from "@/api/profile";

export const updateUserProfile = async (data: {
    userId: string;
    jobTitle: string;
    deptId: string;
    avatar: string;
    fullName: string;
    email: string | null;
    phone: string | null;
    wardId: string | null;
    districtId: string | null;
    provinceId: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    status: string | null;
    address: string | null;
}) => {
    return await profileAPI.updateProfile(data);
};