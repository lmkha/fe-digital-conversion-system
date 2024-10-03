import { useEffect, useState } from "react";
import LoginButton from "./login-button";
import TextInput from "@/core/components/text-input";
import PasswordInput from "./password-input";
import Image from "next/image";
import isValidPassword from "@/core/logic/password-validator";
import department from "@/api/department";
import DepartmentDropdown from "./department-dropdown";

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
            try {
                const data = await department.getDepartments();
                setDepartments(data);
            } catch (err) {

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
        submitted: false
    });

    const handleChange = (name: string, value: string | boolean | Department) => { // Allow Department type
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (formData.username === '' || formData.password === '') {
            validateInput({ status: 'error', message: 'Vui lòng nhập đầy đủ thông tin' });
        } else if (!isValidPassword(formData.password)) {
            validateInput({ status: 'error', message: 'Mật khẩu không đủ yêu cầu' });
            console.log(`Password ${formData.password} is invalid`);
        } else {
            validateInput({ status: 'success', message: 'Input đúng yêu cầu' });
            // Validate passed, call onLogin
            const dataToSubmit = {
                username: formData.username,
                password: formData.password,
                deptId: formData.unit.deptId
            };
            console.log('Submitting form with data:', dataToSubmit);
            onLogin(dataToSubmit);
        }

        setFormData({ ...formData, submitted: true });

    };

    return (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-6 bg-white">
                <Image src="/img/gov_logo.png" width={100} height={100} alt="Government Logo" />
            </div>

            <h2 className="text-center text-xl font-bold text-gray-800 mb-4">DTI Digital Conversion System</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <DepartmentDropdown
                    departmentOptions={departments}
                    selectedValue={formData.unit.deptId}
                    onChange={(value: Department) => handleChange('unit', value)}
                />

                <TextInput
                    textLabel="Tên tài khoản *"
                    value={formData.username}
                    onChange={(value) => handleChange('username', value)}
                />

                <PasswordInput
                    value={formData.password}
                    onChange={(value) => handleChange('password', value)}
                    showPassword={formData.showPassword}
                    toggleShowPassword={() => handleChange('showPassword', !formData.showPassword)}
                    highlightWhenEmpty={formData.submitted}
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

                <LoginButton onClick={() => { }} />
            </form>
        </div>
    );
}
