import Base from "./base";

class ProfileAPI extends Base {
    async updateProfile({
        userId,
        jobTitle,
        deptId,
        avatar,
        fullName,
        email,
        phone,
        wardId,
        districtId,
        provinceId,
        gender,
        dateOfBirth,
        status,
        address,
    }: {
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
    }) {
        try {
            const response = await this.put('/user/update-profile', {
                userId: userId,
                email: email,
                fullName: fullName,
                phone: phone,
                wardId: wardId,
                districtId: districtId,
                provinceId: provinceId,
                gender: gender,
                dateOfBirth: dateOfBirth,
                status: status,
                jobTitle: jobTitle,
                deptId: deptId,
                address: address,
                avatar: avatar,
            })
            return {
                success: response.success,
                message: response.message,
                data: response.data
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

const profileAPI = new ProfileAPI();
export default profileAPI;
