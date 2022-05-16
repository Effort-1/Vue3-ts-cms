// 根据process.env.NODE_ENV 判断
// 开发环境: development
// 生产环境: production
// 测试环境: test

let BASE_URL = "";
const BASE_TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
	BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
	BASE_URL = "";
} else {
	BASE_URL = "";
}

export { BASE_URL, BASE_TIME_OUT };
