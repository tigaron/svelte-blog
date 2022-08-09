import { API_URL, API_KEY, API_HOST } from "$lib/variables.js";

export const GET = async ({ url, params }) => {
	const source = params.chapter.split("/").pop();
	const slug = url.searchParams.get("slug");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": API_HOST,
		},
	};
	try {
		const response = await fetch(
			`${API_URL}/fetch/chapter/${source}/${slug}`,
			options
		);
		const manga = await response.json();
		return {
			status: 200,
			body: JSON.stringify(manga.data),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
