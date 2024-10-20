import { getStrapiURL } from "@/lib/utils";
import { ApiAbout, ApiResponse } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
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
				link: {
					populate: "*",
				},
			},
		},
	});
	url.search = query;

	return await fetchData<ApiResponse<ApiAbout>>(url.href);
};

export const metadata: Metadata = {
	title: "About me",
	description: "Learn more about me",
	openGraph: {
		title: "About me",
		description: "Learn more about me",
	},
};

export default async function AboutMe() {
	const { data } = await fetchAboutPage();

	return (
		<section className="relative h-full w-full overflow-scroll">
			<div className="mx-auto w-full pt-0 sm:w-[80%] sm:pt-10">
				{data.paragraph.map((paragraphItem, index) => (
					<p key={index} className="pb-5">
						{paragraphItem.description}
						{paragraphItem.link ? (
							<Link href={paragraphItem.link.href} className="link">
								{paragraphItem.link.text}
							</Link>
						) : null}
					</p>
				))}
			</div>
		</section>
	);
}
