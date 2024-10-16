import { getStrapiURL } from "@/lib/utils";
import { ApiHome, ApiResponse } from "@/types";
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
		<div className="flex h-full flex-col items-end justify-end">
			<p className="text-xl">{data.firstLine}</p>
			<p className="text-xl">
				{data.secondLine}{" "}
				<Link className="link" href={"/about-me"}>
					/about me
				</Link>
			</p>
		</div>
	);
}
