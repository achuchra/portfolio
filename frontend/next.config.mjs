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
				source: "/my-experience",
				destination: "/my-experience/ncdc",
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
	},
};

export default nextConfig;
