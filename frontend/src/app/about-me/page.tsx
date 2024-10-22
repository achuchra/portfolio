import { CardGrid } from "@/components/card-grid";
import ContentWithImage from "@/components/content-with-image";
import { Feature } from "@/components/feature";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { getStrapiURL } from "@/lib/utils";
import { ApiAboutPage, ApiResponse, Block } from "@/types";
import qs from "qs";

const fetchAboutPage = async () => {
	const { fetchData } = await import("@/lib/fetch");
	const path = "/api/pages/about-me";
	const baseUrl = getStrapiURL();
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: {
			blocks: {
				on: {
					"layout.section-heading": {
						populate: "*",
					},
					"elements.feature": {
						populate: {
							populate: "*",
							link: {
								populate: "*",
							},
						},
					},
				},
			},
		},
	});
	url.search = query;

	return await fetchData<ApiResponse<ApiAboutPage>>(url.href);
};

function BlockRenderer(block: Block) {
	switch (block.__component) {
		case "layout.hero":
			return <Hero key={block.id} {...block} />;
		case "layout.card-grid":
			return <CardGrid key={block.id} {...block} />;
		case "layout.section-heading":
			return <SectionHeading key={block.id} {...block} />;
		case "layout.content-with-image":
			return <ContentWithImage key={block.id} {...block} />;
		case "elements.feature":
			return <Feature key={block.id} {...block} />;
		default:
			return null;
	}
}

export async function generateMetadata() {
	const { data } = await fetchAboutPage();

	return {
		title: data.title,
		description: data.description,
		openGraph: {
			title: data.title,
			description: data.description,
		},
	};
}

export default async function AboutMe() {
	const { data } = await fetchAboutPage();

	return (
		<section className="relative h-full w-full overflow-scroll">
			<div className="mx-auto w-full pt-0 sm:w-[80%] sm:pt-10">
				{(data.blocks || []).map((block) => BlockRenderer(block))}
			</div>
		</section>
	);
}
