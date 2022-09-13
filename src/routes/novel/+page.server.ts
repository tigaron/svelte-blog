import { error } from '@sveltejs/kit';
import { ghost } from '$lib/utils/variables';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const url = `${ghost.url}/pages/?key=${ghost.key}&fields=title,slug,feature_image&limit=all`;
	const response = await fetch(url);
	const data = await response.json();

	if (data) {
		return data;
	}

	throw error(404, 'Not found');
}
