import type { Block } from "@/types";

import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import ContentWithImage from "@/components/content-with-image";
import { Pricing } from "@/components/pricing";
import { CardCarousel } from "@/components/card-carousel";

async function loader() {
	const { fetchData } = await import("@/lib/fetch");
	const path = "/api/landing-page";
	const baseUrl = getStrapiURL();

	const query = qs.stringify({
		populate: {
			blocks: {
				on: {
					"layout.hero": {
						populate: {
							image: {
								fields: ["url", "alternativeText", "name"],
							},
							buttonLink: {
								populate: "*",
							},
							topLink: {
								populate: "*",
							},
						},
					},
					"layout.card-grid": {
						populate: "*",
					},
					"layout.section-heading": {
						populate: "*",
					},
					"layout.content-with-image": {
						populate: {
							image: {
								fields: ["url", "alternativeText", "name"],
							},
						},
					},
					"layout.price-grid": {
						populate: {
							priceCard: {
								populate: "*",
							},
						},
					},
				},
			},
		},
	});

	const url = new URL(path, baseUrl);
	url.search = query;
	const data = await fetchData(url.href);
	return data;
}

function BlockRenderer(block: Block) {
	console.dir(block.__component, { depth: null });
	switch (block.__component) {
		case "layout.hero":
			return <Hero key={block.id} {...block} />;
		case "layout.card-grid":
			return <CardCarousel key={block.id} {...block} />;
		case "layout.section-heading":
			return <SectionHeading key={block.id} {...block} />;
		case "layout.content-with-image":
			return <ContentWithImage key={block.id} {...block} />;
		case "layout.price-grid":
			return <Pricing key={block.id} {...block} />;
		default:
			return null;
	}
}

export default async function Home() {
	// const data = await loader();
	// const blocks = data?.data?.blocks;
	// if (!blocks) return null;
	return <div></div>;
	// return <div>
	//   {blocks ? blocks.map((block: any) => BlockRenderer(block)) : null}
	// </div>;
}
