import { error } from '@sveltejs/kit';
import { rapidapi } from '$lib/utils/variables';
import convertImage from '$lib/utils/convertImage';
import mapToObject from '$lib/utils/mapToObject';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, params }) {
	const { series } = params;
	const provider = url.searchParams.get("provider");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};

	const mangaRes = await fetch(`https://${rapidapi.host}/series/${series}/?provider=${provider}`, options);
	const { data: MangaData  } = await mangaRes.json();
	if (!MangaData) throw error(404, 'Not found');
	const { MangaTitle, MangaCover, MangaSynopsis, _id: MangaSlug } = MangaData;
	const Thumbnail = /(jpg|jpeg|png)$/.test(MangaCover) ? convertImage(MangaCover, "resize:fit:600", "webp") : MangaCover;

	const chapterRes = await fetch(`https://${rapidapi.host}/series/${series}/chapters/?provider=${provider}`, options);
	const ChapterList = new Set();
	const { data: ChaptersData } = await chapterRes.json();
	if (!ChaptersData.count) throw error(404, 'Not found');
	for await (const { ChapterNumber, ChapterDate, _id: ChapterSlug, ChapterOrder} of ChaptersData.series) {
		ChapterList.add({ ChapterNumber, ChapterOrder, ChapterSlug, ChapterDate });
	}

	const result = new Map([
		["Provider", provider],
		["MangaTitle", MangaTitle],
		["MangaSlug", MangaSlug],
		["MangaSynopsis", MangaSynopsis],
		["Thumbnail", Thumbnail],
		["ChapterList", Array.from(ChapterList).sort((a, b) => b.ChapterOrder - a.ChapterOrder)]
	]);
	return mapToObject(result);
}