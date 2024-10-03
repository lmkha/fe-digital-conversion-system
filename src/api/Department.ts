// Department.ts
import Base from "./base";

export interface Department {
    deptId: string;
    deptName: string;
}

class DepartmentAPI extends Base {
    async getDepartments(): Promise<Department[]> {
        try {
            const response = await this.get('/department');
            return response.data.map((dept: any) => ({
                deptId: dept.deptId,
                deptName: dept.deptName
            }));
        } catch (err) {
            console.error("Error fetching departments:", err);
            throw err;
        }
    }
}

const department = new DepartmentAPI();
export default department;
