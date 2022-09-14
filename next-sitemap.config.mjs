/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/404'],
}

export default config