import { error } from '@sveltejs/kit';
import { ghost } from '$lib/utils/variables';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { chapter } = params;
	const url = `${ghost.url}/posts/slug/${chapter}/?key=${ghost.key}&include=tags`;
	const response = await fetch(url);
	const data = await response.json();

	if (data) {
		return data;
	}

	throw error(404, 'Not found');
}
