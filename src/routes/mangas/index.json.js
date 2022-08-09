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
			let manga;
			console.log(`${API_URL}/fetch/manga/${sourceName}/${slug}`);
			const fetchResponse = await fetch(
				`${API_URL}/fetch/manga/${sourceName}/${slug}`,
				options
			);
			manga = await fetchResponse.json();
			mangaData.push(manga.data);
		}
		return {
			status: 200,
			body: JSON.stringify(mangaData.filter(x => x)),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
