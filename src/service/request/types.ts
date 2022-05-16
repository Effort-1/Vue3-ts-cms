import { AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestInterceptors<T = AxiosResponse> {
	// 请求成功拦截器参数类型
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	//	请求失败拦截器参数类型
	requestInterceptorCatch?: (error: any) => any;

	// 响应成功拦截器参数类型
	responseInterceptor?: (config: T) => T;
	// 响应失败拦截器参数类型
	responseInterceptorCatch?: (error: any) => any;
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: RequestInterceptors<T>;
	showLoading?: boolean;
}

export { RequestInterceptors, RequestConfig };
