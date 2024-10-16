import { ApiExperience, ApiResponse } from "@/types";
import { Calendar, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import Link from "next/link";

const loadExperience = async (slug: string) => {
	const { fetchData } = await import("@/lib/fetch");
	const baseUrl = (await import("@/lib/utils")).getStrapiURL();

	const path = `/api/experiences/${slug}`;
	const url = new URL(path, baseUrl);

	const data = await fetchData<ApiResponse<ApiExperience>>(url.href);
	return data;
};

export default async function MyExperience({ params: { slug } }: { params: { slug: string } }) {
	const { data } = await loadExperience(slug);
	console.log("data", data);
	return (
		<>
			{data.previous && (
				<Link href={data.previous} className="absolute left-0 top-[45%]">
					<ChevronLeft size={64} />
				</Link>
			)}

			<section className="relative mx-auto w-[60%] pt-16">
				<h1 className="text-4xl font-bold">{data.company}</h1>
				<h3 className="my-2 text-xl">{data.role}</h3>
				<p className="flex items-start gap-2">
					<Calendar size={24} />
					{data.started} - {data.finished || "Present"}
				</p>
				<p className="my-5">{data.description}</p>
				<h5 className="text-lg"></h5>
				<p className="flex items-start gap-2">
					<Wrench size={24} />
					<span>{data.stack}</span>
				</p>
			</section>

			{data.next && (
				<Link href={data.next} className="absolute right-0 top-[45%]">
					<ChevronRight size={64} />
				</Link>
			)}
		</>
	);
}
