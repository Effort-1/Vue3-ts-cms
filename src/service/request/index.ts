import axios from "axios";
import type { AxiosInstance } from "axios";
import { RequestInterceptors, RequestConfig } from "./types";
import { ElLoading } from "element-plus";

const DEFAULT_LOADING = false;

class yRequest {
	instance: AxiosInstance;
	interceptors?: RequestInterceptors;
	showLoading: boolean;
	loading?: any;

	constructor(config: RequestConfig) {
		this.instance = axios.create(config);
		// 默认有加载动画
		this.showLoading = config.showLoading ?? DEFAULT_LOADING;
		this.interceptors = config.interceptors;

		// 从 config 中取出的拦截器是对应的 实例的拦截器
		// 请求拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		);
		// 响应拦截器
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		);

		// 添加所有实例都有的拦截器
		this.instance.interceptors.request.use(
			(config) => {
				if (this.showLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: "正在加载...",
						background: "rgba(0,0,0,.5)",
					});
				}
				console.log("所有实例的请求拦截器: 请求成功");
				return config;
			},
			(err) => {
				console.log("所有实例的请求拦截器: 请求失败");
				return err;
			}
		);
		this.instance.interceptors.response.use(
			(config) => {
				// 关闭 loading 加载
				this.loading?.close();

				console.log("所有实例的响应拦截器: 响应成功");
				return config;
			},
			(err) => {
				// 关闭loading加载
				this.loading?.close();
				console.log("所有实例的响应拦截器: 响应失败");
				return err;
			}
		);
	}

	request<T = any>(config: RequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 单个请求对config的处理
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors.requestInterceptor(config);
			}

			// 判断是否显示loading
			if (this.showLoading === false) {
				this.showLoading = false;
			}
			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 单个请求对数据的处理
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res);
					}
					this.showLoading = DEFAULT_LOADING;
					resolve(res);
				})
				.catch((err) => {
					this.showLoading = DEFAULT_LOADING;
					reject(err);
					return err;
				});
		});
	}

	get<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "GET" });
	}
	post<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "POST" });
	}
	patch<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "PATCH" });
	}
	delete<T>(config: RequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: "DELETE" });
	}
}

export default yRequest;
