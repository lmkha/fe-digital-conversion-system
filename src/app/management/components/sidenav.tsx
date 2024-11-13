"use client";

import Image from "next/image";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { GrNext } from "react-icons/gr";
import { LuDot } from "react-icons/lu";
import { useAuth } from "@/contexts/auth-context";
import { get } from "@/hooks/use-local-storage";
import { logout as serviceLogout } from "@/services/auth";
import { CldImage } from 'next-cloudinary';
import { usePermission } from '@/contexts/permission-context';
import { useUserInfo } from "@/contexts/user-info-context";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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
  const { isLoggedIn } = useAuth();
  const [departmentName, setDepartmentName] = useState<string | null>(null);
  useEffect(() => {
    if (isLoggedIn) {
      const userInfo = get("userInfo");
      if (userInfo && userInfo.dept) {
        setDepartmentName(userInfo.dept.deptName);
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="flex justify-between items-center h-20 px-1 gap-1 text-white text-sm border-b-2 border-white">
      {/* gov_logo */}
      <Image src="/img/gov_logo.png" alt="gov_logo" width={40} height={40} />
      {/* Department name */}
      <ul>
        <li className="text-center">{departmentName}</li>
      </ul>
      {/* Action button */}
      <BiMenu className="text-3xl" />
    </div>
  );
};



const MiddleSideNav = () => {
  const { userInfo } = useUserInfo();
  const { permissionList } = usePermission();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [icon, setIcon] = useState(<IoMdArrowDropright className="text-2xl" />);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      const route = pathname.split('/')[2];
      setActiveLink(route);
    }
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      setIcon(<IoMdArrowDropdown className="text-2xl" />);
    } else {
      setIcon(<IoMdArrowDropright className="text-2xl" />);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
          <IoSettingsOutline />
          <h1>Cài đặt</h1>
        </div>
        {icon}
      </button>
      {isOpen && (
        <ul className="ml-6 max-h-screen">
          {permissionList?.department?.read && (
            <li key={"department"}>
              <Link
                href={"/management/department"}
                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === "department" ? "bg-blue-800" : ""}`}
                onClick={() => handleLinkClick("department")}
              >
                <LuDot />
                Phòng ban
              </Link>
            </li>
          )}

          <li key={"permission"}>
            <Link
              href={"/management/permission"}
              className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === "permission" ? "bg-blue-800" : ""}`}
              onClick={() => handleLinkClick("permission")}
            >
              <LuDot />
              Phân quyền
            </Link>
          </li>

          {permissionList?.role?.read && (
            <li key={"role"}>
              <Link
                href={"/management/role"}
                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === "role" ? "bg-blue-800" : ""}`}
                onClick={() => handleLinkClick("role")}
              >
                <LuDot />
                Vai trò
              </Link>
            </li>
          )}

          {permissionList?.user?.read && (
            <li key={"user"}>
              <Link
                href={"/management/user"}
                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === "user" ? "bg-blue-800" : ""}`}
                onClick={() => handleLinkClick("user")}
              >
                <LuDot />
                Người dùng
              </Link>
            </li>
          )}

          {userInfo?.dept?.level === 1 && permissionList?.reportConfig?.read && (
            <li key={'report-configuration'}>
              <Link
                href={'/management/report-configuration'}
                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === 'report-configuration' ? "bg-blue-800" : ""}`}
                onClick={() => handleLinkClick('report-configuration')}
              >
                <LuDot />
                Cấu hình báo cáo
              </Link>
            </li>
          )}

          {permissionList?.report?.read && (
            <li key={'report'}>
              <Link
                href={'/management/report'}
                className={`flex items-center hover:bg-blue-800 py-3 ${activeLink === 'report' ? "bg-blue-800" : ""}`}
                onClick={() => handleLinkClick('report')}
              >
                <LuDot />
                Báo cáo
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

const BottomSideNav = () => {
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const { logout } = useAuth();
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/management/profile") {
      setActiveLink("profile");
    } else {
      setActiveLink(null);
    }
  }, [pathname]);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <button
            className={`flex items-center justify-between text-white border-y-2 border-white mb-1 mx-4 hover:bg-blue-950 ${activeLink === "profile" ? "bg-blue-800" : ""}`}
            onClick={() => popupState.open()}
          >
            <div className="flex items-center gap-2 py-2">
              {/* Avatar */}
              <CldImage
                width="50"
                height="50"
                src={userInfo?.avatar || ""}
                alt="No avt"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                }}
              />
              {/* Username */}
              <h1>{userInfo?.fullName || 'No name'}</h1>
            </div>
            <GrNext />
          </button>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                router.push("/management/profile");
                setActiveLink("profile");
                popupState.close();
              }}
            >
              Trang cá nhân
            </MenuItem>
            <MenuItem onClick={() => serviceLogout(logout)}>Đăng xuất</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
