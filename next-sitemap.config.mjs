/** @type {import('next-sitemap').IConfig} */

const config = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    exclude: ['/404', '/zh/404', '/ru/404', '/fr/404', '/es/404', '/pt/404', '/id/404', '/vi/404'],
}

export default config