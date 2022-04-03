module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['cms.thebench.com', 'res.cloudinary.com'],
	},
	webpack(config) {
		config.module.rules.push({
		  test: /\.svg$/,
		  use: ["@svgr/webpack"]
		});
	
		return config;
	}
}