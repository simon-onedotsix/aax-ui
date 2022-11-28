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


	async redirects() {

		console.log('redirects fired')

		let convertedRedirects = []

		const DATA = fetch(process.env.NEXT_PUBLIC_CMS_API_URL, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: `
					query Redirects {
						retourRedirects {
							redirectSrcUrl
							redirectDestUrl
							... on RetourType {
								redirectHttpCode
							}
						}
					}
				`
				})
			})
		.then((res) => res.json())
		.then((retour) => {
			// console.log('DATA IN:', retour.data.retourRedirects)

			retour.data.retourRedirects.forEach( redirect => {
				let obj = {
					source: redirect.redirectSrcUrl,
					destination: redirect.redirectDestUrl,
					permanent: redirect.redirectHttpCode === 308 ? true : false,
					locale: false
				}
				if ( obj.source.startsWith('/') && obj.destination.startsWith('/') ) convertedRedirects.push(obj)
			})

			// console.log('REDIRECTS OUT:', convertedRedirects)
			
			return convertedRedirects
			
		})

		return await DATA

	},
}