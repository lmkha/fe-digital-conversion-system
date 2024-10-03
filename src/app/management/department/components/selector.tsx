'use client';

import Dropdown from "@/core/components/dropdown";

export default function Selector() {
    return (
        <div className="flex justify-between items-center w-full h-11 mt-6 pb-4 bg-white border-b-1">
            <Dropdown
                label="Provinces"
                options={[
                    { deptId: "1", deptName: "Thành phố Hồ Chí Minh" },
                ]}
                selectedValue="1"
                onChange={(department) => {
                    console.log(department);
                }}
            />

            <Dropdown
                label=""
                options={[
                    { deptId: "0", deptName: "Department level 1" },
                ]}
                selectedValue="1"
                onChange={(department) => {
                    console.log(department);
                }}
            />

            <Dropdown
                label=""
                options={[
                    { deptId: "0", deptName: "Department level 2" },
                ]}
                selectedValue="1"
                onChange={(department) => {
                    console.log(department);
                }}
            />

            <Dropdown
                label=""
                options={[
                    { deptId: "0", deptName: "Department level 3" },
                ]}
                selectedValue="1"
                onChange={(department) => {
                    console.log(department);
                }}
            />

            <Dropdown
                label=""
                options={[
                    { deptId: "0", deptName: "Department level 4" },
                ]}
                selectedValue="1"
                onChange={(department) => {
                    console.log(department);
                }}
            />
        </div>
    );
}
