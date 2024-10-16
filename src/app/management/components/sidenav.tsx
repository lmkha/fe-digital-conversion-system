'use client';

import Image from "next/image";
import Link from "next/link"
import { BiMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { LuDot } from "react-icons/lu";
import { useAuth } from '@/contexts/auth-context';
import { useUserInfo } from "@/contexts/user-info-context";

export default function SideNav() {
    return (
        <div className="w-auto h-full bg-checkVarPrimary flex flex-col justify-between">
            <div>
                <TopSideNav />
                <MiddleSideNav />
            </div>
            <BottomSideNav />
        </div>
    );
}

const TopSideNav = () => {
    const { userInfo } = useUserInfo();
    return (
        <div className="flex justify-between items-center h-20 px-1 gap-1 text-white text-sm border-b-2 border-white">
            {/* gov_logo */}
            <Image src="/img/gov_logo.png" alt="gov_logo" width={40} height={40} />
            {/* Department name */}
            <ul>
                <li className="text-center">{userInfo.dept.deptName}</li>
            </ul>
            {/* Action button */}
            <BiMenu className="text-3xl" />
        </div>
    );
}

const MiddleSideNav = () => {
    /* System toggle, manage department, permission, role, user, report configuration */
    const list = [
        { route: 'department', name: 'Phòng ban' },
        { route: 'permission', name: 'Phân quyền' },
        { route: 'role', name: 'Vai trò' },
        { route: 'user', name: 'Người dùng' },
        { route: 'report-configuration', name: 'Cấu hình báo cáo' },
    ]
    const [activeLink, setActiveLink] = useState<string | null>(null); const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const [icon, setIcon] = useState(<IoMdArrowDropright className="text-2xl" />);

    useEffect(() => {
        if (isOpen) {
            setIcon(<IoMdArrowDropdown className="text-2xl" />);
        } else {
            setIcon(<IoMdArrowDropright className="text-2xl" />);
        }

    }, [isOpen]);

    const handleLinkClick = (route: string) => {
        setActiveLink(route);
    };

    return (
        <div className="pt-2 text-white">
            <button
                className="flex w-full items-center justify-between px-2 py-3 hover:bg-blue-800"
                onClick={handleToggle}
            >
                <div className="flex items-center gap-2">
                    {<IoSettingsOutline />}
                    <h1>Cài đặt</h1>
                </div>
                {icon}
            </button>
            {isOpen && (
                <ul className="ml-6 max-h-screen">
                    {list.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={`/management/${item.route}`}
                                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === item.route ? "bg-blue-800" : ""
                                    }`}
                                onClick={() => handleLinkClick(item.route)}
                            >
                                <LuDot />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const BottomSideNav = () => {
    const { logout } = useAuth();
    return (
        <button className="flex items-center justify-between text-white border-y-2 border-white mb-1 mx-4 hover:bg-blue-950"
            onClick={logout}
        >
            <div className="flex items-center gap-2 py-2">
                {/* Avatar */}
                <Image
                    className="rounded-full"
                    src={'/img/avt.png'}
                    alt="avatar"
                    width={50}
                    height={50}
                />
                {/* Username */}
                <h1>Le Minh Kha</h1>
                {/* Action button icon */}
            </div>
            <GrNext />
        </button>
    );
}
