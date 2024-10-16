import { useEffect, useState } from "react";
import Image from "next/image";
import isValidPassword from "@/core/logic/password-validator";
import department from "@/api/department";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Combobox from "@/core/components/combobox";
import Password from "./password";
import { TextField } from "@mui/material";

interface Department {
    deptId: string;
    deptName: string;
}

interface DataToSubmit {
    username: string;
    password: string;
    deptId: string;
}

interface LoginFormProps {
    validateInput: (result: { status: 'success' | 'error'; message: string }) => void;
    onLogin(data: DataToSubmit): void;
    onShowForgotModal: () => void;
}


export default function LoginForm({ validateInput = () => { }, onLogin, onShowForgotModal }: LoginFormProps) {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const result = await department.getDepartments();
            if (result.success) {
                const data = result.data;
                setDepartments(data);
            } else {
                console.error("Error fetching departments:", result.message);
            }
        };

        fetchDepartments();
    }, []);

    const [formData, setFormData] = useState({
        unit: departments[0] || { deptId: '', deptName: '' },
        username: '',
        password: '',
        rememberPassword: false,
        showPassword: false,
        submitted: false,
        isLoading: false
    });

    const handleChange = (name: string, value: string | boolean | Department) => { // Allow Department type
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        setFormData({ ...formData, isLoading: true });
        event.preventDefault();
        if (formData.username === '' || formData.password === '') {
            validateInput({ status: 'error', message: 'Vui lòng nhập đầy đủ thông tin' });
        } else if (!isValidPassword(formData.password)) {
            validateInput({ status: 'error', message: 'Mật khẩu không đủ yêu cầu' });
        } else {
            validateInput({ status: 'success', message: 'Input đúng yêu cầu' });
            // Validate passed, call onLogin
            const dataToSubmit = {
                username: formData.username,
                password: formData.password,
                deptId: formData.unit.deptId
            };
            onLogin(dataToSubmit);
        }
        setFormData({ ...formData, isLoading: false });
        setFormData({ ...formData, submitted: true });
    };

    return (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-black">
            <div className="flex justify-center mb-6 bg-white">
                <Image src="/img/gov_logo.png" width={100} height={100} alt="Government Logo" />
            </div>

            <h2 className="text-center text-xl font-bold text-gray-800 mb-4">Hệ thống đánh giá chuyển đổi số DTI</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <Combobox
                    value={{ id: formData.unit.deptId, name: formData.unit.deptName }}
                    className="w-full"
                    label="Đơn vị *"
                    options={departments.map(dept => ({ id: dept.deptId, name: dept.deptName }))}
                    onChange={(department) => handleChange('unit', { deptId: department.id, deptName: department.name })}
                />

                <TextField
                    fullWidth
                    label="Tên tài khoản *"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)} // MUI uses event.target.value to get input value
                    variant="outlined"
                    error={formData.submitted && !formData.username} // Example: show error if form is submitted and username is empty
                    helperText={formData.submitted && !formData.username ? "Tên tài khoản là bắt buộc" : ""} // Custom error message
                />

                <Password
                    showPassword={formData.showPassword}
                    isError={formData.submitted && !isValidPassword(formData.password)}
                    helperText="Mật khẩu không đủ yêu cầu"
                    onChange={(value) => handleChange('password', value)}
                    validatePassword={(password) => isValidPassword(password)}
                    onChangeShowPassword={() => handleChange('showPassword', !formData.showPassword)}
                />

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberPassword"
                            name="rememberPassword"
                            className="mr-2"
                            checked={formData.rememberPassword}
                            onChange={() => handleChange('rememberPassword', !formData.rememberPassword)}
                        />
                        <label htmlFor="rememberPassword" className="text-gray-700">Nhớ mật khẩu</label>
                    </div>

                    <a onClick={onShowForgotModal} className="text-blue-500 hover:underline bg-transparent border-none p-0">
                        Quên mật khẩu?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Đăng nhập {formData.isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                </button>
            </form>
        </div>
    );
}
