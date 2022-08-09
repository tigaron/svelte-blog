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
		const mangaRes = await fetch(
			`${API_URL}/fetch/manga/${source}/${slug}`,
			options
		);
		const manga = await mangaRes.json();
		const chaptersRes = await fetch(
			`${API_URL}/fetch/chapters/${source}/${slug}`,
			options
		);
		const chapters = await chaptersRes.json();
		manga.data.Chapters = chapters.data.sort(
			(a, b) =>
				parseInt(a.Slug.split("-").pop()) - parseInt(b.Slug.split("-").pop())
		);
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
