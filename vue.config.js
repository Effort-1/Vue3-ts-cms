const path = require("path");
module.exports = {
	outputDir: "/dist",

	// 方式一
	configureWebpack: {
		resolve: {
			alias: {
				components: "@/components",
			},
		},
	},
	devServer: {
		proxy: {
			"^/api": {
				target: "http://152.136.185.210:4000",
				pathRewrite: {
					"^/api": "",
				},
				changeOrigin: true,
			},
		},
	},
	// 方式二
	/* configureWebpack: config => {
		config.resolve.alias = {
			"@": path.resolve(__dirname, "src"),
			components: "@/components",
		};
	}, */

	// 方式三
	/* 	chainWebpack: (config) => {
		config.resolve.alias
			.set("@", path.resolve(__dirname, "src"))
			.set("components", "@/components");
	}, */
};
