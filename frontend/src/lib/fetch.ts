const env = process.env.NODE_ENV;

const defaultFetchSettings: NextFetchRequestConfig = {
	revalidate: env === "production" ? 3600 : 0,
};

export async function fetchData<T extends any = any>(url: string) {
	const authToken = process.env.STRAPI_READONLY_ACCESS_TOKEN;

	const headers = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
	};

	try {
		const response = await fetch(
			url,
			authToken ? { ...headers, next: defaultFetchSettings } : { next: defaultFetchSettings },
		);
		const data = await response.json();
		if (!response.ok) throw new Error("Failed to fetch data");
		return data as T;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // or return null;
	}
}
