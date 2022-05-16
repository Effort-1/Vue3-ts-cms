import { Module } from "vuex";
import { IRootState } from "../types";
import { ILoginState } from "./types";
import {
	accountLoginRequest,
	requestUserINfoById,
	requestUserMenusByRoleId,
} from "@/service/login/login";
import { IAccount } from "@/service/login/types";
import localCache from "@/utils/cache";
// Module 要求我们传入2个泛型,第一个是该模块下state的类型,第二个是根store中的state的类型
const loginModule: Module<ILoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			token: "",
			userInfo: {},
		};
	},
	getters: {},
	mutations: {
		changeToken(state, token: string) {
			state.token = token;
		},
		changeUserInfo(state, userInfo: any) {
			state.userInfo = userInfo;
		},
	},
	actions: {
		async accountLoginAction({ commit }, payload: IAccount) {
			// 登录信息
			console.log("执行login模块下的accountLoginAction", payload);
			const loginResult = await accountLoginRequest(payload);
			const { id, token } = loginResult.data;
			commit("changeToken", token);
			localCache.setCache("token", token);

			// 2 请求用户信息
			const userInfoResult = await requestUserINfoById(id);
			const userInfo = userInfoResult.data;
			commit("changeUserInfo", userInfo);
			localCache.setCache("userInfo", userInfo);

			// 3 请求用户菜单
			const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id);
			const userMenus = userMenuResult.data;
			console.log("userMenus: ", userMenus);
		},
		/* phoneLoginAction({ commit }, payload: any) {
			console.log("执行login模块下的phoneLoginAction", payload);
		}, */
	},
};

export default loginModule;
