'use client';
import { useManagementUser } from "@/contexts/management-user-context";

export default function PreviewPage() {
    const { previewUserList } = useManagementUser();
    return (
        <div>
            {/* Hiển thị viewViewList */}
        </div>
    );
}