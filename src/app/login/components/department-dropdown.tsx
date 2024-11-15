import React from 'react';

interface Department {
    deptId: string;
    deptName: string;
}

interface DepartmentDropdownProps {
    departmentOptions: Department[];
    selectedValue: string;
    onChange: (department: Department) => void;
}

export default function DepartmentDropdown({ departmentOptions, selectedValue, onChange }: DepartmentDropdownProps) {
    return (
        <div className="relative">
            <select
                id="department"
                className="peer h-10 w-full border border-gray-300 rounded px-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedValue}
                onChange={(e) => {
                    const selectedDeptId = e.target.value;
                    const selectedDepartment = departmentOptions.find(dept => dept.deptId === selectedDeptId);
                    onChange(selectedDepartment!!);
                }}
            >
                <option value="" disabled hidden>
                    Chọn đơn vị
                </option>
                {departmentOptions.map((department) => (
                    <option key={department.deptId} value={department.deptId}>
                        {department.deptName}
                    </option>
                ))}
            </select>
            <label
                htmlFor="department"
                className="absolute left-3 top-[-6px] text-xs text-gray-500 bg-white px-1 transition-all peer-focus:text-blue-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-text-gray-400 z-10"
            >
                Đơn vị *
            </label>
        </div>
    );
};

