import Base from "./base";

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

class AddressAPI extends Base {
    async getProvinces() {
        try {
            const response = await this.get('/province');
            const data = response.data.map((province: any) => ({
                provinceId: province.provinceId,
                provinceName: province.provinceName
            }));
            return {
                success: true,
                data: data,
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

    async getDistricts(provinceId: string) {
        try {
            const response = await this.get(`/district/find-by-province/?provinceId=${provinceId}`);
            const data = response.data.map((district: any) => ({
                districtId: district.districtId,
                districtName: district.districtName
            }));
            return {
                success: true,
                data: data,
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

    async getWards(districtId: string) {
        try {
            const response = await this.get(`/ward/find-by-district/?districtId=${districtId}`);
            const data = response.data.map((ward: any) => ({
                wardId: ward.wardId,
                wardName: ward.wardName
            }));
            return {
                success: true,
                data: data,
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
}
const address = new AddressAPI();
export default address;
