'use client';

import Image from "next/image";
import Link from "next/link"
import { BiMenu } from "react-icons/bi";
import { use, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { LuDot } from "react-icons/lu";

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
    return (
        <div className="flex justify-between items-center h-20 px-1 gap-1 text-white text-sm border-b-2 border-white">
            {/* gov_logo */}
            <Image src="/img/gov_logo.png" alt="gov_logo" width={40} height={40} />
            {/* Department name */}
            <ul>
                <li className="text-center">Ủy ban nhân dân thành phố</li>
                <li className="text-center">Hồ Chí Minh</li>
            </ul>
            {/* Action button */}
            <BiMenu className="text-3xl" />
        </div>
    );
}

const MiddleSideNav = () => {
    /* System toggle, manage department, permission, role, user, report configuration */
    const list = [
        { route: 'department', name: 'Department' },
        { route: 'permission', name: 'Permission' },
        { route: 'role', name: 'Role' },
        { route: 'user', name: 'User' },
        { route: 'report-configuration', name: 'Report Configuration' },
    ]
    const [isOpen, setIsOpen] = useState(true);
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

    return (
        <div className="pt-2 text-white">
            <button
                className="flex w-full items-center justify-between px-2 hover:bg-blue-950"
                onClick={handleToggle}
            >
                <div className="flex items-center gap-2">
                    {<IoSettingsOutline />}
                    <h1>Setting</h1>
                </div>
                {icon}
            </button>
            {isOpen && (
                <ul className="ml-6 max-h-screen">
                    {list.map((item, index) => (
                        <li key={index}>
                            <Link href={`/management/${item.route}`} className="flex items-center hover:bg-blue-950">
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
    return (
        <button className="flex items-center justify-between text-white border-y-2 border-white mb-1 mx-4 hover:bg-blue-950">
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
                <h1>Pablo Gavi</h1>
                {/* Action button icon */}
            </div>
            <GrNext />
        </button>
    );
}
