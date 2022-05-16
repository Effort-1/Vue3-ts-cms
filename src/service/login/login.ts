import yRequest from "../index";
import { IAccount, IDataType, ILoginResult } from "./types";

// 可以定义枚举类型,针对不同请求
enum LoginAPI {
	AccountLogin = "/login",
	LoginUserInfo = "/users/", // user/id
	UserMenu = "/role", // role/id/menu
}

// 登录请求
export function accountLoginRequest(account: IAccount) {
	return yRequest.post<IDataType<ILoginResult>>({
		url: LoginAPI.AccountLogin,
		data: {
			...account,
			name: "coderwhy",
		},
	});
}

// 获取用户信息
export function requestUserINfoById(id: number) {
	return yRequest.get<IDataType>({
		url: LoginAPI.LoginUserInfo + id,
	});
}

// 获取菜单
export function requestUserMenusByRoleId(id: number) {
	return yRequest.get<IDataType>({
		url: LoginAPI.UserMenu + id + "/menu",
	});
}
