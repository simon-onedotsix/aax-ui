const securityHeaders = [
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN'
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block'
	}
]


module.exports = {

	reactStrictMode: true,

	images: {
		domains: ['trends-svc.aax.com', 'aaxtrends.cogney.com', 'youtube.com'],
	},

	i18n: {
		locales: ['en', 'zh', 'ru', 'fr', 'es', 'pt', 'id', 'vi'],
		defaultLocale: 'en',
	},

	webpack(config) {
		config.module.rules.push({
		  test: /\.svg$/,
		  use: ["@svgr/webpack"]
		});
	
		return config;
	},

	async headers() {
		return [
			{
				// apply these headers to all routes in application
				source: '/:path*',
				headers: securityHeaders,
			}
		]
	},
}