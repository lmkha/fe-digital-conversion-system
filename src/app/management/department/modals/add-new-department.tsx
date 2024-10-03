'use client';

interface AddNewDepartmentModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function AddNewDepartmentModal({ isVisible, onClose }: AddNewDepartmentModalProps) {
    if (!isVisible) return null;

    return (
        <div>
            This is AddNewDepartmentModal
        </div>
    );
}
