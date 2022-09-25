import { error } from '@sveltejs/kit';
import { rapidapi } from '$lib/utils/variables';
import convertImage from '$lib/utils/convertImage';
import mapToObject from '$lib/utils/mapToObject';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, params }) {
	const { series, chapter } = params;
	const provider = url.searchParams.get("provider");
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};

	const response = await fetch(`https://${rapidapi.host}/series/${series}/chapter/${chapter}/?provider=${provider}`, options);
	const { data: ChapterData } = await response.json();
	if (!ChapterData) throw error(404, 'Not found');
	
	const { ChapterTitle, ChapterContent, ChapterNextSlug, ChapterPrevSlug } = ChapterData;
	const ChapterOrder = chapter.match(/\d+/);
	const images = new Set();
	for await (const element of ChapterContent) {
		const img = /(jpg|jpeg|png)$/.test(element) ? convertImage(element, "resize:fit:600", "webp") : element;
		images.add(img);
	}
	
	const result = new Map([
		["Provider", provider],
		["MangaSlug", series],
		["ChapterSlug", chapter],
		["ChapterTitle", ChapterTitle],
		["ChapterContent", images],
		["PrevChapter", ChapterPrevSlug ? `${ChapterPrevSlug}/?provider=${provider}` : null],
		["NextChapter", ChapterNextSlug ? `${ChapterNextSlug}/?provider=${provider}` : null],
	]);
	return mapToObject(result);
}