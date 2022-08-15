import { rapidapi } from "$lib/variables.js";
import convert from "$lib/imgproxy.js";

export const GET = async ({ url, params }) => {
	const provider = params.slug;
	const slug = url.searchParams.get("slug");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};
	try {
		const response1 = await fetch(
			`${rapidapi.url}/fetch/manga/${provider}/${slug}`,
			options
		);
		const { data: MangaData } = await response1.json();
		const { MangaTitle, MangaCover, MangaSynopsis, EntrySlug: MangaSlug } = MangaData;
		const Thumbnail = convert(MangaCover, "resize:fit:600", "webp");
		const response2 = await fetch(
			`${rapidapi.url}/fetch/chapter-list/${provider}/${slug}`,
			options
		);
		const ChapterList = new Set();
		const { data: ChaptersData } = await response2.json();
		for await (const { ChapterNumber, ChapterDate, EntrySlug: ChapterSlug } of ChaptersData) {
			const ChapterOrder = ChapterSlug.split("-").pop();
			ChapterList.add({ ChapterNumber, ChapterOrder, ChapterSlug, ChapterDate });
		}
		const result = new Map([
			["MangaTitle", MangaTitle],
			["MangaSlug", MangaSlug],
			["MangaSynopsis", MangaSynopsis],
			["Thumbnail", Thumbnail],
			["ChapterList", Array.from(ChapterList).sort((a,b) => parseInt(b.ChapterOrder) - parseInt(a.ChapterOrder))]
		]);
		return {
			status: 200,
			body: JSON.stringify(Object.fromEntries(result)),
		};
	} catch (error) {
		return {
			status: 500,
			body: { error: error.message },
		};
	}
};
