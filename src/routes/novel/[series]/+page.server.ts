import { error } from '@sveltejs/kit';
import { ghost } from '$lib/utils/variables';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: { params: { series: string } }) {
	const { series } = params;

	const novelUrl = `${ghost.url}/pages/slug/${series}/?key=${ghost.key}&fields=title,slug,html,feature_image`;
	const novel = await fetch(novelUrl);
	const { pages } = await novel.json();

	const chaptersUrl = `${ghost.url}/posts/?key=${ghost.key}&filter=tag:${series}&fields=title,slug&limit=all&formats=plaintext`;
	const chapters = await fetch(chaptersUrl);
	const { posts } = await chapters.json();

	if (pages && posts) {
		return { pages, posts};
	}

	throw error(404, 'Not found');
}
