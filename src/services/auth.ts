import auth from "@/api/auth"
import { PermissionList } from "@/contexts/permission-context"
import { UserInfo } from "@/contexts/user-info-context"
import { set } from "@/hooks/use-local-storage"

export const login = async (
  userName: string,
  password: string,
  deptId: string,
  login: () => void,
  logout: () => void,
  updateUserInfo: (userInfo: UserInfo) => void,
  updatePermissionList: (permissionList: PermissionList) => void = () => { }
) => {
  const result = await auth.login(userName, password, deptId)
  if (result.success) {
    login()

    updateUserInfo(result.data.user)

    const getPermission = (type: string) => ({
      create: result.data.listPermissions[type].create,
      read: result.data.listPermissions[type].read,
      update: result.data.listPermissions[type].update,
      delete: result.data.listPermissions[type].delete,
    })

    updatePermissionList({
      department: getPermission('Department'),
      user: getPermission('User'),
      role: getPermission('Role'),
      report: getPermission('Report'),
      reportConfig: getPermission('ReportConfig'),
    })
    set("accessToken", result.data.access_token)
    set("userInfo", result.data.user)
    set("permissionList", {
      department: getPermission('Department'),
      user: getPermission('User'),
      role: getPermission('Role'),
      report: getPermission('Report'),
      reportConfig: getPermission('ReportConfig'),
    })
    return {
      success: true,
      message: result.message,
    }
  } else {
    logout()
    return {
      success: false,
      message: result.message,
    }
  }
}

export const logout = (logout: () => void) => {
  logout()
  set("accessToken", "")
  set("userInfo", {})
  set("permissionList", {})
}
