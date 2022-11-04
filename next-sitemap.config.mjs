/** @type {import('next-sitemap').IConfig} */

const config = {
	siteUrl: process.env.SITE_URL,
	generateRobotsTxt: true,
	exclude: ['/404', '/zh/404', '/ru/404', '/fr/404', '/es/404', '/pt/404', '/id/404', '/vi/404'],


	// additionalPaths: async (config) => {
	// 	const result = []
	
	// 	// required value only
	// 	result.push({ loc: '/additional-page-1' })
	
	// 	// using transformation from the current configuration
	// 	result.push(await config.transform(config, '/additional-page-3'))



	// 	// make API call here
	// 	const data = [
	// 	{
	// 		"id": "1",
	// 		"slug": "slug-1"
	// 	},
	// 	{
	// 		"id": "2",
	// 		"slug": "slug-2"
	// 	},
	// 	{
	// 		"id": "3",
	// 		"slug": "slug-3"
	// 	},
	// 	{
	// 		"id": "4",
	// 		"slug": "slug-4"
	// 	}
	// 	]

	// 	data.map( item => result.push({ 
	// 		loc: `/${item.slug}`,
	// 		changefreq: 'yearly',
	// 		priority: 0.7,
	// 		lastmod: new Date().toISOString(),
	// 	}))


	
	// 	return result
	// },
}

export default config