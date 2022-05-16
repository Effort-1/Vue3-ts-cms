import { createStore } from "vuex";
import { IRootState } from "./types";
import login from "./login/login";

export default createStore<IRootState>({
	state: () => {
		return {
			name: "yang",
			age: 22,
		};
	},
	mutations: {},
	actions: {},
	modules: {
		// 注册login模块
		login,
	},
});
