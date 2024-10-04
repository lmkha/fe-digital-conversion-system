'use client';

import BaseDepartmentModal, { BaseDepartmentModalProps } from "./base-department-modal";


export default function EditDepartmentModal({ label, isVisible, onSubmit, onClose }: BaseDepartmentModalProps) {
    return (
        <BaseDepartmentModal
            label={label}
            isVisible={isVisible}
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );
}
