import { API_URL, API_KEY, API_HOST } from "$lib/variables.js";

export const GET = async ({ url, params }) => {
	const source = params.slug;
	const slug = url.searchParams.get("slug").split(" ").join("+");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": API_HOST,
		},
	};
	try {
		const response = await fetch(
            `${API_URL}/scrape/manga/${source}/${slug}`,
            options
        );
        const manga = await response.json();
		return {
			status: 200,
			body: JSON.stringify(manga),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
