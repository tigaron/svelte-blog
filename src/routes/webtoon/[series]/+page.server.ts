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

	const mangaRes = await fetch(`https://${rapidapi.host}/fetch/manga/${provider}/${series}`, options);
	const { data: MangaData  } = await mangaRes.json();
	const { MangaTitle, MangaCover, MangaSynopsis, EntrySlug: MangaSlug } = MangaData;
	let Thumbnail;
	if (provider === 'realm') Thumbnail = MangaCover;
	else Thumbnail = convertImage(MangaCover, "resize:fit:600", "webp");

	const chapterRes = await fetch(`https://${rapidapi.host}/fetch/chapter-list/${provider}/${series}`, options);
	const ChapterList = new Set();
	const { data: ChaptersData } = await chapterRes.json();
	for await (const { ChapterNumber, ChapterDate, EntrySlug: ChapterSlug } of ChaptersData) {
		const ChapterOrder = ChapterSlug.match(/\d+/);
		ChapterList.add({ ChapterNumber, ChapterOrder, ChapterSlug, ChapterDate });
	}

	const result = new Map([
		["Provider", provider],
		["MangaTitle", MangaTitle],
		["MangaSlug", MangaSlug],
		["MangaSynopsis", MangaSynopsis],
		["Thumbnail", Thumbnail],
		["ChapterList", Array.from(ChapterList).sort((a,b) => parseInt(b.ChapterOrder) - parseInt(a.ChapterOrder))]
	]);
	if (result.size) {
		return mapToObject(result);
	}
	throw error(404, 'Not found');
}