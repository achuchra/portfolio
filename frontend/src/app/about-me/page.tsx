import { getStrapiURL } from "@/lib/utils";
import { ApiAbout, ApiResponse } from "@/types";
import qs from "qs";

const fetchAboutPage = async () => {
	const { fetchData } = await import("@/lib/fetch");
	const path = "/api/about";
	const baseUrl = getStrapiURL();
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: {
			paragraph: {
				populate: "*",
			},
		},
	});
	url.search = query;

	return await fetchData<ApiResponse<ApiAbout>>(url.href);
};

export default async function AboutMe() {
	const { data } = await fetchAboutPage();

	return (
		<section className="relative h-full w-full overflow-scroll">
			<div className="mx-auto w-full pt-0 sm:w-[80%] sm:pt-10">
				{data.paragraph.map((paragraphItem) => (
					<p className="pb-5">{paragraphItem.description}</p>
				))}
			</div>
		</section>
	);
}
