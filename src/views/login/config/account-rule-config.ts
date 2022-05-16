export const rules = {
	name: [
		{
			required: true,
			message: "用户名不能为空~",
			trigger: "blur",
		},
		{
			// 字符串匹配规则
			pattern: /^[a-z0-9]{4,10}$/,
			message: "用户名必须是4~10个字母或者数字",
		},
	],
	password: [
		{
			required: true,
			message: "密码不能为空~",
			trigger: "blur",
		},
		{
			// 字符串匹配规则
			pattern: /^[a-z0-9]{4,10}$/,
			message: "密码必须是4~10个字母或者数字",
		},
	],
};
