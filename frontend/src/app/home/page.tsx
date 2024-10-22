import { getStrapiURL } from "@/lib/utils";
import { ApiHome, ApiResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";

const fetchHomePageData = async () => {
	const { fetchData } = await import("@/lib/fetch");
	const path = "/api/home";
	const baseUrl = getStrapiURL();
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: "*",
	});
	url.search = query;

	const data = await fetchData<ApiResponse<ApiHome>>(url.href);
	return data;
};

export default async function Home() {
	const { data } = await fetchHomePageData();

	return (
		<>
			<div className="flex h-[50%] flex-col items-center justify-center">
				<p className="text-center text-3xl">
					<b>{data.firstLine}</b>
				</p>
				<p className="text-center text-xl">{data.secondLine}</p>
				<p className="pt-6 text-center text-xl">
					Get to know more{" "}
					<Link className="link" href={"/about-me"}>
						/about me
					</Link>
				</p>
			</div>
			<Image
				src="/images/home-bg-mobile.png"
				alt="bg-mobile"
				width={1080}
				height={1920}
				className="absolute bottom-0 left-0 z-[-1] sm:hidden"
			></Image>
			<Image
				src="/images/home-bg-tablet.png"
				alt="bg-tablet"
				width={2560}
				height={1080}
				className="absolute bottom-0 left-0 z-[-1] hidden sm:block lg:hidden"
			></Image>
			<Image
				src="/images/home-bg-desktop.png"
				alt="bg-desktop"
				width={3840}
				height={2560}
				className="absolute bottom-0 left-0 z-[-1] hidden lg:block"
			></Image>
		</>
	);
}
