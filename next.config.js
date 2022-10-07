/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['assets.poap.xyz'],
	},
	experimental: {
		newNextLinkBehavior: true,
	},
}

module.exports = nextConfig
