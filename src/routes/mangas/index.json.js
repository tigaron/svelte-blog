import { rapidapi } from "$lib/variables.js";
import convert from "$lib/imgproxy.js";

export const GET = async ({ url }) => {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};
	const MangaList = new Set();
	try {
		const response = await fetch(
			`${rapidapi.url}/fetch/manga-list/asura`,
			options
		);
		const { data } = await response.json();
		for await (const { MangaTitle, MangaCover, EntrySlug } of data) {
			if (!MangaCover) continue;
			const Thumbnail = convert(MangaCover, "resize:fit:200", "webp");
			MangaList.add({ MangaTitle, Thumbnail, EntrySlug });
		}
		return {
			status: 200,
			body: JSON.stringify(Array.from(MangaList)),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
