/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
			{
				source: "/experience",
				destination: "/experience/ncdc",
				permanent: true,
			},
			{
				source: "/projects",
				destination: "/projects/this",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "1337",
				pathname: "/uploads/**/*",
			},
			{
				protocol: "https",
				hostname: "artistic-card-296c81d2a1.media.strapiapp.com",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
		deviceSizes: [320, 1080, 2048],
		imageSizes: [1920, 2560, 3840],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
