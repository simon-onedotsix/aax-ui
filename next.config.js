module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['aax.onedotsix.com', 'aaxtrends.cogney.com', 'youtube.com'],
	},

	i18n: {
		locales: ['en', 'zh', 'ru', 'ko', 'fr', 'es', 'pt', 'id'],
		defaultLocale: 'en',
	},

	webpack(config) {
		config.module.rules.push({
		  test: /\.svg$/,
		  use: ["@svgr/webpack"]
		});
	
		return config;
	}
}