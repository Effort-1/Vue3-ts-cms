import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import yfRequest from "./service";
// 按需引入
import { globalRegister } from "./service/request/plugins";
import "normalize.css";
import "./assets/css/index.less";
// 完整引入
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store);
app.use(router);
// app.use(ElementPlus);
globalRegister(app);
app.mount("#app");

/* yfRequest.request({
	url: "/sentences ",
	method: "GET",
	interceptors: {
		requestInterceptor(config) {
			console.log("单独拦截");
			return config;
		},
		responseInterceptor(res) {
			console.log("单独响应");
			return res;
		},
	},
}); */

interface DataType {
	data: any;
	returnCode: string;
	success: boolean;
}

yfRequest
	.request<DataType>({
		url: "/sentences ",
		method: "GET",
		showLoading: false,
	})
	.then((res) => {
		console.log(res.data);
		console.log(res.returnCode);
		console.log(res.success);
	});
