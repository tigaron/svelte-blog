import { mangaList } from "$lib/mangas.js";
import { API_URL, API_KEY, API_HOST } from "$lib/variables.js";

export const GET = async ({ url }) => {
	const sourceName = url.searchParams.get("name");
	const end = parseInt(url.searchParams.get("count"));
	const start = parseInt(end) - 4;
	const mangaSlugs = Object.values(mangaList[sourceName])
		.slice(start, end)
		.map((manga) => manga.slug);
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": API_HOST,
		},
	};
	const mangaData = [];
	try {
		for await (const slug of mangaSlugs) {
			const response = await fetch(
				`${API_URL}/scrape/manga/${sourceName}/${slug}`,
				options
			);
			const manga = await response.json();
			manga.slug = `${sourceName}?slug=${slug}`;
			mangaData.push(manga);
		}
		return {
			status: 200,
			body: JSON.stringify(mangaData),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
