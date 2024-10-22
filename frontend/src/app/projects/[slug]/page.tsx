import { Anchor } from "@/components/anchor";
import { ApiProject, ApiResponse } from "@/types";
import { AtSign, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import qs from "qs";

export async function generateStaticParams() {
	const { fetchData } = await import("@/lib/fetch");
	const baseUrl = (await import("@/lib/utils")).getStrapiURL();

	const path = "/api/projects";
	const url = new URL(path, baseUrl);

	const data = await fetchData<ApiResponse<ApiProject[]>>(url.href).catch(() => {
		return {
			data: [],
		};
	});

	return data.data.map(({ slug }) => ({ slug }));
}

const loadProject = async (slug: string) => {
	const { fetchData } = await import("@/lib/fetch");
	const baseUrl = (await import("@/lib/utils")).getStrapiURL();

	const path = `/api/projects/${slug}`;
	const url = new URL(path, baseUrl);

	const query = qs.stringify({
		populate: {
			paragraph: {
				populate: "*",
				link: {
					populate: "*",
				},
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

	const data = await fetchData<ApiResponse<ApiProject>>(url.href).catch(notFound);
	return data;
};

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
	const { data } = await loadProject(slug);

	return {
		title: `Andrzej Chuchra - ${data.title} project`,
		description: data.description,
	};
}

export default async function MyProjects({ params: { slug } }: { params: { slug: string } }) {
	const { data } = await loadProject(slug);

	return (
		<>
			<div className="h-[95%] overflow-y-scroll sm:h-full">
				{data.previous && (
					<Link href={data.previous} className="left-0 top-[45%] hidden sm:absolute sm:block">
						<ChevronLeft size={64} />
					</Link>
				)}

				<section className="relative mx-auto w-full pt-0 sm:w-[80%] sm:pt-10">
					<h1 className="pb-5 text-3xl font-bold">{data.title}</h1>
					{data.paragraph.map((paragraphItem, index) => (
						<p key={index} className="pb-5 text-xl">
							{paragraphItem.description}
							{paragraphItem.link ? <Anchor {...paragraphItem.link} /> : null}
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
