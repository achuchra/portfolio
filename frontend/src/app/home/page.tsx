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
				<p className="text-xl">{data.firstLine}</p>
				<p className="text-xl">
					{data.secondLine}{" "}
					<Link className="link" href={"/about-me"}>
						/about me
					</Link>
				</p>
			</div>
			{data.bgMobile ? (
				<Image
					src="/images/home-bg-mobile.png"
					alt={data.bgMobile.name}
					width={data.bgMobile.width}
					height={data.bgMobile.height}
					className="absolute bottom-0 left-0 z-[-1] sm:hidden"
				></Image>
			) : null}
			{data.bgTablet ? (
				<Image
					src="/images/home-bg-tablet.png"
					alt={data.bgTablet.name}
					width={data.bgTablet.width}
					height={data.bgTablet.height}
					className="absolute bottom-0 left-0 z-[-1] hidden sm:block lg:hidden"
				></Image>
			) : null}
			{data.bgDesktop ? (
				<Image
					src="/images/home-bg-desktop.png"
					alt={data.bgDesktop.name}
					width={data.bgDesktop.width}
					height={data.bgDesktop.height}
					className="absolute bottom-0 left-0 z-[-1] hidden lg:block"
				></Image>
			) : null}
		</>
	);
}
