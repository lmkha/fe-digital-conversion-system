import auth from "@/api/auth"
import { UserInfo } from "@/contexts/user-info-context"
import { set } from "@/hooks/use-local-storage"

export const login = async (
    userName: string,
    password: string,
    deptId: string,
    login: () => void,
    logout: () => void,
    updateUserInfo: (userInfo: UserInfo) => void
) => {
    const result = await auth.login(userName, password, deptId)
    if (result.success) {
        login()
        updateUserInfo(result.data.user)
        set("accessToken", result.data.access_token)
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
