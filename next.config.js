module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['aax.onedotsix.com', 'aax.cogney.com', 'youtube.com', 'picsum.photos'],
	},
	webpack(config) {
		config.module.rules.push({
		  test: /\.svg$/,
		  use: ["@svgr/webpack"]
		});
	
		return config;
	}
}