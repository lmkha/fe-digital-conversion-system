import { ManagementUserProvider } from "@/contexts/management-user-context";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ManagementUserProvider>
            {children}
        </ManagementUserProvider>
    );
}
