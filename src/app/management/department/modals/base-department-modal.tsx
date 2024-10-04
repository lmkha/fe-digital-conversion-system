'use client';

import { useEffect, useRef } from "react";
import ActionButton from "../../components/button";
import Dropdown from "@/core/components/dropdown";
import { MdCancelPresentation } from "react-icons/md";

export interface BaseDepartmentModalProps {
    label: string;
    isVisible: boolean;
    onSubmit: () => void;
    onClose: () => void;
}

export default function BaseDepartmentModal({ label, isVisible, onSubmit, onClose }: BaseDepartmentModalProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" />

            {/* Modal content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    ref={ref}
                    className="flex-col bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/3" // Tailwind classes for width and height
                >
                    <div className="flex justify-between items-start">
                        <h1 className="text-black text-xl font-bold mb-4">{label}</h1>
                        <button
                            onClick={onClose}
                        >
                            {<MdCancelPresentation className="text-black text-3xl hover:text-red-500" />}
                        </button>
                    </div>
                    <div className="flex justify-between mb-4 w-full gap-4">
                        <div className="w-1/2">
                            <Dropdown
                                label="Department name"
                                options={[
                                    { deptId: "1", deptName: "Ủy ban nhân dân Thành phố Hồ Chí Minh" },
                                ]}
                                selectedValue="1"
                                onChange={(department) => {
                                    console.log(department);
                                }}
                            />
                        </div>
                        <div className="w-1/2">
                            <Dropdown
                                label="Province/ City"
                                options={[
                                    { deptId: "1", deptName: "Tỉnh Đắk Nông" },
                                ]}
                                selectedValue="1"
                                onChange={(department) => {
                                    console.log(department);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mb-4 w-full gap-4">
                        <div className="w-1/2">
                            <Dropdown
                                label="District"
                                options={[
                                    { deptId: "1", deptName: "Thành phố Gia Nghĩa" },
                                ]}
                                selectedValue="1"
                                onChange={(department) => {
                                    console.log(department);
                                }}
                            />
                        </div>
                        <div className="w-1/2">
                            <Dropdown
                                label="Ward"
                                options={[
                                    { deptId: "1", deptName: "Phường 1" },
                                ]}
                                selectedValue="1"
                                onChange={(department) => {
                                    console.log(department);
                                }}
                            />
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="flex justify-end h-1/5">
                        <ActionButton
                            type="save"
                            label="Save"
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
