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

	const response = await fetch(`https://${rapidapi.host}/fetch/chapter/${provider}/${series}/${chapter}`, options);
	const { data: ChapterData } = await response.json();
	const { ChapterTitle, ChapterContent } = ChapterData;
	const images = new Set();
	for await (const element of ChapterContent) {
		let img;
		if (provider === 'realm') img = element;
		else img = convertImage(element, "resize:fit:600", "webp");
		images.add(img);
	}
	
	const result = new Map([
		["ChapterTitle", ChapterTitle],
		["ChapterContent", images],
	]);
	if (result.size) {
		return mapToObject(result);
	}
	throw error(404, 'Not found');
}