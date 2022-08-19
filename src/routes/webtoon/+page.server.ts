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
	const provider = ['alpha', 'asura', 'flame', 'luminous', 'realm']
	const ProviderList = new Map();
	for await (const item of provider) {
		const MangaList = new Set();
		const response = await fetch(`https://${rapidapi.host}/fetch/manga-list/${item}`, options);
		const { data } = await response.json();
		if (!data) throw error(404, 'Not found');
		for await (const { MangaTitle, MangaCover, EntrySlug } of data) {
			if (!MangaCover) continue;
			let Thumbnail;
			if (item === 'realm') Thumbnail = MangaCover;
			else Thumbnail = convertImage(MangaCover, "resize:fit:200", "webp");
			MangaList.add({ MangaTitle, Thumbnail, EntrySlug });
		}
		ProviderList.set(`${item}`, MangaList)
	}
	return mapToObject(ProviderList);
}