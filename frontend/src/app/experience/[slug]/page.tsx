import { Anchor } from "@/components/anchor";
import { ApiExperience, ApiResponse } from "@/types";
import { AtSign, Calendar, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import qs from "qs";

export async function generateStaticParams() {
	const { fetchData } = await import("@/lib/fetch");
	const baseUrl = (await import("@/lib/utils")).getStrapiURL();

	const path = "/api/experiences";
	const url = new URL(path, baseUrl);

	const data = await fetchData<ApiResponse<ApiExperience[]>>(url.href);
	return data.data.map(({ slug }) => ({ slug }));
}

const loadExperience = async (slug: string) => {
	const { fetchData } = await import("@/lib/fetch");
	const baseUrl = (await import("@/lib/utils")).getStrapiURL();

	const path = `/api/experiences/${slug}`;
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: {
			paragraph: {
				populate: "*",
			},
			references: {
				populate: "*",
				link: {
					populate: "*",
				},
			},
		},
	});
	url.search = query;

	return await fetchData<ApiResponse<ApiExperience>>(url.href);
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
	const { data } = await loadExperience(slug);

	return {
		title: `${data.company} - experience`,
		description: data.role,
	};
}

export default async function MyExperience({ params: { slug } }: { params: { slug: string } }) {
	const { data } = await loadExperience(slug);

	return (
		<>
			<div className="h-[95%] overflow-y-scroll sm:h-full">
				{data.previous && (
					<Link href={data.previous} className="left-0 top-[45%] hidden sm:absolute sm:block">
						<ChevronLeft size={64} />
					</Link>
				)}

				<section className="relative mx-auto w-full pt-0 sm:w-[80%] sm:pt-10">
					<h1 className="text-3xl font-bold md:text-4xl">{data.company}</h1>
					<h3 className="text-l my-2 md:text-xl">{data.role}</h3>
					<p className="flex items-start gap-2 pb-5">
						<Calendar size={24} className="shrink-0" />
						{data.started} - {data.finished || "Present"}
					</p>
					{data.paragraph.map((paragraphItem, index) => (
						<p key={index} className="pb-5">
							{paragraphItem.description}
						</p>
					))}
					<p className="flex items-start gap-2 pb-5">
						<Wrench size={24} className="shrink-0" />
						<span>{data.stack}</span>
					</p>
					{data.references?.length > 0 ? (
						<section about="references" className="flex items-start gap-2">
							<AtSign size={24} className="shrink-0" />
							<div>
								{data.references.map((reference, index) => (
									<p key={index} className="pb-5">
										{reference.title}
										<Anchor {...reference.link} />
									</p>
								))}
							</div>
						</section>
					) : null}
				</section>

				{data.next && (
					<Link href={data.next} className="right-0 top-[45%] hidden sm:absolute sm:block">
						<ChevronRight size={64} />
					</Link>
				)}
			</div>

			<section about="navigation" className="relative flex h-[5%] border-t-[1px] sm:hidden">
				{data.previous && (
					<Link href={data.previous} className="absolute left-[-0.5rem] top-2">
						<ChevronLeft size={24} />
					</Link>
				)}
				{data.next && (
					<Link href={data.next} className="absolute right-[-0.5rem] top-2">
						<ChevronRight size={24} />
					</Link>
				)}
			</section>
		</>
	);
}
