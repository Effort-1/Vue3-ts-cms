// service 统一出口
import yRequest from "./request/index";
import { BASE_URL, BASE_TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

const yfRequest = new yRequest({
	baseURL: BASE_URL,
	timeout: BASE_TIME_OUT,
	interceptors: {
		requestInterceptor: (config) => {
			// 携带token
			const token = localCache.getCache("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			console.log("请求成功");
			return config;
		},
		requestInterceptorCatch: (err) => {
			console.log("请求失败");
			return err;
		},
		responseInterceptor: (config) => {
			console.log("响应成功");
			return config;
		},
		responseInterceptorCatch: (err) => {
			console.log("响应失败");
			return err;
		},
	},
});

export default yfRequest;
