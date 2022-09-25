import { error } from '@sveltejs/kit';
import { rapidapi } from '$lib/utils/variables';
import convertImage from '$lib/utils/convertImage';
import mapToObject from '$lib/utils/mapToObject';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": rapidapi.key,
			"X-RapidAPI-Host": rapidapi.host,
		},
	};
	const providers = ['alpha', 'asura', 'flame', 'luminous', 'realm', 'omega']
	const AllSeries = new Map();
	for await (const provider of providers) {
		const MangaList = new Set();
		const response = await fetch(`https://${rapidapi.host}/series/?provider=${provider}`, options);
		const { data } = await response.json();
		if (!data.count) throw error(404, 'Not found');
		for await (const { MangaTitle, MangaCover, _id: EntrySlug } of data.series) {
			if (!MangaCover) continue;
			const Thumbnail = /(jpg|jpeg|png)$/.test(MangaCover) ? convertImage(MangaCover, "resize:fit:200", "webp") : MangaCover;
			MangaList.add({ MangaTitle, Thumbnail, EntrySlug });
		}
		AllSeries.set(`${provider}`, MangaList)
	}
	return mapToObject(AllSeries);
}