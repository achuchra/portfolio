import { ApiExperience, ApiResponse } from "@/types";

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
	return (
		<>
			<h1 className="text-4xl font-bold">{data.company}</h1>
			<h3 className="text-xl">{data.role}</h3>
		</>
	);
}
