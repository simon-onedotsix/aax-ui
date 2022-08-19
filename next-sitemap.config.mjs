/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL || 'https://trends.aax.com',
    generateRobotsTxt: true,
}

export default config